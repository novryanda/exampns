import Link from "next/link";
import { Fragment } from "react";
import { CheckCircle2, Clock3, Landmark, ReceiptText, XCircle } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { WithdrawalReviewActions } from "@/app/(main)/super-admin/partners/_components/partner-admin-forms";
import { PartnerWithdrawalFilters } from "@/app/(main)/super-admin/partners/_components/partner-withdrawal-filters";
import { NumberedPagination } from "@/components/list/numbered-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import {
  type WithdrawalStatus,
  getSuperAdminPartnerWithdrawals,
} from "@/server/partner-data";

type SuperAdminPartnerWithdrawalsPageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function money(amount: number) {
  return formatCurrency(amount, { currency: "IDR", locale: "id-ID", noDecimals: true });
}

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function readStatus(value: string): WithdrawalStatus | undefined {
  if (value === "pending" || value === "approved" || value === "rejected") {
    return value;
  }

  return undefined;
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

function toneForStatus(status: WithdrawalStatus) {
  if (status === "approved") return "success";
  if (status === "pending") return "warning";
  return "danger";
}

export default async function SuperAdminPartnerWithdrawalsPage({
  searchParams,
}: SuperAdminPartnerWithdrawalsPageProps) {
  const params = await searchParams;
  const search = readParam(params.search).trim();
  const status = readStatus(readParam(params.status));
  const page = Math.max(1, Number(readParam(params.page)) || 1);

  const [withdrawals, allRequests, pendingRequests, approvedRequests, rejectedRequests] = await Promise.all([
    getSuperAdminPartnerWithdrawals({
      search: search || undefined,
      status,
      page,
      limit: 12,
    }),
    getSuperAdminPartnerWithdrawals({ limit: 1 }),
    getSuperAdminPartnerWithdrawals({ status: "pending", limit: 1 }),
    getSuperAdminPartnerWithdrawals({ status: "approved", limit: 1 }),
    getSuperAdminPartnerWithdrawals({ status: "rejected", limit: 1 }),
  ]);

  const filters = {
    search: search || undefined,
    status,
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Pencairan Mitra"
        description="Pantau seluruh pengajuan pencairan saldo mitra dan review request yang masih pending dari satu halaman."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Pengajuan"
          value={allRequests.meta.totalItems.toLocaleString("id-ID")}
          delta=""
          deltaLabel="semua request pencairan"
          direction="neutral"
          icon={ReceiptText}
          tint="blue"
        />
        <MetricCard
          title="Pending"
          value={pendingRequests.meta.totalItems.toLocaleString("id-ID")}
          delta=""
          deltaLabel="menunggu approval"
          direction="neutral"
          icon={Clock3}
          tint="amber"
        />
        <MetricCard
          title="Approved"
          value={approvedRequests.meta.totalItems.toLocaleString("id-ID")}
          delta=""
          deltaLabel="sudah diproses"
          direction="neutral"
          icon={CheckCircle2}
          tint="green"
        />
        <MetricCard
          title="Rejected"
          value={rejectedRequests.meta.totalItems.toLocaleString("id-ID")}
          delta=""
          deltaLabel="ditolak"
          direction="neutral"
          icon={XCircle}
          tint="red"
        />
      </div>

      <PartnerWithdrawalFilters />

      <SectionCard
        title="Daftar Pencairan"
        description="Klik detail mitra untuk membuka profilnya. Request pending bisa langsung direview di bawah baris data."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Mitra</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead>Rekening</TableHead>
              <TableHead>Catatan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bukti</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-slate-400">
                  Belum ada pengajuan pencairan pada filter ini.
                </TableCell>
              </TableRow>
            ) : (
              withdrawals.data.map((item) => (
                <Fragment key={item.id}>
                  <TableRow>
                    <TableCell>{formatDateTime(item.createdAt)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-slate-950">{item.partnerDisplayName}</div>
                        <div className="text-slate-400 text-xs">{item.partnerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-950">{money(item.amount)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2">
                          <Landmark className="size-4 text-slate-400" />
                          {item.bankName}
                        </div>
                        <div className="text-slate-500 text-xs">{item.accountNumber}</div>
                        <div className="text-slate-400 text-xs">{item.accountHolderName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {item.requestedNote ? (
                          <p className="text-slate-600">{item.requestedNote}</p>
                        ) : (
                          <p className="text-slate-400">-</p>
                        )}
                        {item.reviewNote ? (
                          <p className="text-slate-400 text-xs">Review: {item.reviewNote}</p>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <StatusBadge tone={toneForStatus(item.status)}>{item.status}</StatusBadge>
                        {item.reviewedAt ? (
                          <p className="text-slate-400 text-xs">Ditinjau {formatDateTime(item.reviewedAt)}</p>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.transferProofUrl ? (
                        <a
                          className="text-blue-600 text-sm"
                          href={item.transferProofUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Lihat bukti
                        </a>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/super-admin/partners/${item.partnerProfileId}`}
                        className="text-blue-600 text-sm hover:text-blue-700"
                      >
                        Detail mitra
                      </Link>
                    </TableCell>
                  </TableRow>
                  {item.status === "pending" ? (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-slate-50/70">
                        <WithdrawalReviewActions
                          partnerProfileId={item.partnerProfileId}
                          withdrawal={item}
                        />
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>

        <NumberedPagination
          basePath="/super-admin/withdrawals"
          page={withdrawals.meta.page}
          totalPages={withdrawals.meta.totalPages}
          totalItems={withdrawals.meta.totalItems}
          filters={filters}
        />
      </SectionCard>
    </div>
  );
}
