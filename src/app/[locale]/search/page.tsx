import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/layout/search-bar";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localePath, interpolate } from "@/lib/utils";
import { search } from "@/lib/search";
import type { SearchableType } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.searchTitle,
    description: dict.page.searchSubtitle,
  };
}

const TYPE_FILTERS: { type: SearchableType; labelKey: string }[] = [
  { type: "region", labelKey: "regions" },
  { type: "city", labelKey: "cities" },
  { type: "period", labelKey: "history" },
  { type: "dynasty", labelKey: "dynasties" },
  { type: "royal", labelKey: "royalFamily" },
  { type: "institution", labelKey: "institutions" },
  { type: "law", labelKey: "laws" },
  { type: "heritage", labelKey: "heritage" },
  { type: "recipe", labelKey: "recipes" },
  { type: "event", labelKey: "events" },
  { type: "symbol", labelKey: "nationalSymbols" },
];

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const { q, type } = await searchParams;
  const t = dict.common;
  const query = q ?? "";
  const activeType: SearchableType | undefined = TYPE_FILTERS.some(
    (filter) => filter.type === type,
  )
    ? (type as SearchableType)
    : undefined;

  const results = query.trim().length >= 2
    ? search(query, locale, 24, activeType)
    : [];

  const buildHref = (value: SearchableType | undefined) => {
    const searchType = value ? `&type=${value}` : "";
    return localePath(`/search?q=${encodeURIComponent(query)}${searchType}`, locale);
  };

  return (
    <>
      <PageHeader
        eyebrow={t.search}
        title={dict.page.searchTitle}
        description={dict.page.searchSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.searchTitle, href: `/${locale}/search` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <SearchBar
            locale={locale}
            placeholder={t.searchPlaceholder}
            labels={{ noResults: t.noResults, popular: dict.search.popular }}
            autoFocus
          />

          {query.trim().length >= 2 && (
            <>
              <p className="mt-6 text-sm text-[var(--color-muted)]">
                {interpolate(dict.common.showingResults, {
                  count: String(results.length),
                  query,
                })}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={buildHref(undefined)}
                  className={`chip transition-colors ${
                    !activeType
                      ? "border-[var(--color-moroccan-red)]/40 text-[var(--color-moroccan-red)]"
                      : "hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {dict.search.allCategories}
                </Link>
                {TYPE_FILTERS.map((filter) => (
                  <Link
                    key={filter.type}
                    href={buildHref(filter.type)}
                    className={`chip transition-colors ${
                      activeType === filter.type
                        ? "border-[var(--color-moroccan-red)]/40 text-[var(--color-moroccan-red)]"
                        : "hover:text-[var(--color-foreground)]"
                    }`}
                  >
                    {t[filter.labelKey as keyof typeof t] as string}
                  </Link>
                ))}
              </div>

              {results.length > 0 ? (
                <ul className="mt-8 space-y-3">
                  {results.map((result) => (
                    <li key={result.id}>
                      <Link href={result.href} className="card-surface group flex flex-col gap-1 p-5">
                        <span className="flex items-center gap-2">
                          <span className="font-serif text-lg font-bold leading-tight">
                            {result.title}
                          </span>
                          <span className="chip shrink-0">{result.type}</span>
                        </span>
                        <span className="line-clamp-2 text-sm text-[var(--color-muted)]">
                          {result.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-strong-border)] p-10 text-center">
                  <p className="font-serif text-xl font-bold">{t.noResults}</p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{t.noResultsHint}</p>
                </div>
              )}
            </>
          )}

          {query.trim().length < 2 && (
            <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-strong-border)] p-10 text-center">
              <p className="font-serif text-xl font-bold">{t.searchPlaceholder}</p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{dict.search.popular}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
