"use client";

import { useActionState, useEffect } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAdminActionState } from "@/server/admin-action-state";
import { changePasswordAction } from "@/server/profile-actions";

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialAdminActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="current-password">Password saat ini</Label>
        <Input
          id="current-password"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="new-password">Password baru</Label>
        <Input
          id="new-password"
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="confirm-password">Konfirmasi password baru</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <div className="md:col-span-2">
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-4 hover:bg-blue-700"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Memproses…
            </>
          ) : (
            "Ubah password"
          )}
        </Button>
      </div>
    </form>
  );
}
