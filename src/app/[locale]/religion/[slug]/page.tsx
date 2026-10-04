import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { religionTopics } from "@/data/religion";
import { TopicDetail } from "@/components/content/topic";
import { localeBundle, resolveLocale } from "@/lib/content";
import { localized } from "@/lib/utils";

export async function generateStaticParams() {
  return religionTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const topic = religionTopics.find((item) => item.slug === slug);
  if (!topic) return {};
  const safeLocale = resolveLocale(locale);
  return {
    title: localized(topic.title, safeLocale),
    description: localized(topic.summary, safeLocale),
  };
}

export default async function ReligionTopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dict } = localeBundle(rawLocale);
  const topic = religionTopics.find((item) => item.slug === slug);
  if (!topic) notFound();

  return (
    <TopicDetail
      locale={locale}
      topic={topic}
      basePath="religion"
      backLabel={dict.page.religionTitle}
      dict={dict}
    />
  );
}
