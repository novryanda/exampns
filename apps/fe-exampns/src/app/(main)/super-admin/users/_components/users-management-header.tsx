"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { CreateUserForm } from "./create-user-form";

export function UsersManagementHeader({ isSuperAdmin }: { readonly isSuperAdmin: boolean }) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <PageHeader
      title="Users"
      description={
        isSuperAdmin
          ? "Kelola pengguna platform"
          : "Monitoring pengguna platform (baca saja). Kelola admin di menu Admin Accounts."
      }
      actions={
        isSuperAdmin ? (
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="mr-2 size-4" />
                Tambah user
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Buat user baru</DialogTitle>
              </DialogHeader>
              <CreateUserForm onSuccess={() => setCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        ) : undefined
      }
    />
  );
}
