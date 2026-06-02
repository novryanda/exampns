"use client";

import { useActionState, useEffect } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialAdminActionState } from "@/server/admin-action-state";
import { grantUserAccessOverrideAction, revokeUserAccessOverrideAction } from "@/server/admin-actions";
import type { UserAccessOverrideItem } from "@/server/admin-data";

function formatDateTimeLocal(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  const hours = String(value.getHours()).padStart(2, "0");
  const minutes = String(value.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function RevokeOverrideForm({ userId, overrideId }: { readonly userId: string; readonly overrideId: string }) {
  const [state, formAction, isPending] = useActionState(revokeUserAccessOverrideAction, initialAdminActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="overrideId" value={overrideId} />
      <Button type="submit" size="sm" variant="outline" className="rounded-lg border-slate-200" disabled={isPending}>
        Cabut
      </Button>
    </form>
  );
}

export function AccessOverrideManager({
  userId,
  overrides,
}: {
  readonly userId: string;
  readonly overrides: UserAccessOverrideItem[];
}) {
  const [state, formAction, isPending] = useActionState(grantUserAccessOverrideAction, initialAdminActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="grid gap-6">
      <form action={formAction} className="grid gap-4 rounded-2xl border border-slate-200 p-4">
        <input type="hidden" name="userId" value={userId} />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="override-tier">Tier Override</Label>
            <Select name="tier" defaultValue="premium">
              <SelectTrigger id="override-tier" className="rounded-xl border-slate-200 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="override-starts-at">Mulai</Label>
            <Input
              id="override-starts-at"
              name="startsAt"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(new Date())}
              className="rounded-xl border-slate-200"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="override-expires-at">Berakhir</Label>
            <Input
              id="override-expires-at"
              name="expiresAt"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}
              className="rounded-xl border-slate-200"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="override-reason">Alasan</Label>
          <Textarea
            id="override-reason"
            name="reason"
            className="min-h-24 rounded-xl border-slate-200"
            placeholder="Contoh: kompensasi layanan, promo premium, atau kebutuhan support."
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Berikan Override"}
          </Button>
        </div>
      </form>

      <div className="grid gap-3">
        {overrides.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-slate-500 text-sm">
            Belum ada override akses untuk user ini.
          </div>
        ) : (
          overrides.map((override) => (
            <div
              key={override.id}
              className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4"
            >
              <div className="space-y-1 text-sm">
                <div className="font-medium text-slate-950">
                  {override.tier === "premium" ? "Premium Override" : "Standard Override"}
                </div>
                <div className="text-slate-500">Mulai: {formatDateTime(override.startsAt)}</div>
                <div className="text-slate-500">Berakhir: {formatDateTime(override.expiresAt)}</div>
                <div className="text-slate-500">Diberikan oleh: {override.grantedBy}</div>
                <div className="text-slate-500">Alasan: {override.reason}</div>
                {override.revokedAt ? (
                  <div className="text-amber-700">
                    Dicabut pada {formatDateTime(override.revokedAt)}
                    {override.revokedBy ? ` oleh ${override.revokedBy}` : ""}
                  </div>
                ) : null}
              </div>
              {override.revokedAt ? null : <RevokeOverrideForm userId={userId} overrideId={override.id} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
