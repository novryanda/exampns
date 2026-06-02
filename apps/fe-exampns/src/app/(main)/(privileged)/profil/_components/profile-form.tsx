"use client";

import { useActionState, useEffect } from "react";

import { CircleCheck, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CurrentUserProfile } from "@/lib/auth/server-auth";
import { initialAdminActionState } from "@/server/admin-action-state";
import { updateProfileAction } from "@/server/profile-actions";

export function ProfileForm({ profile }: { readonly profile: CurrentUserProfile }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialAdminActionState);

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
    <form action={formAction} className="grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-2">
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="profile-name">Nama lengkap</Label>
        <Input
          id="profile-name"
          name="name"
          defaultValue={profile.name}
          required
          minLength={2}
          maxLength={150}
          autoComplete="name"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-email">Email</Label>
        <div className="relative">
          <Input
            id="profile-email"
            value={profile.email}
            readOnly
            disabled
            className="bg-slate-50 pr-10"
          />
          {profile.emailVerified ? (
            <CircleCheck className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-emerald-500" />
          ) : null}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-phone">Nomor telepon</Label>
        <Input
          id="profile-phone"
          name="phone"
          type="tel"
          defaultValue={profile.phone ?? ""}
          placeholder="Masukkan nomor telepon"
          required
          maxLength={30}
          autoComplete="tel"
        />
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
              Menyimpan…
            </>
          ) : (
            <>
              <Save className="size-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
