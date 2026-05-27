import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";

import { TryoutDraftForm } from "../_components/tryout-draft-form";

export default function NewTryoutDraftPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Buat Draft Tryout"
        description="Admin hanya dapat menyimpan draft atau mengirimkannya untuk review."
      />
      <SectionCard title="Form Draft" description="Penerbitan final tetap dilakukan oleh super admin.">
        <TryoutDraftForm redirectPath="/admin/tryout-drafts" />
      </SectionCard>
    </div>
  );
}
