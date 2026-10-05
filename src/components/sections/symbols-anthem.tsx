import Link from "next/link";
import { ArrowRight, Music2 } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";
import { MoroccanFlag } from "@/components/brand/moroccan-flag";
import { AudioPlayer } from "@/components/content/audio-player";

interface SymbolsAnthemProps {
  locale: Locale;
  dict: Dictionary;
}

/** The anthem asset is provided by the site operator (see public/audio/README.md). */
const ANTHEM_SRC = "/audio/hymne-cherifien.mp3";

/**
 * Homepage showcase of the Kingdom's national symbols: the Moroccan flag,
 * rendered as pure SVG and animated as if flying from a mast, alongside the
 * national anthem player.
 */
export function SymbolsAnthem({ locale, dict }: SymbolsAnthemProps) {
  const t = dict.home;
  const tc = dict.common;

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        {/* The flag ----------------------------------------------------------- */}
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-start gap-3">
            {/* Mast: finial + pole, mirrored automatically in RTL layouts */}
            <div className="flex flex-col items-center">
              <span className="h-3 w-3 rounded-full bg-[var(--color-gold)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-gold-dark)_35%,transparent)]" />
              <div className="h-60 w-2 rounded-full bg-gradient-to-b from-[var(--color-sand-400)] via-[var(--color-sand-500)] to-[var(--color-sand-700)] dark:from-[var(--color-sand-600)] dark:via-[var(--color-sand-700)] dark:to-[var(--color-sand-900)]" />
            </div>
            <div className="flag-sweep min-w-0 flex-1 rounded-e-xl rounded-s-sm shadow-[0_22px_44px_-20px_rgba(28,27,23,0.55)] ring-1 ring-inset ring-black/10">
              <div className="flag-wave">
                <MoroccanFlag className="block h-auto w-full" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-[var(--color-muted)]">
            {t.flagSubtitle}
          </p>
        </div>

        {/* The anthem --------------------------------------------------------- */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
            {tc.nationalSymbols}
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t.flagTitle}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
            {t.flagSubtitle}
          </p>

          <div className="divider-zellige mt-6" aria-hidden />

          <div className="mt-6">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]">
              <Music2 className="h-4 w-4 text-[var(--color-moroccan-green)]" aria-hidden />
              {t.anthemTitle}
            </p>
            <p className="mb-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
              {t.anthemSubtitle}
            </p>
            <AudioPlayer
              src={ANTHEM_SRC}
              label={dict.page.anthemListenTitle}
              hint={dict.page.anthemListenHint}
            />
          </div>

          <Link
            href={localePath("/symbols", locale)}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-moroccan-red)] link-underline"
          >
            {tc.nationalSymbols} — {tc.viewAll}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
