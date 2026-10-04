import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import type { ContentTopic } from "@/types";
import { localized, localePath } from "@/lib/utils";
import { VerificationBadge } from "@/components/common/verification-badge";
import type { Dictionary } from "@/i18n/dictionaries";

interface TopicGridProps {
  locale: Locale;
  topics: ContentTopic[];
  basePath: string;
  showCategory?: boolean;
}

export function TopicGrid({ locale, topics, basePath, showCategory = true }: TopicGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {topics.map((topic) => (
        <Link
          key={topic.slug}
          href={localePath(`/${basePath}/${topic.slug}`, locale)}
          className="card-surface group flex flex-col p-6"
        >
          {showCategory && (
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-moroccan-green)]">
              {topic.category}
            </span>
          )}
          <h3 className="mt-1.5 font-serif text-lg font-bold leading-tight">
            {localized(topic.title, locale)}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
            {localized(topic.summary, locale)}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-moroccan-red)]">
            {topic.sections.length} sections
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden />
          </span>
        </Link>
      ))}
    </div>
  );
}

interface TopicDetailProps {
  locale: Locale;
  topic: ContentTopic;
  basePath: string;
  backLabel: string;
  dict: Dictionary;
}

export function TopicDetail({ locale, topic, basePath, backLabel, dict }: TopicDetailProps) {
  const t = dict.common;
  return (
    <article className="container-page py-12 sm:py-16">
      <Link
        href={localePath(`/${basePath}`, locale)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-moroccan-red)]"
      >
        <ArrowRight className="h-4 w-4 rotate-180 rtl:-rotate-180" aria-hidden />
        {backLabel}
      </Link>

      <header className="mt-6 max-w-3xl">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-moroccan-green)]">
          {topic.category}
        </span>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          {localized(topic.title, locale)}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
          {localized(topic.summary, locale)}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <VerificationBadge
            verifiedAt={topic.verifiedAt}
            isSample={topic.isSample}
            labels={{
              verified: dict.verification.verified,
              outdated: dict.verification.outdated,
              needsReview: dict.verification.needsReview,
              daysAgo: (days: number) => dict.verification.daysAgo.replace("{days}", String(days)),
              sample: t.sampleContent,
            }}
          />
        </div>
        <div className="divider-zellige mt-8" aria-hidden />
      </header>

      <div className="prose-moroc mt-8 max-w-3xl">
        {topic.sections.map((section) => (
          <section key={section.id} className="mb-10">
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              {localized(section.title, locale)}
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed">
              {localized(section.body, locale)}
            </p>
            {section.points && section.points.length > 0 && (
              <ul className="mt-4 list-disc space-y-2 ps-6">
                {section.points.map((point, index) => (
                  <li key={index}>{localized(point, locale)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {topic.related && topic.related.length > 0 && (
        <aside className="mt-12 max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-6">
          <h2 className="font-serif text-lg font-bold">{t.relatedPages}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {topic.related.map((rel, index) => (
              <li key={index}>
                <Link
                  href={localePath(`/${rel.type === "royal" ? "monarchy" : rel.type === "recipe" ? "cuisine" : rel.type === "heritage" ? "heritage" : rel.type}/${rel.slug}`, locale)}
                  className="chip transition-colors hover:border-[var(--color-moroccan-red)]/40 hover:text-[var(--color-moroccan-red)]"
                >
                  {rel.slug.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
