import { cn } from "@/lib/utils";

interface MoroccanArmsProps {
  className?: string;
}

/**
 * The royal coat of arms of the Kingdom of Morocco, drawn as pure SVG so it
 * stays crisp at header size. Composition: the royal crown (gold) above a red
 * heater shield charged with the green interlaced pentagram — the Seal of
 * Solomon. The full national arms also bear the Atlas mountains, two lions
 * and the motto "Nasr min Allah"; those details are deliberately omitted here
 * because they do not survive at 36px.
 */
export function MoroccanArms({ className }: MoroccanArmsProps) {
  return (
    <svg
      viewBox="0 0 48 60"
      role="img"
      aria-label="Armoiries royales du Maroc"
      className={cn("shrink-0", className)}
    >
      {/* Royal crown */}
      <path
        d="M12 10.5 L15.5 4 L19.5 9 L24 2.5 L28.5 9 L32.5 4 L36 10.5 Z"
        fill="#c9a227"
      />
      <rect x="11.5" y="10.5" width="25" height="4" rx="1.5" fill="#a3831a" />
      <circle cx="18.5" cy="12.5" r="1.3" fill="#c1272d" />
      <circle cx="24" cy="12.5" r="1.3" fill="#006233" />
      <circle cx="29.5" cy="12.5" r="1.3" fill="#c1272d" />

      {/* Red shield, gold-bordered */}
      <path
        d="M24 15.5 L37 18.5 V30 C37 39 31.5 45.8 24 50.5 C16.5 45.8 11 39 11 30 V18.5 Z"
        fill="#c1272d"
        stroke="#c9a227"
        strokeWidth="1.2"
      />

      {/* Green interlaced pentagram — Seal of Solomon */}
      <path
        d="M24 22.5 L29.3 38.8 L15.4 28.7 L32.6 28.7 L18.7 38.8 Z"
        fill="none"
        stroke="#006233"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
