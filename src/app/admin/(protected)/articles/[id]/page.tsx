import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArticleForm } from "@/components/admin/article-form";
import { updateArticle } from "@/lib/actions/articles";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();

  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">Edit article</h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          {article.slug} · last updated{" "}
          {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(article.updatedAt)}
        </p>
      </div>
      <div className="card-surface p-6 sm:p-8">
        <ArticleForm
          action={updateArticle.bind(null, article.id)}
          submitLabel="Save changes"
          article={{
            id: article.id,
            slug: article.slug,
            title: article.title,
            description: article.description,
            content: article.content,
            language: article.language,
            category: article.category,
            status: article.status,
            sourceUrl: article.sourceUrl,
            featuredImage: article.featuredImage,
            tags: article.tags,
          }}
        />
      </div>
    </div>
  );
}
