import type { Metadata } from "next";
import Link from "next/link";
import { institutions } from "@/data/institutions";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";
import type { Institution } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.governmentTitle,
    description: dict.page.governmentSubtitle,
  };
}

const TYPE_LABELS: Record<Institution["type"], string> = {
  king: "The King",
  head_of_government: "Head of Government",
  government: "Government",
  ministry: "Ministry",
  parliament: "Parliament",
  representatives: "House of Representatives",
  councillors: "House of Councillors",
  judiciary: "Judiciary",
  constitutional_court: "Constitutional Court",
  regional: "Regional",
  local: "Local",
  public_institution: "Public institution",
};

export default async function GovernmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const sorted = [...institutions].sort((a, b) => a.level - b.level || a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow={t.government}
        title={dict.page.governmentTitle}
        description={dict.page.governmentSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.governmentTitle, href: `/${locale}/government` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sorted.map((institution) => (
            <Link
              key={institution.slug}
              href={localePath(`/government/${institution.slug}`, locale)}
              className="card-surface flex flex-col p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-moroccan-green)]">
                  {TYPE_LABELS[institution.type] ?? institution.type}
                </span>
                <span className="font-mono text-[10px] font-bold text-[var(--color-muted)]">
                  L{institution.level}
                </span>
              </div>
              <h3 className="mt-1.5 font-serif text-lg font-bold leading-tight">
                {localized(institution.name, locale)}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {localized(institution.content, locale)}
              </p>
              {institution.currentHolder && (
                <p className="mt-3 text-xs font-semibold text-[var(--color-muted)]">
                  {institution.currentHolder[locale] || institution.currentHolder.en}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
