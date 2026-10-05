import Link from "next/link";
import { Crown, Scale, Landmark } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { getFooterLinks } from "@/lib/navigation";
import { MoroccoWordmark } from "@/components/layout/wordmark";
import { localePath } from "@/lib/utils";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const links = getFooterLinks(locale, dict);
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="bg-zellige-dense border-b border-[var(--color-border)]" aria-hidden>
        <div className="container-page py-10 text-center">
          <p className="font-serif text-2xl font-bold text-gradient-flag sm:text-3xl">
            {dict.common.siteDescription}
          </p>
        </div>
      </div>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href={localePath("", locale)} className="flex items-center gap-2.5">
            <MoroccoWordmark className="h-10 w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl font-bold">{dict.common.siteName}</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {dict.common.siteTagline}
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
            {dict.footer.aboutText}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip">
              <Crown className="h-3 w-3" aria-hidden /> {dict.categories.monarchy}
            </span>
            <span className="chip">
              <Scale className="h-3 w-3" aria-hidden /> {dict.categories.constitution}
            </span>
            <span className="chip">
              <Landmark className="h-3 w-3" aria-hidden /> {dict.categories.government}
            </span>
          </div>
        </div>

        {Object.entries(links).map(([key, items]) => (
          <nav key={key} aria-label={dict.footer[key === "legal" ? "legalTitle" : key === "institutions" ? "institutionsTitle" : "exploreTitle"]}>
            <h2 className="mb-3 font-serif text-sm font-bold uppercase tracking-wider">
              {dict.footer[key === "legal" ? "legalTitle" : key === "institutions" ? "institutionsTitle" : "exploreTitle"]}
            </h2>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-moroccan-red)] link-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-[var(--color-muted)] sm:flex-row">
          <p>
            © {year} {dict.common.siteName} — {dict.common.rightsReserved}.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href={localePath("/about", locale)} className="link-underline hover:text-[var(--color-foreground)]">
              {dict.common.about}
            </Link>
            <span aria-hidden>•</span>
            <span>{dict.footer.madeWith}</span>
            <span aria-hidden>•</span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{dict.footer.developedBy}</span>
              <a
                href="mailto:abdelalizaid84@gmail.com"
                className="link-underline font-semibold hover:text-[var(--color-foreground)]"
              >
                ZAID ABDELALI
              </a>
              <span aria-hidden>•</span>
              <a
                href="tel:+212695098517"
                className="link-underline hover:text-[var(--color-foreground)]"
                dir="ltr"
              >
                +212 6 95 09 85 17
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
