"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { locales, localeLabels } from "@/i18n/config";
import type { Locale } from "@/types";

interface TranslationFiltersProps {
  namespaces: string[];
}

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "needs_review", label: "Needs review" },
  { value: "reviewed", label: "Reviewed" },
  { value: "published", label: "Published" },
];

const selectClass =
  "h-10 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm font-medium focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60";

export function TranslationFilters({ namespaces }: TranslationFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/admin/translations?${qs}` : "/admin/translations");
  }

  return (
    <div className="card-surface flex flex-wrap items-center gap-3 p-4">
      <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
        Language
        <select
          className={selectClass}
          value={searchParams.get("lang") ?? "en"}
          onChange={(event) => update("lang", event.target.value)}
        >
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {localeLabels[locale as Locale]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
        Namespace
        <select
          className={selectClass}
          value={searchParams.get("namespace") ?? ""}
          onChange={(event) => update("namespace", event.target.value)}
        >
          <option value="">All namespaces</option>
          {namespaces.map((namespace) => (
            <option key={namespace} value={namespace}>
              {namespace}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
        Status
        <select
          className={selectClass}
          value={searchParams.get("status") ?? ""}
          onChange={(event) => update("status", event.target.value)}
        >
          <option value="">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </label>

      <form
        className="ml-auto"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          const input = event.currentTarget.elements.namedItem("q") as HTMLInputElement | null;
          update("q", input?.value ?? "");
        }}
      >
        <input
          type="search"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="Search keys and values…"
          className="h-10 w-full rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60 sm:w-64"
        />
      </form>
    </div>
  );
}
