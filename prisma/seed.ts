/**
 * MAROC — The Digital Kingdom | Database seed
 *
 * Populates the Prisma database from the canonical static datasets under
 * src/data, plus the i18n dictionaries and a bootstrap admin user.
 *
 * Idempotent: every record is upserted, so the script can be re-run safely.
 *
 * Local dev (SQLite, zero setup):
 *   npm run db:push:sqlite   # create schema + generate client
 *   npm run db:seed          # this script
 *   # or simply: npm run db:setup:sqlite
 */
import bcrypt from "bcryptjs";
import { PrismaClient, type Prisma } from "@prisma/client";
import { locales, defaultLocale, localeNames, localeLabels, isRTL } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
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
import { cultureTopics } from "@/data/culture";
import { amazighTopics } from "@/data/amazigh";
import { religionTopics } from "@/data/religion";
import { officialSources } from "@/data/stats";
import { localized, slugify } from "@/lib/utils";
import type { Locale, LocalizedString, Verifiable } from "@/types";

const prisma = new PrismaClient();

const TX = { timeout: 180_000 };

function log(label: string, count: number): void {
  console.log(`  ✓ ${label.padEnd(26)} ${count}`);
}

/** Prisma DateTime requires a full timestamp; our data uses date-only strings. */
function toDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/** Prisma's Json typing rejects arrays of interfaces (no implicit index signature); the runtime value is fine. */
function json(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

// ---------------------------------------------------------------------------
// Languages
// ---------------------------------------------------------------------------

async function seedLanguages() {
  await prisma.$transaction(async (tx) => {
    for (const [index, code] of locales.entries()) {
      await tx.language.upsert({
        where: { code },
        create: {
          code,
          name: localeLabels[code],
          nativeName: localeNames[code],
          direction: isRTL(code) ? "rtl" : "ltr",
          isActive: true,
          isDefault: code === defaultLocale,
          ordering: index,
        },
        update: {
          name: localeLabels[code],
          nativeName: localeNames[code],
          direction: isRTL(code) ? "rtl" : "ltr",
          isDefault: code === defaultLocale,
          ordering: index,
        },
      });
    }
  }, TX);
  log("languages", locales.length);
}

// ---------------------------------------------------------------------------
// Admin user & permissions
// ---------------------------------------------------------------------------

async function seedAdminAndPermissions() {
  const email = process.env.ADMIN_EMAIL || "admin@maroc.ma";
  const password = process.env.ADMIN_PASSWORD || "change-me-now";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
    update: { role: "SUPER_ADMIN", isActive: true },
  });

  const permissions: { name: string; roles: ("SUPER_ADMIN" | "ADMIN" | "EDITOR" | "TRANSLATOR" | "REVIEWER")[] }[] = [
    { name: "article:create", roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"] },
    { name: "article:edit", roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"] },
    { name: "article:publish", roles: ["SUPER_ADMIN", "ADMIN"] },
    { name: "article:delete", roles: ["SUPER_ADMIN"] },
    { name: "translation:edit", roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "TRANSLATOR"] },
    { name: "translation:review", roles: ["SUPER_ADMIN", "ADMIN", "REVIEWER"] },
    { name: "content:verify", roles: ["SUPER_ADMIN", "ADMIN", "REVIEWER"] },
    { name: "user:manage", roles: ["SUPER_ADMIN"] },
  ];

  await prisma.$transaction(async (tx) => {
    for (const permission of permissions) {
      await tx.permission.upsert({
        where: { name: permission.name },
        create: permission,
        update: { roles: permission.roles },
      });
    }
  }, TX);

  log("admin user", 1);
  log("permissions", permissions.length);
  return admin;
}

// ---------------------------------------------------------------------------
// Geography
// ---------------------------------------------------------------------------

