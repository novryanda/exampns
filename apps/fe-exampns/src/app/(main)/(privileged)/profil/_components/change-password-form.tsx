"use client";

import { useActionState, useEffect, useState } from "react";

import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAdminActionState } from "@/server/admin-action-state";
import { changePasswordAction } from "@/server/profile-actions";

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialAdminActionState);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="relative">
          <Input
            id="current-password"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Masukkan password saat ini"
            required
            autoComplete="current-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-slate-500"
            aria-label={showCurrentPassword ? "Sembunyikan password saat ini" : "Tampilkan password saat ini"}
          >
            {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="new-password">Password baru</Label>
        <div className="relative">
          <Input
            id="new-password"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Masukkan password baru"
            required
            minLength={8}
            autoComplete="new-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-slate-500"
            aria-label={showNewPassword ? "Sembunyikan password baru" : "Tampilkan password baru"}
          >
            {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="confirm-password">Konfirmasi password baru</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Masukkan ulang password baru"
            required
            minLength={8}
            autoComplete="new-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-slate-500"
            aria-label={
              showConfirmPassword ? "Sembunyikan konfirmasi password baru" : "Tampilkan konfirmasi password baru"
            }
          >
            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      <div className="md:col-span-2">
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-5 hover:bg-blue-700"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Memproses…
            </>
          ) : (
            <>
              <Lock className="size-4" />
              Ubah Password
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
