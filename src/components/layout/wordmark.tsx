import { cn } from "@/lib/utils";

interface MoroccoWordmarkProps {
  className?: string;
}

/**
 * The MAROC platform mark: a Moroccan-flag-inspired eight-point star
 * enclosing a zellige-inspired knot. Pure SVG, no external assets.
 */
export function MoroccoWordmark({ className }: MoroccoWordmarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="MAROC"
    >
      <defs>
        <linearGradient id="maroc-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c1272d" />
          <stop offset="55%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#006233" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#maroc-mark)" />
      <g fill="none" stroke="#fdfbf7" strokeOpacity="0.95" strokeWidth="1.8" strokeLinejoin="round">
        {/* eight-pointed star — khatam motif */}
        <path d="M24 8l4.6 6.4L36 12l-2.4 7.4L40 24l-6.4 4.6L36 36l-7.4-2.4L24 40l-4.6-6.4L12 36l2.4-7.4L8 24l6.4-4.6L12 12l7.4 2.4z" />
        {/* inner zellige knot */}
        <path d="M24 16.5l4 2.6v4.8l-4 2.6-4-2.6v-4.8z" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
