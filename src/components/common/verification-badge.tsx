import { Badge } from "@/components/ui/badge";
import { cn, daysSince } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Clock, ShieldCheck } from "lucide-react";

interface VerificationBadgeProps {
  verifiedAt?: string;
  reviewDueAt?: string;
  isSample?: boolean;
  className?: string;
  labels?: {
    verified: string;
    outdated: string;
    needsReview: string;
    daysAgo: (days: number) => string;
    sample: string;
  };
}

export function VerificationBadge({
  verifiedAt,
  reviewDueAt,
  isSample,
  className,
  labels,
}: VerificationBadgeProps) {
  if (isSample) {
    return (
      <Badge variant="gold" className={cn("gap-1", className)} title={labels?.sample}>
        <AlertTriangle className="h-3 w-3" aria-hidden />
        {labels?.sample ?? "Sample"}
      </Badge>
    );
  }

  const days = daysSince(verifiedAt);
  const dueDays = daysSince(reviewDueAt);

  if (days === null) {
    return (
      <Badge variant="outline" className={cn("gap-1", className)}>
        <Clock className="h-3 w-3" aria-hidden />
        {labels?.needsReview ?? "Needs review"}
      </Badge>
    );
  }

  const isStale = reviewDueAt ? dueDays !== null && dueDays > 0 : days > 365;

  if (isStale) {
    return (
      <Badge variant="gold" className={cn("gap-1", className)}>
        <AlertTriangle className="h-3 w-3" aria-hidden />
        {labels?.outdated ?? "May be outdated"}
      </Badge>
    );
  }

  return (
    <Badge variant="green" className={cn("gap-1", className)}>
      <CheckCircle2 className="h-3 w-3" aria-hidden />
      {days === 0
        ? labels?.verified ?? "Verified"
        : labels?.daysAgo(days) ?? `Verified ${days}d ago`}
    </Badge>
  );
}

export function OfficialBadge({ label, className }: { label?: string; className?: string }) {
  return (
    <Badge variant="red" className={cn("gap-1", className)}>
      <ShieldCheck className="h-3 w-3" aria-hidden />
      {label ?? "Official source"}
    </Badge>
  );
}
