"use client";

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SuperAdminAccountItem } from "@/server/admin-data";
import { initialAdminActionState } from "@/server/admin-action-state";
import { deactivateAdminAccountAction } from "@/server/admin-actions";

export function DeactivateAdminForm({
  admin,
  onSuccess,
}: {
  readonly admin: SuperAdminAccountItem;
  readonly onSuccess?: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    deactivateAdminAccountAction,
    initialAdminActionState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      onSuccess?.();
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  if (admin.status !== "active") {
    return <p className="text-muted-foreground text-sm">Akun ini sudah tidak aktif.</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="adminId" value={admin.id} />
      <p className="text-sm">
        Nonaktifkan <strong>{admin.fullName}</strong> ({admin.email})?
      </p>
      <div className="space-y-2">
        <Label htmlFor="deactivate-reason">Alasan (min. 5 karakter)</Label>
        <Textarea
          id="deactivate-reason"
          name="reason"
          required
          minLength={5}
          placeholder="Contoh: Admin tidak lagi bertugas di tim."
          rows={3}
        />
      </div>
      <Button type="submit" variant="destructive" disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isPending ? "Memproses..." : "Nonaktifkan admin"}
      </Button>
    </form>
  );
}
