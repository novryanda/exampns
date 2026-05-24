"use client";

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAdminActionState } from "@/server/admin-action-state";
import { createPlatformUserAction } from "@/server/admin-actions";

export function CreateUserForm({ onSuccess }: { readonly onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(createPlatformUserAction, initialAdminActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      onSuccess?.();
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="user-fullName">Nama lengkap</Label>
        <Input id="user-fullName" name="fullName" required minLength={2} placeholder="Nama user" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-email">Email</Label>
        <Input id="user-email" name="email" type="email" required placeholder="user@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-phone">Telepon (opsional)</Label>
        <Input id="user-phone" name="phone" placeholder="081234567890" />
      </div>
      <p className="text-muted-foreground text-xs">
        User menerima email berisi link atur password. Status inactive sampai password diset.
      </p>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isPending ? "Membuat..." : "Buat user"}
      </Button>
    </form>
  );
}
