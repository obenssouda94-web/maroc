import type { Metadata } from "next";
import Link from "next/link";
import recipes from "@/data/recipes";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized, localePath } from "@/lib/utils";
import type { RecipeCategory } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.cuisineTitle,
    description: dict.page.cuisineSubtitle,
  };
}

const CATEGORY_ORDER: RecipeCategory[] = [
  "main",
  "soup",
  "bread",
  "breakfast",
  "pastry",
  "dessert",
  "tea",
  "festive",
  "street",
  "regional",
  "ingredient",
];

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const sorted = [...recipes].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.category);
    const bi = CATEGORY_ORDER.indexOf(b.category);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <>
      <PageHeader
        eyebrow={t.cuisine}
        title={dict.page.cuisineTitle}
        description={dict.page.cuisineSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.cuisineTitle, href: `/${locale}/cuisine` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="chip">{t.recipes}: {recipes.length}</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sorted.map((recipe) => (
            <Link
              key={recipe.slug}
              href={localePath(`/cuisine/${recipe.slug}`, locale)}
              className="card-surface group flex items-center gap-4 p-5"
            >
              {recipe.emoji ? (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-surface-2)] text-3xl" aria-hidden>
                  {recipe.emoji}
                </span>
              ) : (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-moroccan-red-soft)] font-serif text-xl font-bold text-[var(--color-moroccan-red)]" aria-hidden>
                  {localized(recipe.name, locale).charAt(0)}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-lg font-bold leading-tight">
                  {localized(recipe.name, locale)}
                </span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-moroccan-green)]">
                  {recipe.category.replace(/_/g, " ")}
                </span>
                {recipe.cookingTime && (
                  <span className="mt-1 block text-xs text-[var(--color-muted)]">
                    {t.cookingTime}: {recipe.cookingTime} min
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
