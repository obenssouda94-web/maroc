"use client";

import { Pause, Play, RotateCcw, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { restartAnthem, toggleAnthem, useAnthem } from "@/lib/anthem";

interface AudioPlayerProps {
  src: string;
  label?: string;
  hint?: string;
  className?: string;
}

/**
 * Accessible anthem player. Binds to the shared anthem store, so it stays in
 * sync with the header control — one underlying stream, shared play/pause.
 * Renders nothing until the asset is reachable, so a missing file never
 * produces a broken control on the page.
 */
export function AudioPlayer({ src, label, hint, className }: AudioPlayerProps) {
  const { available, playing, time, duration } = useAnthem(src);

  if (!available) return null;

  const pct = duration ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <figure
      className={cn(
        "card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]">
          <Music2 className="h-5 w-5" aria-hidden />
        </div>
        {label && (
          <figcaption className="flex flex-col">
            <span className="font-serif text-base font-bold leading-tight">{label}</span>
            {hint && (
              <span className="text-xs text-[var(--color-muted)]">{hint}</span>
            )}
          </figcaption>
        )}
      </div>

      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={() => toggleAnthem(src)}
          aria-label={playing ? "Pause" : "Play"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-moroccan-green)] text-white transition-colors hover:bg-[var(--color-moroccan-green-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
        >
          {playing ? (
            <Pause className="h-5 w-5" aria-hidden />
          ) : (
            <Play className="h-5 w-5 translate-x-px" aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={restartAnthem}
          aria-label="Restart"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-strong-border)] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
        </button>

        <div className="flex flex-1 flex-col gap-1.5">
          <div
            className="relative h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-3)]"
            role="progressbar"
            aria-label="Playback progress"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration) || 0}
            aria-valuenow={Math.round(time)}
          >
            <span
              className="absolute inset-y-0 start-0 rounded-full bg-[var(--color-moroccan-green)] transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[var(--color-muted)]">
            <span>{formatTime(time)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}
