import type { Metadata } from "next";
import { religionTopics } from "@/data/religion";
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
    title: dict.page.religionTitle,
    description: dict.page.religionSubtitle,
  };
}

export default async function ReligionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = localeBundle((await params).locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.common.religion}
        title={dict.page.religionTitle}
        description={dict.page.religionSubtitle}
        breadcrumbs={[
          { label: dict.common.home, href: `/${locale}` },
          { label: dict.page.religionTitle, href: `/${locale}/religion` },
        ]}
      />
      <section className="container-page py-12 sm:py-16">
        <TopicGrid locale={locale} topics={religionTopics} basePath="religion" />
      </section>
    </>
  );
}
