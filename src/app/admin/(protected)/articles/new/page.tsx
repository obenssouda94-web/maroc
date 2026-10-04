import { requireUser } from "@/lib/auth";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticle } from "@/lib/actions/articles";

export default async function NewArticlePage() {
  await requireUser();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">New article</h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          Fill in the content for the active language, then switch tabs to translate.
        </p>
      </div>
      <div className="card-surface p-6 sm:p-8">
        <ArticleForm action={createArticle} submitLabel="Create article" />
      </div>
    </div>
  );
}
