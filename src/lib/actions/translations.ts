"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser, audit } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { locales } from "@/i18n/config";
import type { Locale } from "@/types";

export type TranslationFormState = {
  errors?: Record<string, string>;
  message?: string;
};

const translationSchema = z.object({
  id: z.string().min(1),
  value: z.string().max(5000),
  status: z.enum(["draft", "needs_review", "reviewed", "published"]),
});

export async function updateTranslation(
  _prev: TranslationFormState,
  formData: FormData,
): Promise<TranslationFormState> {
  const user = await requireUser();

  const parsed = translationSchema.safeParse({
    id: String(formData.get("id") ?? ""),
    value: String(formData.get("value") ?? ""),
    status: String(formData.get("status") ?? "draft"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] ?? "form"] = issue.message;
    }
    return { errors, message: "Please fix the highlighted fields." };
  }

  const existing = await prisma.translation.findUnique({ where: { id: parsed.data.id } });
  if (!existing) return { message: "translation:not-found" };

  const changed = existing.value !== parsed.data.value;
  const reviewed = parsed.data.status === "reviewed" || parsed.data.status === "published";

  await prisma.translation.update({
    where: { id: parsed.data.id },
    data: {
      value: parsed.data.value,
      status: parsed.data.status,
      translatedBy: changed ? user.id : existing.translatedBy,
      reviewedBy: reviewed ? user.id : null,
    },
  });

  await audit(user.id, "translation:update", "translation", parsed.data.id, {
    key: existing.key,
    language: existing.languageId,
    namespace: existing.namespace,
  });

  revalidatePath("/admin/translations");
  return { message: "translation:updated" };
}

export async function bulkPublishTranslations(ids: string[]): Promise<TranslationFormState> {
  const user = await requireUser();
  if (ids.length === 0) return { message: "translation:nothing-selected" };

  await prisma.translation.updateMany({
    where: { id: { in: ids } },
    data: { status: "published", reviewedBy: user.id },
  });

  await audit(user.id, "translation:bulk-publish", "translation", undefined, { count: ids.length });
  revalidatePath("/admin/translations");

  return { message: "translation:published" };
}

/** Progress of each language's translation review pipeline. */
export async function translationProgress(): Promise<
  Record<Locale, { total: number; done: number; pct: number }>
> {
  const grouped = await prisma.translation.groupBy({
    by: ["languageId", "status"],
    _count: true,
  });

  const result = {} as Record<Locale, { total: number; done: number; pct: number }>;
  for (const locale of locales) {
    result[locale] = { total: 0, done: 0, pct: 0 };
  }

  for (const row of grouped) {
    const locale = row.languageId as Locale;
    if (!(locale in result)) continue;
    result[locale].total += row._count;
    if (row.status === "reviewed" || row.status === "published") {
      result[locale].done += row._count;
    }
  }

  for (const locale of locales) {
    const { total, done } = result[locale];
    result[locale].pct = total === 0 ? 0 : Math.round((done / total) * 100);
  }

  return result;
}
