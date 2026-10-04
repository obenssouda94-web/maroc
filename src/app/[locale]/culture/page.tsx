import type { Metadata } from "next";
import { cultureTopics } from "@/data/culture";
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
    title: dict.page.cultureTitle,
    description: dict.page.cultureSubtitle,
  };
}

export default async function CulturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.common.culture}
        title={dict.page.cultureTitle}
        description={dict.page.cultureSubtitle}
        breadcrumbs={[
          { label: dict.common.home, href: `/${locale}` },
          { label: dict.page.cultureTitle, href: `/${locale}/culture` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <TopicGrid locale={locale} topics={cultureTopics} basePath="culture" />
      </section>
    </>
  );
}
