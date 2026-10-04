import { search } from "@/lib/search";
import { localized } from "@/lib/utils";
import { historicalPeriods } from "@/data/history";
import { dynasties } from "@/data/dynasties";
import { royalFigures } from "@/data/royal-figures";
import { institutions } from "@/data/institutions";
import { laws } from "@/data/laws";
import heritageSites from "@/data/heritage";
import recipes from "@/data/recipes";
import { symbolsList } from "@/data/symbols";
import { eventsList } from "@/data/events";
import regions from "@/data/regions";
import cities from "@/data/cities";
import type { Locale, SearchDocument } from "@/types";

export interface AiCitation {
  slug: string;
  type: string;
  title: string;
  href: string;
  snippet: string;
  sourceUrl?: string;
  verifiedAt?: string;
  isSample?: boolean;
}

export interface AiAnswer {
  answer: string;
  citations: AiCitation[];
  documentCount: number;
  relatedQuestions: string[];
}

type LocaleText = {
  intro: string;
  empty: string;
  sourceNote: string;
  alsoTry: string;
};

const COPY: Record<Locale, LocaleText> = {
  en: {
    intro: "Here is what the knowledge base says:",
    empty:
      "I could not find verified information on this topic in the knowledge base. Try rephrasing your question or browse the sections of the site.",
    sourceNote: "Sources",
    alsoTry: "You may also ask",
  },
  fr: {
    intro: "Voici ce que dit la base de connaissances :",
    empty:
      "Je n'ai pas trouvé d'information vérifiée sur ce sujet dans la base de connaissances. Reformulez votre question ou parcourez les sections du site.",
    sourceNote: "Sources",
    alsoTry: "Vous pouvez aussi demander",
  },
  ar: {
    intro: "إليك ما تقوله قاعدة المعرفة:",
    empty:
      "لم أتمكن من العثور على معلومات موثقة حول هذا الموضوع في قاعدة المعرفة. أعد صياغة سؤالك أو تصفح أقسام الموقع.",
    sourceNote: "المصادر",
    alsoTry: "يمكنك أيضًا أن تسأل",
  },
  es: {
    intro: "Esto es lo que dice la base de conocimientos:",
    empty:
      "No he podido encontrar información verificada sobre este tema en la base de conocimientos. Reformula tu pregunta o explora las secciones del sitio.",
    sourceNote: "Fuentes",
    alsoTry: "También puedes preguntar",
  },
  tz: {
    intro: "Hānn īs tn āġāramt n tuggt:",
    empty:
      "Ur d-ufiɣ ara assaɣen ɣef usent-a ɣer tuggt n tẓuri. Ales-d i tuttra-inek neɣ snirm-d tigrawin n usmel.",
    sourceNote: "Iɣbula",
    alsoTry: "Tzmerḍ ad tstneḍ",
  },
};

const ENTITY_TEXT: Record<
  string,
  (slug: string, locale: Locale) => { title: string; body: string } | null
