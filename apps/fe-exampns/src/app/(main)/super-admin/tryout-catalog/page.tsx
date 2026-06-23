import { CheckCircle2, ClipboardList, FileText, Layers2, Search } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTryoutCatalogs } from "@/server/admin-data";

const statIcons = [ClipboardList, CheckCircle2, FileText, Layers2] as const;
const statTints = ["blue", "green", "amber", "violet"] as const;

function toLabel(value: string) {
  if (value === "generated") {
    return "Otomatis";
  }

  if (value === "adaptive") {
    return "Adaptive";
  }

  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function toneForStatus(status: string) {
  if (status === "published") return "success";
  if (status === "archived") return "danger";
  return "neutral";
}

function formatRequiredPlan(plan: { name: string; tier: string } | null) {
  if (!plan) return "Belum dipilih";
  return `${plan.name} (${plan.tier})`;
}

export default async function SuperAdminTryoutCatalogPage() {
  const [allTryouts, publishedTryouts, draftTryouts, archivedTryouts] = await Promise.all([
    getTryoutCatalogs({ limit: 10 }),
    getTryoutCatalogs({ status: "published", limit: 1 }),
    getTryoutCatalogs({ status: "draft", limit: 1 }),
    getTryoutCatalogs({ status: "archived", limit: 1 }),
  ]);

  const metrics = [
    {
      title: "Total Tryout",
      value: allTryouts.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "semua tryout di katalog",
      direction: "neutral" as const,
    },
    {
      title: "Published",
      value: publishedTryouts.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "siap diakses pengguna",
      direction: "neutral" as const,
    },
    {
      title: "Draft",
      value: draftTryouts.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "masih dalam penyusunan",
      direction: "neutral" as const,
    },
    {
      title: "Archived",
      value: archivedTryouts.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "sementara tidak aktif",
      direction: "neutral" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tryout Catalog"
        description="Pantau katalog tryout. Pengelolaan publish dan arsip dilakukan oleh admin konten."
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-80 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="rounded-xl border-slate-200 pl-9" placeholder="Cari tryout..." />
        </div>
        <Select defaultValue="all-type">
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-type">Semua Tipe</SelectItem>
            <SelectItem value="generated">Otomatis</SelectItem>
            <SelectItem value="adaptive">Adaptive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <SectionCard title="Daftar Tryout" description="10 data teratas dari endpoint tryout catalog.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Tryout</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Plan Akses</TableHead>
              <TableHead>Jumlah Soal</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTryouts.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-slate-400">
                  Belum ada tryout yang tersedia.
                </TableCell>
              </TableRow>
            ) : (
              allTryouts.data.map((tryout) => (
                <TableRow key={tryout.id}>
                  <TableCell className="min-w-64">
                    <div className="space-y-1">
                      <div className="font-medium text-slate-950">{tryout.name}</div>
                      <div className="text-slate-400 text-xs">ID: {tryout.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone="brand">{toLabel(tryout.tryoutType)}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone="neutral">{formatRequiredPlan(tryout.requiredSubscriptionPlan)}</StatusBadge>
                  </TableCell>
                  <TableCell>{tryout.totalQuestions}</TableCell>
                  <TableCell>{tryout.durationMinutes} menit</TableCell>
                  <TableCell>
                    <StatusBadge tone={toneForStatus(tryout.status)}>{toLabel(tryout.status)}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={tryout.isFeatured ? "success" : "neutral"}>
                      {tryout.isFeatured ? "Ya" : "Tidak"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{formatDate(tryout.updatedAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
