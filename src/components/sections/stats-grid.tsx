import {
  Landmark,
  Users,
  Map as MapIcon,
  Coins,
  Languages,
  Clock,
  MapPin,
  Waves,
  Mountain,
  Building2,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { stats, officialSources } from "@/data/stats";
import { VerificationBadge } from "@/components/common/verification-badge";

const ICONS: Record<string, LucideIcon> = {
  Landmark,
  Users,
  Map: MapIcon,
  Coins,
  Languages,
  Clock,
  MapPin,
  Waves,
  Mountain,
  Building2,
};

interface StatsGridProps {
  dict: Dictionary;
}

export function StatsGrid({ dict }: StatsGridProps) {
  const t = dict.common;
  const marocSource = officialSources.find((s) => s.id === "src-maroc-ma");

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
          {t.overview}
        </p>
        <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.home.atGlanceTitle}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
          {dict.home.atGlanceSubtitle}
        </p>
        <div className="divider-zellige mt-5" aria-hidden />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {stats.map((stat, index) => {
          const Icon = ICONS[stat.icon ?? ""] ?? MapPin;
          const label = t[stat.labelKey as keyof typeof t] as string | undefined;
          return (
            <div
              key={stat.key}
              className="card-surface animate-[fade-up_0.5s_ease-out_both] p-5 [animation-delay:var(--delay)]"
              style={{ ["--delay" as string]: `${index * 40}ms` }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-3 text-sm font-bold leading-tight tracking-tight sm:text-base">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[var(--color-muted)]">
                {label ?? stat.labelKey}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <VerificationBadge
          verifiedAt={marocSource?.accessedAt}
          labels={{
            verified: dict.verification.verified,
            outdated: dict.verification.outdated,
            needsReview: dict.verification.needsReview,
            daysAgo: (days: number) => dict.verification.daysAgo.replace("{days}", String(days)),
            sample: t.sampleContent,
          }}
        />
        <span className="text-xs text-[var(--color-muted)]">
          {t.sources}: {officialSources.length} · {dict.verification.official}: maroc.ma, HCP
        </span>
      </div>
    </section>
  );
}
