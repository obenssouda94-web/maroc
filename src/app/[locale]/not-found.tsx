import Link from "next/link";
import { isValidLocale, getDictionary } from "@/i18n/server";
import { defaultLocale } from "@/i18n/config";
import type { Locale } from "@/types";

export default async function LocaleNotFound({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  // During build-time prerendering the not-found boundary is rendered without
  // segment params; fall back to the default locale in that case.
  const rawLocale = params ? (await params).locale : undefined;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale).common;

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-zellige-dense px-6 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/40 via-[var(--color-background)]/60 to-[var(--color-background)]" />
      <div className="relative">
        <p className="font-serif text-[7rem] font-bold leading-none text-gradient-flag sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 font-serif text-2xl font-bold tracking-tight sm:text-3xl">
          {t.notFound}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-muted)]">
          {t.notFoundText}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-moroccan-red)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-moroccan-red-dark)]"
          >
            {t.goHome}
          </Link>
          <Link
            href={`/${locale}/search`}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--color-surface-2)]"
          >
            {t.search}
          </Link>
        </div>
      </div>
    </div>
  );
}
