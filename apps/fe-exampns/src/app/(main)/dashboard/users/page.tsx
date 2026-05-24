import { Ban, Search, ShieldCheck, UserRound, Users2 } from "lucide-react";

import { DistributionDonutChart } from "@/components/examcpns-admin/charts";
import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/components/examcpns-admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminUsers } from "@/server/admin-data";

const statIcons = [Users2, ShieldCheck, UserRound, Ban] as const;
const statTints = ["blue", "green", "violet", "red"] as const;

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toStatusBadgeTone(status: string) {
  if (status === "active") return "success";
  if (status === "trial" || status === "inactive") return "warning";
  if (status === "suspended" || status === "expired") return "danger";
  return "neutral";
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function UsersPage() {
  const [allUsers, activeUsers, trialUsers, suspendedUsers] = await Promise.all([
    getAdminUsers({ limit: 10 }),
    getAdminUsers({ status: "active", limit: 1 }),
    getAdminUsers({ subscriptionStatus: "trial", limit: 1 }),
    getAdminUsers({ status: "suspended", limit: 1 }),
  ]);

  const metrics = [
    {
      title: "Total Users",
      value: allUsers.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "akun user di platform",
      direction: "neutral" as const,
    },
    {
      title: "Active",
      value: activeUsers.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "status akun aktif",
      direction: "neutral" as const,
    },
    {
      title: "Trial Users",
      value: trialUsers.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "subscription trial aktif",
      direction: "neutral" as const,
    },
    {
      title: "Suspended",
      value: suspendedUsers.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "akun sedang ditangguhkan",
      direction: "neutral" as const,
    },
  ];

  const subscriptionDistribution = [
    { name: "Active", value: activeUsers.meta.totalItems, fill: "#23b26d" },
    { name: "Trial", value: trialUsers.meta.totalItems, fill: "#f59e0b" },
    {
      name: "Expired / Inactive",
      value: Math.max(
        0,
        allUsers.meta.totalItems -
          activeUsers.meta.totalItems -
          trialUsers.meta.totalItems -
          suspendedUsers.meta.totalItems,
      ),
      fill: "#94a3b8",
    },
    { name: "Suspended", value: suspendedUsers.meta.totalItems, fill: "#ef4444" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Users"
        description="Kelola pengguna platform berdasarkan data monitoring backend terbaru."
        actions={
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white">
            Export
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-80 flex-1">
          <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
          <Input className="rounded-xl border-slate-200 pl-9" placeholder="Cari nama atau email pengguna..." />
        </div>
        <Select defaultValue="all-status">
          <SelectTrigger className="w-44 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">Semua Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-subscription">
          <SelectTrigger className="w-52 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Semua Subscription" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-subscription">Semua Subscription</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
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

      <div className="grid gap-4 2xl:grid-cols-[1.55fr_0.75fr]">
        <SectionCard
          title="Daftar Users"
          description={`Showing ${allUsers.data.length} dari ${allUsers.meta.totalItems.toLocaleString("id-ID")} users`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Total Exam</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                    Belum ada data user.
                  </TableCell>
                </TableRow>
              ) : (
                allUsers.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-slate-950">{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <StatusBadge tone={toStatusBadgeTone(user.status)}>{toLabel(user.status)}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={toStatusBadgeTone(user.subscriptionStatus)}>
                        {toLabel(user.subscriptionStatus)}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>{user.totalExams}</TableCell>
                    <TableCell>{formatDateTime(user.lastActiveAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </SectionCard>

        <div className="flex flex-col gap-4">
          <SectionCard title="Subscription Composition" description="Distribusi status subscription user">
            <DistributionDonutChart data={subscriptionDistribution} />
          </SectionCard>

          <SectionCard title="Monitoring Notes" description="Interpretasi singkat dari data pengguna saat ini.">
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-100 px-4 py-4">
                <p className="font-medium text-slate-950 text-sm">User aktif mendominasi</p>
                <p className="mt-1 text-slate-500 text-sm">
                  {activeUsers.meta.totalItems} dari {allUsers.meta.totalItems} user berada dalam status aktif.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 px-4 py-4">
                <p className="font-medium text-slate-950 text-sm">Trial masih signifikan</p>
                <p className="mt-1 text-slate-500 text-sm">
                  {trialUsers.meta.totalItems} user masih menggunakan akses trial dan berpotensi dikonversi.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 px-4 py-4">
                <p className="font-medium text-slate-950 text-sm">Akun suspended</p>
                <p className="mt-1 text-slate-500 text-sm">
                  {suspendedUsers.meta.totalItems} user sedang berada pada status suspended dan perlu perhatian admin.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
