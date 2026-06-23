import { BadgeDollarSign, ReceiptText, WalletCards } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { formatCurrency } from "@/lib/utils";
import { getPartnerSummary, getPartnerTransactions, getPartnerWithdrawals } from "@/server/partner-data";

function money(amount: number) {
  return formatCurrency(amount, { currency: "IDR", locale: "id-ID", noDecimals: true });
}

export default async function MitraDashboardPage() {
  const [summary, transactions, withdrawals] = await Promise.all([
    getPartnerSummary(),
    getPartnerTransactions({ limit: 5 }),
    getPartnerWithdrawals({ limit: 5 }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard Mitra" description="Ringkasan saldo, transaksi referral, dan pengajuan pencairan." />

      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard title="Saldo Tersedia" value={money(summary.balance.availableBalance)} delta="" deltaLabel="siap dicairkan" direction="neutral" icon={WalletCards} tint="green" />
        <MetricCard title="Total Komisi" value={money(summary.balance.totalEarned)} delta="" deltaLabel="komisi sukses" direction="neutral" icon={BadgeDollarSign} tint="blue" />
        <MetricCard title="Pending Cair" value={money(summary.balance.pendingWithdrawal)} delta="" deltaLabel="menunggu approval" direction="neutral" icon={WalletCards} tint="amber" />
        <MetricCard title="Transaksi" value={summary.totalTransactions.toLocaleString("id-ID")} delta={`${summary.activeCodes} kode aktif`} deltaLabel="kode referral" direction="neutral" icon={ReceiptText} tint="violet" />
      </div>

      <SectionCard title="Transaksi Referral Terbaru">
        <div className="grid gap-3">
          {transactions.data.length === 0 ? (
            <p className="text-slate-500 text-sm">Belum ada transaksi referral.</p>
          ) : (
            transactions.data.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-950">{item.invoiceNumber}</p>
                  <p className="text-slate-500 text-sm">{item.buyerName} - {item.planName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-950">{money(item.commissionAmount)}</p>
                  <StatusBadge tone={item.status === "success" ? "success" : item.status === "pending" ? "warning" : "danger"}>{item.status}</StatusBadge>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>

      <SectionCard title="Pencairan Terbaru">
        <div className="grid gap-3">
          {withdrawals.data.length === 0 ? (
            <p className="text-slate-500 text-sm">Belum ada pengajuan pencairan.</p>
          ) : (
            withdrawals.data.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-950">{money(item.amount)}</p>
                  <p className="text-slate-500 text-sm">{item.bankName} - {item.accountNumber}</p>
                </div>
                <StatusBadge tone={item.status === "approved" ? "success" : item.status === "pending" ? "warning" : "danger"}>{item.status}</StatusBadge>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
