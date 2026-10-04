// MAROC — The Digital Kingdom | Shared domain types

export type Locale = "ar" | "tz" | "fr" | "en" | "es";

export type LocalizedString = Record<Locale, string>;

export type Coordinates = {
  lat: number;
  lng: number;
};

export type ContentStatus = "draft" | "review" | "published" | "archived";
export type TranslationStatus = "draft" | "needs_review" | "reviewed" | "published";

export interface SourceRef {
  id: string;
  title: string;
  institution?: string;
  url?: string;
  type?:
    | "official_government"
    | "official_institution"
    | "legal_publication"
    | "international_organization"
    | "academic"
    | "journalistic"
    | "other";
  publishedAt?: string;
  accessedAt?: string;
  reliability?: "high" | "medium" | "low" | "unverified";
}

export interface Verifiable {
  sourceUrl?: string;
  publishedAt?: string;
  verifiedAt?: string;
  reviewDueAt?: string;
  /** Explicitly mark unverified demo content so the UI can flag it. */
  isSample?: boolean;
}

// --- Geography ---------------------------------------------------------------

export interface Region extends Verifiable {
  id: string;
  slug: string;
  code?: string;
  name: LocalizedString;
  capital: LocalizedString;
  capitalCoordinates?: Coordinates;
  population?: number;
  areaKm2?: number;
  coordinates: Coordinates;
  provinces: LocalizedString[];
  cities: string[]; // city slugs
  geography?: LocalizedString;
  history?: LocalizedString;
  culture?: LocalizedString;
  food?: LocalizedString;
  climate?: LocalizedString;
  tourism?: LocalizedString;
  economy?: LocalizedString;
  monuments?: string[]; // heritage slugs
  order: number;
}

export interface City extends Verifiable {
  id: string;
  slug: string;
  name: LocalizedString;
  region: string; // region slug
  population?: number;
  coordinates: Coordinates;
  isCapital?: boolean;
  isMajor?: boolean;
  timezone?: string;
  founded?: string;
  history?: LocalizedString;
  description?: LocalizedString;
  landmarks?: string[]; // heritage slugs
  food?: string[]; // recipe slugs
  economy?: LocalizedString;
  museums?: LocalizedString[];
  traditions?: LocalizedString;
  nearby?: string[]; // city slugs
  weather?: { lat: number; lng: number };
}

// --- History -----------------------------------------------------------------

export interface HistoricalPeriod extends Verifiable {
  id: string;
  slug: string;
  title: LocalizedString;
  startYear?: number;
  endYear?: number;
  /** Human readable date label, e.g. "788–974 CE" */
  dateLabel: LocalizedString;
  era: "prehistoric" | "ancient" | "medieval" | "early-modern" | "colonial" | "modern";
  summary: LocalizedString;
  content?: LocalizedString;
  figures?: string[];
  cities?: string[];
  monuments?: string[];
  keyEvents?: { year: string; title: LocalizedString }[];
  order: number;
}

export interface Dynasty extends Verifiable {
  id: string;
  slug: string;
  name: LocalizedString;
  startYear?: number;
  endYear?: number;
  dateLabel: LocalizedString;
  summary: LocalizedString;
  content?: LocalizedString;
  capitals?: LocalizedString[];
  monarchs: string[]; // royal figure ids/slugs
  order: number;
}

export interface RoyalFigure extends Verifiable {
  id: string;
  slug: string;
  name: LocalizedString;
  title?: LocalizedString;
  reignStart?: string;
  reignEnd?: string;
  birthYear?: number;
  deathYear?: number;
  isCurrent?: boolean;
  dynasty?: string;
  summary: LocalizedString;
  content?: LocalizedString;
  role?: LocalizedString;
}

// --- Government & law --------------------------------------------------------

export interface Institution extends Verifiable {
  id: string;
  slug: string;
  name: LocalizedString;
  type:
    | "king"
    | "government"
    | "head_of_government"
    | "ministry"
    | "parliament"
    | "representatives"
    | "councillors"
    | "judiciary"
    | "constitutional_court"
    | "regional"
    | "local"
    | "public_institution";
  level: 1 | 2 | 3;
  parent?: string;
  constitutionalBasis?: LocalizedString;
  responsibilities?: LocalizedString[];
  website?: string;
  content: LocalizedString;
  currentHolder?: LocalizedString;
  order: number;
}

