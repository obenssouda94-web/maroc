"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import type { TranslationFormState } from "@/lib/actions/translations";

interface TranslationFormProps {
  action: (state: TranslationFormState, formData: FormData) => Promise<TranslationFormState>;
  translation: {
    id: string;
    key: string;
    namespace: string;
    languageId: string;
    value: string;
    status: string;
  };
  referenceValue?: string;
}

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "needs_review", label: "Needs review" },
  { value: "reviewed", label: "Reviewed" },
  { value: "published", label: "Published" },
];

export function TranslationForm({ action, translation, referenceValue }: TranslationFormProps) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={translation.id} />

      <div className="space-y-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
        <p className="font-mono text-xs font-semibold text-[var(--color-muted)]">
          {translation.namespace}.{translation.key}
        </p>
        {referenceValue && (
          <p className="text-sm text-[var(--color-muted)]">
            <span className="font-semibold text-[var(--color-foreground)]">EN reference:</span>{" "}
            {referenceValue}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="value"
          className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]"
        >
          Value <span className="text-[var(--color-moroccan-red)]">*</span>
        </label>
        <Textarea
          id="value"
          name="value"
          defaultValue={translation.value}
          rows={6}
          className="font-mono text-[13px]"
        />
        {state.errors?.value && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-[var(--color-moroccan-red)]">
            {state.errors.value}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={translation.status}
          className="h-11 w-full rounded-full border border-[var(--color-strong-border)] bg-[var(--color-surface)] px-4 text-sm focus-visible:outline-none focus-visible:border-[var(--color-moroccan-red)]/60 sm:w-56"
        >
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {state.message && state.message === "translation:updated" && (
        <p className="rounded-xl border border-[var(--color-moroccan-green)]/25 bg-[var(--color-moroccan-green-soft)] px-4 py-2.5 text-sm font-medium text-[var(--color-moroccan-green)]">
          Saved successfully.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          Save changes
        </Button>
      </div>
    </form>
  );
}