async function seedGeography() {
  const regionIdBySlug = new Map<string, string>();

  await prisma.$transaction(async (tx) => {
    for (const region of regions) {
      const created = await tx.region.upsert({
        where: { slug: region.slug },
        create: {
          slug: region.slug,
          code: region.code,
          name: region.name,
          capital: region.capital,
          population: region.population,
          areaKm2: region.areaKm2,
          coordinates: region.coordinates,
          order: region.order,
        },
        update: {
          code: region.code,
          name: region.name,
          capital: region.capital,
          population: region.population,
          areaKm2: region.areaKm2,
          coordinates: region.coordinates,
          order: region.order,
        },
      });
      regionIdBySlug.set(region.slug, created.id);
    }
  }, TX);
  log("regions", regions.length);

  // Provinces (derived from each region's province list).
  let provinceCount = 0;
  await prisma.$transaction(async (tx) => {
    for (const region of regions) {
      const regionId = regionIdBySlug.get(region.slug);
      for (const [index, province] of region.provinces.entries()) {
        const name = localized(province, "en") || localized(province, "fr");
        const suffix = slugify(name) || `province-${index}`;
        const slug = `${region.code ?? region.slug}-${suffix}`.toLowerCase();
        provinceCount++;
        await tx.province.upsert({
          where: { slug },
          create: { slug, name: province, regionId },
          update: { name: province, regionId },
        });
      }
    }
  }, TX);
  log("provinces", provinceCount);

  await prisma.$transaction(async (tx) => {
    for (const city of cities) {
      await tx.city.upsert({
        where: { slug: city.slug },
        create: {
          slug: city.slug,
          name: city.name,
          population: city.population,
          coordinates: city.coordinates,
          isCapital: city.isCapital ?? false,
          isMajor: city.isMajor ?? false,
          timezone: city.timezone ?? "Africa/Casablanca",
          regionId: city.region ? regionIdBySlug.get(city.region) : undefined,
        },
        update: {
          name: city.name,
          population: city.population,
          coordinates: city.coordinates,
          isCapital: city.isCapital ?? false,
          isMajor: city.isMajor ?? false,
          timezone: city.timezone ?? "Africa/Casablanca",
          regionId: city.region ? regionIdBySlug.get(city.region) : undefined,
        },
      });
    }
  }, TX);
  log("cities", cities.length);
  return regionIdBySlug;
}

// ---------------------------------------------------------------------------
// History & monarchy
// ---------------------------------------------------------------------------

async function seedHistory() {
  await prisma.$transaction(async (tx) => {
    for (const period of historicalPeriods) {
      await tx.historicalPeriod.upsert({
        where: { slug: period.slug },
        create: {
          slug: period.slug,
          title: period.title,
          startYear: period.startYear,
          endYear: period.endYear,
          era: period.era,
          summary: period.summary,
          content: period.content,
          figures: period.figures,
          cities: period.cities,
          monuments: period.monuments,
          order: period.order,
        },
        update: {
          title: period.title,
          startYear: period.startYear,
          endYear: period.endYear,
          era: period.era,
          summary: period.summary,
          content: period.content,
          figures: period.figures,
          cities: period.cities,
          monuments: period.monuments,
          order: period.order,
        },
      });
    }
  }, TX);
  log("historical periods", historicalPeriods.length);

  const dynastyIdBySlug = new Map<string, string>();
  await prisma.$transaction(async (tx) => {
    for (const dynasty of dynasties) {
      const created = await tx.dynasty.upsert({
        where: { slug: dynasty.slug },
        create: {
          slug: dynasty.slug,
          name: dynasty.name,
          startYear: dynasty.startYear,
          endYear: dynasty.endYear,
          summary: dynasty.summary,
          content: dynasty.content,
          capitals: dynasty.capitals,
          order: dynasty.order,
        },
        update: {
          name: dynasty.name,
          startYear: dynasty.startYear,
          endYear: dynasty.endYear,
          summary: dynasty.summary,
          content: dynasty.content,
          capitals: dynasty.capitals,
          order: dynasty.order,
        },
      });
      dynastyIdBySlug.set(dynasty.slug, created.id);
    }
  }, TX);
  log("dynasties", dynasties.length);

  await prisma.$transaction(async (tx) => {
    for (const figure of royalFigures) {
      await tx.royalFigure.upsert({
        where: { slug: figure.slug },
        create: {
          slug: figure.slug,
          name: figure.name,
          reignStart: figure.reignStart,
          reignEnd: figure.reignEnd,
          birthYear: figure.birthYear,
          deathYear: figure.deathYear,
          title: figure.title,
          summary: figure.summary,
          content: figure.content,
          isCurrent: figure.isCurrent ?? false,
          dynastyId: figure.dynasty ? dynastyIdBySlug.get(figure.dynasty) : undefined,
        },
        update: {
          name: figure.name,
          reignStart: figure.reignStart,
          reignEnd: figure.reignEnd,
          birthYear: figure.birthYear,
          deathYear: figure.deathYear,
          title: figure.title,
          summary: figure.summary,
          content: figure.content,
          isCurrent: figure.isCurrent ?? false,
          dynastyId: figure.dynasty ? dynastyIdBySlug.get(figure.dynasty) : undefined,
        },
      });
    }
  }, TX);
  log("royal figures", royalFigures.length);
}

