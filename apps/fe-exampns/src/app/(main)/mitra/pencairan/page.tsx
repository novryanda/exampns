import { BadgeDollarSign, Landmark, WalletCards } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { getPartnerBankAccount, getPartnerSummary, getPartnerWithdrawals } from "@/server/partner-data";

import { BankAccountForm, WithdrawalForm } from "../_components/mitra-forms";

function money(amount: number) {
  return formatCurrency(amount, { currency: "IDR", locale: "id-ID", noDecimals: true });
}

export default async function MitraWithdrawalsPage() {
  const [summary, account, withdrawals] = await Promise.all([
    getPartnerSummary(),
    getPartnerBankAccount(),
    getPartnerWithdrawals({ limit: 50 }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Pencairan Saldo" description={`Saldo tersedia: ${money(summary.balance.availableBalance)}`} />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Jumlah Pemasukan"
          value={money(summary.balance.totalEarned)}
          delta=""
          deltaLabel="akumulasi komisi berhasil"
          direction="neutral"
          icon={BadgeDollarSign}
          tint="blue"
        />
        <MetricCard
          title="Saldo Sekarang"
          value={money(summary.balance.availableBalance)}
          delta=""
          deltaLabel="siap diajukan pencairan"
          direction="neutral"
          icon={WalletCards}
          tint="green"
        />
        <MetricCard
          title="Jumlah Ditarik"
          value={money(summary.balance.paidOut)}
          delta=""
          deltaLabel="total pencairan disetujui"
          direction="neutral"
          icon={Landmark}
          tint="amber"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard
          title="Rekening Aktif"
          description="Rekening ini dipakai superadmin untuk transfer pencairan saldo."
        >
          {account ? (
            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-[0.24em]">Bank</p>
                <p className="mt-1 font-semibold text-slate-950 text-xl">{account.bankName}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-[0.24em]">Nomor Rekening</p>
                <p className="mt-1 font-medium text-slate-950">{account.accountNumber}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-[0.24em]">Nama Pemilik</p>
                <p className="mt-1 font-medium text-slate-950">{account.accountHolderName}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-6 text-slate-500 text-sm">
              Belum ada rekening aktif. Tambahkan rekening terlebih dahulu sebelum mengajukan pencairan.
            </div>
          )}
        </SectionCard>

        <SectionCard title="Kelola Rekening" description="Tambah atau perbarui rekening mitra di sini.">
          <BankAccountForm account={account} />
        </SectionCard>
      </div>

      <SectionCard title="Ajukan Pencairan" description={account ? undefined : "Lengkapi rekening terlebih dahulu sebelum mengajukan pencairan."}>
        {account ? <WithdrawalForm availableBalance={summary.balance.availableBalance} /> : <p className="text-slate-500 text-sm">Rekening mitra belum terdaftar.</p>}
      </SectionCard>
      <SectionCard title="Riwayat Pencairan">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead>Rekening</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bukti</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-slate-500">Belum ada pencairan.</TableCell>
              </TableRow>
            ) : (
              withdrawals.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.createdAt).toLocaleString("id-ID")}</TableCell>
                  <TableCell>{money(item.amount)}</TableCell>
                  <TableCell>{item.bankName} - {item.accountNumber}</TableCell>
                  <TableCell>
                    <StatusBadge tone={item.status === "approved" ? "success" : item.status === "pending" ? "warning" : "danger"}>{item.status}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    {item.transferProofUrl ? (
                      <a className="text-blue-600 text-sm" href={item.transferProofUrl} target="_blank" rel="noreferrer">Lihat</a>
                    ) : "-"}
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
