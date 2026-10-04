import type { Locale } from "@/types";

export const locales = ["ar", "tz", "fr", "en", "es"] as const;
export const defaultLocale: Locale = "en";
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  tz: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
  fr: "Français",
  en: "English",
  es: "Español",
};
export const localeFlagEmoji: Record<Locale, string> = {
  ar: "🇲🇦",
  tz: "ⵣ",
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
};
export const localeLabels: Record<Locale, string> = {
  ar: "Arabic",
  tz: "Tamazight",
  fr: "French",
  en: "English",
  es: "Spanish",
};
export const rtlLocales: Locale[] = ["ar", "tz"];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function direction(locale: Locale): "rtl" | "ltr" {
  return isRTL(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Font family per locale for optimal native typography. */
export const localeFontStack: Record<Locale, string> = {
  ar: "'Noto Naskh Arabic', 'Amiri', var(--font-sans)",
  tz: "'Noto Sans Tifinagh', 'Tifinagh', var(--font-sans)",
  fr: "var(--font-sans)",
  en: "var(--font-sans)",
  es: "var(--font-sans)",
};

export const localeHtmlLang: Record<Locale, string> = {
  ar: "ar",
  tz: "zgh",
  fr: "fr",
  en: "en",
  es: "es",
};
