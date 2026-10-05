import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, CalendarDays } from "lucide-react";
import { isValidLocale, getDictionary } from "@/i18n/server";
import { defaultLocale } from "@/i18n/config";
import { localePath, localized, formatDate } from "@/lib/utils";
import type { Locale } from "@/types";
import { Hero } from "@/components/sections/hero";
import { SymbolsAnthem } from "@/components/sections/symbols-anthem";
import { StatsGrid } from "@/components/sections/stats-grid";
import { GatewayGrid } from "@/components/sections/gateway-grid";
import { historicalPeriods } from "@/data/history";
import cities from "@/data/cities";
import heritageSites from "@/data/heritage";
import recipes from "@/data/recipes";
import { dynasties } from "@/data/dynasties";
import { royalFigures } from "@/data/royal-figures";
import { eventsList } from "@/data/events";
import { cultureTopics } from "@/data/culture";
import { amazighTopics } from "@/data/amazigh";
import { VerificationBadge } from "@/components/common/verification-badge";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.home;
  const tc = dict.common;

  const majorCities = cities.filter((c) => c.isMajor).slice(0, 6);
  const unescoSites = heritageSites.filter((h) => h.unescoStatus).slice(0, 6);
  const featuredRecipes = recipes.filter((r) => r.emoji).slice(0, 6);
  const currentMonarch = royalFigures.find((r) => r.isCurrent);
  const periods = [...historicalPeriods].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const now = new Date();
  const upcoming = eventsList
    .filter((e) => new Date(e.endISO ?? e.startISO) >= now)
    .slice(0, 4);
  const featuredTopics = [...cultureTopics, ...amazighTopics].slice(0, 4);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <SymbolsAnthem locale={locale} dict={dict} />
      <StatsGrid dict={dict} />
      <GatewayGrid locale={locale} dict={dict} />

      {/* Timeline preview ------------------------------------------------- */}
      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
              {tc.history}
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {t.timelineTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {t.timelineSubtitle}
            </p>
          </div>
          <Link
            href={localePath("/history", locale)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
          >
            {tc.viewAll}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute start-2 top-0 h-full w-px bg-gradient-to-b from-[var(--color-moroccan-red)]/60 via-[var(--color-gold)]/40 to-transparent sm:start-4" aria-hidden />
          <ol className="space-y-4">
            {periods.slice(0, 6).map((period) => (
              <li key={period.slug} className="relative ps-8 sm:ps-12">
                <span className="absolute start-0 top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-moroccan-red)] bg-[var(--color-background)] sm:start-2" aria-hidden />
                <Link
                  href={localePath(`/history/${period.slug}`, locale)}
                  className="card-surface flex flex-col gap-1.5 p-5 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="w-full shrink-0 font-mono text-xs font-bold uppercase tracking-wide text-[var(--color-moroccan-red)] sm:w-40">
                    {localized(period.dateLabel, locale)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-lg font-bold leading-tight">
                      {localized(period.title, locale)}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-[var(--color-muted)]">
                      {localized(period.summary, locale)}
                    </span>
                  </span>
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-[var(--color-muted)] sm:block rtl:-scale-x-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Monarchy preview -------------------------------------------------- */}
      <section className="bg-zellige border-y border-[var(--color-border)] py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
                {tc.monarchy}
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                {t.monarchTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
                {t.monarchSubtitle}
              </p>

              {currentMonarch && (
                <Link
                  href={localePath(`/monarchy/${currentMonarch.slug}`, locale)}
                  className="card-surface mt-6 flex items-center gap-4 p-5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-moroccan-red-soft)] text-2xl font-serif font-bold text-[var(--color-moroccan-red)]">
                    {localized(currentMonarch.name, locale).charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="block font-serif text-lg font-bold">
                        {localized(currentMonarch.name, locale)}
                      </span>
                      <span className="chip">{tc.currentMonarch}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-[var(--color-muted)]">
                      {localized(currentMonarch.title, locale)} · {tc.reign}{" "}
                      {currentMonarch.reignStart}–{currentMonarch.reignEnd ?? t.heroTitle}
                    </span>
                  </span>
                </Link>
              )}

              <Link
                href={localePath("/monarchy", locale)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
              >
                {t.monarchTitle} — {tc.viewAll}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[...dynasties]
                .sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0))
                .slice(-4)
                .map((dynasty) => (
                  <Link
                    key={dynasty.slug}
                    href={localePath(`/monarchy/${dynasty.slug}`, locale)}
                    className="card-surface p-5"
                  >
                    <span className="block font-serif text-base font-bold leading-tight">
                      {localized(dynasty.name, locale)}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-[var(--color-muted)]">
                      {localized(dynasty.dateLabel, locale)}
                    </span>
                    <span className="mt-2 line-clamp-2 block text-xs text-[var(--color-muted)]">
                      {localized(dynasty.summary, locale)}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cities preview ---------------------------------------------------- */}
      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
              {tc.cities}
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {t.citiesTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {t.citiesSubtitle}
            </p>
          </div>
          <Link
            href={localePath("/cities", locale)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
          >
            {tc.viewAll}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {majorCities.map((city) => (
            <Link
              key={city.slug}
              href={localePath(`/cities/${city.slug}`, locale)}
              className="card-surface group relative overflow-hidden p-6"
            >
              <span className="pointer-events-none absolute -end-6 -top-6 font-serif text-[5rem] font-bold leading-none text-[var(--color-surface-3)] transition-colors group-hover:text-[var(--color-moroccan-red-soft)]" aria-hidden>
                {city.isCapital ? "★" : localized(city.name, locale).charAt(0)}
              </span>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold leading-tight">
                    {localized(city.name, locale)}
                  </h3>
                  {city.isCapital && (
                    <span className="chip bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                      {tc.capital}
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
                  <p className="mt-3 text-xs font-semibold text-[var(--color-foreground)]">
                    {tc.population}:{" "}
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

      {/* Heritage preview --------------------------------------------------- */}
      <section className="bg-[var(--color-surface-2)]/40 py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
                {tc.unesco}
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                {t.heritageTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
                {t.heritageSubtitle}
              </p>
            </div>
            <Link
              href={localePath("/heritage", locale)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
            >
              {tc.viewAll}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {unescoSites.map((site) => (
              <Link
                key={site.slug}
                href={localePath(`/heritage/${site.slug}`, locale)}
                className="card-surface flex flex-col p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {localized(site.name, locale)}
                  </h3>
                  {site.inscriptionYear && (
                    <span className="shrink-0 font-mono text-xs font-bold text-[var(--color-gold-dark)]">
                      {site.inscriptionYear}
                    </span>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--color-muted)]">
                  {localized(site.summary, locale)}
                </p>
                {site.city && (
                  <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--color-muted)]">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {site.city}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisine preview ---------------------------------------------------- */}
      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
              {tc.cuisine}
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {t.cuisineTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {t.cuisineSubtitle}
            </p>
          </div>
          <Link
            href={localePath("/cuisine", locale)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
          >
            {tc.viewAll}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {featuredRecipes.map((recipe) => (
            <Link
              key={recipe.slug}
              href={localePath(`/cuisine/${recipe.slug}`, locale)}
              className="card-surface flex flex-col items-center gap-2 p-5 text-center"
            >
              <span className="text-3xl" aria-hidden>
                {recipe.emoji}
              </span>
              <span className="text-sm font-semibold leading-tight">
                {localized(recipe.name, locale)}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted)]">
                {recipe.category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Culture & Amazigh preview ------------------------------------------ */}
      <section className="bg-zellige border-y border-[var(--color-border)] py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
              {tc.culture} · {tc.amazigh}
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {t.cultureTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {t.amazighSubtitle}
            </p>
            <div className="divider-zellige mt-5" aria-hidden />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {featuredTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={localePath(`/culture/${topic.slug}`, locale)}
                className="card-surface p-6"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-moroccan-green)]">
                  {topic.category}
                </span>
                <h3 className="mt-1.5 font-serif text-lg font-bold leading-tight">
                  {localized(topic.title, locale)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
                  {localized(topic.summary, locale)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events preview ------------------------------------------------------ */}
      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
              {tc.events}
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {t.eventsTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {t.eventsSubtitle}
            </p>
          </div>
          <Link
            href={localePath("/events", locale)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
          >
            {tc.viewAll}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {upcoming.map((event) => (
              <Link
                key={event.slug}
                href={localePath(`/events/${event.slug}`, locale)}
                className="card-surface flex items-center gap-4 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]">
                  <CalendarDays className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-base font-bold leading-tight">
                    {localized(event.title, locale)}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--color-muted)]">
                    {formatDate(event.startISO, locale)}
                    {event.city ? ` · ${event.city}` : ""}
                  </span>
                </span>
                <span className="chip shrink-0">{event.category}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-muted)]">{tc.noResults}</p>
        )}
      </section>

      {/* AI + map CTA -------------------------------------------------------- */}
      <section className="container-page pb-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <Link
            href={localePath("/ai", locale)}
            className="card-surface group relative overflow-hidden bg-gradient-to-br from-[var(--color-moroccan-green)] to-[var(--color-moroccan-green-dark)] p-8 text-white"
          >
            <div className="pointer-events-none absolute inset-0 bg-star-pattern opacity-30" aria-hidden />
            <div className="relative">
              <Sparkles className="h-8 w-8" aria-hidden />
              <h2 className="mt-4 font-serif text-2xl font-bold">{t.aiTitle}</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                {t.aiSubtitle}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                {t.aiCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden />
              </span>
            </div>
          </Link>

          <Link
            href={localePath("/map", locale)}
            className="card-surface group relative overflow-hidden bg-gradient-to-br from-[var(--color-moroccan-red)] to-[var(--color-moroccan-red-dark)] p-8 text-white"
          >
            <div className="pointer-events-none absolute inset-0 bg-zellige-dense opacity-20" aria-hidden />
            <div className="relative">
              <MapPin className="h-8 w-8" aria-hidden />
              <h2 className="mt-4 font-serif text-2xl font-bold">{t.mapTitle}</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                {t.mapSubtitle}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                {t.heroCtaMap}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden />
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-center">
          <VerificationBadge
            verifiedAt="2026-10-03"
            labels={{
              verified: dict.verification.verified,
              outdated: dict.verification.outdated,
              needsReview: dict.verification.needsReview,
              daysAgo: (days: number) => dict.verification.daysAgo.replace("{days}", String(days)),
              sample: tc.sampleContent,
            }}
          />
          <p className="text-xs text-[var(--color-muted)]">{dict.common.disclaimerText}</p>
        </div>
      </section>
    </>
  );
}