> = {
  period: (slug, locale) => {
    const item = historicalPeriods.find((p) => p.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.title, locale),
      body: [localized(item.summary, locale), localized(item.content, locale)]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
  dynasty: (slug, locale) => {
    const item = dynasties.find((d) => d.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.name, locale),
      body: [localized(item.summary, locale), localized(item.content, locale)]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
  royal: (slug, locale) => {
    const item = royalFigures.find((r) => r.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.name, locale),
      body: [localized(item.title, locale), localized(item.summary, locale), localized(item.content, locale)]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
  institution: (slug, locale) => {
    const item = institutions.find((i) => i.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.name, locale),
      body: localized(item.content, locale),
    };
  },
  law: (slug, locale) => {
    const item = laws.find((l) => l.slug === slug);
    if (!item) return null;
    const principles = (item.keyPrinciples ?? []).map((p) => `• ${localized(p, locale)}`).join("\n");
    return {
      title: localized(item.title, locale),
      body: [localized(item.summary, locale), localized(item.content, locale), principles]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
  heritage: (slug, locale) => {
    const item = heritageSites.find((s) => s.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.name, locale),
      body: [localized(item.summary, locale), localized(item.content, locale)]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
  recipe: (slug, locale) => {
    const item = recipes.find((r) => r.slug === slug);
    if (!item) return null;
    const ingredients = (item.ingredients ?? [])
      .map((i) => `• ${localized(i, locale)}`)
      .join("\n");
    const steps = (item.preparation ?? [])
      .map((step, index) => `${index + 1}. ${localized(step, locale)}`)
      .join("\n");
    return {
      title: localized(item.name, locale),
      body: [localized(item.history, locale), ingredients, steps].filter(Boolean).join("\n\n"),
    };
  },
  symbol: (slug, locale) => {
    const item = symbolsList.find((s) => s.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.name, locale),
      body: [localized(item.summary, locale), localized(item.content, locale)]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
  event: (slug, locale) => {
    const item = eventsList.find((e) => e.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.title, locale),
      body: localized(item.description, locale),
    };
  },
  region: (slug, locale) => {
    const item = regions.find((r) => r.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.name, locale),
      body: [localized(item.geography, locale), localized(item.history, locale)]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
  city: (slug, locale) => {
    const item = cities.find((c) => c.slug === slug);
    if (!item) return null;
    return {
      title: localized(item.name, locale),
      body: [localized(item.description, locale), localized(item.history, locale)]
        .filter(Boolean)
        .join("\n\n"),
    };
  },
};

function extractAnswerText(doc: SearchDocument, locale: Locale): string {
  const extractor = ENTITY_TEXT[doc.type];
  if (!extractor) return doc.description;
  const extracted = extractor(doc.slug, locale);
  return extracted ? extracted.body : doc.description;
}

export function answerQuestion(question: string, locale: Locale): AiAnswer {
  const copy = COPY[locale] ?? COPY.en;
  const trimmed = question.trim();

  const docs = search(trimmed, locale, 6);
  if (docs.length === 0) {
    return {
      answer: copy.empty,
      citations: [],
      documentCount: 0,
      relatedQuestions: [],
    };
  }

  const citations: AiCitation[] = docs.map((doc) => ({
    slug: doc.slug,
    type: doc.type,
    title: doc.title,
    href: doc.href,
    snippet: doc.description,
    sourceUrl: doc.sourceUrl,
    verifiedAt: doc.verifiedAt,
    isSample: doc.isSample,
  }));

  const paragraphs = docs.map((doc, index) => {
    const body = extractAnswerText(doc, locale).trim();
    const lead = body.split("\n")[0];
    const snippet = lead.length > 420 ? `${lead.slice(0, 420).trim()}…` : lead;
    return `**${index + 1}. ${doc.title}** — ${snippet}`;
  });

  const answer = [copy.intro, ...paragraphs].join("\n\n");

  const relatedQuestions = docs
    .slice(1, 4)
    .map((doc) => {
      const title = doc.title;
      return locale === "ar" || locale === "tz" ? `أخبرني عن ${title}` : `Tell me about ${title}`;
    })
    .filter((q, index, array) => array.indexOf(q) === index);

  return {
    answer,
    citations,
    documentCount: docs.length,
    relatedQuestions,
  };
}

export const AI_SUGGESTED_QUESTIONS: Record<Locale, string[]> = {
  en: [
    "What is the 2011 Constitution?",
    "Tell me about the Alaouite dynasty",
    "What are the UNESCO sites in Morocco?",
    "How is the Moroccan government organized?",
    "What is the history of Marrakech?",
  ],
  fr: [
    "Qu'est-ce que la Constitution de 2011 ?",
    "Parle-moi de la dynastie alaouite",
    "Quels sont les sites UNESCO au Maroc ?",
    "Comment est organisé le gouvernement marocain ?",
    "Quelle est l'histoire de Marrakech ?",
  ],
  ar: [
    "ما هي دستور 2011؟",
    "أخبرني عن السلالة العلوية",
    "ما هي مواقع اليونسكو في المغرب؟",
    "كيف ينظم الحكومة المغربية؟",
    "ما هو تاريخ مراكش؟",
  ],
  es: [
    "¿Qué es la Constitución de 2011?",
    "Háblame de la dinastía alauita",
    "¿Cuáles son los sitios UNESCO de Marruecos?",
    "¿Cómo se organiza el gobierno marroquí?",
    "¿Cuál es la historia de Marrakech?",
  ],
  tz: [
    "ⵉⵎⴰⵏ ⵉⵙ ⴷ ⵓⵙⵍⴰⵍ ⵏ 2011?",
    "ⵉⵏⵏ ⴰⵢⵍⵉⵖ ⵅⴼ ⵜⵙⵍⴰⵍⵜ ⵏ ⵍⵄⴰⵍⴰⵡⵉⵢⵉⵏ",
    "ⵎⴰⵏⵉ ⴰⵙⵉⵜⵏ ⵏ ⵉⵏⵙⴽⵓ ⴷ ⵍⵎⵖⵔⵉⴱ?",
    "ⵎⴰⵅⴼ ⵉⵙⵙⵎⵏⵉⵎⵏ ⵜⴰⵏⴱⴰⴹⵜ ⵜⴰⵎⵖⵔⵉⴱⵉⵜ?",
    "ⵎⴰⵏⵉ ⴰⵎⵣⵔⵓ ⵏ ⵎⵕⵕⴰⴽⵛ?",
  ],
};
