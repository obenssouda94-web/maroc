import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNavItems } from "@/lib/navigation";
import { localePath } from "@/lib/utils";

interface GatewayGridProps {
  locale: Locale;
  dict: Dictionary;
}

const GROUP_COLORS: Record<string, string> = {
  discover: "bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]",
  knowledge: "bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]",
  experience: "bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]",
};

export function GatewayGrid({ locale, dict }: GatewayGridProps) {
  const items = getNavItems(locale, dict);
  const t = dict.home;
  const groupLabel: Record<string, string> = {
    discover: dict.nav.discover,
    knowledge: dict.categories.history,
    experience: dict.nav.explore,
  };

  return (
    <section className="bg-[var(--color-surface-2)]/40 py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
            {dict.common.explore}
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {t.exploreTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            {t.exploreSubtitle}
          </p>
          <div className="divider-zellige mt-5" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={localePath(item.href, locale)}
                className="card-surface group animate-[fade-up_0.5s_ease-out_both] flex items-center gap-4 p-5 [animation-delay:var(--delay)]"
                style={{ ["--delay" as string]: `${index * 30}ms` }}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${GROUP_COLORS[item.group]}`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-lg font-bold leading-tight">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                    {groupLabel[item.group]}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-moroccan-red)] rtl:-scale-x-100 rtl:group-hover:translate-x--0.5" aria-hidden />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
