import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import regions from "@/data/regions";
import cities from "@/data/cities";
import heritageSites from "@/data/heritage";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";
import type { LocalizedString } from "@/types";

export async function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const region = regions.find((item) => item.slug === slug);
  if (!region) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(region.name, safeLocale),
    description: localized(region.geography, safeLocale),
  };
}

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const region = regions.find((item) => item.slug === slug);
  if (!region) notFound();

  const regionCities = cities.filter((c) => region.cities.includes(c.slug));
  const monuments = (region.monuments ?? [])
    .map((mslug) => heritageSites.find((s) => s.slug === mslug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const proseSections: { title: string; body?: LocalizedString }[] = [
    { title: t.geography, body: region.geography },
    { title: t.history, body: region.history },
    { title: t.climate, body: region.climate },
    { title: t.economy, body: region.economy },
    { title: t.culture, body: region.culture },
    { title: t.tourism, body: region.tourism },
    { title: t.food, body: region.food },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.regions}
        title={localized(region.name, locale)}
        description={localized(region.geography, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.nav.regions, href: `/${locale}/regions` },
          { label: localized(region.name, locale), href: `/${locale}/regions/${region.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="prose-moroc min-w-0">
            {proseSections
              .filter((section) => section.body)
              .map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  <p className="whitespace-pre-line">{localized(section.body, locale)}</p>
                </section>
              ))}
          </div>

          <aside className="space-y-4">
            <div className="card-surface p-6">
              <h3 className="font-serif text-lg font-bold">{t.quickFacts}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.capital}</dt>
                  <dd className="font-semibold">{localized(region.capital, locale)}</dd>
                </div>
                {region.population && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.population}</dt>
                    <dd className="font-semibold">
                      {new Intl.NumberFormat(locale).format(region.population)}
                    </dd>
                  </div>
                )}
                {region.areaKm2 && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.area}</dt>
                    <dd className="font-semibold">
                      {new Intl.NumberFormat(locale).format(Math.round(region.areaKm2))} km²
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.location}</dt>
                  <dd className="font-mono text-xs font-semibold">
                    {region.coordinates.lat.toFixed(2)}°, {region.coordinates.lng.toFixed(2)}°
                  </dd>
                </div>
              </dl>

              {region.provinces.length > 0 && (
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                    {region.provinces.length > 1 ? t.provinces : t.province}
                  </h4>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {region.provinces.map((province, index) => (
                      <li key={index} className="chip">
                        {localized(province, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={region.verifiedAt}
                  isSample={region.isSample}
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
          </aside>
        </div>

        {regionCities.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{t.cities}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {regionCities.map((city) => (
                <Link
                  key={city.slug}
                  href={localePath(`/cities/${city.slug}`, locale)}
                  className="chip transition-colors hover:border-[var(--color-moroccan-red)]/40 hover:text-[var(--color-moroccan-red)]"
                >
                  {localized(city.name, locale)}
                  {city.isCapital ? " ★" : ""}
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
