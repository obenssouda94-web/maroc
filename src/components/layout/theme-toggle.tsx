"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  labels?: { light: string; dark: string };
}

export function ThemeToggle({ className, labels }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const lightLabel = labels?.light ?? "Switch to light mode";
  const darkLabel = labels?.dark ?? "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? (isDark ? lightLabel : darkLabel) : "Toggle theme"}
      title={mounted ? (isDark ? lightLabel : darkLabel) : "Theme"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-[18px] w-[18px]" aria-hidden />
        ) : (
          <Moon className="h-[18px] w-[18px]" aria-hidden />
        )
      ) : (
        <span className="block h-[18px] w-[18px]" aria-hidden />
      )}
    </button>
  );
}
