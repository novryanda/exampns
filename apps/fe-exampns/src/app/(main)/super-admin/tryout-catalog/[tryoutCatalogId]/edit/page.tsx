import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { TryoutDraftBuilder } from "@/app/(main)/admin/tryout-drafts/_components/tryout-draft-builder";
import { getAdminQuestionMetadataOptions, getTryoutBuilderDetail } from "@/server/admin-content-data";

export default async function EditSuperAdminTryoutPage({
  params,
}: {
  readonly params: Promise<{ tryoutCatalogId: string }>;
}) {
  const { tryoutCatalogId } = await params;

  const draft = await getTryoutBuilderDetail("super-admin", tryoutCatalogId).catch(() => notFound());
  const metadataOptions = await getAdminQuestionMetadataOptions();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Builder Tryout"
        description="Kelola metadata, strategi, bank soal, validasi, dan finalisasi publish dalam satu alur."
      />
      <TryoutDraftBuilder draft={draft} metadataOptions={metadataOptions} scope="super-admin" />
    </div>
  );
}
