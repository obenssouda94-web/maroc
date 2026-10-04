"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import { locales, localeNames, localeFlagEmoji, isLocale } from "@/i18n/config";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  currentLocale: Locale;
  className?: string;
  compact?: boolean;
}

export function LanguageSelector({ currentLocale, className, compact }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function switchLocale(next: Locale) {
    if (next === currentLocale) {
      setOpen(false);
      return;
    }
    const segments = pathname.split("/");
    if (isLocale(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const newPath = segments.join("/") || `/${next}`;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = locales.includes(next) && (next === "ar" || next === "tz") ? "rtl" : "ltr";
    router.push(newPath);
    setOpen(false);
  }

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold transition-colors hover:bg-[var(--color-surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
      >
        <Globe className="h-4 w-4 text-[var(--color-muted)]" aria-hidden />
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="text-base leading-none">
            {localeFlagEmoji[currentLocale]}
          </span>
          {!compact && (
            <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-[var(--color-muted)] transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className="absolute end-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-lift)]"
        >
          {locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === currentLocale}>
              <button
                type="button"
                onClick={() => switchLocale(locale)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--color-surface-2)]",
                  locale === currentLocale && "bg-[var(--color-surface-2)] font-semibold",
                )}
              >
                <span aria-hidden className="text-lg leading-none">
                  {localeFlagEmoji[locale]}
                </span>
                <span className="flex-1">{localeNames[locale]}</span>
                {locale === currentLocale && (
                  <Check className="h-4 w-4 text-[var(--color-moroccan-red)]" aria-hidden />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
