"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { CreateAdminForm } from "./create-admin-form";

export function AdminAccountsHeader() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
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
  );
}
