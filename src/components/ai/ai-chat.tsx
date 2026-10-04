"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, Send, RotateCcw, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

interface Citation {
  slug: string;
  type: string;
  title: string;
  href: string;
  snippet: string;
  sourceUrl?: string;
  verifiedAt?: string;
  isSample?: boolean;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  relatedQuestions?: string[];
  documentCount?: number;
}

interface AiChatProps {
  locale: Locale;
  initialQuestions: string[];
  labels: {
    greeting: string;
    inputPlaceholder: string;
    send: string;
    thinking: string;
    sources: string;
    relatedQuestions: string;
    exampleQuestions: string;
    disclaimer: string;
    groundedNote: string;
    notFound: string;
    newChat: string;
    source: string;
  };
}

function formatContent(text: string) {
  return text.split("\n\n").map((paragraph, index) => {
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={index} className="mb-3 last:mb-0">
        {parts.map((part, partIndex) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
          }
          return <span key={partIndex}>{part}</span>;
        })}
      </p>
    );
  });
}

export function AiChat({ locale, initialQuestions, labels }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const send = useCallback(
    async (value: string) => {
      const question = value.trim();
      if (!question || loading) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: question,
      };
      setMessages((current) => [...current, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, locale }),
        });
        const data = (await res.json()) as {
          answer: string;
          citations: Citation[];
          relatedQuestions: string[];
          documentCount: number;
        };
        setMessages((current) => [
          ...current,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.answer,
            citations: data.citations,
            relatedQuestions: data.relatedQuestions,
            documentCount: data.documentCount,
          },
        ]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: labels.notFound,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, locale, labels.notFound],
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const isEmpty = messages.length === 0;

  return (
    <div className="mx-auto flex h-[calc(100vh-14rem)] min-h-[32rem] max-w-3xl flex-col">
      <div
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6"
      >
        {isEmpty && (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]">
              <Sparkles className="h-8 w-8" aria-hidden />
            </span>
            <div>
              <p className="font-serif text-xl font-bold">{labels.greeting}</p>
              <p className="mt-2 max-w-md text-sm text-[var(--color-muted)]">{labels.disclaimer}</p>
            </div>
            <div className="w-full max-w-xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {labels.exampleQuestions}
              </p>
              <ul className="flex flex-col gap-2">
                {initialQuestions.slice(0, 4).map((question) => (
                  <li key={question}>
                    <button
                      type="button"
                      onClick={() => void send(question)}
                      className="flex w-full items-center justify-between gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-start text-sm font-medium transition-colors hover:border-[var(--color-moroccan-green)]/40"
                    >
                      {question}
                      <Send className="h-3.5 w-3.5 shrink-0 text-[var(--color-muted)] rtl:-scale-x-100" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                message.role === "user"
                  ? "bg-[var(--color-moroccan-red)] font-medium text-white"
                  : "bg-[var(--color-surface-2)]",
              )}
            >
              {message.role === "assistant" ? formatContent(message.content) : message.content}

              {message.role === "assistant" && message.documentCount ? (
                <p className="mt-2 text-[11px] font-medium text-[var(--color-muted)]">
                  {labels.groundedNote.replace("{count}", String(message.documentCount))}
                </p>
              ) : null}

              {message.citations && message.citations.length > 0 && (
                <div className="mt-4 border-t border-[var(--color-border)] pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                    {labels.sources}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {message.citations.map((citation) => (
                      <li key={citation.slug} className="flex items-start gap-2">
                        <a
                          href={citation.href}
                          className="font-semibold text-[var(--color-moroccan-red)] link-underline"
                        >
                          {citation.title}
                        </a>
                        <span className="shrink-0 rounded-full bg-[var(--color-surface-3)] px-1.5 py-0.5 text-[9px] font-bold uppercase">
                          {citation.type}
                        </span>
                        {citation.sourceUrl && (
                          <a
                            href={citation.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                            aria-label={labels.source}
                          >
                            <ExternalLink className="h-3 w-3" aria-hidden />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                    {labels.relatedQuestions}
                  </span>
                  {message.relatedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void send(question)}
                      className="chip transition-colors hover:border-[var(--color-moroccan-green)]/40 hover:text-[var(--color-moroccan-green)]"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface-2)] px-4 py-3 text-sm text-[var(--color-muted)]">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-moroccan-red)] border-t-transparent" />
              {labels.thinking}
            </div>
          </div>
        )}
      </div>

      <form
        className="mt-4 flex items-center gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
        }}
      >
        <input
          ref={inputRef}
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={labels.inputPlaceholder}
          disabled={loading}
          className="h-12 flex-1 rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-5 text-sm focus-visible:outline-none focus-visible:border-[var(--color-moroccan-green)]/50 focus-visible:ring-2 focus-visible:ring-[var(--color-moroccan-green)]/15 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length < 2}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[var(--color-moroccan-green)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-moroccan-green-dark)] disabled:opacity-50"
        >
          <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          {labels.send}
        </button>
        {!isEmpty && (
          <button
            type="button"
            onClick={() => {
              setMessages([]);
              setInput("");
              inputRef.current?.focus();
            }}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold transition-colors hover:bg-[var(--color-surface-2)]"
            aria-label={labels.newChat}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
          </button>
        )}
      </form>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--color-muted)]">
        {labels.disclaimer}
      </p>
    </div>
  );
}
