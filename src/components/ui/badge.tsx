import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--color-surface-2)] text-[var(--color-muted)]",
        red: "border-[var(--color-moroccan-red)]/25 bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]",
        green:
          "border-[var(--color-moroccan-green)]/25 bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]",
        gold: "border-[var(--color-gold)]/30 bg-[var(--color-gold-soft)] text-[var(--color-gold-dark)]",
        outline: "border-[var(--color-strong-border)] text-[var(--color-muted)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
