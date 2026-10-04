import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { amazighTopics } from "@/data/amazigh";
import { TopicDetail } from "@/components/content/topic";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized } from "@/lib/utils";

export async function generateStaticParams() {
  return amazighTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const topic = amazighTopics.find((item) => item.slug === slug);
  if (!topic) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(topic.title, safeLocale),
    description: localized(topic.summary, safeLocale),
  };
}

export default async function AmazighTopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const topic = amazighTopics.find((item) => item.slug === slug);
  if (!topic) notFound();

  return (
    <TopicDetail
      locale={locale}
      topic={topic}
      basePath="amazigh"
      backLabel={dict.page.amazighTitle}
      dict={dict}
    />
  );
}
