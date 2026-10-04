import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import heritageSites from "@/data/heritage";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";
import type { HeritageCategory } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.heritageTitle,
    description: dict.page.heritageSubtitle,
  };
}

const CATEGORY_ORDER: HeritageCategory[] = [
  "world_heritage",
  "intangible",
  "natural",
  "medina",
  "kasbah",
  "monument",
  "archaeological",
];

export default async function HeritagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const sorted = [...heritageSites].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.category);
    const bi = CATEGORY_ORDER.indexOf(b.category);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <>
      <PageHeader
        eyebrow={t.heritage}
        title={dict.page.heritageTitle}
        description={dict.page.heritageSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.heritageTitle, href: `/${locale}/heritage` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="chip bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
            {t.unesco}: {heritageSites.filter((s) => s.unescoStatus).length}
          </span>
          <span className="chip">{dict.categories.heritage}: {heritageSites.length}</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sorted.map((site) => (
            <Link
              key={site.slug}
              href={localePath(`/heritage/${site.slug}`, locale)}
              className="card-surface flex flex-col p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif text-lg font-bold leading-tight">
                  {localized(site.name, locale)}
                </h3>
                {site.unescoStatus && (
                  <span className="chip shrink-0 bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                    {t.unesco}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-moroccan-green)]">
                {site.category.replace(/_/g, " ")}
              </span>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {localized(site.summary, locale)}
              </p>
              <p className="mt-3 flex items-center gap-3 text-xs font-semibold text-[var(--color-muted)]">
                {site.inscriptionYear && (
                  <span className="font-mono text-[var(--color-gold-dark)]">
                    {site.inscriptionYear}
                  </span>
                )}
                {site.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {site.city}
                  </span>
                )}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
