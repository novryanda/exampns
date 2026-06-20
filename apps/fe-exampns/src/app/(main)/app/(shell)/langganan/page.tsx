import { CheckoutPlanButton } from "@/app/(main)/app/_components/checkout-plan-button";
import { ContinuePaymentButton } from "@/app/(main)/app/_components/continue-payment-button";
import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTimeId, formatSubscriptionStatusLabel } from "@/lib/user-app/labels";
import { getMyPaymentHistory, getMySubscription, getSubscriptionPlans } from "@/server/user-dashboard-data";
import { Sparkles, WalletCards } from "lucide-react";

function toneForPaymentStatus(status: string) {
  if (status === "success") {
    return "success";
  }

  if (status === "pending") {
    return "warning";
  }

  return "danger";
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function LanggananPage() {
  const [subscription, plans, payments] = await Promise.all([
    getMySubscription(),
    getSubscriptionPlans(),
    getMyPaymentHistory({ page: 1, limit: 10 }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Langganan"
        description="Kelola akses tryout, pilih paket berlangganan, dan pantau riwayat pembayaran."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          title="Status Akses"
          value={formatSubscriptionStatusLabel(subscription)}
          delta={subscription.planName ?? "Tidak ada paket"}
          deltaLabel="paket aktif"
          direction="neutral"
          icon={Sparkles}
          tint="blue"
        />
        <MetricCard
          title="Sisa Tryout"
          value={
            subscription.tryoutRemaining === null
              ? "Unlimited"
              : subscription.tryoutRemaining.toLocaleString("id-ID")
          }
          delta={`${subscription.tryoutUsed} terpakai`}
          deltaLabel="kuota tryout"
          direction="neutral"
          icon={WalletCards}
          tint="green"
        />
        <MetricCard
          title="Masa Aktif"
          value={`${subscription.daysRemaining} hari`}
          delta={formatDateTimeId(subscription.endDate)}
          deltaLabel="berakhir"
          direction="neutral"
          icon={WalletCards}
          tint="violet"
        />
      </div>

      <SectionCard title="Paket Berlangganan" description="Pilih paket untuk memperpanjang atau meningkatkan akses tryout.">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-950 text-xl">{plan.name}</h3>
              <p className="mt-2 min-h-12 text-slate-600 text-sm">{plan.description}</p>
              <p className="mt-4 font-semibold text-2xl text-slate-950">
                {formatCurrency(plan.price, plan.currency)}
              </p>
              <p className="mt-1 text-slate-500 text-sm">{plan.durationDays} hari akses</p>
              <div className="mt-4">
                <CheckoutPlanButton planId={plan.id} planName={plan.name} />
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Riwayat Pembayaran" description="Invoice dan status pembayaran terbaru.">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Paket</TableHead>
                <TableHead>Nominal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500">
                    Belum ada riwayat pembayaran.
                  </TableCell>
                </TableRow>
              ) : (
                payments.data.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDateTimeId(payment.createdAt)}</TableCell>
                    <TableCell>{payment.planName}</TableCell>
                    <TableCell>{formatCurrency(payment.amount, "IDR")}</TableCell>
                    <TableCell>
                      <StatusBadge tone={toneForPaymentStatus(payment.status)}>
                        {payment.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="text-right">
                      {payment.status === "pending" ? (
                        <ContinuePaymentButton
                          paymentTransactionId={payment.id}
                          paymentUrl={payment.paymentUrl}
                        />
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}
