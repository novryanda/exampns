"use client";

import { useState } from "react";

import { ShieldUser, UserX } from "lucide-react";

import { SectionCard, StatusBadge } from "@/components/examcpns-admin/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { SuperAdminAccountItem } from "@/server/admin-data";

import { AdminAccountsPagination } from "./admin-accounts-pagination";
import { DeactivateAdminForm } from "./deactivate-admin-form";

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toStatusBadgeTone(status: string) {
  if (status === "active") return "success";
  if (status === "inactive") return "warning";
  return "danger";
}

export function AdminAccountsTable({
  admins,
  page,
  totalPages,
  totalItems,
  filters,
}: {
  readonly admins: SuperAdminAccountItem[];
  readonly page: number;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly filters: { search?: string; status?: string };
}) {
  const [deactivateTarget, setDeactivateTarget] = useState<SuperAdminAccountItem | null>(null);

  return (
    <SectionCard
      title="Daftar Admin"
      description={`Menampilkan ${admins.length} dari ${totalItems.toLocaleString("id-ID")} admin`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                Tidak ada admin yang cocok dengan filter.
              </TableCell>
            </TableRow>
          ) : (
            admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium text-slate-950">
                  <span className="inline-flex items-center gap-2">
                    <ShieldUser className="size-4 text-slate-400" />
                    {admin.fullName}
                  </span>
                </TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <StatusBadge tone={toStatusBadgeTone(admin.status)}>
                    {toLabel(admin.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>{formatDateTime(admin.lastLoginAt)}</TableCell>
                <TableCell className="text-right">
                  <Dialog
                    open={deactivateTarget?.id === admin.id}
                    onOpenChange={(open) => setDeactivateTarget(open ? admin : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 rounded-lg"
                        disabled={admin.status !== "active"}
                        aria-label="Nonaktifkan admin"
                        title="Nonaktifkan admin"
                      >
                        <UserX className="size-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Nonaktifkan admin</DialogTitle>
                      </DialogHeader>
                      <DeactivateAdminForm
                        admin={admin}
                        onSuccess={() => setDeactivateTarget(null)}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AdminAccountsPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        filters={filters}
      />
    </SectionCard>
  );
}
