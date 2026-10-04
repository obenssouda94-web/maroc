import { BarChart3, Eye, Search, Sparkles, Globe } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { locales, localeLabels } from "@/i18n/config";
import { StatCard } from "@/components/admin/stat-card";

export default async function AdminAnalyticsPage() {
  await requireUser();

  const [pageViews, searchQueries, aiConversations, aiMessages, popularPages, topQueries, localeRows, recentViews] =
    await Promise.all([
      prisma.pageView.count(),
      prisma.searchQuery.count(),
      prisma.aiConversation.count(),
      prisma.aiMessage.count(),
      prisma.pageView.groupBy({
        by: ["path"],
        _count: true,
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),
      prisma.searchQuery.groupBy({
        by: ["query"],
        _count: true,
        orderBy: { _count: { query: "desc" } },
        take: 10,
      }),
      prisma.pageView.groupBy({
        by: ["locale"],
        _count: true,
        orderBy: { _count: { locale: "desc" } },
      }),
      prisma.pageView.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { path: true, locale: true, referrer: true, country: true, createdAt: true },
      }),
    ]);

  const maxPageCount = popularPages[0]?._count ?? 1;
  const maxQueryCount = topQueries[0]?._count ?? 1;
  const hasData = pageViews > 0 || searchQueries > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          Traffic and engagement across the platform.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Page views" value={pageViews} icon={Eye} tone="red" />
        <StatCard label="Search queries" value={searchQueries} icon={Search} tone="gold" />
        <StatCard label="AI conversations" value={aiConversations} icon={Sparkles} tone="green" />
        <StatCard label="AI messages" value={aiMessages} icon={Sparkles} tone="neutral" />
      </div>

      {!hasData ? (
        <div className="card-surface flex flex-col items-center gap-3 px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-2)]">
            <BarChart3 className="h-7 w-7 text-[var(--color-muted)]" aria-hidden />
          </span>
          <p className="font-serif text-lg font-bold">No analytics data yet</p>
          <p className="max-w-sm text-sm text-[var(--color-muted)]">
            Page views and search queries are recorded as visitors browse the site.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card-surface p-6">
            <h2 className="mb-4 font-serif text-lg font-bold">Popular pages</h2>
            {popularPages.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">No data.</p>
            ) : (
              <ul className="space-y-3">
                {popularPages.map((row) => (
                  <li key={row.path}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate font-mono text-xs">{row.path}</span>
                      <span className="shrink-0 font-semibold">{row._count}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-3)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-moroccan-red)]"
                        style={{ width: `${Math.max(4, (row._count / maxPageCount) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-surface p-6">
            <h2 className="mb-4 font-serif text-lg font-bold">Top search queries</h2>
            {topQueries.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">No data.</p>
            ) : (
              <ul className="space-y-3">
                {topQueries.map((row) => (
                  <li key={row.query}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate">{row.query}</span>
                      <span className="shrink-0 font-semibold">{row._count}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-3)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-gold)]"
                        style={{ width: `${Math.max(4, (row._count / maxQueryCount) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold">
              <Globe className="h-4 w-4" aria-hidden /> Language distribution
            </h2>
            {localeRows.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">No data.</p>
            ) : (
              <ul className="space-y-2.5">
                {localeRows.map((row) => (
                  <li key={row.locale} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">
                      {localeLabels[row.locale as (typeof locales)[number]] ?? row.locale}
                    </span>
                    <span className="font-semibold text-[var(--color-muted)]">{row._count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-surface p-6">
            <h2 className="mb-4 font-serif text-lg font-bold">Recent visits</h2>
            {recentViews.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">No data.</p>
            ) : (
              <ul className="divide-y divide-[var(--color-border)]">
                {recentViews.map((view, index) => (
                  <li key={index} className="py-2.5 first:pt-0 last:pb-0">
                    <p className="truncate font-mono text-xs font-medium">{view.path}</p>
                    <p className="mt-0.5 truncate text-xs text-[var(--color-muted)]">
                      {view.country ?? "â€”"} Â· {view.referrer ?? "direct"} Â·{" "}
                      {new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(
                        view.createdAt,
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
