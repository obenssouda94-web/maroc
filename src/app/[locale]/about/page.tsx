import type { Metadata } from "next";
import Link from "next/link";
import { officialSources, stats } from "@/data/stats";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localePath } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.common.about,
    description: dict.footer.aboutText,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;

  return (
    <>
      <PageHeader
        eyebrow={t.about}
        title={t.about}
        description={dict.footer.aboutText}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: t.about, href: `/${locale}/about` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="prose-moroc">
            <h2>{t.overview}</h2>
            <p>{dict.common.disclaimerText}</p>

            <h2>{t.quickFacts}</h2>
            <ul>
              {stats.slice(0, 6).map((stat) => (
                <li key={stat.key}>
                  <strong>{t[stat.labelKey as keyof typeof t] as string}:</strong> {stat.value}
                </li>
              ))}
            </ul>

            <h2>{t.sources}</h2>
            <p>
              {dict.page.sourcesSubtitle}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {officialSources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface p-5 transition-colors hover:border-[var(--color-moroccan-red)]/40"
              >
                <h3 className="font-serif text-base font-bold leading-tight">{source.title}</h3>
                {source.institution && (
                  <p className="mt-1 text-xs font-semibold text-[var(--color-moroccan-green)]">
                    {source.institution}
                  </p>
                )}
                <p className="mt-2 text-xs text-[var(--color-muted)]">
                  {(source.type ?? "other").replace(/_/g, " ")} · {source.reliability}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={localePath("/search", locale)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-moroccan-red)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-moroccan-red-dark)]"
            >
              {t.search}
            </Link>
            <Link
              href={localePath("/ai", locale)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--color-surface-2)]"
            >
              {t.askAI}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
