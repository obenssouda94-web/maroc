import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  badge?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  badge,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {badge && (
        <Badge variant="red" className="mb-3">
          {badge}
        </Badge>
      )}
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          {description}
        </p>
      )}
      <div className="divider-zellige mt-5" aria-hidden />
    </div>
  );
}

interface PageHeaderProps extends SectionHeadingProps {
  breadcrumbs?: { label: string; href: string }[];
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  align = "start",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-[var(--color-border)] bg-zellige",
        className,
      )}
    >
      <div className="pointer-events-none absolute -end-20 -top-24 h-72 w-72 rounded-full bg-[var(--color-moroccan-red)]/[0.07] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -start-20 bottom-0 h-64 w-64 rounded-full bg-[var(--color-moroccan-green)]/[0.06] blur-3xl" aria-hidden />
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--color-muted)]">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {index > 0 && <span aria-hidden>›</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-[var(--color-foreground)]">{crumb.label}</span>
                  ) : (
                    <a href={crumb.href} className="link-underline hover:text-[var(--color-foreground)]">
                      {crumb.label}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}
