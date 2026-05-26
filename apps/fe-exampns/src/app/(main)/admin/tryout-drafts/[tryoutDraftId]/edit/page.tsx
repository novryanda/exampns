import { notFound } from "next/navigation";

import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getAdminTryoutDraftDetail } from "@/server/admin-content-data";

import { TryoutDraftForm } from "../../_components/tryout-draft-form";

export default async function EditTryoutDraftPage({ params }: { readonly params: Promise<{ tryoutDraftId: string }> }) {
  const { tryoutDraftId } = await params;

  const draft = await getAdminTryoutDraftDetail(tryoutDraftId).catch(() => notFound());

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Edit Tryout Draft" description="Perubahan status admin dibatasi ke draft atau review." />
      <SectionCard title="Form Draft" description={`ID draft: ${draft.id}`}>
        <TryoutDraftForm draft={draft} redirectPath="/admin/tryout-drafts" />
      </SectionCard>
    </div>
  );
}
