import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import cities from "@/data/cities";
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
    title: dict.page.citiesTitle,
    description: dict.page.citiesSubtitle,
  };
}

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const sorted = [...cities].sort((a, b) => (b.isCapital ? 1 : 0) - (a.isCapital ? 1 : 0));

  return (
    <>
      <PageHeader
        eyebrow={t.cities}
        title={dict.page.citiesTitle}
        description={dict.page.citiesSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.citiesTitle, href: `/${locale}/cities` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sorted.map((city) => (
            <Link
              key={city.slug}
              href={localePath(`/cities/${city.slug}`, locale)}
              className="card-surface group relative overflow-hidden p-6"
            >
              <span
                className="pointer-events-none absolute -end-6 -top-6 font-serif text-[5rem] font-bold leading-none text-[var(--color-surface-3)] transition-colors group-hover:text-[var(--color-moroccan-red-soft)]"
                aria-hidden
              >
                {city.isCapital ? "★" : localized(city.name, locale).charAt(0)}
              </span>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold leading-tight">
                    {localized(city.name, locale)}
                  </h3>
                  {city.isCapital && (
                    <span className="chip bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                      {t.capital}
                    </span>
                  )}
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-muted)]">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {city.coordinates.lat.toFixed(2)}°, {city.coordinates.lng.toFixed(2)}°
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-[var(--color-muted)]">
                  {localized(city.description, locale)}
                </p>
                {city.population && (
                  <p className="mt-3 text-xs font-semibold">
                    {t.population}:{" "}
                    <span className="text-[var(--color-muted)]">
                      {new Intl.NumberFormat(locale).format(city.population)}
                    </span>
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
