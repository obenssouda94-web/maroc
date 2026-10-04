import Fuse from "fuse.js";
import type { Locale, SearchDocument, SearchableType } from "@/types";
import { localized } from "@/lib/utils";
import regions from "@/data/regions";
import cities from "@/data/cities";
import { historicalPeriods } from "@/data/history";
import { dynasties } from "@/data/dynasties";
import { royalFigures } from "@/data/royal-figures";
import { institutions } from "@/data/institutions";
import { laws } from "@/data/laws";
import heritageSites from "@/data/heritage";
import recipes from "@/data/recipes";
import { eventsList } from "@/data/events";
import { symbolsList } from "@/data/symbols";

interface Seed {
  slug: string;
  type: SearchableType;
  title: () => string;
  titleLocalized?: () => Partial<Record<Locale, string>>;
  description: () => string;
  category?: string;
  href: string;
  sourceUrl?: string;
  verifiedAt?: string;
  isSample?: boolean;
}

function pathFor(type: SearchableType, slug: string): string {
  const base: Record<SearchableType, string> = {
    region: "regions",
    city: "cities",
    period: "history",
    dynasty: "monarchy",
    royal: "monarchy",
    institution: "government",
    law: "laws",
    heritage: "heritage",
    recipe: "cuisine",
    event: "events",
    symbol: "symbols",
  };
  return `/${base[type]}/${slug}`;
}

/**
 * Build the flat search corpus for a given locale. All entities are converted
 * to a common SearchDocument shape with a ready-to-use localized href.
 */
