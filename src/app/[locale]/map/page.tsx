import type { Metadata } from "next";
import cities from "@/data/cities";
import regions from "@/data/regions";
import heritageSites from "@/data/heritage";
import { mapPOIsList } from "@/data/map-pois";
import { PageHeader } from "@/components/common/section-heading";
import { MapLoader } from "@/components/map/map-loader";
import { localeBundle } from "@/lib/content";
import { localized } from "@/lib/utils";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.mapTitle,
    description: dict.page.mapSubtitle,
  };
}

function resolveTileUrl(): string {
  const styled = process.env.NEXT_PUBLIC_MAP_STYLE_URL;
  const keyed = process.env.NEXT_PUBLIC_MAP_API_KEY;
  if (styled) return keyed ? `${styled}${styled.includes("?") ? "&" : "?"}key=${keyed}` : styled;
  return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;

  const cityPoints = cities.map((city) => ({
    slug: city.slug,
    name: localized(city.name, locale),
    lat: city.coordinates.lat,
    lng: city.coordinates.lng,
    isCapital: city.isCapital,
  }));

  const regionPoints = regions.map((region) => ({
    slug: region.slug,
    name: localized(region.name, locale),
    lat: region.coordinates.lat,
    lng: region.coordinates.lng,
    capital: region.capital ? localized(region.capital, locale) : undefined,
  }));

  const heritagePoints = heritageSites
    .filter((site) => site.unescoStatus && site.coordinates)
    .map((site) => ({
      slug: site.slug,
      name: localized(site.name, locale),
      lat: site.coordinates!.lat,
      lng: site.coordinates!.lng,
      unesco: site.unescoStatus,
    }));

  const poiPoints = mapPOIsList.map((poi) => ({
    id: poi.id,
    name: localized(poi.name, locale),
    type: poi.type,
    lat: poi.coordinates.lat,
    lng: poi.coordinates.lng,
    description: poi.description ? localized(poi.description, locale) : undefined,
  }));

  return (
    <>
      <PageHeader
        eyebrow={t.map}
        title={dict.page.mapTitle}
        description={dict.page.mapSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.mapTitle, href: `/${locale}/map` },
        ]}
      />

      <section className="container-page py-12 sm:py-16">
        <MapLoader
          locale={locale as Locale}
          cities={cityPoints}
          heritage={heritagePoints}
          pois={poiPoints}
          regions={regionPoints}
          tileUrl={resolveTileUrl()}
          labels={{
            layers: dict.map.layers,
            layerRegions: dict.map.layerRegions,
            layerCities: dict.map.layerCities,
            layerHistorical: dict.map.layerHistorical,
            layerUnesco: dict.map.layerUnesco,
            layerMountains: dict.map.layerMountains,
            layerRivers: dict.map.layerRivers,
            layerBeaches: dict.map.layerBeaches,
            layerMuseums: dict.map.layerMuseums,
            layerCultural: dict.map.layerCultural,
            legend: dict.map.legend,
            readMore: t.readMore,
          }}
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {regionPoints.slice(0, 12).map((region) => (
            <a
              key={region.slug}
              href={`/${locale}/regions/${region.slug}`}
              className="card-surface p-4"
            >
              <span className="block font-serif text-sm font-bold leading-tight">
                {region.name}
              </span>
              {region.capital && (
                <span className="mt-0.5 block text-xs text-[var(--color-muted)]">
                  {region.capital}
                </span>
              )}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
