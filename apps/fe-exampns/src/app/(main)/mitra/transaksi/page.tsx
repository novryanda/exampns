import { SearchCheck, Ticket } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { PartnerReferralCodeCards } from "@/app/(main)/mitra/_components/partner-referral-code-cards";
import { PartnerTransactionFilters } from "@/app/(main)/mitra/_components/partner-transaction-filters";
import { NumberedPagination } from "@/components/list/numbered-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTimeId } from "@/lib/user-app/labels";
import { formatCurrency } from "@/lib/utils";
import { getPartnerSummary, getPartnerTransactions } from "@/server/partner-data";

type MitraTransactionsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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

export default async function MitraTransactionsPage({ searchParams }: MitraTransactionsPageProps) {
  const params = await searchParams;
  const search = readParam(params.search).trim();
  const fromDate = readParam(params.fromDate);
  const toDate = readParam(params.toDate);
  const page = Math.max(1, Number(readParam(params.page)) || 1);

  const [summary, transactions] = await Promise.all([
    getPartnerSummary(),
    getPartnerTransactions({
      search: search || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      page,
      limit: 12,
    }),
  ]);

  const filters = {
    search: search || undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Transaksi Referral"
        description="Pantau transaksi yang menggunakan kode referral Anda, lengkap dengan diskon, komisi, dan tanggal transaksi."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Kode Aktif"
          value={summary.activeCodes.toLocaleString("id-ID")}
          delta=""
          deltaLabel="referral siap dipakai"
          direction="neutral"
          icon={Ticket}
          tint="blue"
        />
        <MetricCard
          title="Total Transaksi"
          value={summary.totalTransactions.toLocaleString("id-ID")}
          delta=""
          deltaLabel="semua transaksi referral"
          direction="neutral"
          icon={SearchCheck}
          tint="amber"
        />
      </div>

      <SectionCard
        title="Kode Referral Saya"
        description="Salin kode referral aktif Anda langsung dari sini."
      >
        <PartnerReferralCodeCards codes={summary.referralCodes} />
      </SectionCard>

      <PartnerTransactionFilters />

      <SectionCard
        title="Riwayat Transaksi"
        description="Cari berdasarkan invoice, nama user, plan, atau kode referral. Filter tanggal memakai tanggal pembuatan transaksi."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead>Diskon</TableHead>
              <TableHead>Bayar</TableHead>
              <TableHead>Komisi</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-slate-500">
                  Belum ada transaksi referral pada filter ini.
                </TableCell>
              </TableRow>
            ) : (
              transactions.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDateTimeId(item.paidAt ?? item.createdAt)}</TableCell>
                  <TableCell className="font-medium">{item.invoiceNumber}</TableCell>
                  <TableCell>
                    <div>{item.buyerName}</div>
                    <div className="text-slate-400 text-xs">{item.buyerEmail}</div>
                  </TableCell>
                  <TableCell>{item.planName}</TableCell>
                  <TableCell>{item.referralCode ?? "-"}</TableCell>
                  <TableCell>{money(item.discountAmount)}</TableCell>
                  <TableCell>{money(item.finalAmount)}</TableCell>
                  <TableCell>{money(item.commissionAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge tone={item.status === "success" ? "success" : item.status === "pending" ? "warning" : "danger"}>
                      {item.status}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <NumberedPagination
          basePath="/mitra/transaksi"
          page={transactions.meta.page}
          totalPages={transactions.meta.totalPages}
          totalItems={transactions.meta.totalItems}
          filters={filters}
        />
      </SectionCard>
    </div>
  );
}
