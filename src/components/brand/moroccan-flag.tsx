import { cn } from "@/lib/utils";

interface MoroccanFlagProps {
  className?: string;
}

/**
 * The flag of the Kingdom of Morocco: a red field bearing the green
 * interlaced five-pointed star — the Seal of Solomon (khatam Sulaymani) —
 * at its centre. Pure SVG, so it stays crisp at any size and adds no
 * raster asset to the bundle.
 *
 * Geometry: the star is a pentagram whose five outer points lie on a circle
 * (angles -90°, -18°, 54°, 126°, 198°), connected every second point.
 */
export function MoroccanFlag({ className }: MoroccanFlagProps) {
  return (
    <svg
      viewBox="0 0 300 200"
      role="img"
      aria-label="Drapeau du Maroc"
      className={cn("block h-auto w-full", className)}
    >
      {/* Red field — flag red, carried by the Alaouite dynasty since the 17th c. */}
      <rect width="300" height="200" fill="#c1272d" />
      {/* Green interlaced pentagram, centred at (150, 100), outer radius 58 */}
      <path
        d="M150 42 L184.1 146.9 L94.8 82.1 L205.2 82.1 L115.9 146.9 Z"
        fill="none"
        stroke="#006233"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
