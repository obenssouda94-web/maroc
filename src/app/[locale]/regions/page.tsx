import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import regions from "@/data/regions";
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
    title: dict.nav.regions,
    description: dict.home.mapSubtitle,
  };
}

export default async function RegionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const sorted = [...regions].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow={t.regions}
        title={dict.nav.regions}
        description={dict.home.mapSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.nav.regions, href: `/${locale}/regions` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sorted.map((region) => {
            const cityCount = cities.filter((c) => c.region === region.slug).length;
            return (
              <Link
                key={region.slug}
                href={localePath(`/regions/${region.slug}`, locale)}
                className="card-surface group flex flex-col p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-xl font-bold leading-tight">
                    {localized(region.name, locale)}
                  </h3>
                  {region.code && (
                    <span className="font-mono text-xs font-bold text-[var(--color-muted)]">
                      {region.code}
                    </span>
                  )}
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {t.capital}: {localized(region.capital, locale)}
                </p>
                <div className="mt-4 flex flex-1 flex-wrap gap-2 text-xs text-[var(--color-muted)]">
                  {region.population && (
                    <span className="chip">
                      {t.population}: {new Intl.NumberFormat(locale).format(region.population)}
                    </span>
                  )}
                  {region.areaKm2 && (
                    <span className="chip">
                      {t.area}: {new Intl.NumberFormat(locale).format(Math.round(region.areaKm2))} km²
                    </span>
                  )}
                  <span className="chip">
                    {t.cities}: {cityCount}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
