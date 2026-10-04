import { headers } from "next/headers";
import { defaultLocale, isLocale } from "@/i18n/config";
import type { Locale } from "@/types";
import { dictionaries, type Dictionary } from "@/i18n/dictionaries";

export { dictionaries };

export function parseLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export async function getLocaleFromHeaders(): Promise<Locale> {
  const headerList = await headers();
  const referer = headerList.get("referer") || "";
  const pathLocale = referer.split("/").find((segment) => isLocale(segment));
  return parseLocale(pathLocale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

export function isValidLocale(value: string | null | undefined): value is Locale {
  return value !== undefined && value !== null && isLocale(value);
}
