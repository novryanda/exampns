import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminQuestionMetadataOptions, getAdminTryoutDraftDetail } from "@/server/admin-content-data";
import { getSubscriptionPlans } from "@/server/user-dashboard-data";

import { TryoutDraftBuilder } from "../../_components/tryout-draft-builder";

export default async function EditTryoutDraftPage({ params }: { readonly params: Promise<{ tryoutDraftId: string }> }) {
  const { tryoutDraftId } = await params;

  const draft = await getAdminTryoutDraftDetail(tryoutDraftId).catch(() => notFound());
  const [metadataOptions, subscriptionPlans] = await Promise.all([
    getAdminQuestionMetadataOptions(),
    getSubscriptionPlans(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Builder Tryout"
        description="Konfigurasikan strategi, bank soal, lalu publish tryout saat sudah siap digunakan."
      />
      <TryoutDraftBuilder draft={draft} metadataOptions={metadataOptions} subscriptionPlans={subscriptionPlans} />
    </div>
  );
}
