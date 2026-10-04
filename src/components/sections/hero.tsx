import Link from "next/link";
import { ArrowRight, BookOpen, Castle, Map as MapIcon, Sparkles } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const t = dict.home;

  return (
    <section className="relative overflow-hidden bg-zellige-dense">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/40 via-[var(--color-background)]/60 to-[var(--color-background)]" />
      <div className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-[var(--color-moroccan-red)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -start-24 top-1/3 h-96 w-96 rounded-full bg-[var(--color-moroccan-green)]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-[420px] w-[420px] rounded-full bg-[var(--color-gold)]/[0.07] blur-3xl" />

      {/* Eight-pointed star (khatam) — a recurrent motif of Moroccan zellige */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute end-6 top-1/2 hidden h-64 w-64 -translate-y-1/2 animate-[spin_22s_linear_infinite] text-[var(--color-gold)]/20 sm:block lg:h-80 lg:w-80 rtl:end-auto rtl:start-6"
      >
        <rect x="45" y="45" width="110" height="110" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect
          x="45"
          y="45"
          width="110"
          height="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          transform="rotate(45 100 100)"
        />
        <circle cx="100" cy="100" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="container-page relative py-20 text-center sm:py-28 lg:py-36">
        <div className="mb-6 inline-flex animate-[fade-in_0.5s_ease-out_both] items-center gap-2 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] backdrop-blur-sm">
          <span className="text-base" aria-hidden>
            🇲🇦
          </span>
          {dict.common.siteTagline}
        </div>

        <h1 className="animate-[fade-up_0.6s_cubic-bezier(0.22,1,0.36,1)_both] font-serif text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="text-gradient-flag">{t.heroTitle}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-[fade-up_0.6s_0.1s_cubic-bezier(0.22,1,0.36,1)_both] text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">
          {t.heroSubtitle}
        </p>

        <div className="mt-10 flex animate-[fade-up_0.6s_0.2s_cubic-bezier(0.22,1,0.36,1)_both] flex-wrap items-center justify-center gap-3">
          <Link
            href={localePath("/map", locale)}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-moroccan-red)] px-7 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(193,39,45,0.8)] transition-all hover:bg-[var(--color-moroccan-red-dark)] hover:shadow-[0_14px_36px_-12px_rgba(193,39,45,0.9)] active:scale-[0.98]"
          >
            <MapIcon className="h-4 w-4" aria-hidden />
            {t.heroCtaMap}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
          <Link
            href={localePath("/history", locale)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-7 text-sm font-semibold text-[var(--color-foreground)] transition-all hover:border-[var(--color-moroccan-red)]/40 hover:bg-[var(--color-surface-2)] active:scale-[0.98]"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            {t.heroCtaHistory}
          </Link>
          <Link
            href={localePath("/culture", locale)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-7 text-sm font-semibold text-[var(--color-foreground)] transition-all hover:border-[var(--color-moroccan-green)]/40 hover:bg-[var(--color-surface-2)] active:scale-[0.98]"
          >
            <Castle className="h-4 w-4" aria-hidden />
            {t.heroCtaCulture}
          </Link>
          <Link
            href={localePath("/ai", locale)}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-moroccan-green)] px-7 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(0,98,51,0.7)] transition-all hover:bg-[var(--color-moroccan-green-dark)] active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {t.heroCtaAI}
          </Link>
        </div>
      </div>
      <div className="divider-zellige" aria-hidden />
    </section>
  );
}
