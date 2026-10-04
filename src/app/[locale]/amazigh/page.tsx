import type { Metadata } from "next";
import { amazighTopics } from "@/data/amazigh";
import { PageHeader } from "@/components/common/section-heading";
import { TopicGrid } from "@/components/content/topic";
import { localeBundle } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { dict } = localeBundle((await params).locale);
  return {
    title: dict.page.amazighTitle,
    description: dict.page.amazighSubtitle,
  };
}

export default async function AmazighPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.common.amazigh}
        title={dict.page.amazighTitle}
        description={dict.page.amazighSubtitle}
        breadcrumbs={[
          { label: dict.common.home, href: `/${locale}` },
          { label: dict.page.amazighTitle, href: `/${locale}/amazigh` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <TopicGrid locale={locale} topics={amazighTopics} basePath="amazigh" />
      </section>
    </>
  );
}
