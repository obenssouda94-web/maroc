import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventsList } from "@/data/events";
import { PageHeader } from "@/components/common/section-heading";
import { VerificationBadge } from "@/components/common/verification-badge";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized, formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return eventsList.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const event = eventsList.find((item) => item.slug === slug);
  if (!event) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(event.title, safeLocale),
    description: localized(event.description ?? event.title, safeLocale),
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const t = dict.common;
  const event = eventsList.find((item) => item.slug === slug);
  if (!event) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${t.events} · ${event.category}`}
        title={localized(event.title, locale)}
        description={localized(event.description ?? event.title, locale)}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.eventsTitle, href: `/${locale}/events` },
          { label: localized(event.title, locale), href: `/${locale}/events/${event.slug}` },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <span className="chip">{event.category}</span>
            <span className="chip">{event.status.replace(/_/g, " ")}</span>
            {event.recurring && <span className="chip">{t.events} ↻</span>}
          </div>
          <div className="mt-6 card-surface p-6">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--color-muted)]">{t.date}</dt>
                <dd className="font-semibold">{formatDate(event.startISO, locale)}</dd>
              </div>
              {event.endISO && (
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.date}</dt>
                  <dd className="font-semibold">{formatDate(event.endISO, locale)}</dd>
                </div>
              )}
              {event.locationName && (
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.location}</dt>
                  <dd className="font-semibold">{localized(event.locationName, locale)}</dd>
                </div>
              )}
              {event.city && (
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-muted)]">{t.city}</dt>
                  <dd className="font-semibold">{event.city}</dd>
                </div>
              )}
            </dl>
            <div className="mt-5 border-t border-[var(--color-border)] pt-4">
              <VerificationBadge
                verifiedAt={event.verifiedAt}
                isSample={event.isSample}
                labels={{
                  verified: dict.verification.verified,
                  outdated: dict.verification.outdated,
                  needsReview: dict.verification.needsReview,
                  daysAgo: (days: number) =>
                    dict.verification.daysAgo.replace("{days}", String(days)),
                  sample: t.sampleContent,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
