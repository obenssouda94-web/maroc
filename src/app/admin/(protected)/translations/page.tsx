import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { TranslationFilters } from "@/components/admin/translation-filters";
import { locales, localeLabels } from "@/i18n/config";
import type { Locale } from "@/types";

const PAGE_SIZE = 40;

const STATUS_VARIANT: Record<string, "green" | "gold" | "outline" | "default"> = {
  published: "green",
  reviewed: "green",
  needs_review: "gold",
  draft: "outline",
};

interface SearchParams {
  lang?: string;
  namespace?: string;
  status?: string;
  q?: string;
  page?: string;
}

function buildHref(params: SearchParams, overrides: Partial<SearchParams>): string {
  const merged = { ...params, ...overrides };
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value) query.set(key, value);
  }
  const qs = query.toString();
  return qs ? `/admin/translations?${qs}` : "/admin/translations";
}

export default async function AdminTranslationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireUser();

  const params = await searchParams;
  const lang = (params.lang ?? "en") as Locale;
  const namespace = params.namespace ?? "";
  const status = params.status ?? "";
  const query = params.q ?? "";
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);

  const where: {
    languageId: Locale;
    namespace?: string;
    status?: never;
    OR?: Array<{ key?: { contains: string }; value?: { contains: string } }>;
  } = { languageId: locales.includes(lang) ? lang : "en" };

  if (namespace) where.namespace = namespace;
  if (status) where.status = status as never;
  if (query) {
    where.OR = [
      { key: { contains: query } },
      { value: { contains: query } },
    ];
  }

  const [total, translations, namespaces] = await Promise.all([
    prisma.translation.count({ where }),
    prisma.translation.findMany({
      where,
      orderBy: [{ namespace: "asc" }, { key: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.translation.findMany({
      where: { languageId: where.languageId },
      distinct: ["namespace"],
      select: { namespace: true },
      orderBy: { namespace: "asc" },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">Translations</h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          {total} key{total === 1 ? "" : "s"} · {localeLabels[where.languageId]}
        </p>
      </div>

      {/* Filters */}
      <TranslationFilters namespaces={namespaces.map((n) => n.namespace)} />

      {translations.length === 0 ? (
        <div className="card-surface px-6 py-16 text-center">
          <p className="font-serif text-lg font-bold">No translations found</p>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            Try a different language, namespace or search term.
          </p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto p-2 sm:p-4">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Key
                </th>
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Value
                </th>
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Status
                </th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {translations.map((translation) => (
                <tr
                  key={translation.id}
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-2)]/60"
                >
                  <td className="px-3 py-3 align-top">
                    <p className="font-mono text-xs font-semibold">{translation.key}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-[var(--color-muted)]">
                      {translation.namespace}
                    </p>
                  </td>
                  <td className="max-w-md px-3 py-3 align-top">
                    <p className="line-clamp-2 text-sm text-[var(--color-muted)]">
                      {translation.value}
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Badge variant={STATUS_VARIANT[translation.status] ?? "outline"}>
                      {translation.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-right align-top">
                    <Link
                      href={`/admin/translations/${translation.id}`}
                      className="text-xs font-semibold text-[var(--color-moroccan-red)] link-underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={buildHref(params, { page: String(page - 1) })}
              className="inline-flex h-9 items-center rounded-full border border-[var(--color-strong-border)] px-4 text-xs font-semibold hover:bg-[var(--color-surface-2)]"
            >
              Previous
            </Link>
          )}
          <span className="text-xs text-[var(--color-muted)]">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={buildHref(params, { page: String(page + 1) })}
              className="inline-flex h-9 items-center rounded-full border border-[var(--color-strong-border)] px-4 text-xs font-semibold hover:bg-[var(--color-surface-2)]"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
