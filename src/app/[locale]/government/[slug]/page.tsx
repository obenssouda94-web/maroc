import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { institutions } from "@/data/institutions";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized } from "@/lib/utils";

export async function generateStaticParams() {
  return institutions.map((institution) => ({ slug: institution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const institution = institutions.find((item) => item.slug === slug);
  if (!institution) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(institution.name, safeLocale),
    description: localized(institution.content, safeLocale),
  };
}

export default async function InstitutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const institution = institutions.find((item) => item.slug === slug);
  if (!institution) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${t.government} · ${institution.type.replace(/_/g, " ")}`}
        title={localized(institution.name, locale)}
        description={localized(institution.content, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.governmentTitle, href: `/${locale}/government` },
          { label: localized(institution.name, locale), href: `/${locale}/government/${institution.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="prose-moroc min-w-0">
            <p className="whitespace-pre-line text-lg">{localized(institution.content, locale)}</p>

            {institution.constitutionalBasis && (
              <section>
                <h2>{t.constitution}</h2>
                <p className="whitespace-pre-line">{localized(institution.constitutionalBasis, locale)}</p>
              </section>
            )}

            {institution.responsibilities && institution.responsibilities.length > 0 && (
              <section>
                <h2>{t.keyPrinciples}</h2>
                <ul className="mt-3 list-disc space-y-1.5 ps-6">
                  {institution.responsibilities.map((item, index) => (
                    <li key={index}>{localized(item, locale)}</li>
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
                  <dd className="font-semibold">{institution.type.replace(/_/g, " ")}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.status}</dt>
                  <dd className="font-mono text-xs font-semibold">L{institution.level}</dd>
                </div>
                {institution.currentHolder && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.currentMonarch}</dt>
                    <dd className="text-end font-semibold">
                      {institution.currentHolder[locale] || institution.currentHolder.en}
                    </dd>
                  </div>
                )}
              </dl>

              {institution.website && (
                <a
                  href={institution.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-[var(--color-strong-border)] px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--color-moroccan-red)]/40 hover:bg-[var(--color-surface-2)]"
                >
                  {t.officialSource}
                  <ExternalLink className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                </a>
              )}

              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={institution.verifiedAt}
                  isSample={institution.isSample}
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
