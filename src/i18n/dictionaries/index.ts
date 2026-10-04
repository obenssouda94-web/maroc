import type { Locale } from "@/types";
import en from "./en";
import fr from "./fr";
import ar from "./ar";
import es from "./es";
import tz from "./tz";
import type { Dictionary } from "./en";

export const dictionaries: Record<Locale, Dictionary> = { en, fr, ar, es, tz };

export { type Dictionary };
