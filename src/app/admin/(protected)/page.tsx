import Link from "next/link";
import {
  FileText,
  MapPin,
  Building2,
  BookOpen,
  UtensilsCrossed,
  CalendarDays,
  Clock,
  Languages,
  User,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const user = await requireUser();

  const [
    articles,
    publishedArticles,
    pendingReviews,
    regions,
    cities,
    periods,
    recipes,
    events,
    users,
    aiDocuments,
    translations,
    reviewedTranslations,
    auditLogs,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: "published" } }),
    prisma.article.count({ where: { status: "review" } }),
    prisma.region.count(),
    prisma.city.count(),
    prisma.historicalPeriod.count(),
    prisma.recipe.count(),
    prisma.event.count(),
    prisma.user.count(),
    prisma.aiDocument.count(),
    prisma.translation.count(),
    prisma.translation.count({ where: { status: { in: ["reviewed", "published"] } } }),
    prisma.auditLog.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { email: true } } },
    }),
  ]);

  const completion =
    translations === 0 ? 0 : Math.round((reviewedTranslations / translations) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back{user.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          Overview of the MAROC knowledge platform.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Total articles"
          value={articles}
          icon={FileText}
          tone="red"
          hint={`${publishedArticles} published`}
        />
        <StatCard
          label="Pending reviews"
          value={pendingReviews}
          icon={Clock}
          tone="gold"
          hint={pendingReviews > 0 ? "Awaiting an editor" : "Queue is clear"}
        />
        <StatCard
          label="Translation completion"
          value={`${completion}%`}
          icon={Languages}
          tone="green"
          hint={`${reviewedTranslations} of ${translations} reviewed`}
        />
        <StatCard
          label="AI knowledge documents"
          value={aiDocuments}
          icon={Sparkles}
          tone="neutral"
          hint="Retrieval corpus"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Regions" value={regions} icon={MapPin} tone="neutral" />
        <StatCard label="Cities" value={cities} icon={Building2} tone="neutral" />
        <StatCard label="Historical records" value={periods} icon={BookOpen} tone="neutral" />
        <StatCard label="Recipes" value={recipes} icon={UtensilsCrossed} tone="neutral" />
        <StatCard label="Events" value={events} icon={CalendarDays} tone="neutral" />
        <StatCard label="Users" value={users} icon={User} tone="neutral" />
        <StatCard
          label="Sources"
          value={await prisma.source.count()}
          icon={ShieldCheck}
          tone="neutral"
        />
        <StatCard
          label="Audit entries"
          value={await prisma.auditLog.count()}
          icon={FileText}
          tone="neutral"
        />
      </div>

      <div className="card-surface p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-serif text-lg font-bold">Recent activity</h2>
          <Link
            href="/admin/audit"
            className="text-xs font-semibold text-[var(--color-moroccan-red)] link-underline"
          >
            View all
          </Link>
        </div>
        {auditLogs.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">No activity recorded yet.</p>
        ) : (
          <ul className="divide-y divide-[var(--color-border)]">
            {auditLogs.map((log) => (
              <li key={log.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-2)]">
                  <FileText className="h-4 w-4 text-[var(--color-muted)]" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    <span className="font-semibold">{log.action}</span>{" "}
                    <span className="text-[var(--color-muted)]">on {log.entity}</span>
                  </p>
                  <p className="truncate text-xs text-[var(--color-muted)]">
                    {log.user?.email ?? "system"} ·{" "}
                    {log.createdAt.toLocaleString("en-GB", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <Badge variant="outline">{log.entity}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
