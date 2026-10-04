import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-strong-border)] bg-[var(--color-surface-2)] px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-4 text-[var(--color-muted)]" aria-hidden>
        {icon ?? <SearchX className="h-10 w-10" />}
      </div>
      <h3 className="font-serif text-xl font-bold">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
