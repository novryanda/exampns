"use client";

import { useActionState, useEffect } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialAdminActionState } from "@/server/admin-action-state";
import { grantUserAccessOverrideAction, revokeUserAccessOverrideAction } from "@/server/admin-actions";
import type { SubscriptionPlanItem, UserAccessOverrideItem } from "@/server/admin-data";

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
  subscriptionPlans,
}: {
  readonly userId: string;
  readonly overrides: UserAccessOverrideItem[];
  readonly subscriptionPlans: SubscriptionPlanItem[];
}) {
  const [state, formAction, isPending] = useActionState(grantUserAccessOverrideAction, initialAdminActionState);
  const availablePlans = subscriptionPlans.filter((plan) => plan.isActive && plan.tier !== "trial");

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
        <div className="grid gap-4 md:grid-cols-1">
          <div className="grid gap-2">
            <Label htmlFor="override-subscription-plan">Pilih Subscription Plan</Label>
            <Select name="subscriptionPlanId" defaultValue={availablePlans[0]?.id}>
              <SelectTrigger id="override-subscription-plan" className="rounded-xl border-slate-200 bg-white">
                <SelectValue placeholder="Pilih subscription plan" />
              </SelectTrigger>
              <SelectContent>
                {availablePlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name} ({plan.tier})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availablePlans.length === 0 ? (
              <p className="text-sm text-amber-700">Belum ada subscription plan aktif non-trial yang bisa dipakai.</p>
            ) : null}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="override-reason">Alasan</Label>
          <Textarea
            id="override-reason"
            name="reason"
            className="min-h-24 rounded-xl border-slate-200"
            placeholder="Contoh: kompensasi layanan, akses khusus pengguna, atau kebutuhan support."
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            disabled={isPending || availablePlans.length === 0}
          >
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
                  {override.subscriptionPlan.name} ({override.subscriptionPlan.tier})
                </div>
                <div className="text-slate-500">Diberikan pada: {formatDateTime(override.createdAt)}</div>
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