// ---------------------------------------------------------------------------
// Government & law
// ---------------------------------------------------------------------------

async function seedGovernment() {
  await prisma.$transaction(async (tx) => {
    for (const institution of institutions) {
      await tx.institution.upsert({
        where: { slug: institution.slug },
        create: {
          slug: institution.slug,
          name: institution.name,
          type: institution.type,
          constitutionalBasis: institution.constitutionalBasis,
          responsibilities: institution.responsibilities,
          website: institution.website,
          content: institution.content,
          order: institution.order,
        },
        update: {
          name: institution.name,
          type: institution.type,
          constitutionalBasis: institution.constitutionalBasis,
          responsibilities: institution.responsibilities,
          website: institution.website,
          content: institution.content,
          order: institution.order,
        },
      });
    }
  }, TX);

  // Link the institutional hierarchy (parent is referenced by slug).
  const idBySlug = new Map<string, string>(
    (await prisma.institution.findMany({ select: { id: true, slug: true } })).map((row) => [row.slug, row.id]),
  );
  await prisma.$transaction(async (tx) => {
    for (const institution of institutions) {
      if (!institution.parent) continue;
      const parentId = idBySlug.get(institution.parent);
      if (!parentId) continue;
      await tx.institution.update({
        where: { slug: institution.slug },
        data: { parentInstitutionId: parentId },
      });
    }
  }, TX);
  log("institutions", institutions.length);

  await prisma.$transaction(async (tx) => {
    for (const law of laws) {
      await tx.law.upsert({
        where: { slug: law.slug },
        create: {
          slug: law.slug,
          title: law.title,
          category: law.category,
          officialTitle: law.officialTitle,
          reference: law.reference,
          date: law.date,
          status: law.status,
          summary: law.summary,
          content: law.content,
          sourceUrl: law.sourceUrl,
          verifiedAt: toDate(law.verifiedAt),
        },
        update: {
          title: law.title,
          category: law.category,
          officialTitle: law.officialTitle,
          reference: law.reference,
          date: law.date,
          status: law.status,
          summary: law.summary,
          content: law.content,
          sourceUrl: law.sourceUrl,
          verifiedAt: toDate(law.verifiedAt),
        },
      });
    }
  }, TX);
  log("laws", laws.length);
}

// ---------------------------------------------------------------------------
// Culture, heritage, cuisine, events, symbols
// ---------------------------------------------------------------------------

