import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";
import { absoluteUrl, localePath } from "@/lib/utils";
import { amazighTopics } from "@/data/amazigh";
import { citiesList } from "@/data/cities";
import { cultureTopics } from "@/data/culture";
import { recipes } from "@/data/recipes";
import { eventsList } from "@/data/events";
import { institutions } from "@/data/institutions";
import { heritageSites } from "@/data/heritage";
import { historicalPeriods } from "@/data/history";
import { laws } from "@/data/laws";
import { dynasties } from "@/data/dynasties";
import { royalFigures } from "@/data/royal-figures";
import { regionsList } from "@/data/regions";
import { religionTopics } from "@/data/religion";
import { symbolsList } from "@/data/symbols";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface RouteSpec {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

/** Top-level pages: hub listings, tools and the home page. */
const STATIC_ROUTES: RouteSpec[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  // Content hubs
  { path: "/amazigh", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cities", priority: 0.9, changeFrequency: "weekly" },
  { path: "/culture", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cuisine", priority: 0.9, changeFrequency: "weekly" },
  { path: "/government", priority: 0.9, changeFrequency: "weekly" },
  { path: "/heritage", priority: 0.9, changeFrequency: "weekly" },
  { path: "/history", priority: 0.9, changeFrequency: "weekly" },
  { path: "/laws", priority: 0.9, changeFrequency: "weekly" },
  { path: "/monarchy", priority: 0.9, changeFrequency: "weekly" },
  { path: "/regions", priority: 0.9, changeFrequency: "weekly" },
  { path: "/religion", priority: 0.9, changeFrequency: "weekly" },
  { path: "/symbols", priority: 0.9, changeFrequency: "weekly" },
  { path: "/events", priority: 0.9, changeFrequency: "weekly" },
  // Tools and experiences
  { path: "/tourism", priority: 0.8, changeFrequency: "weekly" },
  { path: "/map", priority: 0.8, changeFrequency: "weekly" },
  { path: "/weather", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ai", priority: 0.6, changeFrequency: "weekly" },
  { path: "/search", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
];

/** Detail pages, keyed by their listing section. */
const DYNAMIC_ROUTES: { section: string; slugs: string[] }[] = [
  { section: "/amazigh", slugs: amazighTopics.map((topic) => topic.slug) },
  { section: "/cities", slugs: citiesList.map((city) => city.slug) },
  { section: "/culture", slugs: cultureTopics.map((topic) => topic.slug) },
  { section: "/cuisine", slugs: recipes.map((recipe) => recipe.slug) },
  { section: "/events", slugs: eventsList.map((event) => event.slug) },
  { section: "/government", slugs: institutions.map((institution) => institution.slug) },
  { section: "/heritage", slugs: heritageSites.map((site) => site.slug) },
  { section: "/history", slugs: historicalPeriods.map((period) => period.slug) },
  { section: "/laws", slugs: laws.map((law) => law.slug) },
  {
    section: "/monarchy",
    slugs: [...dynasties, ...royalFigures].map((item) => item.slug),
  },
  { section: "/regions", slugs: regionsList.map((region) => region.slug) },
  { section: "/religion", slugs: religionTopics.map((topic) => topic.slug) },
  { section: "/symbols", slugs: symbolsList.map((symbol) => symbol.slug) },
];

/**
 * One entry per route, with hreflang alternates for every locale. The entry URL
 * is the default-locale view and `x-default` points at the same page, so a
 * crawler learns every language version from a single `<url>`.
 */
function entry({ path, priority, changeFrequency }: RouteSpec, lastModified: Date): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(localePath(path, defaultLocale)),
  };
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localePath(path, locale));
  }

  return {
    url: absoluteUrl(localePath(path, defaultLocale)),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  const routes: RouteSpec[] = [...STATIC_ROUTES];

  for (const { section, slugs } of DYNAMIC_ROUTES) {
    for (const slug of slugs) {
      routes.push({ path: `${section}/${slug}`, priority: 0.7, changeFrequency: "monthly" });
    }
  }

  return routes.map((route) => entry(route, updated));
}
