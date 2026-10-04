import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Crown } from "lucide-react";
import { dynasties } from "@/data/dynasties";
import { royalFigures } from "@/data/royal-figures";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";

export async function generateStaticParams() {
  return [...dynasties, ...royalFigures].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const figure = royalFigures.find((item) => item.slug === slug);
  const dynasty = dynasties.find((item) => item.slug === slug);
  const safeLocale = resolveLocale(locale);
  if (figure) {
    return {
      title: localized(figure.name, safeLocale),
      description: localized(figure.summary, safeLocale),
    };
  }
  if (dynasty) {
    return {
      title: localized(dynasty.name, safeLocale),
      description: localized(dynasty.summary, safeLocale),
    };
  }
  return {};
}

export default async function MonarchyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;

  const figure = royalFigures.find((item) => item.slug === slug);
  const dynasty = dynasties.find((item) => item.slug === slug);

  if (!figure && !dynasty) notFound();

  if (figure) {
    const figureDynasty = figure.dynasty
      ? dynasties.find((d) => d.slug === figure.dynasty)
      : undefined;

    return (
      <>
        <PageHeader
          eyebrow={`${t.monarchy}${figureDynasty ? ` · ${localized(figureDynasty.name, locale)}` : ""}`}
          title={localized(figure.name, locale)}
          description={localized(figure.summary, locale)}
          breadcrumbs={[
            { label: t.home, href: `/${locale}` },
            { label: dict.page.monarchyTitle, href: `/${locale}/monarchy` },
            { label: localized(figure.name, locale), href: `/${locale}/monarchy/${figure.slug}` },
          ]}
        />
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
            <div className="prose-moroc min-w-0">
              {figure.content && (
                <p className="whitespace-pre-line">{localized(figure.content, locale)}</p>
              )}
              {figure.role && (
                <section>
                  <h2>{t.monarch}</h2>
                  <p className="whitespace-pre-line">{localized(figure.role, locale)}</p>
                </section>
              )}
            </div>
            <aside>
              <div className="card-surface p-6">
                <h3 className="font-serif text-lg font-bold">{t.quickFacts}</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  {figure.title && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-muted)]">{t.monarch}</dt>
                      <dd className="font-semibold">{localized(figure.title, locale)}</dd>
                    </div>
                  )}
                  {figure.reignStart && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-muted)]">{t.reign}</dt>
                      <dd className="font-mono text-xs font-semibold">
                        {figure.reignStart}–{figure.reignEnd ?? t.currentMonarch.toLowerCase()}
                      </dd>
                    </div>
                  )}
                  {figure.birthYear && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-muted)]">{t.date}</dt>
                      <dd className="font-mono text-xs font-semibold">
                        {figure.birthYear}
                        {figure.deathYear ? `–${figure.deathYear}` : ""}
                      </dd>
                    </div>
                  )}
                  {figureDynasty && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-muted)]">{t.dynasty}</dt>
                      <dd>
                        <Link
                          href={localePath(`/monarchy/${figureDynasty.slug}`, locale)}
                          className="font-semibold text-[var(--color-moroccan-red)] link-underline"
                        >
                          {localized(figureDynasty.name, locale)}
                        </Link>
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <VerificationBadge
                    verifiedAt={figure.verifiedAt}
                    isSample={figure.isSample}
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

  const dynastyMonarchs = dynasty!
    .monarchs.map((mslug) => royalFigures.find((r) => r.slug === mslug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <PageHeader
        eyebrow={`${t.monarchy} · ${t.dynasty}`}
        title={localized(dynasty!.name, locale)}
        description={localized(dynasty!.summary, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.monarchyTitle, href: `/${locale}/monarchy` },
          { label: localized(dynasty!.name, locale), href: `/${locale}/monarchy/${dynasty!.slug}` },
        ]}
      />
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="prose-moroc min-w-0">
            {dynasty!.content && (
              <p className="whitespace-pre-line">{localized(dynasty!.content, locale)}</p>
            )}
            {dynasty!.capitals && dynasty!.capitals.length > 0 && (
              <section>
                <h2>{t.capital}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {dynasty!.capitals.map((capital, index) => (
                    <li key={index} className="chip">
                      {localized(capital, locale)}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <aside>
            <div className="card-surface p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]">
                <Crown className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold">{localized(dynasty!.name, locale)}</h3>
              <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">
                {localized(dynasty!.dateLabel, locale)}
              </p>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={dynasty!.verifiedAt}
                  isSample={dynasty!.isSample}
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

        <section className="mt-14">
          <h2 className="font-serif text-2xl font-bold tracking-tight">{t.monarchs}</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {dynastyMonarchs.map((monarch) => (
              <Link
                key={monarch.slug}
                href={localePath(`/monarchy/${monarch.slug}`, locale)}
                className="card-surface flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-moroccan-green-soft)] font-serif text-lg font-bold text-[var(--color-moroccan-green)]">
                  {localized(monarch.name, locale).charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="block truncate font-serif text-base font-bold">
                      {localized(monarch.name, locale)}
                    </span>
                    {monarch.isCurrent && (
                      <span className="chip shrink-0 bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]">
                        ★
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-[var(--color-muted)]">
                    {monarch.reignStart}–{monarch.reignEnd ?? ""}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
