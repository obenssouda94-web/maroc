import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { eventsList } from "@/data/events";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { localized, localePath, formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.eventsTitle,
    description: dict.page.eventsSubtitle,
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;
  const now = new Date();
  const sorted = [...eventsList].sort(
    (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime(),
  );
  const upcoming = sorted.filter((e) => new Date(e.endISO ?? e.startISO) >= now);
  const past = sorted.filter((e) => new Date(e.endISO ?? e.startISO) < now).reverse();

  const renderList = (list: typeof sorted, heading: string) => (
    <section className="mt-12 first:mt-0">
      <h2 className="font-serif text-2xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {list.map((event) => (
          <Link
            key={event.slug}
            href={localePath(`/events/${event.slug}`, locale)}
            className="card-surface flex items-center gap-4 p-5"
          >
            <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]">
              <CalendarDays className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-base font-bold leading-tight">
                {localized(event.title, locale)}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--color-muted)]">
                {formatDate(event.startISO, locale)}
                {event.city ? ` · ${event.city}` : ""}
              </span>
            </span>
            <span className="chip shrink-0">{event.category}</span>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <PageHeader
        eyebrow={t.events}
        title={dict.page.eventsTitle}
        description={dict.page.eventsSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.eventsTitle, href: `/${locale}/events` },
        ]}
      />
      <div className="container-page py-12 sm:py-16">
        {upcoming.length > 0 ? renderList(upcoming, t.events) : null}
        {past.length > 0 ? renderList(past, dict.categories.event) : null}
        {upcoming.length === 0 && past.length === 0 && (
          <p className="text-sm text-[var(--color-muted)]">{t.noResults}</p>
        )}
      </div>
    </>
  );
}
