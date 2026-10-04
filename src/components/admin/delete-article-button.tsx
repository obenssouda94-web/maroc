"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteArticle } from "@/lib/actions/articles";

interface DeleteArticleButtonProps {
  id: string;
  slug: string;
}

export function DeleteArticleButton({ id, slug }: DeleteArticleButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (pending) return;
    const confirmed = window.confirm(`Delete "${slug}"? This action cannot be undone.`);
    if (!confirmed) return;

    startTransition(async () => {
      await deleteArticle(id);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      aria-label={`Delete ${slug}`}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-moroccan-red-soft)] hover:text-[var(--color-moroccan-red)]",
        pending && "opacity-60",
      )}
    >
      <Trash2 className="h-4 w-4" aria-hidden />
    </button>
  );
}
