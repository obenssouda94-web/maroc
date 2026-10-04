"use client";

import dynamic from "next/dynamic";
import type { MoroccoMapProps } from "@/components/map/morocco-map";

const MoroccoMap = dynamic(
  () => import("@/components/map/morocco-map").then((mod) => mod.MoroccoMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[70vh] min-h-[28rem] w-full animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]" />
    ),
  },
);

export function MapLoader(props: MoroccoMapProps) {
  return <MoroccoMap {...props} />;
}
