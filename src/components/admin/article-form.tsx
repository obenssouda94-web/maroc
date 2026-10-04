"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { locales, localeLabels } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import type { ArticleFormState } from "@/lib/actions/articles";

const CONTENT_TYPES = [
  "article", "history", "monarchy", "government", "institution", "law",
  "city", "region", "culture", "cuisine", "heritage", "event", "person",
  "symbol", "religion", "amazigh",
];

const STATUSES = ["draft", "review", "published", "archived"];

interface LocalizedEntry {
  title: string;
  description: string;
  content: string;
}

interface ArticleFormProps {
  action: (state: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  article?: {
    id: string;
    slug: string;
    title: unknown;
    description: unknown;
    content: unknown;
    language: string;
    category: string;
    status: string;
    sourceUrl: string | null;
    tags: unknown;
  };
  submitLabel: string;
}

function pick(json: unknown, lang: string): string {
  if (json && typeof json === "object" && !Array.isArray(json)) {
    const value = (json as Record<string, string>)[lang];
    return typeof value === "string" ? value : "";
  }
  return "";
}

export function ArticleForm({ action, article, submitLabel }: ArticleFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, {});

  const initialLanguage = (article?.language ?? "en") as Locale;
  const [activeLocale, setActiveLocale] = useState<Locale>(initialLanguage);

  const [buffer, setBuffer] = useState<Record<Locale, LocalizedEntry>>(() => {
    const base = {} as Record<Locale, LocalizedEntry>;
    for (const locale of locales) {
      base[locale] = {
        title: pick(article?.title, locale),
        description: pick(article?.description, locale),
        content: pick(article?.content, locale),
      };
    }
    return base;
  });

  const [slug, setSlug] = useState(article?.slug ?? "");
  const [language, setLanguage] = useState<Locale>(initialLanguage);
  const [category, setCategory] = useState(article?.category ?? "article");
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [sourceUrl, setSourceUrl] = useState(article?.sourceUrl ?? "");
  const [tags, setTags] = useState<string>(
    Array.isArray(article?.tags) ? (article.tags as string[]).join(", ") : "",
  );

  // Only send languages that actually carry content.
  const localizedPayload = useMemo(() => {
    const cleaned: Record<string, LocalizedEntry> = {};
    for (const [locale, entry] of Object.entries(buffer)) {
      if (entry.title.trim() || entry.content.trim()) cleaned[locale] = entry;
    }
    return JSON.stringify(cleaned);
  }, [buffer]);

  function updateField(field: keyof LocalizedEntry, value: string) {
    setBuffer((current) => ({
      ...current,
      [activeLocale]: { ...current[activeLocale], [field]: value },
    }));
  }

  useEffect(() => {
    if (state.message === "article:created" && state.id) {
      router.replace(`/admin/articles/${state.id}`);
    }
  }, [state.message, state.id, router]);

  const entry = buffer[activeLocale];

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="localized" value={localizedPayload} />

      {/* Language tabs */}
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
          Editing language
        </p>
        <div className="flex flex-wrap gap-1.5">
          {locales.map((locale) => {
            const filled = buffer[locale].title.trim() || buffer[locale].content.trim();
            return (
              <button
                key={locale}
                type="button"
                onClick={() => setActiveLocale(locale)}
                aria-pressed={locale === activeLocale}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  locale === activeLocale
                    ? "border-[var(--color-moroccan-red)] bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]"
                    : "border-[var(--color-strong-border)] text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]",
                )}
              >
                {localeLabels[locale]}
                {filled && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-moroccan-green)]"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Title <span className="text-[var(--color-moroccan-red)]">*</span>
          </label>
          <Input
            id="title"
            name="title"
            value={entry.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder={`Title in ${localeLabels[activeLocale]}`}
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={entry.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder={`Short description in ${localeLabels[activeLocale]}`}
            rows={2}
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Content <span className="text-[var(--color-moroccan-red)]">*</span>
          </label>
          <Textarea
            id="content"
            name="content"
            value={entry.content}
            onChange={(event) => updateField("content", event.target.value)}
            placeholder={`Article body in ${localeLabels[activeLocale]}`}
            rows={12}
            className="font-mono text-[13px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Slug
          </label>
          <Input id="slug" name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} />
          {state.errors?.slug && <FieldError message={state.errors.slug} />}
        </div>

        <div>
          <label htmlFor="language" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Primary language
          </label>
          <select
            id="language"
            name="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value as Locale)}
            className="h-11 w-full rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60"
          >
            {locales.map((locale) => (
              <option key={locale} value={locale}>
                {localeLabels[locale]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 w-full rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60"
          >
            {CONTENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 w-full rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60"
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sourceUrl" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Source URL
          </label>
          <Input
            id="sourceUrl"
            name="sourceUrl"
            type="url"
            value={sourceUrl}
            onChange={(event) => setSourceUrl(event.target.value)}
            placeholder="https://"
          />
          {state.errors?.sourceUrl && <FieldError message={state.errors.sourceUrl} />}
        </div>

        <div>
          <label htmlFor="tags" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
            Tags <span className="font-normal text-[var(--color-muted)]">(comma separated)</span>
          </label>
          <Input
            id="tags"
            name="tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="history, marrakech"
          />
        </div>
      </div>

      {state.errors?.content && <FieldError message={state.errors.content} />}
      {state.errors?.localized && <FieldError message={state.errors.localized} />}
      {state.message && !state.errors && state.message !== "article:created" && (
        <p className="rounded-xl border border-[var(--color-moroccan-green)]/25 bg-[var(--color-moroccan-green-soft)] px-4 py-2.5 text-sm font-medium text-[var(--color-moroccan-green)]">
          {state.message === "article:updated" ? "Saved successfully." : state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.push("/admin/articles")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-[var(--color-moroccan-red)]">
      {message}
    </p>
  );
}
