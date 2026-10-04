import type { Metadata } from "next";
import cities from "@/data/cities";
import { WeatherPanel } from "@/components/weather/weather-panel";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.weatherTitle,
    description: dict.page.weatherSubtitle,
  };
}

export default async function WeatherPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ city?: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const { city } = await searchParams;
  const t = dict.common;

  const cityOptions = cities.map((item) => ({
    slug: item.slug,
    name: localized(item.name, locale),
  }));

  return (
    <>
      <PageHeader
        eyebrow={t.weather}
        title={dict.page.weatherTitle}
        description={dict.page.weatherSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.weatherTitle, href: `/${locale}/weather` },
        ]}
      />

      <section className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <WeatherPanel
            locale={locale}
            cityOptions={cityOptions}
            defaultCity={city}
            labels={{
              now: dict.weather.now,
              feelsLike: dict.weather.feelsLike,
              humidity: dict.weather.humidity,
              wind: dict.weather.wind,
              precipitation: dict.weather.precipitation,
              sunrise: dict.weather.sunrise,
              sunset: dict.weather.sunset,
              hourly: dict.weather.hourly,
              daily: dict.weather.daily,
              searchCity: dict.weather.searchCity,
              conditions: dict.weather.conditions,
              maxTemp: dict.weather.maxTemp,
              minTemp: dict.weather.minTemp,
              unavailable: dict.weather.unavailable,
              unavailableHint: dict.weather.unavailableHint,
            }}
          />
        </div>
      </section>
    </>
  );
}
