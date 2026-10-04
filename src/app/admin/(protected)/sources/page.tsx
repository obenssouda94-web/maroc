import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

const RELIABILITY_VARIANT: Record<string, "green" | "gold" | "red" | "outline"> = {
  high: "green",
  medium: "gold",
  low: "red",
  unverified: "outline",
};

const TYPE_LABEL: Record<string, string> = {
  official_government: "Official government",
  official_institution: "Official institution",
  legal_publication: "Legal publication",
  international_organization: "International organization",
  academic: "Academic",
  journalistic: "Journalistic",
  other: "Other",
};

export default async function AdminSourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  await requireUser();

  const params = await searchParams;
  const type = params.type ?? "";

  const where = type ? { type: type as never } : undefined;

  const [total, sources, typeCounts] = await Promise.all([
    prisma.source.count({ where }),
    prisma.source.findMany({
      where,
      orderBy: [{ title: "asc" }],
      take: 200,
    }),
    prisma.source.groupBy({
      by: ["type"],
      _count: true,
      orderBy: { _count: { type: "desc" } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">Sources</h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          {total} referenced source{total === 1 ? "" : "s"}.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Link
          href="/admin/sources"
          className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            !type
              ? "border-[var(--color-moroccan-red)] bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]"
              : "border-[var(--color-strong-border)] text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]"
          }`}
        >
          All ({typeCounts.reduce((sum, row) => sum + row._count, 0)})
        </Link>
        {typeCounts.map((row) => (
          <Link
            key={row.type}
            href={`/admin/sources?type=${row.type}`}
            className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              type === row.type
                ? "border-[var(--color-moroccan-red)] bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]"
                : "border-[var(--color-strong-border)] text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]"
            }`}
          >
            {TYPE_LABEL[row.type] ?? row.type} ({row._count})
          </Link>
        ))}
      </div>

      {sources.length === 0 ? (
        <div className="card-surface px-6 py-16 text-center">
          <p className="font-serif text-lg font-bold">No sources found</p>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            Try a different type filter.
          </p>
        </div>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {sources.map((source) => (
            <li key={source.id} className="card-surface flex flex-col gap-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium leading-tight">{source.title}</p>
                <Badge variant={RELIABILITY_VARIANT[source.reliability] ?? "outline"}>
                  {source.reliability}
                </Badge>
              </div>
              {source.institution && (
                <p className="text-xs text-[var(--color-muted)]">{source.institution}</p>
              )}
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-mono text-[11px] text-[var(--color-moroccan-red)] hover:underline"
              >
                {source.url}
              </a>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-muted)]">
                {TYPE_LABEL[source.type] ?? source.type}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
