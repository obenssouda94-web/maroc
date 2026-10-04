"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { Search, X, CornerDownLeft, History } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import type { SearchDocument } from "@/types";
import { localePath } from "@/lib/utils";

interface SearchBarProps {
  locale: Locale;
  placeholder: string;
  className?: string;
  autoFocus?: boolean;
  onPick?: () => void;
  labels: {
    noResults: string;
    popular: string;
  };
}

type Suggestion = SearchDocument;

export function SearchBar({
  locale,
  placeholder,
  className,
  autoFocus,
  onPick,
  labels,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const runSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed.length < 2) {
        setSuggestions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(trimmed)}&locale=${locale}&limit=6`)
        .then((res) => (res.ok ? res.json() : { results: [] }))
        .then((data: { results: SearchDocument[] }) => {
          setSuggestions(data.results.slice(0, 6));
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    },
    [locale],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(query), 160);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function submit(value?: string) {
    const term = (value ?? query).trim();
    if (!term) return;
    setOpen(false);
    onPick?.();
    router.push(localePath(`/search?q=${encodeURIComponent(term)}`, locale));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        setOpen(false);
        onPick?.();
        router.push(suggestions[activeIndex].href);
      } else {
        submit();
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, -1));
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  const showSuggestions = open && query.trim().length >= 2;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          className="h-11 w-full rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] ps-10 pe-10 text-sm text-[var(--color-foreground)] transition-colors placeholder:text-[var(--color-muted)]/70 focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60 focus-visible:ring-2 focus-visible:ring-[var(--color-moroccan-red)]/15"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setActiveIndex(-1);
            }}
            aria-label="Clear search"
            className="absolute end-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute z-[60] mt-2 max-h-96 w-full overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-lift)]"
        >
          {loading && (
            <div className="px-3 py-4 text-center text-xs text-[var(--color-muted)]">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--color-moroccan-red)] border-t-transparent" />
                Searching…
              </span>
            </div>
          )}
          {!loading && suggestions.length === 0 && (
            <div className="px-3 py-4 text-center text-xs text-[var(--color-muted)]">
              {labels.noResults}
            </div>
          )}
          {!loading &&
            suggestions.map((item, index) => (
              <button
                key={`${item.type}-${item.id}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setOpen(false);
                  onPick?.();
                  router.push(item.href);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors",
                  index === activeIndex ? "bg-[var(--color-surface-2)]" : "hover:bg-[var(--color-surface-2)]",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]">
                  <History className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{item.title}</span>
                  <span className="block truncate text-xs text-[var(--color-muted)]">
                    {item.description}
                  </span>
                </span>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  {item.category}
                </span>
              </button>
            ))}
          {!loading && suggestions.length > 0 && (
            <div className="mt-1 border-t border-[var(--color-border)] px-3 py-2">
              <button
                type="button"
                onClick={() => submit()}
                className="flex w-full items-center justify-between gap-2 text-xs font-semibold text-[var(--color-moroccan-red)]"
              >
                <span>View all results for “{query.trim()}”</span>
                <CornerDownLeft className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
