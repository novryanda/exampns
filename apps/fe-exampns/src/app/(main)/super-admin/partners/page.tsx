import Link from "next/link";
import { Handshake, Plus } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { getSuperAdminPartners } from "@/server/partner-data";

function money(amount: number) {
  return formatCurrency(amount, { currency: "IDR", locale: "id-ID", noDecimals: true });
}

export default async function SuperAdminPartnersPage() {
  const partners = await getSuperAdminPartners({ limit: 50 });
  const totalAvailable = partners.data.reduce((sum, item) => sum + item.balance.availableBalance, 0);
  const totalEarned = partners.data.reduce((sum, item) => sum + item.balance.totalEarned, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mitra"
        description="Kelola akun mitra, kode referral, saldo komisi, dan pencairan."
        actions={
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/super-admin/partners/create">
              <Plus className="size-4" />
              Tambah Mitra
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total Mitra" value={partners.meta.totalItems.toLocaleString("id-ID")} delta="" deltaLabel="akun terdaftar" direction="neutral" icon={Handshake} tint="blue" />
        <MetricCard title="Saldo Tersedia" value={money(totalAvailable)} delta="" deltaLabel="akumulasi halaman ini" direction="neutral" icon={Handshake} tint="green" />
        <MetricCard title="Total Komisi" value={money(totalEarned)} delta="" deltaLabel="komisi sukses" direction="neutral" icon={Handshake} tint="violet" />
      </div>

      <SectionCard title="Daftar Mitra">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mitra</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-slate-500">Belum ada mitra.</TableCell>
              </TableRow>
            ) : (
              partners.data.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="font-medium text-slate-950">{partner.displayName}</div>
                    <div className="text-slate-400 text-xs">{partner.email}</div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={partner.status === "active" ? "success" : partner.status === "inactive" ? "neutral" : "danger"}>
                      {partner.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{partner.activeCodes}/{partner.totalCodes} aktif</TableCell>
                  <TableCell>{money(partner.balance.availableBalance)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline" className="rounded-xl">
                      <Link href={`/super-admin/partners/${partner.id}`}>Detail</Link>
                    </Button>
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
