import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { historicalPeriods } from "@/data/history";
import { royalFigures } from "@/data/royal-figures";
import cities from "@/data/cities";
import heritageSites from "@/data/heritage";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";

export async function generateStaticParams() {
  return historicalPeriods.map((period) => ({ slug: period.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const period = historicalPeriods.find((item) => item.slug === slug);
  if (!period) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(period.title, safeLocale),
    description: localized(period.summary, safeLocale),
  };
}

export default async function PeriodDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const period = historicalPeriods.find((item) => item.slug === slug);
  if (!period) notFound();

  const figures = (period.figures ?? [])
    .map((fslug) => royalFigures.find((r) => r.slug === fslug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const periodCities = (period.cities ?? [])
    .map((cslug) => cities.find((c) => c.slug === cslug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const monuments = (period.monuments ?? [])
    .map((mslug) => heritageSites.find((s) => s.slug === mslug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHeader
        eyebrow={`${t.history} · ${period.era}`}
        title={localized(period.title, locale)}
        description={localized(period.summary, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.historyTitle, href: `/${locale}/history` },
          { label: localized(period.title, locale), href: `/${locale}/history/${period.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="prose-moroc min-w-0">
            {period.content && (
              <p className="whitespace-pre-line text-lg first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:float-start first-letter:me-3 first-letter:leading-none">
                {localized(period.content, locale)}
              </p>
            )}

            {period.keyEvents && period.keyEvents.length > 0 && (
              <section className="mt-10">
                <h2>{t.keyEvents}</h2>
                <ol className="mt-4 space-y-3 border-s-2 border-[var(--color-moroccan-red)]/30 ps-6">
                  {period.keyEvents.map((event, index) => (
                    <li key={index} className="relative">
                      <span
                        className="absolute -start-[1.97rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-moroccan-red)] bg-[var(--color-background)]"
                        aria-hidden
                      />
                      <span className="font-mono text-xs font-bold uppercase text-[var(--color-moroccan-red)]">
                        {event.year}
                      </span>
                      <p className="text-sm text-[var(--color-muted)]">
                        {localized(event.title, locale)}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            <div className="card-surface p-6">
              <h3 className="font-serif text-lg font-bold">{t.quickFacts}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.date}</dt>
                  <dd className="font-mono text-xs font-semibold">
                    {localized(period.dateLabel, locale)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.category}</dt>
                  <dd className="font-semibold">{period.era}</dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={period.verifiedAt}
                  isSample={period.isSample}
                  labels={{
                    verified: dict.verification.verified,
                    outdated: dict.verification.outdated,
                    needsReview: dict.verification.needsReview,
                    daysAgo: (days: number) =>
                      dict.verification.daysAgo.replace("{days}", String(days)),
                    sample: t.sampleContent,
                  }}
                />
              </div>
            </div>

            {figures.length > 0 && (
              <div className="card-surface p-6">
                <h3 className="font-serif text-lg font-bold">{t.figures}</h3>
                <ul className="mt-3 space-y-2">
                  {figures.map((figure) => (
                    <li key={figure.slug}>
                      <Link
                        href={localePath(`/monarchy/${figure.slug}`, locale)}
                        className="text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
                      >
                        {localized(figure.name, locale)}
                      </Link>
                      {figure.reignStart && (
                        <span className="ms-2 font-mono text-xs text-[var(--color-muted)]">
                          {figure.reignStart}–{figure.reignEnd ?? t.currentMonarch.toLowerCase()}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {periodCities.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{t.cities}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {periodCities.map((city) => (
                <Link
                  key={city.slug}
                  href={localePath(`/cities/${city.slug}`, locale)}
                  className="chip transition-colors hover:border-[var(--color-moroccan-red)]/40 hover:text-[var(--color-moroccan-red)]"
                >
                  {localized(city.name, locale)}
                </Link>
              ))}
            </div>
          </section>
        )}

        {monuments.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{t.monuments}</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {monuments.map((site) => (
                <Link
                  key={site.slug}
                  href={localePath(`/heritage/${site.slug}`, locale)}
                  className="card-surface p-5"
                >
                  <h3 className="font-serif text-base font-bold leading-tight">
                    {localized(site.name, locale)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
                    {localized(site.summary, locale)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