export type LawCategory =
  | "constitutional"
  | "civil"
  | "criminal"
  | "family"
  | "commercial"
  | "labor"
  | "administrative"
  | "digital"
  | "consumer"
  | "education";

export interface Law extends Verifiable {
  id: string;
  slug: string;
  title: LocalizedString;
  category: LawCategory;
  officialTitle?: LocalizedString;
  reference?: string;
  date?: string;
  status: "in_force" | "repealed" | "amended";
  summary: LocalizedString;
  content?: LocalizedString;
  keyPrinciples?: LocalizedString[];
  officialPublication?: string;
  version?: string;
}

// --- Culture, heritage, cuisine ----------------------------------------------

export type HeritageCategory =
  | "world_heritage"
  | "intangible"
  | "natural"
  | "monument"
  | "archaeological"
  | "medina"
  | "kasbah";

export interface HeritageSite extends Verifiable {
  id: string;
  slug: string;
  name: LocalizedString;
  category: HeritageCategory;
  unescoStatus: boolean;
  inscriptionYear?: number;
  city?: string;
  region?: string;
  coordinates?: Coordinates;
  summary: LocalizedString;
  content?: LocalizedString;
  significance?: LocalizedString;
  timeline?: { year: string; title: LocalizedString }[];
}

export type RecipeCategory =
  | "main"
  | "bread"
  | "breakfast"
  | "pastry"
  | "dessert"
  | "tea"
  | "soup"
  | "regional"
  | "festive"
  | "street"
  | "ingredient";

export interface Recipe extends Verifiable {
  id: string;
  slug: string;
  name: LocalizedString;
  category: RecipeCategory;
  region?: string;
  origin?: LocalizedString;
  history?: LocalizedString;
  ingredients: LocalizedString[];
  preparation: LocalizedString[];
  occasions?: LocalizedString[];
  variations?: LocalizedString[];
  cookingTime?: number;
  difficulty?: "easy" | "medium" | "hard";
  emoji?: string;
}

export interface MoroccoEvent extends Verifiable {
  id: string;
  slug: string;
  title: LocalizedString;
  category:
    | "national"
    | "cultural"
    | "religious"
    | "festival"
    | "music"
    | "cinema"
    | "art"
    | "sport"
    | "regional";
  startISO: string;
  endISO?: string;
  city?: string;
  region?: string;
  locationName?: LocalizedString;
  description?: LocalizedString;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  recurring?: boolean;
}

export interface NationalSymbol extends Verifiable {
  id: string;
  slug: string;
  type: "flag" | "anthem" | "motto" | "coat_of_arms" | "holiday" | "official";
  name: LocalizedString;
  summary: LocalizedString;
  content?: LocalizedString;
  date?: string;
  /** Optional audio asset path (e.g. an instrumental recording of the anthem). */
  audioUrl?: string;
}

// --- Search ------------------------------------------------------------------

export type SearchableType =
  | "region"
  | "city"
  | "period"
  | "dynasty"
  | "royal"
  | "institution"
  | "law"
  | "heritage"
  | "recipe"
  | "event"
  | "symbol";

export interface SearchDocument {
  id: string;
  slug: string;
  type: SearchableType;
  title: string;
  titleLocalized?: Partial<LocalizedString>;
  description: string;
  category?: string;
  locale: Locale;
  href: string;
  sourceUrl?: string;
  verifiedAt?: string;
  isSample?: boolean;
}

// --- Stats -------------------------------------------------------------------

export interface StatItem {
  key: string;
  value: string;
  labelKey: string;
  /** Optional href to a source for the statistic. */
  sourceUrl?: string;
  sourceLabel?: string;
  verifiedAt?: string;
  icon?: string;
}

// --- Prose content (religion, amazigh, culture, about) -----------------------

export interface ContentSection {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
  /** Optional bullet highlights rendered beneath the body. */
  points?: LocalizedString[];
}

export interface ContentTopic extends Verifiable {
  id: string;
  slug: string;
  title: LocalizedString;
  category: string;
  summary: LocalizedString;
  sections: ContentSection[];
  /** Slugs of related entities used for cross-linking. */
  related?: { type: SearchableType; slug: string }[];
}
