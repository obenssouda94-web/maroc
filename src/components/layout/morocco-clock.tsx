"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MoroccoClockProps {
  label: string;
  className?: string;
}

/**
 * Live clock for the Kingdom's time zone (Africa/Casablanca). Morocco sits at
 * GMT+0 over winter and GMT+1 during summer time, so the UTC offset is read
 * from the runtime rather than hardcoded.
 *
 * Renders a neutral placeholder until mounted to avoid an SSR/client mismatch,
 * then ticks every second.
 */
export function MoroccoClock({ label, className }: MoroccoClockProps) {
  const [time, setTime] = useState<string>("--:--:--");
  const [offset, setOffset] = useState<string>("GMT");

  useEffect(() => {
    function tick() {
      const parts = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Africa/Casablanca",
        timeZoneName: "shortOffset",
      }).formatToParts(new Date());

      const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
      const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
      const second = parts.find((p) => p.type === "second")?.value ?? "00";
      const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";

      setTime(`${hour}:${minute}:${second}`);
      setOffset(tz);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-xs tabular-nums text-[var(--color-muted)]",
        className,
      )}
      title={`${label} (${offset})`}
      role="status"
      aria-label={`${label} ${time} ${offset}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-moroccan-green)]" aria-hidden />
      <span dir="ltr">{time}</span>
      <span className="text-[10px] font-semibold text-[var(--color-moroccan-red)]">{offset}</span>
    </span>
  );
}
