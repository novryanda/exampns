import Link from "next/link";

import { Eye } from "lucide-react";

import { UserListAvatar } from "@/components/examcpns-admin/user-list-avatar";
import { SectionCard, StatusBadge } from "@/components/examcpns-admin/ui";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminUsers } from "@/server/admin-data";

import { UserRowActions } from "./user-row-actions";
import { UsersPagination } from "./users-pagination";

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

export async function UsersTableSection({
  isSuperAdmin,
  listParams,
  filterState,
}: {
  readonly isSuperAdmin: boolean;
  readonly listParams: {
    search?: string;
    status?: string;
    subscriptionStatus?: string;
    page: number;
    limit: number;
  };
  readonly filterState: { search?: string; status?: string; subscriptionStatus?: string };
}) {
  const allUsers = await getAdminUsers(listParams);

  return (
    <SectionCard
      title="Daftar Users"
      description={`Menampilkan ${allUsers.data.length} dari ${allUsers.meta.totalItems.toLocaleString("id-ID")} user`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-14">No</TableHead>
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
              <TableCell colSpan={8} className="py-10 text-center text-slate-400">
                Tidak ada user yang cocok dengan filter.
              </TableCell>
            </TableRow>
          ) : (
            allUsers.data.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="text-slate-500 tabular-nums">
                  {(allUsers.meta.page - 1) * listParams.limit + index + 1}
                </TableCell>
                <TableCell className="font-medium text-slate-950">
                  <span className="inline-flex items-center gap-3">
                    <UserListAvatar name={user.fullName} imageUrl={user.image} />
                    {user.fullName}
                  </span>
                </TableCell>
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
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg"
                      asChild
                      title="Detail"
                    >
                      <Link href={`/dashboard/users/${user.id}`} aria-label="Detail user">
                        <Eye className="size-4" />
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
        totalItems={allUsers.meta.totalItems}
        filters={filterState}
      />
    </SectionCard>
  );
}
