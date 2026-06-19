import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getSubscriptionPlans } from "@/server/user-dashboard-data";

import { TryoutDraftForm } from "../_components/tryout-draft-form";

export default async function NewTryoutDraftPage() {
  const subscriptionPlans = await getSubscriptionPlans();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Buat Tryout"
        description="Admin dapat menyusun tryout lalu langsung mempublish-nya saat sudah siap."
      />
      <SectionCard title="Form Tryout" description="Pilih subscription plan akses sebelum melanjutkan ke builder soal.">
        <TryoutDraftForm redirectPath="/admin/tryout-drafts" subscriptionPlans={subscriptionPlans} />
      </SectionCard>
    </div>
  );
}
