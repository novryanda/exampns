"use client";

import { useState } from "react";

import { Plus, ShieldUser, UserX } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { SuperAdminAccountItem } from "@/server/admin-data";

import { CreateAdminForm } from "./create-admin-form";
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

export function AdminAccountsPanel({ admins }: { readonly admins: SuperAdminAccountItem[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState<SuperAdminAccountItem | null>(null);

  const activeCount = admins.filter((admin) => admin.status === "active").length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Admin Accounts"
        description="Kelola akun ADMIN platform (UC-201 / FR-SADMIN-001). Hanya super admin."
        actions={
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="mr-2 size-4" />
                Tambah admin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Buat akun admin baru</DialogTitle>
              </DialogHeader>
              <CreateAdminForm onSuccess={() => setCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Total Admin" description="Semua akun role ADMIN">
          <p className="font-semibold text-3xl text-slate-950">{admins.length}</p>
        </SectionCard>
        <SectionCard title="Active" description="Admin yang dapat login">
          <p className="font-semibold text-3xl text-emerald-600">{activeCount}</p>
        </SectionCard>
        <SectionCard title="Inactive" description="Admin dinonaktifkan">
          <p className="font-semibold text-3xl text-amber-600">{admins.length - activeCount}</p>
        </SectionCard>
      </div>

      <SectionCard title="Daftar Admin" description="Buat admin baru atau nonaktifkan akun yang tidak dipakai">
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
                  Belum ada akun admin. Klik Tambah admin untuk membuat.
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
                    <StatusBadge tone={toStatusBadgeTone(admin.status)}>{toLabel(admin.status)}</StatusBadge>
                  </TableCell>
                  <TableCell>{formatDateTime(admin.lastLoginAt)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={deactivateTarget?.id === admin.id}
                      onOpenChange={(open) => setDeactivateTarget(open ? admin : null)}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-lg" disabled={admin.status !== "active"}>
                          <UserX className="mr-1 size-4" />
                          Nonaktifkan
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Nonaktifkan admin</DialogTitle>
                        </DialogHeader>
                        <DeactivateAdminForm admin={admin} onSuccess={() => setDeactivateTarget(null)} />
                      </DialogContent>
                    </Dialog>
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
