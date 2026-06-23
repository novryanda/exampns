import { notFound } from "next/navigation";
import { BadgeDollarSign, ReceiptText, WalletCards } from "lucide-react";

import {
  ReferralCodesTable,
  UpdatePartnerForm,
  WithdrawalReviewActions,
} from "@/app/(main)/super-admin/partners/_components/partner-admin-forms";
import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { getSuperAdminPartnerDetail } from "@/server/partner-data";

function money(amount: number) {
  return formatCurrency(amount, { currency: "IDR", locale: "id-ID", noDecimals: true });
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function SuperAdminPartnerDetailPage({
  params,
}: {
  readonly params: Promise<{ partnerProfileId: string }>;
}) {
  const { partnerProfileId } = await params;
  const partner = await getSuperAdminPartnerDetail(partnerProfileId).catch(() => notFound());

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={partner.displayName}
        description={`${partner.user.email} - ${partner.user.status}`}
        backHref="/super-admin/partners"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Saldo Tersedia" value={money(partner.balance.availableBalance)} delta="" deltaLabel="siap dicairkan" direction="neutral" icon={WalletCards} tint="green" />
        <MetricCard title="Total Komisi" value={money(partner.balance.totalEarned)} delta="" deltaLabel="komisi sukses" direction="neutral" icon={BadgeDollarSign} tint="blue" />
        <MetricCard title="Pending Cair" value={money(partner.balance.pendingWithdrawal)} delta="" deltaLabel="menunggu approval" direction="neutral" icon={WalletCards} tint="amber" />
        <MetricCard title="Kode Referral" value={partner.referralCodes.length.toLocaleString("id-ID")} delta="" deltaLabel="kode dibuat" direction="neutral" icon={ReceiptText} tint="violet" />
      </div>

      <SectionCard title="Profil Mitra">
        <UpdatePartnerForm partner={partner} />
      </SectionCard>

      <SectionCard title="Kode Referral" description="Generate kode baru atau ubah aturan benefit pada kode yang sudah ada.">
        <ReferralCodesTable partnerProfileId={partner.id} referralCodes={partner.referralCodes} />
      </SectionCard>

      <SectionCard title="Transaksi Referral">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Diskon</TableHead>
              <TableHead>Komisi</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partner.recentTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-slate-500">Belum ada transaksi.</TableCell>
              </TableRow>
            ) : (
              partner.recentTransactions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDateTime(item.paidAt ?? item.createdAt)}</TableCell>
                  <TableCell>{item.invoiceNumber}</TableCell>
                  <TableCell>
                    <div>{item.buyerName}</div>
                    <div className="text-slate-400 text-xs">{item.buyerEmail}</div>
                  </TableCell>
                  <TableCell>{item.planName}</TableCell>
                  <TableCell>{money(item.discountAmount)}</TableCell>
                  <TableCell>{money(item.commissionAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge tone={item.status === "success" ? "success" : item.status === "pending" ? "warning" : "danger"}>{item.status}</StatusBadge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>

      <SectionCard title="Pengajuan Pencairan">
        <div className="grid gap-4">
          {partner.withdrawals.length === 0 ? (
            <p className="text-slate-500 text-sm">Belum ada pengajuan pencairan.</p>
          ) : (
            partner.withdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="grid gap-3 rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{money(withdrawal.amount)}</p>
                    <p className="text-slate-500 text-sm">{withdrawal.bankName} - {withdrawal.accountNumber}</p>
                  </div>
                  <StatusBadge tone={withdrawal.status === "approved" ? "success" : withdrawal.status === "pending" ? "warning" : "danger"}>{withdrawal.status}</StatusBadge>
                </div>
                {withdrawal.transferProofUrl ? (
                  <a href={withdrawal.transferProofUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">
                    Lihat bukti transfer
                  </a>
                ) : null}
                <WithdrawalReviewActions partnerProfileId={partner.id} withdrawal={withdrawal} />
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
