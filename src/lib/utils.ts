import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale, LocalizedString } from "@/types";
import { defaultLocale } from "@/i18n/config";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Get a string in the active locale, falling back to English, then to the
 * first available language. Never throws.
 */
export function localized(value: LocalizedString | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value[defaultLocale] || value.en || Object.values(value)[0] || "";
}

/**
 * Interpolate {placeholders} into a dictionary string.
 */
export function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
}

export function t(
  dict: Record<string, unknown>,
  path: string,
  params?: Record<string, string | number>,
): string {
  const segments = path.split(".");
  let current: unknown = dict;
  for (const segment of segments) {
    if (current && typeof current === "object" && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? interpolate(current, params) : path;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatNumber(value: number | undefined | null, locale: Locale): string {
  if (value === undefined || value === null) return "—";
  const localeTag = { ar: "ar-MA", tz: "zgh-MA", fr: "fr-MA", en: "en-US", es: "es-ES" }[locale];
  try {
    return new Intl.NumberFormat(localeTag).format(value);
  } catch {
    return String(value);
  }
}

export function formatDate(iso: string | Date | undefined, locale: Locale): string {
  if (!iso) return "—";
  const date = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(date.getTime())) return "—";
  const localeTag = { ar: "ar-MA", tz: "zgh-MA", fr: "fr-MA", en: "en-US", es: "es-ES" }[locale];
  try {
    return new Intl.DateTimeFormat(localeTag, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function daysSince(iso: string | Date | undefined): number | null {
  if (!iso) return null;
  const date = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(date.getTime())) return null;
  return Math.max(0, Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
