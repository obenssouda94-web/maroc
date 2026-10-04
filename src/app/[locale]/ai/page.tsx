import type { Metadata } from "next";
import { Sparkles, BookOpen, Scale, Languages, GitCompare, FileText } from "lucide-react";
import { AiChat } from "@/components/ai/ai-chat";
import { PageHeader } from "@/components/common/section-heading";
import { localeBundle } from "@/lib/content";
import { AI_SUGGESTED_QUESTIONS } from "@/lib/ai";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.aiTitle,
    description: dict.page.aiSubtitle,
  };
}

export default async function AiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);
  const t = dict.common;

  const capabilities = [
    { icon: Sparkles, label: dict.ai.capabilityAnswer },
    { icon: Scale, label: dict.ai.capabilityExplain },
    { icon: BookOpen, label: dict.ai.capabilitySummarize },
    { icon: Languages, label: dict.ai.capabilityTranslate },
    { icon: GitCompare, label: dict.ai.capabilityCompare },
    { icon: FileText, label: dict.ai.capabilityCite },
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.ai}
        title={dict.page.aiTitle}
        description={dict.page.aiSubtitle}
        breadcrumbs={[
          { label: t.home, href: `/${locale}` },
          { label: dict.page.aiTitle, href: `/${locale}/ai` },
        ]}
      />

      <section className="container-page py-10 sm:py-14">
        <AiChat
          locale={locale}
          initialQuestions={AI_SUGGESTED_QUESTIONS[locale] ?? AI_SUGGESTED_QUESTIONS.en}
          labels={{
            greeting: dict.ai.greeting,
            inputPlaceholder: dict.ai.inputPlaceholder,
            send: dict.ai.send,
            thinking: dict.ai.thinking,
            sources: dict.ai.sources,
            relatedQuestions: dict.ai.relatedQuestions,
            exampleQuestions: dict.ai.exampleQuestions,
            disclaimer: dict.ai.disclaimer,
            groundedNote: dict.ai.groundedNote,
            notFound: dict.ai.notFound,
            newChat: dict.ai.newChat,
            source: t.source,
          }}
        />

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold tracking-tight">
            {dict.ai.capabilities}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability.label}
                className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-moroccan-green-soft)] text-[var(--color-moroccan-green)]">
                  <capability.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-medium">{capability.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
