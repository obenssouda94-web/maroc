import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import { laws } from "@/data/laws";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";
import type { LawCategory } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.lawsTitle,
    description: dict.page.lawsSubtitle,
  };
}

const CATEGORY_ORDER: LawCategory[] = [
  "constitutional",
  "civil",
  "criminal",
  "family",
  "commercial",
  "labor",
  "administrative",
  "digital",
  "consumer",
  "education",
];

const STATUS_LABELS: Record<string, string> = {
  in_force: "In force",
  repealed: "Repealed",
  amended: "Amended",
};

export default async function LawsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const sorted = [...laws].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.category);
    const bi = CATEGORY_ORDER.indexOf(b.category);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <>
      <PageHeader
        eyebrow={t.laws}
        title={dict.page.lawsTitle}
        description={dict.page.lawsSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.lawsTitle, href: `/${locale}/laws` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="card-surface flex items-start gap-4 border-l-4 border-l-[var(--color-gold)] p-5">
          <Scale className="h-6 w-6 shrink-0 text-[var(--color-gold-dark)]" aria-hidden />
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            {dict.common.disclaimerText}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {sorted.map((law) => (
            <Link
              key={law.slug}
              href={localePath(`/laws/${law.slug}`, locale)}
              className="card-surface flex flex-col p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-moroccan-green)]">
                  {law.category.replace(/_/g, " ")}
                </span>
                <span
                  className={`chip shrink-0 ${
                    law.status === "in_force"
                      ? "bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]"
                      : "bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]"
                  }`}
                >
                  {STATUS_LABELS[law.status] ?? law.status}
                </span>
              </div>
              <h3 className="mt-1.5 font-serif text-lg font-bold leading-tight">
                {localized(law.title, locale)}
              </h3>
              {law.reference && (
                <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">{law.reference}</p>
              )}
              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {localized(law.summary, locale)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
