import { CheckCircle2, Clock3, Download, RefreshCcw, Search, Settings2, WalletCards, XCircle } from "lucide-react";

import { DistributionDonutChart } from "@/components/examcpns-admin/charts";
import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/components/examcpns-admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import { getAdminTransactions } from "@/server/admin-data";

const statIcons = [WalletCards, CheckCircle2, Clock3, XCircle, WalletCards] as const;
const statTints = ["blue", "green", "amber", "red", "violet"] as const;

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const activityTone: Record<string, string> = {
  success: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  failed: "bg-rose-50 text-rose-600",
  refunded: "bg-sky-50 text-sky-600",
};

export default async function TransactionsPage() {
  const [allTransactions, paidTransactions, pendingTransactions, failedTransactions, refundedTransactions] =
    await Promise.all([
      getAdminTransactions({ limit: 8 }),
      getAdminTransactions({ status: "success", limit: 1 }),
      getAdminTransactions({ status: "pending", limit: 1 }),
      getAdminTransactions({ status: "failed", limit: 1 }),
      getAdminTransactions({ status: "refunded", limit: 1 }),
    ]);

  const totalRevenue = allTransactions.data
    .filter((item) => item.status === "success")
    .reduce((sum, item) => sum + item.amount, 0);

  const metrics = [
    {
      title: "Total Transactions",
      value: allTransactions.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "transaksi terdata",
      direction: "neutral" as const,
    },
    {
      title: "Paid",
      value: paidTransactions.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "transaksi sukses",
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
      deltaLabel: "transaksi gagal",
      direction: "neutral" as const,
    },
    {
      title: "Revenue Snapshot",
      value: formatCurrency(totalRevenue, {
        currency: "IDR",
        locale: "id-ID",
        noDecimals: true,
      }),
      delta: "",
      deltaLabel: "dari transaksi sukses pada halaman ini",
      direction: "neutral" as const,
    },
  ];

  const breakdown = [
    { name: "Paid", value: paidTransactions.meta.totalItems, fill: "#23b26d" },
    { name: "Pending", value: pendingTransactions.meta.totalItems, fill: "#f59e0b" },
    { name: "Failed", value: failedTransactions.meta.totalItems, fill: "#ef4444" },
    { name: "Refunded", value: refundedTransactions.meta.totalItems, fill: "#3b82f6" },
  ];

  const quickActions = [
    {
      title: "Retry Webhook Gagal",
      description: "Kirim ulang webhook yang gagal",
      icon: RefreshCcw,
    },
    {
      title: "Download Laporan",
      description: "Unduh laporan transaksi",
      icon: Download,
    },
    {
      title: "Pengaturan Notifikasi",
      description: "Atur notifikasi transaksi",
      icon: Settings2,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Transactions"
        description="Pantau pembayaran dan status invoice langsung dari backend billing."
        actions={
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white">
            Export
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
        {metrics.map((item, index) => {
          const Icon = statIcons[index];
          return (
            <MetricCard
              key={item.title}
              title={item.title}
              value={item.value}
              delta={item.delta}
              deltaLabel={item.deltaLabel}
              direction={item.direction}
              icon={Icon}
              tint={statTints[index]}
            />
          );
        })}
      </div>

      <SectionCard
        title="Daftar Transaksi"
        description="Delapan transaksi terbaru dari endpoint admin monitoring."
        trailing={
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-80">
              <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
              <Input className="rounded-xl border-slate-200 pl-9" placeholder="Cari berdasarkan invoice ID, email, atau nama..." />
            </div>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Semua Status</SelectItem>
                <SelectItem value="success">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTransactions.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  Belum ada transaksi.
                </TableCell>
              </TableRow>
            ) : (
              allTransactions.data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium text-slate-950">{transaction.invoiceNumber}</TableCell>
                  <TableCell className="min-w-56">
                    <div className="space-y-1">
                      <div>{transaction.userName}</div>
                      <div className="text-slate-400 text-xs">{transaction.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.planName}</TableCell>
                  <TableCell>
                    {formatCurrency(transaction.amount, {
                      currency: "IDR",
                      locale: "id-ID",
                      noDecimals: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      tone={
                        transaction.status === "success"
                          ? "success"
                          : transaction.status === "pending"
                            ? "warning"
                            : transaction.status === "refunded"
                              ? "info"
                              : "danger"
                      }
                    >
                      {toLabel(transaction.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{transaction.paymentMethod ?? "-"}</TableCell>
                  <TableCell>{formatDateTime(transaction.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="grid gap-4 2xl:grid-cols-[1.1fr_0.9fr_0.7fr]">
        <SectionCard title="Payment Summary" description="Distribusi status transaksi berdasarkan data backend">
          <DistributionDonutChart data={breakdown} />
        </SectionCard>

        <SectionCard title="Status Terbaru" description="Tiga event transaksi paling baru">
          <div className="space-y-3">
            {allTransactions.data.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-100 px-4 py-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-2xl",
                      activityTone[item.status] ?? activityTone.failed,
                    )}
                  >
                    {item.status === "success" ? (
                      <CheckCircle2 className="size-4" />
                    ) : item.status === "pending" ? (
                      <Clock3 className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-slate-950 text-sm">{item.invoiceNumber}</p>
                      <span className="text-slate-400 text-xs">{formatDateTime(item.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-slate-500 text-sm">{item.userName} · {item.planName} · {toLabel(item.status)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Aksi Cepat" description="Shortcut operasional transaksi">
          <div className="space-y-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.title}
                  className="flex w-full items-start gap-3 rounded-2xl border border-slate-100 px-4 py-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-950 text-sm">{item.title}</p>
                    <p className="mt-1 text-slate-500 text-sm">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
