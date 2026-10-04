import type { Metadata } from "next";
import Link from "next/link";
import { Crown } from "lucide-react";
import { dynasties } from "@/data/dynasties";
import { royalFigures } from "@/data/royal-figures";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.monarchyTitle,
    description: dict.page.monarchySubtitle,
  };
}

export default async function MonarchyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const ordered = [...dynasties].sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0));
  const current = royalFigures.find((r) => r.isCurrent);

  return (
    <>
      <PageHeader
        eyebrow={t.monarchy}
        title={dict.page.monarchyTitle}
        description={dict.page.monarchySubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.monarchyTitle, href: `/${locale}/monarchy` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        {current && (
          <section className="mb-12">
            <Link
              href={localePath(`/monarchy/${current.slug}`, locale)}
              className="card-surface group flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]">
                <Crown className="h-8 w-8" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold leading-tight">
                    {localized(current.name, locale)}
                  </h2>
                  <span className="chip bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                    {t.currentMonarch}
                  </span>
                </span>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">
                  {localized(current.title, locale)} · {t.reign} {current.reignStart}–
                  {current.reignEnd ?? ""}
                </span>
                <span className="mt-2 line-clamp-2 block text-sm text-[var(--color-muted)]">
                  {localized(current.summary, locale)}
                </span>
              </span>
            </Link>
          </section>
        )}

        <h2 className="font-serif text-2xl font-bold tracking-tight">{t.dynasties}</h2>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {ordered.map((dynasty) => {
            const monarchs = dynasty.monarchs
      .map((mslug) => royalFigures.find((r) => r.slug === mslug))
      .filter((r): r is NonNullable<typeof r> => Boolean(r));
            return (
              <Link
                key={dynasty.slug}
                href={localePath(`/monarchy/${dynasty.slug}`, locale)}
                className="card-surface flex flex-col p-6"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {localized(dynasty.name, locale)}
                  </h3>
                  <span className="font-mono text-xs font-bold text-[var(--color-moroccan-red)]">
                    {localized(dynasty.dateLabel, locale)}
                  </span>
                </div>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {localized(dynasty.summary, locale)}
                </p>
                {dynasty.capitals && dynasty.capitals.length > 0 && (
                  <p className="mt-3 text-xs font-semibold text-[var(--color-muted)]">
                    {t.capital}: {dynasty.capitals.map((c) => localized(c, locale)).join(", ")}
                  </p>
                )}
                <p className="mt-2 text-xs font-semibold">
                  {t.monarchs}: <span className="text-[var(--color-muted)]">{monarchs.length}</span>
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
