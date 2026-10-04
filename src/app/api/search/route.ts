import { NextResponse, type NextRequest } from "next/server";
import { search } from "@/lib/search";
import { isValidLocale } from "@/i18n/server";
import { defaultLocale } from "@/i18n/config";
import type { SearchableType } from "@/types";

const VALID_TYPES: SearchableType[] = [
  "region",
  "city",
  "period",
  "dynasty",
  "royal",
  "institution",
  "law",
  "heritage",
  "recipe",
  "event",
  "symbol",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const rawLocale = searchParams.get("locale");
  const locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const rawLimit = Number.parseInt(searchParams.get("limit") ?? "12", 10);
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 48) : 12;
  const rawType = searchParams.get("type");
  const type = rawType && VALID_TYPES.includes(rawType as SearchableType)
    ? (rawType as SearchableType)
    : undefined;

  const results = search(q, locale, limit, type);
  return NextResponse.json({ query: q, locale, count: results.length, results });
}
