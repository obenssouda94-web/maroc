"use client";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import Link from "next/link";
import { cn, localePath } from "@/lib/utils";
import type { Locale } from "@/types";

export interface MapCityPoint {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  isCapital?: boolean;
}

export interface MapHeritagePoint {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  unesco?: boolean;
}

export interface MapPOIPoint {
  id: string;
  name: string;
  type: "mountain" | "river" | "beach" | "museum" | "cultural" | "historical";
  lat: number;
  lng: number;
  description?: string;
  href?: string;
}

export interface MapRegionPoint {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  capital?: string;
}

export interface MoroccoMapProps {
  locale: Locale;
  cities: MapCityPoint[];
  heritage: MapHeritagePoint[];
  pois: MapPOIPoint[];
  regions: MapRegionPoint[];
  tileUrl: string;
  labels: {
    layers: string;
    layerRegions: string;
    layerCities: string;
    layerHistorical: string;
    layerUnesco: string;
    layerMountains: string;
    layerRivers: string;
    layerBeaches: string;
    layerMuseums: string;
    layerCultural: string;
    legend: string;
    readMore: string;
  };
  className?: string;
}

const TYPE_COLOR: Record<MapPOIPoint["type"], string> = {
  mountain: "var(--color-pin-mountain)",
  river: "var(--color-pin-river)",
  beach: "var(--color-pin-beach)",
  museum: "var(--color-pin-museum)",
  cultural: "var(--color-pin-cultural)",
  historical: "var(--color-pin-historical)",
};

type LayerKey =
  | "regions"
  | "cities"
  | "unesco"
  | "mountains"
  | "rivers"
  | "beaches"
  | "museums"
  | "cultural"
  | "historical";

const POI_LAYER: Record<MapPOIPoint["type"], LayerKey> = {
  mountain: "mountains",
  river: "rivers",
  beach: "beaches",
  museum: "museums",
  cultural: "cultural",
  historical: "historical",
};

export function MoroccoMap({
  locale,
  cities,
  heritage,
  pois,
  regions,
  tileUrl,
  labels,
  className,
}: MoroccoMapProps) {
  const [active, setActive] = useState<Record<LayerKey, boolean>>({
    regions: true,
    cities: true,
    unesco: true,
    mountains: true,
    rivers: false,
    beaches: false,
    museums: false,
    cultural: false,
    historical: true,
  });

  const toggle = (key: LayerKey) =>
    setActive((current) => ({ ...current, [key]: !current[key] }));

  const layerConfig: { key: LayerKey; label: string; color: string }[] = [
    { key: "regions", label: labels.layerRegions, color: "var(--color-pin-region)" },
    { key: "cities", label: labels.layerCities, color: "var(--color-pin-city)" },
    { key: "unesco", label: labels.layerUnesco, color: "var(--color-pin-unesco)" },
    { key: "historical", label: labels.layerHistorical, color: "var(--color-pin-historical)" },
    { key: "mountains", label: labels.layerMountains, color: "var(--color-pin-mountain)" },
    { key: "rivers", label: labels.layerRivers, color: "var(--color-pin-river)" },
    { key: "beaches", label: labels.layerBeaches, color: "var(--color-pin-beach)" },
    { key: "museums", label: labels.layerMuseums, color: "var(--color-pin-museum)" },
    { key: "cultural", label: labels.layerCultural, color: "var(--color-pin-cultural)" },
  ];

  const visiblePois = pois.filter((poi) => active[POI_LAYER[poi.type]]);

  return (
    <div className={cn("relative h-[70vh] min-h-[28rem] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]", className)}>
      <MapContainer
        center={[31.2, -7.3]}
        zoom={6}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer url={tileUrl} />
        <ZoomControl position="bottomright" />

        {active.regions &&
          regions.map((region) => (
            <CircleMarker
              key={`region-${region.slug}`}
              center={[region.lat, region.lng]}
              radius={11}
              pathOptions={{
                color: "var(--color-pin-region)",
                fillColor: "var(--color-pin-region)",
                fillOpacity: 0.18,
                weight: 2,
              }}
              eventHandlers={{ click: () => {} }}
            >
              <Popup>
                <strong>{region.name}</strong>
                {region.capital && (
                  <div className="text-xs opacity-75">Capital: {region.capital}</div>
                )}
                <div className="mt-1">
                  <Link
                    href={localePath(`/regions/${region.slug}`, locale)}
                    className="text-xs font-semibold text-[var(--color-moroccan-red)]"
                  >
                    {labels.readMore} →
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {active.cities &&
          cities.map((city) => (
            <CircleMarker
              key={`city-${city.slug}`}
              center={[city.lat, city.lng]}
              radius={city.isCapital ? 8 : 5.5}
              pathOptions={{
                color: "var(--color-pin-city)",
                fillColor: "var(--color-pin-city)",
                fillOpacity: city.isCapital ? 0.95 : 0.75,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{city.name}</strong>
                {city.isCapital && <div className="text-xs opacity-75">★ Capital</div>}
                <div className="mt-1">
                  <Link
                    href={localePath(`/cities/${city.slug}`, locale)}
                    className="text-xs font-semibold text-[var(--color-moroccan-red)]"
                  >
                    {labels.readMore} →
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {active.unesco &&
          heritage.map((site) => (
            <CircleMarker
              key={`heritage-${site.slug}`}
              center={[site.lat, site.lng]}
              radius={6.5}
              pathOptions={{
                color: "var(--color-pin-unesco)",
                fillColor: "var(--color-pin-unesco)",
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{site.name}</strong>
                <div className="text-xs opacity-75">UNESCO</div>
                <div className="mt-1">
                  <Link
                    href={localePath(`/heritage/${site.slug}`, locale)}
                    className="text-xs font-semibold text-[var(--color-moroccan-red)]"
                  >
                    {labels.readMore} →
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {visiblePois.map((poi) => (
          <CircleMarker
            key={`poi-${poi.id}`}
            center={[poi.lat, poi.lng]}
            radius={5}
            pathOptions={{
              color: TYPE_COLOR[poi.type],
              fillColor: TYPE_COLOR[poi.type],
              fillOpacity: 0.8,
              weight: 1.5,
            }}
          >
            <Popup>
              <strong>{poi.name}</strong>
              <div className="text-[10px] uppercase tracking-wide opacity-75">{poi.type}</div>
              {poi.description && (
                <p className="mt-1 max-w-[16rem] text-xs opacity-85">{poi.description}</p>
              )}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="absolute start-3 top-3 z-[500] w-56 max-w-[calc(100%-1.5rem)] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-3 shadow-[var(--shadow-lift)] backdrop-blur-sm">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
          {labels.layers}
        </p>
        <ul className="space-y-1">
          {layerConfig.map((layer) => (
            <li key={layer.key}>
              <button
                type="button"
                onClick={() => toggle(layer.key)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                  active[layer.key]
                    ? "bg-[var(--color-surface-2)] text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]",
                )}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border"
                  style={{ backgroundColor: active[layer.key] ? layer.color : "transparent", borderColor: layer.color }}
                  aria-hidden
                />
                {layer.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
