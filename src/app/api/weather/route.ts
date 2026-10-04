import { NextResponse, type NextRequest } from "next/server";
import cities from "@/data/cities";
import { localized } from "@/lib/utils";
import type { Locale } from "@/types";
import { isValidLocale } from "@/i18n/server";
import { defaultLocale } from "@/i18n/config";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

const WEATHER_CODE_MAP: Record<number, { labelKey: string; icon: string }> = {
  0: { labelKey: "clear", icon: "sun" },
  1: { labelKey: "mainly_clear", icon: "sun" },
  2: { labelKey: "partly_cloudy", icon: "cloud-sun" },
  3: { labelKey: "overcast", icon: "cloud" },
  45: { labelKey: "fog", icon: "cloud-fog" },
  48: { labelKey: "fog", icon: "cloud-fog" },
  51: { labelKey: "drizzle", icon: "cloud-drizzle" },
  53: { labelKey: "drizzle", icon: "cloud-drizzle" },
  55: { labelKey: "drizzle", icon: "cloud-drizzle" },
  56: { labelKey: "freezing_drizzle", icon: "cloud-drizzle" },
  57: { labelKey: "freezing_drizzle", icon: "cloud-drizzle" },
  61: { labelKey: "rain", icon: "cloud-rain" },
  63: { labelKey: "rain", icon: "cloud-rain" },
  65: { labelKey: "heavy_rain", icon: "cloud-rain" },
  66: { labelKey: "freezing_rain", icon: "cloud-rain" },
  67: { labelKey: "freezing_rain", icon: "cloud-rain" },
  71: { labelKey: "snow", icon: "cloud-snow" },
  73: { labelKey: "snow", icon: "cloud-snow" },
  75: { labelKey: "heavy_snow", icon: "cloud-snow" },
  77: { labelKey: "snow_grains", icon: "cloud-snow" },
  80: { labelKey: "showers", icon: "cloud-rain" },
  81: { labelKey: "showers", icon: "cloud-rain" },
  82: { labelKey: "heavy_showers", icon: "cloud-rain" },
  85: { labelKey: "snow_showers", icon: "cloud-snow" },
  86: { labelKey: "heavy_snow_showers", icon: "cloud-snow" },
  95: { labelKey: "thunderstorm", icon: "cloud-lightning" },
  96: { labelKey: "thunderstorm_hail", icon: "cloud-lightning" },
  99: { labelKey: "thunderstorm_hail", icon: "cloud-lightning" },
};

function describeCode(code: number) {
  return WEATHER_CODE_MAP[code] ?? { labelKey: "unknown", icon: "cloud" };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawLocale = searchParams.get("locale");
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  let lat: number;
  let lng: number;
  let citySlug: string | undefined;
  let cityName: string | undefined;

  const cityParam = searchParams.get("city");
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  if (cityParam) {
    const city = cities.find((c) => c.slug === cityParam);
    if (!city) {
      return NextResponse.json(
        { error: "Unknown city", message: `No city matches slug "${cityParam}".` },
        { status: 404 },
      );
    }
    lat = city.coordinates.lat;
    lng = city.coordinates.lng;
    citySlug = city.slug;
    cityName = localized(city.name, locale);
  } else if (latParam && lngParam) {
    const parsedLat = Number.parseFloat(latParam);
    const parsedLng = Number.parseFloat(lngParam);
    if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng)) {
      return NextResponse.json(
        { error: "Invalid coordinates", message: "lat and lng must be numeric." },
        { status: 400 },
      );
    }
    lat = parsedLat;
    lng = parsedLng;
  } else {
    return NextResponse.json(
      { error: "Missing parameters", message: "Provide either ?city=<slug> or ?lat&lng." },
      { status: 400 },
    );
  }

  const url =
    `${OPEN_METEO_URL}?latitude=${lat.toFixed(3)}&longitude=${lng.toFixed(3)}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&hourly=temperature_2m,weather_code,precipitation_probability` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max` +
    `&timezone=auto&forecast_days=7&wind_speed_unit=kmh&temperature_unit=celsius`;

  try {
    const response = await fetch(url, { next: { revalidate: 600 } });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Weather service unavailable", message: "The weather provider returned an error." },
        { status: 502 },
      );
    }
    const data = (await response.json()) as {
      current: {
        time: string;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        precipitation: number;
        weather_code: number;
        wind_speed_10m: number;
      };
      hourly: {
        time: string[];
        temperature_2m: number[];
        weather_code: number[];
        precipitation_probability: number[];
      };
      daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
        precipitation_probability_max: number[];
      };
      timezone: string;
    };

    const current = {
      ...data.current,
      condition: describeCode(data.current.weather_code),
    };

    const hourly = data.hourly.time
      .map((time, index) => ({
        time,
        temperature: data.hourly.temperature_2m[index],
        condition: describeCode(data.hourly.weather_code[index]),
        precipitationProbability: data.hourly.precipitation_probability[index],
      }))
      .filter((_, index) => index % 2 === 0)
      .slice(0, 12);

    const daily = data.daily.time.map((time, index) => ({
      time,
      condition: describeCode(data.daily.weather_code[index]),
      max: data.daily.temperature_2m_max[index],
      min: data.daily.temperature_2m_min[index],
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
      precipitationProbability: data.daily.precipitation_probability_max[index],
    }));

    return NextResponse.json({
      city: citySlug,
      cityName,
      locale,
      timezone: data.timezone,
      current,
      hourly,
      daily,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Weather service unavailable", message: "Could not reach the weather service." },
      { status: 502 },
    );
  }
}
