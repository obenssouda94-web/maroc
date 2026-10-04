import Link from "next/link";
import type { SourceRef } from "@/types";
import { ExternalLink, FileText } from "lucide-react";
import { localized } from "@/lib/utils";
import type { Locale } from "@/types";

interface SourceCardProps {
  source?: SourceRef;
  sourceUrl?: string;
  publishedAt?: string;
  verifiedAt?: string;
  locale: Locale;
  labels: {
    source: string;
    sources: string;
    publishedOn: string;
    lastVerified: string;
  };
  className?: string;
}

export function SourceCard({
  source,
  sourceUrl,
  publishedAt,
  verifiedAt,
  locale,
  labels,
  className,
}: SourceCardProps) {
  const url = source?.url || sourceUrl;
  if (!source && !url) return null;

  return (
    <div
      className={
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 " +
        (className ?? "")
      }
    >
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        <FileText className="h-3.5 w-3.5" aria-hidden />
        {labels.source}
      </div>
      <p className="text-sm font-medium leading-snug">
        {source ? localized(source.title as never, locale) || source.title : labels.source}
      </p>
      {source?.institution && (
        <p className="mt-0.5 text-xs text-[var(--color-muted)]">{source.institution}</p>
      )}
      <dl className="mt-3 space-y-1 text-xs text-[var(--color-muted)]">
        {publishedAt && (
          <div className="flex gap-2">
            <dt className="shrink-0">{labels.publishedOn}:</dt>
            <dd>{publishedAt}</dd>
          </div>
        )}
        {verifiedAt && (
          <div className="flex gap-2">
            <dt className="shrink-0">{labels.lastVerified}:</dt>
            <dd>{verifiedAt}</dd>
          </div>
        )}
      </dl>
      {url && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-moroccan-red)] link-underline"
        >
          {source?.institution ?? labels.source}
          <ExternalLink className="h-3 w-3" aria-hidden />
        </Link>
      )}
    </div>
  );
}
