import type { Locale } from "@/types";
import { localePath } from "@/lib/utils";
import {
  BookOpen,
  Crown,
  Landmark,
  Scale,
  MoonStar,
  Languages as AmazighIcon,
  UtensilsCrossed,
  Building2,
  Map as MapIcon,
  Castle,
  SunMedium,
  CalendarDays,
  Flag,
  Sparkles,
  LayoutGrid,
  Plane,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  group: "discover" | "knowledge" | "experience";
}

export function getNavItems(locale: Locale, dict: Dictionary): NavItem[] {
  const t = dict.nav;
  return [
    { href: "/map", label: t.map, icon: MapIcon, group: "experience" },
    { href: "/history", label: t.history, icon: BookOpen, group: "knowledge" },
    { href: "/monarchy", label: t.monarchy, icon: Crown, group: "knowledge" },
    { href: "/government", label: t.government, icon: Landmark, group: "knowledge" },
    { href: "/laws", label: t.laws, icon: Scale, group: "knowledge" },
    { href: "/religion", label: t.religion, icon: MoonStar, group: "knowledge" },
    { href: "/amazigh", label: t.amazigh, icon: AmazighIcon, group: "discover" },
    { href: "/culture", label: t.culture, icon: Castle, group: "discover" },
    { href: "/cuisine", label: t.cuisine, icon: UtensilsCrossed, group: "discover" },
    { href: "/cities", label: t.cities, icon: Building2, group: "discover" },
    { href: "/regions", label: t.regions, icon: LayoutGrid, group: "discover" },
    { href: "/heritage", label: t.heritage, icon: Castle, group: "discover" },
    { href: "/weather", label: t.weather, icon: SunMedium, group: "experience" },
    { href: "/events", label: t.events, icon: CalendarDays, group: "experience" },
    { href: "/tourism", label: t.tourism, icon: Plane, group: "experience" },
    { href: "/symbols", label: t.symbols, icon: Flag, group: "discover" },
    { href: "/ai", label: t.ai, icon: Sparkles, group: "experience" },
  ];
}

export function getNavGroups(locale: Locale, dict: Dictionary) {
  const items = getNavItems(locale, dict);
  const groupLabels: Record<NavItem["group"], string> = {
    discover: dict.nav.discover,
    knowledge: dict.categories.history,
    experience: dict.nav.explore,
  };
  return (["discover", "knowledge", "experience"] as const).map((group) => ({
    id: group,
    label: groupLabels[group],
    items: items.filter((item) => item.group === group).map((item) => ({ ...item, href: localePath(item.href, locale) })),
  }));
}

export function getFooterLinks(locale: Locale, dict: Dictionary) {
  const t = dict.nav;
  const make = (path: string, label: string) => ({ href: localePath(path, locale), label });
  return {
    explore: [
      make("/history", t.history),
      make("/culture", t.culture),
      make("/cuisine", t.cuisine),
      make("/cities", t.cities),
      make("/regions", t.regions),
      make("/heritage", t.heritage),
      make("/map", t.map),
    ],
    institutions: [
      make("/monarchy", t.monarchy),
      make("/government", t.government),
      make("/laws", t.laws),
      make("/symbols", t.symbols),
      make("/religion", t.religion),
      make("/amazigh", t.amazigh),
    ],
    legal: [
      make("/about", dict.common.about),
      make("/weather", t.weather),
      make("/events", t.events),
      make("/tourism", t.tourism),
      make("/ai", t.ai),
      make("/search", t.search),
    ],
  };
}
