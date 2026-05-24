"use client";

import { useActionState, useEffect, useState } from "react";
import { Ban, CheckCircle2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { AdminUserItem } from "@/server/admin-data";
import { initialAdminActionState } from "@/server/admin-action-state";
import { deletePlatformUserAction, updatePlatformUserStatusAction } from "@/server/admin-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function StatusActionButton({
  userId,
  status,
  label,
  icon: Icon,
  variant = "outline",
}: {
  readonly userId: string;
  readonly status: string;
  readonly label: string;
  readonly icon: typeof Ban;
  readonly variant?: "outline" | "destructive";
}) {
  const [state, formAction, isPending] = useActionState(
    updatePlatformUserStatusAction,
    initialAdminActionState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="status" value={status} />
      <Button type="submit" size="sm" variant={variant} className="rounded-lg" disabled={isPending}>
        <Icon className="mr-1 size-4" />
        {label}
      </Button>
    </form>
  );
}

function DeleteUserDialog({ user }: { readonly user: AdminUserItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    deletePlatformUserAction,
    initialAdminActionState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      setOpen(false);
      router.refresh();
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" className="rounded-lg">
          <Trash2 className="mr-1 size-4" />
          Hapus
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus user</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="userId" value={user.id} />
          <p className="text-sm">
            Hapus <strong>{user.fullName}</strong> ({user.email})? Data di-soft-delete dan tidak bisa
            login lagi.
          </p>
          <div className="space-y-2">
            <Label htmlFor={`delete-reason-${user.id}`}>Alasan (opsional)</Label>
            <Textarea
              id={`delete-reason-${user.id}`}
              name="reason"
              placeholder="Contoh: Permintaan user / duplikat akun"
              rows={3}
            />
          </div>
          <Button type="submit" variant="destructive" disabled={isPending} className="w-full">
            {isPending ? "Menghapus..." : "Konfirmasi hapus"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UserRowActions({ user }: { readonly user: AdminUserItem }) {
  return (
    <div className="flex flex-wrap justify-end gap-1">
      {user.status !== "active" ? (
        <StatusActionButton userId={user.id} status="active" label="Aktifkan" icon={CheckCircle2} />
      ) : null}
      {user.status !== "suspended" ? (
        <StatusActionButton userId={user.id} status="suspended" label="Suspend" icon={Ban} />
      ) : null}
      <DeleteUserDialog user={user} />
    </div>
  );
}
