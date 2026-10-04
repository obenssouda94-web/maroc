import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { historicalPeriods } from "@/data/history";
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
    title: dict.page.historyTitle,
    description: dict.page.historySubtitle,
  };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const periods = [...historicalPeriods].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      <PageHeader
        eyebrow={t.history}
        title={dict.page.historyTitle}
        description={dict.page.historySubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.historyTitle, href: `/${locale}/history` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="relative">
          <div
            className="absolute start-2 top-0 h-full w-px bg-gradient-to-b from-[var(--color-moroccan-red)]/60 via-[var(--color-gold)]/40 to-transparent sm:start-4"
            aria-hidden
          />
          <ol className="space-y-4">
            {periods.map((period) => (
              <li key={period.slug} className="relative ps-8 sm:ps-12">
                <span
                  className="absolute start-0 top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-moroccan-red)] bg-[var(--color-background)] sm:start-2"
                  aria-hidden
                />
                <Link
                  href={localePath(`/history/${period.slug}`, locale)}
                  className="card-surface flex flex-col gap-1.5 p-5 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="w-full shrink-0 font-mono text-xs font-bold uppercase tracking-wide text-[var(--color-moroccan-red)] sm:w-40">
                    {localized(period.dateLabel, locale)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-lg font-bold leading-tight">
                      {localized(period.title, locale)}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-[var(--color-muted)]">
                      {localized(period.summary, locale)}
                    </span>
                  </span>
                  <span className="hidden items-center gap-2 sm:flex">
                    <span className="chip">{period.era}</span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-[var(--color-muted)] rtl:-scale-x-100" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
