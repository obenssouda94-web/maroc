import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-foreground)] transition-colors",
        "placeholder:text-[var(--color-muted)]/70",
        "focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60 focus-visible:ring-2 focus-visible:ring-[var(--color-moroccan-red)]/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-xl border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-foreground)] transition-colors",
        "placeholder:text-[var(--color-muted)]/70",
        "focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60 focus-visible:ring-2 focus-visible:ring-[var(--color-moroccan-red)]/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("skeleton", className)} role="presentation" />
);
