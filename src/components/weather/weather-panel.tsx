"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Wind,
  Droplets,
  ArrowDownToLine,
  Sunrise,
  Sunset,
  Thermometer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

type IconName =
  | "sun"
  | "cloud-sun"
  | "cloud"
  | "cloud-fog"
  | "cloud-drizzle"
  | "cloud-rain"
  | "cloud-snow"
  | "cloud-lightning";

const ICONS: Record<IconName, typeof Sun> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  cloud: Cloud,
  "cloud-fog": CloudFog,
  "cloud-drizzle": CloudDrizzle,
  "cloud-rain": CloudRain,
  "cloud-snow": CloudSnow,
  "cloud-lightning": CloudLightning,
};

interface WeatherCondition {
  labelKey: string;
  icon: IconName;
}

interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  condition: WeatherCondition;
}

interface HourlyPoint {
  time: string;
  temperature: number;
  condition: WeatherCondition;
  precipitationProbability: number;
}

interface DailyPoint {
  time: string;
  condition: WeatherCondition;
  max: number;
  min: number;
  sunrise: string;
  sunset: string;
  precipitationProbability: number;
}

interface WeatherData {
  city?: string;
  cityName?: string;
  locale: string;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  fetchedAt: string;
}

interface WeatherPanelProps {
  locale: Locale;
  cityOptions: { slug: string; name: string }[];
  defaultCity?: string;
  labels: {
    now: string;
    feelsLike: string;
    humidity: string;
    wind: string;
    precipitation: string;
    sunrise: string;
    sunset: string;
    hourly: string;
    daily: string;
    searchCity: string;
    conditions: string;
    maxTemp: string;
    minTemp: string;
    unavailable: string;
    unavailableHint: string;
  };
}

export function WeatherPanel({
  locale,
  cityOptions,
  defaultCity,
  labels,
}: WeatherPanelProps) {
  const [city, setCity] = useState(defaultCity ?? cityOptions[0]?.slug ?? "");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (slug: string) => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(slug)}&locale=${locale}`);
        if (!res.ok) throw new Error("weather-unavailable");
        const json = (await res.json()) as WeatherData;
        setData(json);
      } catch {
        setError(labels.unavailableHint);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [locale, labels.unavailableHint],
  );

  useEffect(() => {
    void load(city);
  }, [city, load]);

  const localeTag = { ar: "ar-MA", tz: "zgh-MA", fr: "fr-MA", en: "en-US", es: "es-ES" }[locale];

  const formatHour = (iso: string) =>
    new Intl.DateTimeFormat(localeTag, { hour: "numeric" }).format(new Date(iso));

  const formatDay = (iso: string) =>
    new Intl.DateTimeFormat(localeTag, { weekday: "short", day: "numeric" }).format(new Date(iso));

  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat(localeTag, { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

  return (
    <div className="space-y-6">
      <div className="card-surface flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
            {labels.searchCity}
          </span>
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="h-10 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            {cityOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        {data?.timezone && (
          <span className="font-mono text-xs text-[var(--color-muted)]">{data.timezone}</span>
        )}
      </div>

      {loading && (
        <div className="card-surface flex items-center justify-center gap-3 p-10 text-sm text-[var(--color-muted)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-moroccan-red)] border-t-transparent" />
          {labels.conditions}…
        </div>
      )}

      {error && !loading && (
        <div className="card-surface flex flex-col items-center gap-2 p-10 text-center">
          <p className="font-serif text-lg font-bold">{labels.unavailable}</p>
          <p className="text-sm text-[var(--color-muted)]">{error}</p>
        </div>
      )}

      {data && !loading && !error && (
        <>
          <div className="card-surface flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {(() => {
                const Icon = ICONS[data.current.condition.icon] ?? Sun;
                return (
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                    <Icon className="h-8 w-8" aria-hidden />
                  </span>
                );
              })()}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {labels.now}
                </p>
                <p className="font-serif text-4xl font-bold leading-none">
                  {Math.round(data.current.temperature_2m)}°C
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-muted)]">
                  {data.current.condition.labelKey.replace(/_/g, " ")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              <Metric
                icon={Thermometer}
                label={labels.feelsLike}
                value={`${Math.round(data.current.apparent_temperature)}°`}
              />
              <Metric
                icon={Droplets}
                label={labels.humidity}
                value={`${data.current.relative_humidity_2m}%`}
              />
              <Metric
                icon={Wind}
                label={labels.wind}
                value={`${Math.round(data.current.wind_speed_10m)} km/h`}
              />
              <Metric
                icon={ArrowDownToLine}
                label={labels.precipitation}
                value={`${data.current.precipitation} mm`}
              />
              <Metric
                icon={Sunrise}
                label={labels.sunrise}
                value={formatTime(data.daily[0]?.sunrise ?? data.current.time)}
              />
              <Metric
                icon={Sunset}
                label={labels.sunset}
                value={formatTime(data.daily[0]?.sunset ?? data.current.time)}
              />
            </div>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-serif text-lg font-bold">{labels.hourly}</h3>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {data.hourly.map((point, index) => {
                const Icon = ICONS[point.condition.icon] ?? Sun;
                return (
                  <div
                    key={index}
                    className="flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-xl bg-[var(--color-surface-2)] py-3"
                  >
                    <span className="text-[10px] font-bold text-[var(--color-muted)]">
                      {formatHour(point.time)}
                    </span>
                    <Icon className="h-5 w-5 text-[var(--color-gold-dark)]" aria-hidden />
                    <span className="text-sm font-semibold">{Math.round(point.temperature)}°</span>
                    {point.precipitationProbability > 0 && (
                      <span className="text-[9px] text-[var(--color-pin-river)]">
                        {point.precipitationProbability}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-serif text-lg font-bold">{labels.daily}</h3>
            <ul className="mt-4 divide-y divide-[var(--color-border)]">
              {data.daily.map((day, index) => {
                const Icon = ICONS[day.condition.icon] ?? Sun;
                return (
                  <li key={index} className="flex items-center gap-4 py-3">
                    <span className="w-16 shrink-0 text-xs font-bold">{formatDay(day.time)}</span>
                    <Icon className="h-5 w-5 shrink-0 text-[var(--color-gold-dark)]" aria-hidden />
                    <span className="flex-1 text-xs text-[var(--color-muted)]">
                      {day.condition.labelKey.replace(/_/g, " ")}
                    </span>
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <span className="text-[var(--color-pin-river)]">
                        {Math.round(day.min)}°
                      </span>
                      <span className="text-[var(--color-muted)]">/</span>
                      <span>{Math.round(day.max)}°</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sun;
  label: string;
  value: string;
}) {
  return (
    <div className={cn("flex items-center gap-2")}>
      <Icon className="h-4 w-4 shrink-0 text-[var(--color-muted)]" aria-hidden />
      <span className="text-xs">
        <span className="block text-[var(--color-muted)]">{label}</span>
        <span className="font-semibold">{value}</span>
      </span>
    </div>
  );
}
