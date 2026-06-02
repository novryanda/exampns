import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminQuestionMetadataOptions, getAdminTryoutDraftDetail } from "@/server/admin-content-data";

import { TryoutDraftBuilder } from "../../_components/tryout-draft-builder";

export default async function EditTryoutDraftPage({ params }: { readonly params: Promise<{ tryoutDraftId: string }> }) {
  const { tryoutDraftId } = await params;

  const draft = await getAdminTryoutDraftDetail(tryoutDraftId).catch(() => notFound());
  const metadataOptions = await getAdminQuestionMetadataOptions();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Builder Draft Tryout"
        description="Konfigurasikan strategi, bank soal, validasi, lalu ajukan ke review."
      />
      <TryoutDraftBuilder draft={draft} metadataOptions={metadataOptions} />
    </div>
  );
}
