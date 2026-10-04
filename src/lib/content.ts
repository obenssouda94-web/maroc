import { isValidLocale, getDictionary } from "@/i18n/server";
import { defaultLocale } from "@/i18n/config";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";

/** Resolve a route locale to a validated Locale, falling back to the default. */
export function resolveLocale(value: string | undefined): Locale {
  return isValidLocale(value) ? value : defaultLocale;
}

/** Convenience pair used by most content pages. */
export function localeBundle(value: string | undefined): { locale: Locale; dict: Dictionary } {
  const locale = resolveLocale(value);
  return { locale, dict: getDictionary(locale) };
}
