import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin } from "lucide-react";
import heritageSites from "@/data/heritage";
import cities from "@/data/cities";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";

export async function generateStaticParams() {
  return heritageSites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const site = heritageSites.find((item) => item.slug === slug);
  if (!site) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(site.name, safeLocale),
    description: localized(site.summary, safeLocale),
  };
}

export default async function HeritageDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const site = heritageSites.find((item) => item.slug === slug);
  if (!site) notFound();

  const siteCity = site.city ? cities.find((c) => c.slug === site.city) : undefined;

  return (
    <>
      <PageHeader
        eyebrow={`${t.heritage} · ${site.category.replace(/_/g, " ")}`}
        title={localized(site.name, locale)}
        description={localized(site.summary, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.heritageTitle, href: `/${locale}/heritage` },
          { label: localized(site.name, locale), href: `/${locale}/heritage/${site.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="prose-moroc min-w-0">
            {site.content && (
              <p className="whitespace-pre-line text-lg">{localized(site.content, locale)}</p>
            )}
            {site.significance && (
              <section>
                <h2>{t.significance}</h2>
                <p className="whitespace-pre-line">{localized(site.significance, locale)}</p>
              </section>
            )}
            {site.timeline && site.timeline.length > 0 && (
              <section>
                <h2>{t.timeline}</h2>
                <ol className="mt-4 space-y-3 border-s-2 border-[var(--color-gold)]/40 ps-6">
                  {site.timeline.map((item, index) => (
                    <li key={index} className="relative">
                      <span
                        className="absolute -start-[1.97rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-background)]"
                        aria-hidden
                      />
                      <span className="font-mono text-xs font-bold uppercase text-[var(--color-gold-dark)]">
                        {item.year}
                      </span>
                      <p className="text-sm text-[var(--color-muted)]">
                        {localized(item.title, locale)}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside>
            <div className="card-surface p-6">
              <h3 className="font-serif text-lg font-bold">{t.quickFacts}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.category}</dt>
                  <dd className="font-semibold">{site.category.replace(/_/g, " ")}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.unesco}</dt>
                  <dd className="font-semibold">{site.unescoStatus ? "✓" : "—"}</dd>
                </div>
                {site.inscriptionYear && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.date}</dt>
                    <dd className="font-mono text-xs font-semibold">{site.inscriptionYear}</dd>
                  </div>
                )}
                {site.city && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.city}</dt>
                    <dd>
                      <Link
                        href={localePath(`/cities/${site.city}`, locale)}
                        className="flex items-center gap-1 font-semibold text-[var(--color-moroccan-red)] link-underline"
                      >
                        <MapPin className="h-3 w-3" aria-hidden />
                        {siteCity ? localized(siteCity.name, locale) : site.city}
                      </Link>
                    </dd>
                  </div>
                )}
                {site.coordinates && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.location}</dt>
                    <dd className="font-mono text-xs font-semibold">
                      {site.coordinates.lat.toFixed(2)}°, {site.coordinates.lng.toFixed(2)}°
                    </dd>
                  </div>
                )}
              </dl>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={site.verifiedAt}
                  isSample={site.isSample}
                  labels={{
                    verified: dict.verification.verified,
                    outdated: dict.verification.outdated,
                    needsReview: dict.verification.needsReview,
                    daysAgo: (days: number) =>
                      dict.verification.daysAgo.replace("{days}", String(days)),
                    sample: t.sampleContent,
                  }}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