export function buildSearchDocuments(locale: Locale): SearchDocument[] {
  const seeds: Seed[] = [
    ...regions.map((region) => ({
      slug: region.slug,
      type: "region" as const,
      title: () => localized(region.name, locale),
      titleLocalized: () => region.name,
      description: () => localized(region.geography, locale),
      category: region.code,
      href: pathFor("region", region.slug),
      sourceUrl: region.sourceUrl,
      verifiedAt: region.verifiedAt,
      isSample: region.isSample,
    })),
    ...cities.map((city) => ({
      slug: city.slug,
      type: "city" as const,
      title: () => localized(city.name, locale),
      titleLocalized: () => city.name,
      description: () => localized(city.description, locale),
      category: city.region,
      href: pathFor("city", city.slug),
      sourceUrl: city.sourceUrl,
      verifiedAt: city.verifiedAt,
      isSample: city.isSample,
    })),
    ...historicalPeriods.map((period) => ({
      slug: period.slug,
      type: "period" as const,
      title: () => localized(period.title, locale),
      titleLocalized: () => period.title,
      description: () => localized(period.summary, locale),
      category: period.era,
      href: pathFor("period", period.slug),
      sourceUrl: period.sourceUrl,
      verifiedAt: period.verifiedAt,
      isSample: period.isSample,
    })),
    ...dynasties.map((dynasty) => ({
      slug: dynasty.slug,
      type: "dynasty" as const,
      title: () => localized(dynasty.name, locale),
      titleLocalized: () => dynasty.name,
      description: () => localized(dynasty.summary, locale),
      category: localized(dynasty.dateLabel, locale),
      href: pathFor("dynasty", dynasty.slug),
      sourceUrl: dynasty.sourceUrl,
      verifiedAt: dynasty.verifiedAt,
      isSample: dynasty.isSample,
    })),
    ...royalFigures.map((figure) => ({
      slug: figure.slug,
      type: "royal" as const,
      title: () => localized(figure.name, locale),
      titleLocalized: () => figure.name,
      description: () => localized(figure.summary, locale),
      category: figure.dynasty,
      href: pathFor("royal", figure.slug),
      sourceUrl: figure.sourceUrl,
      verifiedAt: figure.verifiedAt,
      isSample: figure.isSample,
    })),
    ...institutions.map((institution) => ({
      slug: institution.slug,
      type: "institution" as const,
      title: () => localized(institution.name, locale),
      titleLocalized: () => institution.name,
      description: () => localized(institution.content, locale),
      category: institution.type,
      href: pathFor("institution", institution.slug),
      sourceUrl: institution.sourceUrl,
      verifiedAt: institution.verifiedAt,
      isSample: institution.isSample,
    })),
    ...laws.map((law) => ({
      slug: law.slug,
      type: "law" as const,
      title: () => localized(law.title, locale),
      titleLocalized: () => law.title,
      description: () => localized(law.summary, locale),
      category: law.category,
      href: pathFor("law", law.slug),
      sourceUrl: law.sourceUrl,
      verifiedAt: law.verifiedAt,
      isSample: law.isSample,
    })),
    ...heritageSites.map((site) => ({
      slug: site.slug,
      type: "heritage" as const,
      title: () => localized(site.name, locale),
      titleLocalized: () => site.name,
      description: () => localized(site.summary, locale),
      category: site.category,
      href: pathFor("heritage", site.slug),
      sourceUrl: site.sourceUrl,
      verifiedAt: site.verifiedAt,
      isSample: site.isSample,
    })),
    ...recipes.map((recipe) => ({
      slug: recipe.slug,
      type: "recipe" as const,
      title: () => localized(recipe.name, locale),
      titleLocalized: () => recipe.name,
      description: () => localized(recipe.origin ?? recipe.name, locale),
      category: recipe.category,
      href: pathFor("recipe", recipe.slug),
      sourceUrl: recipe.sourceUrl,
      verifiedAt: recipe.verifiedAt,
      isSample: recipe.isSample,
    })),
    ...eventsList.map((event) => ({
      slug: event.slug,
      type: "event" as const,
      title: () => localized(event.title, locale),
      titleLocalized: () => event.title,
      description: () => localized(event.description ?? event.title, locale),
      category: event.category,
      href: pathFor("event", event.slug),
      sourceUrl: event.sourceUrl,
      verifiedAt: event.verifiedAt,
      isSample: event.isSample,
    })),
    ...symbolsList.map((symbol) => ({
      slug: symbol.slug,
      type: "symbol" as const,
      title: () => localized(symbol.name, locale),
      titleLocalized: () => symbol.name,
      description: () => localized(symbol.summary, locale),
      category: symbol.type,
      href: pathFor("symbol", symbol.slug),
      sourceUrl: symbol.sourceUrl,
      verifiedAt: symbol.verifiedAt,
      isSample: symbol.isSample,
    })),
  ];

  return seeds.map((seed) => ({
    id: `${seed.type}-${seed.slug}`,
    slug: seed.slug,
    type: seed.type,
    title: seed.title(),
    titleLocalized: seed.titleLocalized?.(),
    description: seed.description(),
    category: seed.category,
    locale,
    href: `/${locale}${seed.href}`,
    sourceUrl: seed.sourceUrl,
    verifiedAt: seed.verifiedAt,
    isSample: seed.isSample,
  }));
}

const fuseInstances = new Map<Locale, Fuse<SearchDocument>>();

function getFuse(locale: Locale): Fuse<SearchDocument> {
  let fuse = fuseInstances.get(locale);
  if (!fuse) {
    fuse = new Fuse(buildSearchDocuments(locale), {
      keys: [
        { name: "title", weight: 2 },
        { name: "description", weight: 1 },
        { name: "slug", weight: 0.6 },
        { name: "category", weight: 0.4 },
      ],
      includeScore: true,
      threshold: 0.45,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
    fuseInstances.set(locale, fuse);
  }
  return fuse;
}

export function search(
  query: string,
  locale: Locale,
  limit = 12,
  type?: SearchableType,
): SearchDocument[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];
  const fuse = getFuse(locale);
  let results = fuse.search(trimmed);
  if (type) {
    results = results.filter((result) => result.item.type === type);
  }
  return results.slice(0, limit).map((result) => result.item);
}

export function suggest(query: string, locale: Locale, limit = 6): SearchDocument[] {
  return search(query, locale, limit);
}
