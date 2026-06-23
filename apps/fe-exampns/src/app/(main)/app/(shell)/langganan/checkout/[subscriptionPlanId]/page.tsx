import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck } from "lucide-react";

import { SubscriptionCheckoutWorkspace } from "@/app/(main)/app/_components/subscription-checkout-workspace";
import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getSubscriptionPlans } from "@/server/user-dashboard-data";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function SubscriptionCheckoutPage({
  params,
}: {
  readonly params: Promise<{ subscriptionPlanId: string }>;
}) {
  const { subscriptionPlanId } = await params;
  const plans = await getSubscriptionPlans();
  const plan = plans.find(
    (item) => item.id === subscriptionPlanId && item.isActive && !item.isTrial && item.tier !== "trial",
  );

  if (!plan) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Checkout Langganan"
        description={`Tinjau paket ${plan.name}, masukkan kode referral bila ada, lalu lanjut ke pembayaran.`}
        backHref="/app/langganan"
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Paket Pilihan" description="Ringkasan paket yang akan Anda aktifkan setelah pembayaran berhasil.">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <div className="text-slate-500 text-sm">Nama paket</div>
              <div className="font-semibold text-3xl text-slate-950">{plan.name}</div>
              <p className="max-w-2xl text-slate-600 text-sm">{plan.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="text-slate-500 text-sm">Harga</div>
                <div className="mt-1 font-semibold text-slate-950 text-xl">
                  {formatCurrency(plan.price, plan.currency)}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="text-slate-500 text-sm">Durasi</div>
                <div className="mt-1 font-semibold text-slate-950 text-xl">{plan.durationDays} hari</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="text-slate-500 text-sm">Tier</div>
                <div className="mt-1 font-semibold text-slate-950 text-xl capitalize">{plan.tier}</div>
              </div>
            </div>

            {plan.features.length > 0 ? (
              <div className="grid gap-3">
                <div className="inline-flex items-center gap-2 font-medium text-slate-900 text-sm">
                  <ShieldCheck className="size-4 text-blue-600" />
                  Benefit paket
                </div>
                <div className="grid gap-2">
                  {plan.features.map((feature, index) => (
                    <div key={`${plan.id}-feature-${index}`} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SubscriptionCheckoutWorkspace plan={plan} />
      </div>
    </div>
  );
}
