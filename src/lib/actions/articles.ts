"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser, audit } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { locales } from "@/i18n/config";
import type { Locale } from "@/types";

const CONTENT_TYPES = [
  "article", "history", "monarchy", "government", "institution", "law",
  "city", "region", "culture", "cuisine", "heritage", "event", "person",
  "symbol", "religion", "amazigh",
] as const;

const STATUSES = ["draft", "review", "published", "archived"] as const;

const localizedEntry = z.object({
  title: z.string().max(300),
  description: z.string().max(600).optional(),
  content: z.string(),
});

const localizedSchema = z.record(z.enum(locales as unknown as [Locale, ...Locale[]]), localizedEntry);

const articleSchema = z.object({
  slug: z.string().min(2).max(120),
  language: z.enum(locales as unknown as [Locale, ...Locale[]]),
  category: z.enum(CONTENT_TYPES),
  status: z.enum(STATUSES),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  featuredImage: z.string().max(2048).optional().or(z.literal("")),
  tags: z.string().optional().or(z.literal("")),
  localized: z.string().min(2),
});

export type ArticleFormState = {
  errors?: Record<string, string>;
  message?: string;
  id?: string;
};

function parseLocalized(raw: string): Record<Locale, { title: string; description?: string; content: string }> {
  const json: unknown = JSON.parse(raw);
  const parsed = localizedSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("Invalid localized payload");
  }
  // Drop entries with no meaningful content so we never store empty translations.
  const cleaned: Record<string, { title: string; description?: string; content: string }> = {};
  for (const [locale, entry] of Object.entries(parsed.data)) {
    if (entry.title.trim() || entry.content.trim()) cleaned[locale] = entry;
  }
  return cleaned as Record<Locale, { title: string; description?: string; content: string }>;
}

function mergeField(existing: unknown, updates: Record<string, string>): Record<string, string> {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? (existing as Record<string, string>)
      : {};
  return { ...base, ...updates };
}

function collect(
  localized: Record<Locale, { title: string; description?: string; content: string }>,
  field: "title" | "description" | "content",
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [locale, entry] of Object.entries(localized)) {
    const value = entry[field];
    if (value) out[locale] = value;
  }
  return out;
}

interface SaveInput {
  slug: string;
  localized: Record<Locale, { title: string; description?: string; content: string }>;
  language: Locale;
  category: z.infer<typeof articleSchema>["category"];
  status: z.infer<typeof articleSchema>["status"];
  sourceUrl?: string;
  featuredImage?: string;
  tagList: string[];
  authorId: string;
  publishedAt: Date | null | undefined;
}

async function saveArticle(id: string | null, input: SaveInput): Promise<string> {
  const titles = collect(input.localized, "title");
  const descriptions = collect(input.localized, "description");
  const contents = collect(input.localized, "content");

  if (id) {
    const current = await prisma.article.findUnique({ where: { id } });
    if (!current) throw new Error("not-found");
    const nowPublishing = input.status === "published" && current.status !== "published";
    await prisma.article.update({
      where: { id },
      data: {
        slug: input.slug,
        title: mergeField(current.title, titles),
        description: Object.keys(descriptions).length
          ? mergeField(current.description, descriptions)
          : (current.description as never),
        content: mergeField(current.content, contents),
        language: input.language,
        category: input.category,
        status: input.status,
        sourceUrl: input.sourceUrl || undefined,
        featuredImage: input.featuredImage,
        publishedAt: nowPublishing ? new Date() : current.publishedAt,
        tags: input.tagList,
      },
    });
    return id;
  }

  const created = await prisma.article.create({
    data: {
      slug: input.slug,
      title: titles,
      description: descriptions,
      content: contents,
      language: input.language,
      category: input.category,
      status: input.status,
      authorId: input.authorId,
      sourceUrl: input.sourceUrl || undefined,
      featuredImage: input.featuredImage || undefined,
      publishedAt: input.status === "published" ? new Date() : undefined,
      tags: input.tagList,
    },
  });
  return created.id;
}

function parseForm(formData: FormData) {
  const parsed = articleSchema.safeParse({
    slug: String(formData.get("slug") ?? ""),
    language: String(formData.get("language") ?? "en"),
    category: String(formData.get("category") ?? "article"),
    status: String(formData.get("status") ?? "draft"),
    sourceUrl: String(formData.get("sourceUrl") ?? ""),
    featuredImage: String(formData.get("featuredImage") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    localized: String(formData.get("localized") ?? "{}"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] ?? "form"] = issue.message;
    }
    return { errors };
  }

  let localized: Record<Locale, { title: string; description?: string; content: string }>;
  try {
    localized = parseLocalized(parsed.data.localized);
  } catch {
    return { errors: { localized: "Missing content in the active language." } as Record<string, string> };
  }

  const active = localized[parsed.data.language];
  if (!active || (!active.title.trim() && !active.content.trim())) {
    return {
      errors: { content: `Title and content are required for ${parsed.data.language.toUpperCase()}.` },
    };
  }

  const slug = slugify(parsed.data.slug) || slugify(active.title);
  if (!slug) {
    return { errors: { slug: "A valid slug is required." } };
  }

  const tagList = parsed.data.tags
    ? parsed.data.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  return {
    data: {
      slug,
      localized,
      language: parsed.data.language,
      category: parsed.data.category,
      status: parsed.data.status,
      sourceUrl: parsed.data.sourceUrl,
      featuredImage: parsed.data.featuredImage,
      tagList,
    },
  };
}

export async function createArticle(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const user = await requireUser();
  const result = parseForm(formData);
  if ("errors" in result) {
    return { errors: result.errors, message: "Please fix the highlighted fields." };
  }

  const existing = await prisma.article.findUnique({ where: { slug: result.data.slug } });
  if (existing) {
    return { errors: { slug: "This slug is already in use." } };
  }

  const id = await saveArticle(null, { ...result.data, authorId: user.id, publishedAt: undefined });
  await audit(user.id, "article:create", "article", id, { slug: result.data.slug });
  revalidatePath("/admin/articles");
  return { message: "article:created", id };
}

export async function updateArticle(
  id: string,
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const user = await requireUser();
  const result = parseForm(formData);
  if ("errors" in result) {
    return { errors: result.errors, message: "Please fix the highlighted fields." };
  }

  const clash = await prisma.article.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (clash) {
    return { errors: { slug: "This slug is already in use." } };
  }

  await saveArticle(id, { ...result.data, authorId: user.id, publishedAt: undefined });
  await audit(user.id, "article:update", "article", id, { slug: result.data.slug });
  revalidatePath("/admin/articles");
  return { message: "article:updated", id };
}

export async function deleteArticle(id: string): Promise<ArticleFormState> {
  const user = await requireUser();

  const article = await prisma.article.findUnique({ where: { id }, select: { slug: true } });
  if (!article) return { message: "article:not-found" };

  await prisma.article.delete({ where: { id } });
  await audit(user.id, "article:delete", "article", id, { slug: article.slug });
  revalidatePath("/admin/articles");

  return { message: "article:deleted" };
}
