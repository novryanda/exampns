import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getSubscriptionPlans } from "@/server/admin-data";

import { SubscriptionPlansManager } from "./_components/subscription-plans-manager";

export default async function SubscriptionPlansPage() {
  const plans = await getSubscriptionPlans();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Subscription Plans"
        description="Kelola paket subscription dan hak akses pengguna dengan mudah."
      />
      <SubscriptionPlansManager plans={plans} />
    </div>
  );
}