async function seedCulture() {
  await prisma.$transaction(async (tx) => {
    for (const site of heritageSites) {
      await tx.heritageSite.upsert({
        where: { slug: site.slug },
        create: {
          slug: site.slug,
          name: site.name,
          category: site.category,
          unescoStatus: site.unescoStatus,
          inscriptionYear: site.inscriptionYear,
          coordinates: site.coordinates,
          summary: site.summary,
          content: site.content,
        },
        update: {
          name: site.name,
          category: site.category,
          unescoStatus: site.unescoStatus,
          inscriptionYear: site.inscriptionYear,
          coordinates: site.coordinates,
          summary: site.summary,
          content: site.content,
        },
      });
    }
  }, TX);
  log("heritage sites", heritageSites.length);

  // Resolve recipe regions to their localized names when possible.
  const regionNameBySlug = new Map<string, LocalizedString>(
    regions.map((region) => [region.slug, region.name]),
  );
  await prisma.$transaction(async (tx) => {
    for (const recipe of recipes) {
      await tx.recipe.upsert({
        where: { slug: recipe.slug },
        create: {
          slug: recipe.slug,
          name: recipe.name,
          category: recipe.category,
          region: recipe.region ? regionNameBySlug.get(recipe.region) : undefined,
          origin: recipe.origin,
          history: recipe.history,
          ingredients: recipe.ingredients,
          preparation: recipe.preparation,
          occasions: recipe.occasions,
          variations: recipe.variations,
          cookingTime: recipe.cookingTime,
          difficulty: recipe.difficulty ?? "medium",
        },
        update: {
          name: recipe.name,
          category: recipe.category,
          region: recipe.region ? regionNameBySlug.get(recipe.region) : undefined,
          origin: recipe.origin,
          history: recipe.history,
          ingredients: recipe.ingredients,
          preparation: recipe.preparation,
          occasions: recipe.occasions,
          variations: recipe.variations,
          cookingTime: recipe.cookingTime,
          difficulty: recipe.difficulty ?? "medium",
        },
      });
    }
  }, TX);
  log("recipes", recipes.length);

  await prisma.$transaction(async (tx) => {
    for (const event of eventsList) {
      await tx.event.upsert({
        where: { slug: event.slug },
        create: {
          slug: event.slug,
          title: event.title,
          category: event.category,
          startDate: new Date(event.startISO),
          endDate: event.endISO ? new Date(event.endISO) : undefined,
          location: event.locationName
            ? { name: localized(event.locationName, "en"), city: event.city, region: event.region }
            : undefined,
          description: event.description,
          status: event.status,
          sourceUrl: event.sourceUrl,
        },
        update: {
          title: event.title,
          category: event.category,
          startDate: new Date(event.startISO),
          endDate: event.endISO ? new Date(event.endISO) : undefined,
          location: event.locationName
            ? { name: localized(event.locationName, "en"), city: event.city, region: event.region }
            : undefined,
          description: event.description,
          status: event.status,
          sourceUrl: event.sourceUrl,
        },
      });
    }
  }, TX);
  log("events", eventsList.length);

  await prisma.$transaction(async (tx) => {
    for (const symbol of symbolsList) {
      await tx.symbol.upsert({
        where: { slug: symbol.slug },
        create: {
          slug: symbol.slug,
          name: symbol.name,
          type: symbol.type,
          summary: symbol.summary,
          content: symbol.content,
        },
        update: {
          name: symbol.name,
          type: symbol.type,
          summary: symbol.summary,
          content: symbol.content,
        },
      });
    }
  }, TX);
  log("symbols", symbolsList.length);
}

// ---------------------------------------------------------------------------
// Prose topics (culture / amazigh / religion) as CMS articles
// ---------------------------------------------------------------------------

async function seedArticles(adminId: string) {
  const groups = [
    { prefix: "culture", category: "culture" as const, topics: cultureTopics },
    { prefix: "amazigh", category: "amazigh" as const, topics: amazighTopics },
    { prefix: "religion", category: "religion" as const, topics: religionTopics },
  ];
  let count = 0;
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    for (const group of groups) {
      for (const topic of group.topics) {
        const slug = `${group.prefix}-${topic.slug}`;
        count++;
        await tx.article.upsert({
          where: { slug },
          create: {
            slug,
            title: topic.title,
            description: topic.summary,
            content: json({ sections: topic.sections, category: topic.category }),
            language: "en",
            category: group.category,
            authorId: adminId,
            status: "published",
            publishedAt: now,
            verifiedAt: toDate(topic.verifiedAt),
            tags: json([group.prefix, topic.category].filter(Boolean)),
          },
          update: {
            title: topic.title,
            description: topic.summary,
            content: json({ sections: topic.sections, category: topic.category }),
            category: group.category,
            status: "published",
            tags: json([group.prefix, topic.category].filter(Boolean)),
          },
        });
      }
    }
  }, TX);
  log("articles (prose topics)", count);
}

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------

