import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  tone?: "red" | "green" | "gold" | "neutral";
}

const TONE: Record<NonNullable<StatCardProps["tone"]>, string> = {
  red: "bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]",
  green: "bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]",
  gold: "bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]",
  neutral: "bg-[var(--color-surface-3)] text-[var(--color-muted)]",
};

export function StatCard({ label, value, icon: Icon, hint, tone = "neutral" }: StatCardProps) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            {label}
          </p>
          <p className="mt-1.5 font-serif text-3xl font-bold leading-none tracking-tight">
            {value}
          </p>
        </div>
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", TONE[tone])}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      {hint && (
        <p className="mt-3 text-xs text-[var(--color-muted)]">{hint}</p>
      )}
    </div>
  );
}
