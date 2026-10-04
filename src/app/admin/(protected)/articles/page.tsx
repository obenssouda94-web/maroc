import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { DeleteArticleButton } from "@/components/admin/delete-article-button";
import { localized } from "@/lib/utils";

const STATUS_VARIANT: Record<string, "green" | "gold" | "outline" | "default"> = {
  published: "green",
  review: "gold",
  draft: "outline",
  archived: "default",
};

export default async function AdminArticlesPage() {
  await requireUser();

  const articles = await prisma.article.findMany({
    orderBy: [{ updatedAt: "desc" }],
    include: { author: { select: { email: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">Articles</h1>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            {articles.length} entr{articles.length === 1 ? "y" : "ies"} in the CMS.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-moroccan-red)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-moroccan-red-dark)]"
        >
          <Plus className="h-4 w-4" aria-hidden />
          New article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-2)]">
            <FileText className="h-7 w-7 text-[var(--color-muted)]" aria-hidden />
          </span>
          <p className="font-serif text-lg font-bold">No articles yet</p>
          <p className="max-w-sm text-sm text-[var(--color-muted)]">
            Create the first article to start populating the knowledge platform.
          </p>
          <Link
            href="/admin/articles/new"
            className="mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-moroccan-red)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-moroccan-red-dark)]"
          >
            <Plus className="h-4 w-4" aria-hidden />
            New article
          </Link>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto p-2 sm:p-4">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Title
                </th>
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Category
                </th>
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Status
                </th>
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Author
                </th>
                <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Updated
                </th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-2)]/60"
                >
                  <td className="px-3 py-3">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="font-medium transition-colors hover:text-[var(--color-moroccan-red)]"
                    >
                      {localized(article.title as never, "en") || article.slug}
                    </Link>
                    <p className="mt-0.5 font-mono text-xs text-[var(--color-muted)]">{article.slug}</p>
                  </td>
                  <td className="px-3 py-3 text-sm text-[var(--color-muted)]">{article.category}</td>
                  <td className="px-3 py-3">
                    <Badge variant={STATUS_VARIANT[article.status] ?? "outline"}>{article.status}</Badge>
                  </td>
                  <td className="px-3 py-3 text-xs text-[var(--color-muted)]">
                    {article.author?.email ?? "—"}
                  </td>
                  <td className="px-3 py-3 text-xs text-[var(--color-muted)]">
                    {new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(
                      article.updatedAt,
                    )}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <DeleteArticleButton id={article.id} slug={article.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
