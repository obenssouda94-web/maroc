import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, Landmark, CalendarDays, SunMedium, Compass } from "lucide-react";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localePath } from "@/lib/utils";

const ONMT_URL = "https://www.visitmorocco.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.tourismTitle,
    description: dict.page.tourismSubtitle,
  };
}

export default async function TourismPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.tourism;

  const shortcuts = [
    { href: "/map", label: dict.nav.map, icon: Compass },
    { href: "/regions", label: dict.nav.regions, icon: MapPin },
    { href: "/heritage", label: dict.nav.heritage, icon: Landmark },
    { href: "/events", label: dict.nav.events, icon: CalendarDays },
    { href: "/weather", label: dict.nav.weather, icon: SunMedium },
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.tourism}
        title={dict.page.tourismTitle}
        description={dict.page.tourismSubtitle}
        breadcrumbs={[
          { label: dict.common.home, href: `/${locale}` },
          { label: dict.page.tourismTitle, href: `/${locale}/tourism` },
        ]}
      />

      <section className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Official tourist office */}
          <div className="card-surface overflow-hidden p-0">
            <div className="bg-zellige border-b border-[var(--color-border)] px-6 py-8 sm:px-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-moroccan-red)]">
                {dict.common.sources}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold leading-tight sm:text-3xl">
                {t.officeTitle}
              </h2>
              <p className="mt-1.5 text-sm font-semibold text-[var(--color-moroccan-green)]">
                {t.officeRole}
              </p>
            </div>
            <div className="px-6 py-7 sm:px-10">
              <p className="text-[15px] leading-relaxed text-[var(--color-foreground)]/90">
                {t.officeDescription}
              </p>
              <a
                href={ONMT_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-moroccan-green)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-moroccan-green-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
              >
                {t.officialSite} — visitmorocco.com
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Plan your trip shortcuts */}
          <div>
            <h2 className="font-serif text-xl font-bold sm:text-2xl">{t.planTitle}</h2>
            <p className="mt-1.5 text-sm text-[var(--color-muted)]">{t.planHint}</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shortcuts.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={localePath(href, locale)}
                  className="card-surface group flex items-center gap-3.5 p-4 transition-colors hover:border-[var(--color-moroccan-green)]/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)] transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
