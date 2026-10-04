import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 50;

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requireUser();

  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);

  const [total, logs] = await Promise.all([
    prisma.auditLog.count(),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { user: { select: { email: true } } },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">Audit logs</h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          {total} recorded event{total === 1 ? "" : "s"}.
        </p>
      </div>

      {logs.length === 0 ? (
        <div className="card-surface px-6 py-16 text-center">
          <p className="font-serif text-lg font-bold">No audit entries yet</p>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            Actions performed in the admin panel are logged here.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {logs.map((log) => (
            <li key={log.id} className="card-surface flex items-start gap-4 p-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-2)]">
                <span className="font-mono text-[10px] font-bold text-[var(--color-muted)]">
                  {log.action.slice(0, 2).toUpperCase()}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-sm font-semibold">{log.action}</p>
                  <Badge variant="outline">{log.entity}</Badge>
                </div>
                <p className="mt-1 truncate text-xs text-[var(--color-muted)]">
                  {log.user?.email ?? "system"} · {log.entityId ?? "—"}
                </p>
                {log.metadata ? (
                  <p className="mt-1 truncate font-mono text-[10px] text-[var(--color-muted)]">
                    {JSON.stringify(log.metadata)}
                  </p>
                ) : null}
              </div>
              <time
                className="shrink-0 text-xs text-[var(--color-muted)]"
                dateTime={log.createdAt.toISOString()}
              >
                {new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(
                  log.createdAt,
                )}
              </time>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {page > 1 && (
            <Link
              href={`/admin/audit?page=${page - 1}`}
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
              href={`/admin/audit?page=${page + 1}`}
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
