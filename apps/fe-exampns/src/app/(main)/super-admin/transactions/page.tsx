import { CheckCircle2, Clock3, ReceiptText, WalletCards, XCircle } from "lucide-react";

import { ApprovePaymentButton } from "@/app/(main)/super-admin/transactions/_components/approve-payment-button";
import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { getAdminTransactions } from "@/server/admin-data";

const metricIcons = [ReceiptText, CheckCircle2, Clock3, XCircle] as const;
const metricTints = ["blue", "green", "amber", "red"] as const;

function toneForStatus(status: string) {
  if (status === "success") return "success";
  if (status === "pending") return "warning";
  return "danger";
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function SuperAdminTransactionsPage() {
  const [allTransactions, successTransactions, pendingTransactions, failedTransactions] = await Promise.all([
    getAdminTransactions({ limit: 20 }),
    getAdminTransactions({ status: "success", limit: 1 }),
    getAdminTransactions({ status: "pending", limit: 1 }),
    getAdminTransactions({ status: "failed", limit: 1 }),
  ]);

  const metrics = [
    {
      title: "Total Transactions",
      value: allTransactions.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "semua transaksi billing",
      direction: "neutral" as const,
    },
    {
      title: "Success",
      value: successTransactions.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "berhasil dibayar",
      direction: "neutral" as const,
    },
    {
      title: "Pending",
      value: pendingTransactions.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "menunggu pembayaran",
      direction: "neutral" as const,
    },
    {
      title: "Failed",
      value: failedTransactions.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "gagal atau expired",
      direction: "neutral" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Transactions"
        description="Monitoring transaksi billing pengguna berdasarkan data backend terbaru."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              delta={metric.delta}
              deltaLabel={metric.deltaLabel}
              direction={metric.direction}
              icon={Icon}
              tint={metricTints[index]}
            />
          );
        })}
      </div>

      <SectionCard title="Daftar Transaksi" description="20 data transaksi terbaru dari endpoint billing.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTransactions.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  Belum ada transaksi yang tersedia.
                </TableCell>
              </TableRow>
            ) : (
              allTransactions.data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium text-slate-950">{transaction.invoiceNumber}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{transaction.userName}</div>
                      <div className="text-slate-400 text-xs">{transaction.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.planName}</TableCell>
                  <TableCell>
                    <div className="inline-flex items-center gap-2">
                      <WalletCards className="size-4 text-slate-400" />
                      {transaction.paymentMethod ?? "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(transaction.amount, {
                      currency: "IDR",
                      locale: "id-ID",
                      noDecimals: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={toneForStatus(transaction.status)}>{toLabel(transaction.status)}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.status === "pending" ? (
                      <ApprovePaymentButton
                        paymentTransactionId={transaction.id}
                        invoiceNumber={transaction.invoiceNumber}
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
      </SectionCard>
    </div>
  );
}
