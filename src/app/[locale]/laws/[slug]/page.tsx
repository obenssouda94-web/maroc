import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { laws } from "@/data/laws";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized } from "@/lib/utils";

export async function generateStaticParams() {
  return laws.map((law) => ({ slug: law.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const law = laws.find((item) => item.slug === slug);
  if (!law) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(law.title, safeLocale),
    description: localized(law.summary, safeLocale),
  };
}

export default async function LawDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const law = laws.find((item) => item.slug === slug);
  if (!law) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${t.laws} · ${law.category.replace(/_/g, " ")}`}
        title={localized(law.title, locale)}
        description={localized(law.summary, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.lawsTitle, href: `/${locale}/laws` },
          { label: localized(law.title, locale), href: `/${locale}/laws/${law.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="prose-moroc min-w-0">
            {law.content && (
              <p className="whitespace-pre-line text-lg">{localized(law.content, locale)}</p>
            )}

            {law.keyPrinciples && law.keyPrinciples.length > 0 && (
              <section>
                <h2>{t.keyPrinciples}</h2>
                <ul className="mt-3 list-disc space-y-1.5 ps-6">
                  {law.keyPrinciples.map((principle, index) => (
                    <li key={index}>{localized(principle, locale)}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside>
            <div className="card-surface p-6">
              <h3 className="font-serif text-lg font-bold">{t.quickFacts}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.category}</dt>
                  <dd className="font-semibold">{law.category.replace(/_/g, " ")}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.status}</dt>
                  <dd className="font-semibold">
                    {law.status === "in_force" ? t.inForce : law.status}
                  </dd>
                </div>
                {law.date && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.date}</dt>
                    <dd className="font-mono text-xs font-semibold">{law.date}</dd>
                  </div>
                )}
                {law.reference && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.source}</dt>
                    <dd className="text-end font-mono text-xs font-semibold">{law.reference}</dd>
                  </div>
                )}
                {law.version && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.status}</dt>
                    <dd className="text-end text-xs font-semibold">{law.version}</dd>
                  </div>
                )}
              </dl>

              {law.sourceUrl && (
                <a
                  href={law.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-[var(--color-strong-border)] px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--color-moroccan-red)]/40 hover:bg-[var(--color-surface-2)]"
                >
                  {t.officialSource}
                  <ExternalLink className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                </a>
              )}

              {law.officialPublication && (
                <p className="mt-4 text-xs text-[var(--color-muted)]">
                  {law.officialPublication}
                </p>
              )}

              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={law.verifiedAt}
                  isSample={law.isSample}
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