async function seedSources() {
  const collected = new Map<string, { url: string; title: string; type?: string; reliability?: string; institution?: string }>();

  for (const ref of officialSources) {
    if (!ref.url) continue;
    collected.set(ref.url, {
      url: ref.url,
      title: ref.title,
      institution: ref.institution,
      type: ref.type,
      reliability: ref.reliability,
    });
  }

  const entities: Verifiable[] = [
    ...regions,
    ...cities,
    ...historicalPeriods,
    ...dynasties,
    ...royalFigures,
    ...institutions,
    ...laws,
    ...heritageSites,
    ...recipes,
    ...eventsList,
    ...symbolsList,
  ];
  for (const entity of entities) {
    if (!entity.sourceUrl) continue;
    if (collected.has(entity.sourceUrl)) continue;
    const title =
      "name" in entity ? localized((entity as { name: LocalizedString }).name, "en") : "MAROC source";
    collected.set(entity.sourceUrl, { url: entity.sourceUrl, title, type: "other" });
  }

  await prisma.$transaction(async (tx) => {
    for (const item of collected.values()) {
      await tx.source.upsert({
        where: { url: item.url },
        create: {
          url: item.url,
          title: item.title,
          institution: item.institution,
          type: (item.type as never) ?? "other",
          reliability: (item.reliability as never) ?? "unverified",
        },
        update: {
          title: item.title,
          institution: item.institution,
          type: (item.type as never) ?? "other",
          reliability: (item.reliability as never) ?? "unverified",
        },
      });
    }
  }, TX);
  log("sources", collected.size);
}

// ---------------------------------------------------------------------------
// Translations (i18n dictionaries)
// ---------------------------------------------------------------------------

function flatten(
  obj: Record<string, unknown>,
  prefix = "",
): { key: string; value: string }[] {
  const out: { key: string; value: string }[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      out.push({ key: prefix ? `${prefix}.${key}` : key, value });
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      out.push(...flatten(value as Record<string, unknown>, prefix ? `${prefix}.${key}` : key));
    }
  }
  return out;
}

async function seedTranslations() {
  let count = 0;
  for (const locale of locales as readonly Locale[]) {
    const dict = dictionaries[locale] as Record<string, unknown>;
    const entries: { namespace: string; key: string; value: string }[] = [];
    for (const [namespace, subtree] of Object.entries(dict)) {
      if (!subtree || typeof subtree !== "object" || Array.isArray(subtree)) continue;
      for (const entry of flatten(subtree as Record<string, unknown>)) {
        entries.push({ namespace, key: entry.key, value: entry.value });
      }
    }
    await prisma.$transaction(async (tx) => {
      for (const entry of entries) {
        await tx.translation.upsert({
          where: {
            key_languageId_namespace: {
              key: entry.key,
              languageId: locale,
              namespace: entry.namespace,
            },
          },
          create: {
            key: entry.key,
            languageId: locale,
            namespace: entry.namespace,
            value: entry.value,
            status: "published",
          },
          update: { value: entry.value, status: "published" },
        });
      }
    }, TX);
    count += entries.length;
  }
  log("translations", count);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\nMAROC — The Digital Kingdom | seeding database…\n");

  await seedLanguages();
  const admin = await seedAdminAndPermissions();
  await seedGeography();
  await seedHistory();
  await seedGovernment();
  await seedCulture();
  await seedArticles(admin.id);
  await seedSources();
  await seedTranslations();

  console.log("\nSeed complete.\n");
  console.log(`  Admin login: ${process.env.ADMIN_EMAIL || "admin@maroc.ma"}`);
  console.log("  (password from ADMIN_PASSWORD in your .env)\n");
}

main()
  .catch((error) => {
    console.error("\nSeed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
