import type { Metadata } from "next";
import Link from "next/link";
import { symbolsList } from "@/data/symbols";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";
import type { NationalSymbol } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.symbolsTitle,
    description: dict.page.symbolsSubtitle,
  };
}

const TYPE_ORDER: NationalSymbol["type"][] = [
  "flag",
  "anthem",
  "coat_of_arms",
  "motto",
  "holiday",
  "official",
];

export default async function SymbolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const sorted = [...symbolsList].sort((a, b) => {
    const ai = TYPE_ORDER.indexOf(a.type);
    const bi = TYPE_ORDER.indexOf(b.type);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <>
      <PageHeader
        eyebrow={t.nationalSymbols}
        title={dict.page.symbolsTitle}
        description={dict.page.symbolsSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.symbolsTitle, href: `/${locale}/symbols` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sorted.map((symbol) => (
            <Link
              key={symbol.slug}
              href={localePath(`/symbols/${symbol.slug}`, locale)}
              className="card-surface flex flex-col p-6"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-moroccan-red)]">
                {symbol.type.replace(/_/g, " ")}
              </span>
              <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight">
                {localized(symbol.name, locale)}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {localized(symbol.summary, locale)}
              </p>
              {symbol.date && (
                <p className="mt-3 font-mono text-xs font-bold text-[var(--color-gold-dark)]">
                  {symbol.date}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
