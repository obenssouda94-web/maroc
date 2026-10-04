"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { cn, localePath } from "@/lib/utils";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNavGroups } from "@/lib/navigation";
import { LanguageSelector } from "@/components/layout/language-selector";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MoroccoWordmark } from "@/components/layout/wordmark";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}

export function MobileNav({ open, onClose, locale, dict }: MobileNavProps) {
  const groups = getNavGroups(locale, dict);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-y-0 end-0 flex h-full w-[88%] max-w-sm flex-col bg-[var(--color-background)] shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "rtl:-translate-x-full ltr:translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={dict.common.menu}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <MoroccoWordmark className="h-9 w-9" />
            <span className="font-serif text-lg font-bold">{dict.common.siteName}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.common.close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)]"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
          {groups.map((group) => (
            <section key={group.id} className="mb-5">
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-moroccan-red)]">
                {group.label}
              </p>
              <ul className="grid gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-surface-2)]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <Link
            href={localePath("/ai", locale)}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-moroccan-green)] px-4 py-3 text-sm font-semibold text-white"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {dict.common.askAI}
          </Link>
          <div className="flex items-center justify-between gap-2">
            <LanguageSelector currentLocale={locale} className="flex-1" />
            <ThemeToggle
              labels={{ light: dict.common.lightMode, dark: dict.common.darkMode }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
