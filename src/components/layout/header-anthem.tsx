"use client";

import { Music2, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleAnthem, useAnthem } from "@/lib/anthem";

interface HeaderAnthemProps {
  src: string;
  label: string;
  className?: string;
}

/**
 * Compact anthem control for the header. Binds to the shared anthem store, so
 * it reflects and controls the same playback as the homepage player — starting
 * it here marks the homepage control as playing, and vice versa. Renders
 * nothing until the audio asset is reachable, so a missing file never produces
 * a broken control.
 */
export function HeaderAnthem({ src, label, className }: HeaderAnthemProps) {
  const { available, playing } = useAnthem(src);

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={() => toggleAnthem(src)}
      aria-label={`${label} — ${playing ? "Pause" : "Play"}`}
      title={label}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
        playing && "border-[var(--color-moroccan-green)] text-[var(--color-moroccan-green)]",
        className,
      )}
    >
      {playing ? (
        <Pause className="h-[18px] w-[18px]" aria-hidden />
      ) : (
        <Music2 className="h-[18px] w-[18px]" aria-hidden />
      )}
    </button>
  );
}
