import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import cities from "@/data/cities";
import regions from "@/data/regions";
import heritageSites from "@/data/heritage";
import recipes from "@/data/recipes";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(city.name, safeLocale),
    description: localized(city.description, safeLocale),
  };
}

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const city = cities.find((item) => item.slug === slug);
  if (!city) notFound();

  const region = regions.find((r) => r.slug === city.region);
  const landmarks = (city.landmarks ?? [])
    .map((lslug) => heritageSites.find((s) => s.slug === lslug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const dishes = (city.food ?? [])
    .map((fslug) => recipes.find((r) => r.slug === fslug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const nearby = (city.nearby ?? [])
    .map((nslug) => cities.find((c) => c.slug === nslug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageHeader
        eyebrow={`${t.cities}${region ? ` · ${localized(region.name, locale)}` : ""}`}
        title={localized(city.name, locale)}
        description={localized(city.description, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.citiesTitle, href: `/${locale}/cities` },
          { label: localized(city.name, locale), href: `/${locale}/cities/${city.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="prose-moroc min-w-0">
            {city.history && (
              <>
                <h2>{t.history}</h2>
                <p className="whitespace-pre-line">{localized(city.history, locale)}</p>
              </>
            )}
            {city.traditions && (
              <>
                <h2>{t.culture}</h2>
                <p className="whitespace-pre-line">{localized(city.traditions, locale)}</p>
              </>
            )}
            {city.economy && (
              <>
                <h2>{t.economy}</h2>
                <p className="whitespace-pre-line">{localized(city.economy, locale)}</p>
              </>
            )}
          </div>

          <aside className="space-y-4">
            <div className="card-surface p-6">
              <h3 className="font-serif text-lg font-bold">{t.quickFacts}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {city.isCapital && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.capital}</dt>
                    <dd className="font-semibold">★</dd>
                  </div>
                )}
                {city.population && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.population}</dt>
                    <dd className="font-semibold">
                      {new Intl.NumberFormat(locale).format(city.population)}
                    </dd>
                  </div>
                )}
                {city.founded && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.date}</dt>
                    <dd className="font-semibold">{city.founded}</dd>
                  </div>
                )}
                {city.timezone && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.timezone}</dt>
                    <dd className="font-mono text-xs font-semibold">{city.timezone}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.location}</dt>
                  <dd className="font-mono text-xs font-semibold">
                    {city.coordinates.lat.toFixed(2)}°, {city.coordinates.lng.toFixed(2)}°
                  </dd>
                </div>
                {region && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.region}</dt>
                    <dd>
                      <Link
                        href={localePath(`/regions/${region.slug}`, locale)}
                        className="font-semibold text-[var(--color-moroccan-red)] link-underline"
                      >
                        {localized(region.name, locale)}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={city.verifiedAt}
                  isSample={city.isSample}
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

            <Link
              href={localePath(`/weather?city=${city.slug}`, locale)}
              className="card-surface flex items-center justify-between gap-3 p-5"
            >
              <span className="text-sm font-semibold">{t.weather}</span>
              <ArrowRight className="h-4 w-4 text-[var(--color-muted)] rtl:-scale-x-100" aria-hidden />
            </Link>
          </aside>
        </div>

        {landmarks.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{t.monuments}</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {landmarks.map((site) => (
                <Link
                  key={site.slug}
                  href={localePath(`/heritage/${site.slug}`, locale)}
                  className="card-surface p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-base font-bold leading-tight">
                      {localized(site.name, locale)}
                    </h3>
                    {site.unescoStatus && (
                      <span className="chip shrink-0 bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                        {t.unesco}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
                    {localized(site.summary, locale)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {dishes.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{t.food}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {dishes.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={localePath(`/cuisine/${recipe.slug}`, locale)}
                  className="card-surface flex flex-col items-center gap-2 p-5 text-center"
                >
                  {recipe.emoji && (
                    <span className="text-3xl" aria-hidden>
                      {recipe.emoji}
                    </span>
                  )}
                  <span className="text-sm font-semibold leading-tight">
                    {localized(recipe.name, locale)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {city.museums && city.museums.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{t.overview}</h2>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {city.museums.map((museum, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-[var(--color-muted)]" aria-hidden />
                  {localized(museum, locale)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {nearby.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{t.cities}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {nearby.map((other) => (
                <Link
                  key={other.slug}
                  href={localePath(`/cities/${other.slug}`, locale)}
                  className="chip transition-colors hover:border-[var(--color-moroccan-red)]/40 hover:text-[var(--color-moroccan-red)]"
                >
                  {localized(other.name, locale)}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
