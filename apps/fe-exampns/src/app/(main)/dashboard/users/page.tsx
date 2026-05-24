import Link from "next/link";
import { Suspense } from "react";

import { Ban, Eye, ShieldCheck, UserRound, Users2 } from "lucide-react";

import { DistributionDonutChart } from "@/components/examcpns-admin/charts";
import { MetricCard, SectionCard, StatusBadge } from "@/components/examcpns-admin/ui";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requirePrivilegedProfile } from "@/lib/auth/server-auth";
import { getAdminUsers } from "@/server/admin-data";

import { UserRowActions } from "./_components/user-row-actions";
import { UsersFilters } from "./_components/users-filters";
import { UsersManagementHeader } from "./_components/users-management-header";
import { UsersPagination } from "./_components/users-pagination";

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

type UsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const profile = await requirePrivilegedProfile();
  const isSuperAdmin = profile.role === "SUPER_ADMIN";

  const params = await searchParams;
  const search = readParam(params.search).trim();
  const status = readParam(params.status);
  const subscriptionStatus = readParam(params.subscriptionStatus);
  const page = Math.max(1, Number(readParam(params.page)) || 1);

  const listParams = {
    search: search || undefined,
    status: status && status !== "all" ? status : undefined,
    subscriptionStatus:
      subscriptionStatus && subscriptionStatus !== "all" ? subscriptionStatus : undefined,
    page,
    limit: 20,
  };

  const [allUsers, activeUsers, trialUsers, suspendedUsers] = await Promise.all([
    getAdminUsers(listParams),
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

  const filterState = { search, status, subscriptionStatus };

  return (
    <div className="flex flex-col gap-6">
      <UsersManagementHeader isSuperAdmin={isSuperAdmin} />

      <Suspense fallback={null}>
        <UsersFilters
          search={search}
          status={status || "all"}
          subscriptionStatus={subscriptionStatus || "all"}
        />
      </Suspense>

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
          description={`Menampilkan ${allUsers.data.length} dari ${allUsers.meta.totalItems.toLocaleString("id-ID")} user`}
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
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                    Tidak ada user yang cocok dengan filter.
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
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-2">
                        <Button variant="ghost" size="sm" className="rounded-lg" asChild>
                          <Link href={`/dashboard/users/${user.id}`}>
                            <Eye className="mr-1 size-4" />
                            Detail
                          </Link>
                        </Button>
                        {isSuperAdmin ? <UserRowActions user={user} /> : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <UsersPagination
            page={allUsers.meta.page}
            totalPages={allUsers.meta.totalPages}
            filters={filterState}
          />
        </SectionCard>

        <div className="flex flex-col gap-4">
          <SectionCard title="Subscription Composition" description="Distribusi status subscription user">
            <DistributionDonutChart data={subscriptionDistribution} />
          </SectionCard>

          <SectionCard title="Panduan" description="Users vs Admin Accounts">
            <div className="space-y-3 text-slate-500 text-sm">
              <p>
                <strong>Users:</strong> pengguna tryout (role USER). Super admin bisa tambah, suspend,
                aktifkan, hapus.
              </p>
              <p>
                <strong>Admin Accounts:</strong> kelola akun ADMIN (buat / nonaktifkan) di menu terpisah.
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
