import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

const PUBLIC_FILE = /\.(?!svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest|js|css|map).+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never touch static assets, API routes or Next internals.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already has a valid locale prefix? Continue.
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Detect the user's preferred locale.
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  const header = request.headers.get("accept-language");
  let locale = defaultLocale;

  if (cookie && isLocale(cookie)) {
    locale = cookie;
  } else if (header) {
    const accepted = header
      .split(",")
      .map((part) => {
        const [tag, q] = part.split(";q=");
        return { tag: tag.trim().toLowerCase(), q: q ? Number.parseFloat(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    const primary = accepted.find((a) => {
      const base = a.tag.split("-")[0];
      return (locales as readonly string[]).includes(base);
    });
    if (primary) locale = primary.tag.split("-")[0] as never;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
