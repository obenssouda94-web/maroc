"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Sparkles } from "lucide-react";
import { cn, localePath } from "@/lib/utils";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNavGroups } from "@/lib/navigation";
import { LanguageSelector } from "@/components/layout/language-selector";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MoroccanFlag } from "@/components/brand/moroccan-flag";
import { MoroccoClock } from "@/components/layout/morocco-clock";
import { HeaderAnthem } from "@/components/layout/header-anthem";
import { MobileNav } from "@/components/layout/mobile-nav";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const groups = getNavGroups(locale, dict);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== localePath("", locale) && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-background)]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center gap-3 lg:h-18">
        <Link
          href={localePath("", locale)}
          className="flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          aria-label={dict.common.siteName}
        >
          <span className="flex h-10 w-[60px] shrink-0 items-center overflow-hidden rounded-md shadow-sm ring-1 ring-inset ring-black/10">
            <MoroccanFlag className="h-full w-full" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold tracking-tight">
              {dict.common.siteName}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {dict.common.siteTagline}
            </span>
          </span>
        </Link>

        <nav className="mx-auto hidden lg:flex" aria-label="Main">
          <ul className="flex items-center gap-0.5">
            {groups.map((group) => (
              <li key={group.id} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface-2)]"
                >
                  {group.label}
                </button>
                <div className="invisible absolute start-1/2 top-full z-50 w-[22rem] -translate-x-1/2 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 rtl:translate-x-1/2">
                  <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lift)]">
                    <div className="border-b border-[var(--color-border)] bg-zellige px-4 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-moroccan-red)]">
                        {group.label}
                      </p>
                    </div>
                    <ul className="grid gap-0.5 p-2">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-[var(--color-surface-2)]",
                                isActive(item.href) && "bg-[var(--color-surface-2)] font-semibold",
                              )}
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={localePath("/search", locale)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]"
            aria-label={dict.common.search}
          >
            <Search className="h-[18px] w-[18px]" aria-hidden />
          </Link>
          <Link
            href={localePath("/ai", locale)}
            className="hidden items-center gap-1.5 rounded-full bg-[var(--color-moroccan-green)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-moroccan-green-dark)] sm:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {dict.common.askAI}
          </Link>
          <HeaderAnthem
            src="/audio/hymne-cherifien.mp3"
            label={dict.page.anthemListenTitle}
          />
          <ThemeToggle
            className="hidden sm:inline-flex"
            labels={{ light: dict.common.lightMode, dark: dict.common.darkMode }}
          />
          <LanguageSelector currentLocale={locale} className="hidden sm:block" />
          <MoroccoClock
            label={dict.common.moroccoTime}
            className="hidden md:inline-flex"
          />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={dict.common.menu}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface-2)] lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
        dict={dict}
      />
    </header>
  );
}
