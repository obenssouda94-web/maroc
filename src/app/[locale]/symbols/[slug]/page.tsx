import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { symbolsList } from "@/data/symbols";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { AudioPlayer } from "@/components/content/audio-player";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized } from "@/lib/utils";

export async function generateStaticParams() {
  return symbolsList.map((symbol) => ({ slug: symbol.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const symbol = symbolsList.find((item) => item.slug === slug);
  if (!symbol) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(symbol.name, safeLocale),
    description: localized(symbol.summary, safeLocale),
  };
}

export default async function SymbolDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const symbol = symbolsList.find((item) => item.slug === slug);
  if (!symbol) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${t.nationalSymbols} · ${symbol.type.replace(/_/g, " ")}`}
        title={localized(symbol.name, locale)}
        description={localized(symbol.summary, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.symbolsTitle, href: `/${locale}/symbols` },
          { label: localized(symbol.name, locale), href: `/${locale}/symbols/${symbol.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            {symbol.date && (
              <span className="chip bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                {symbol.date}
              </span>
            )}
            <VerificationBadge
              verifiedAt={symbol.verifiedAt}
              isSample={symbol.isSample}
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
          {symbol.content && (
            <div className="prose-moroc mt-8">
              <p className="whitespace-pre-line">{localized(symbol.content, locale)}</p>
            </div>
          )}
          {symbol.audioUrl && (
            <div className="mt-8">
              <AudioPlayer
                src={symbol.audioUrl}
                label={dict.page.anthemListenTitle}
                hint={dict.page.anthemListenHint}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
