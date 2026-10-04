import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TranslationForm } from "@/components/admin/translation-form";
import { updateTranslation } from "@/lib/actions/translations";

export default async function EditTranslationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();

  const { id } = await params;
  const translation = await prisma.translation.findUnique({ where: { id } });

  if (!translation) notFound();

  const reference = await prisma.translation.findUnique({
    where: {
      key_languageId_namespace: {
        key: translation.key,
        languageId: "en",
        namespace: translation.namespace,
      },
    },
    select: { value: true },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
          Edit translation
        </h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          {translation.languageId.toUpperCase()} · {translation.namespace}
        </p>
      </div>
      <div className="card-surface p-6 sm:p-8">
        <TranslationForm
          action={updateTranslation}
          translation={{
            id: translation.id,
            key: translation.key,
            namespace: translation.namespace,
            languageId: translation.languageId,
            value: translation.value,
            status: translation.status,
          }}
          referenceValue={reference?.value}
        />
      </div>
    </div>
  );
}
