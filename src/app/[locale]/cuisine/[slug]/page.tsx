import type { Metadata } from "next";
import { notFound } from "next/navigation";
import recipes from "@/data/recipes";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized } from "@/lib/utils";

export async function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const recipe = recipes.find((item) => item.slug === slug);
  if (!recipe) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(recipe.name, safeLocale),
    description: localized(recipe.origin ?? recipe.name, safeLocale),
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const recipe = recipes.find((item) => item.slug === slug);
  if (!recipe) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${t.cuisine} · ${recipe.category.replace(/_/g, " ")}`}
        title={localized(recipe.name, locale)}
        description={localized(recipe.origin ?? recipe.name, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.cuisineTitle, href: `/${locale}/cuisine` },
          { label: localized(recipe.name, locale), href: `/${locale}/cuisine/${recipe.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="min-w-0">
            {recipe.emoji && (
              <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-3xl bg-[var(--color-surface-2)] text-6xl" aria-hidden>
                {recipe.emoji}
              </div>
            )}

            <div className="prose-moroc">
              {recipe.history && (
                <section>
                  <h2>{t.history}</h2>
                  <p className="whitespace-pre-line">{localized(recipe.history, locale)}</p>
                </section>
              )}

              {recipe.ingredients.length > 0 && (
                <section>
                  <h2>{t.ingredients}</h2>
                  <ul className="mt-3 list-disc space-y-1.5 ps-6">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{localized(ingredient, locale)}</li>
                    ))}
                  </ul>
                </section>
              )}

              {recipe.preparation.length > 0 && (
                <section>
                  <h2>{t.preparation}</h2>
                  <ol className="mt-3 list-decimal space-y-2 ps-6">
                    {recipe.preparation.map((step, index) => (
                      <li key={index} className="whitespace-pre-line">
                        {localized(step, locale)}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {recipe.occasions && recipe.occasions.length > 0 && (
                <section>
                  <h2>{t.occasions}</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {recipe.occasions.map((occasion, index) => (
                      <li key={index} className="chip">
                        {localized(occasion, locale)}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {recipe.variations && recipe.variations.length > 0 && (
                <section>
                  <h2>{t.variations}</h2>
                  <ul className="mt-3 list-disc space-y-1.5 ps-6">
                    {recipe.variations.map((variation, index) => (
                      <li key={index}>{localized(variation, locale)}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <aside>
            <div className="card-surface p-6">
              <h3 className="font-serif text-lg font-bold">{t.quickFacts}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.category}</dt>
                  <dd className="font-semibold">{recipe.category.replace(/_/g, " ")}</dd>
                </div>
                {recipe.region && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.region}</dt>
                    <dd className="font-semibold">{recipe.region}</dd>
                  </div>
                )}
                {recipe.cookingTime && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.cookingTime}</dt>
                    <dd className="font-semibold">{recipe.cookingTime} min</dd>
                  </div>
                )}
                {recipe.difficulty && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--color-muted)]">{t.difficulty}</dt>
                    <dd className="font-semibold">{recipe.difficulty}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <VerificationBadge
                  verifiedAt={recipe.verifiedAt}
                  isSample={recipe.isSample}
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
