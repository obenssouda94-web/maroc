import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  Noto_Naskh_Arabic,
  Noto_Sans_Tifinagh,
} from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getDictionary, isValidLocale } from "@/i18n/server";
import { locales, direction, localeHtmlLang, defaultLocale } from "@/i18n/config";
import type { Locale } from "@/types";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
});

const tifinagh = Noto_Sans_Tifinagh({
  subsets: ["tifinagh"],
  weight: "400",
  variable: "--font-tifinagh",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = isValidLocale(locale) ? getDictionary(locale) : getDictionary(defaultLocale);
  const name = dict.common.siteName;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: {
      default: `${name} — ${dict.common.siteTagline} | ${dict.home.heroTitle}`,
      template: `%s | ${name} — ${dict.common.siteTagline}`,
    },
    description: dict.common.siteDescription,
    applicationName: `${name} — ${dict.common.siteTagline}`,
    keywords: [
      "Morocco",
      "Maroc",
      "المغرب",
      "ⵍⵎⵖⵔⵉⴱ",
      "Moroccan history",
      "Moroccan culture",
      "Amazigh",
      "Moroccan cuisine",
      "Moroccan cities",
      "Morocco Constitution",
      "Morocco government",
      "UNESCO Morocco",
      "Morocco map",
    ],
    authors: [{ name: `${name} — ${dict.common.siteTagline}` }],
    creator: `${name} — ${dict.common.siteTagline}`,
    openGraph: {
      type: "website",
      siteName: `${name} — ${dict.common.siteTagline}`,
      title: `${name} — ${dict.common.siteTagline}`,
      description: dict.common.siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — ${dict.common.siteTagline}`,
      description: dict.common.siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf7" },
    { media: "(prefers-color-scheme: dark)", color: "#14130f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const dict = getDictionary(safeLocale);

  return (
    <html
      lang={localeHtmlLang[safeLocale]}
      dir={direction(safeLocale)}
      suppressHydrationWarning
    >
      <body
        className={`${plusJakarta.variable} ${playfair.variable} ${naskh.variable} ${tifinagh.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:start-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-[var(--color-moroccan-red)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white"
          >
            {dict.common.skipToContent}
          </a>
          <Header locale={safeLocale} dict={dict} />
          <main id="main-content" className="min-h-[60vh]">
            {children}
          </main>
          <Footer locale={safeLocale} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
