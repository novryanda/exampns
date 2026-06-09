"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { initialAdminActionState } from "@/server/admin-action-state";
import { saveSubscriptionPlanAction } from "@/server/admin-actions";
import type { SubscriptionPlanItem } from "@/server/admin-data";

const DESCRIPTION_MAX = 200;

export type PlanFormDraft = {
  planId?: string;
  name: string;
  description: string;
  tier: SubscriptionPlanItem["tier"];
  durationDays: number;
  price: number;
  currency: string;
  trialTryoutLimit: number;
  trialDayLimit: number;
  isActive: boolean;
};

export function createEmptyPlanDraft(): PlanFormDraft {
  return {
    name: "",
    description: "",
    tier: "standard",
    durationDays: 30,
    price: 99000,
    currency: "IDR",
    trialTryoutLimit: 3,
    trialDayLimit: 7,
    isActive: true,
  };
}

export function planToDraft(plan: SubscriptionPlanItem, duplicate = false): PlanFormDraft {
  return {
    planId: duplicate ? undefined : plan.id,
    name: duplicate ? `${plan.name} (Salinan)` : plan.name,
    description: plan.description ?? "",
    tier: plan.tier,
    durationDays: plan.durationDays,
    price: plan.price,
    currency: plan.currency,
    trialTryoutLimit: plan.trialTryoutLimit ?? 3,
    trialDayLimit: plan.trialDayLimit ?? 7,
    isActive: duplicate ? false : plan.isActive,
  };
}

export function SubscriptionPlanFormSheet({
  open,
  onOpenChange,
  draft,
  mode,
}: {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly draft: PlanFormDraft;
  readonly mode: "create" | "edit";
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(saveSubscriptionPlanAction, initialAdminActionState);
  const [tier, setTier] = useState<PlanFormDraft["tier"]>(draft.tier);
  const [description, setDescription] = useState(draft.description);
  const [isActive, setIsActive] = useState(draft.isActive);

  useEffect(() => {
    if (!open) {
      return;
    }

    setTier(draft.tier);
    setDescription(draft.description);
    setIsActive(draft.isActive);
  }, [draft, open]);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      onOpenChange(false);
      router.refresh();
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state, onOpenChange, router]);

  const title = mode === "create" ? "Buat Plan Baru" : "Edit Plan";
  const subtitle =
    mode === "create"
      ? "Tambahkan paket subscription baru untuk platform."
      : "Perbarui detail paket subscription yang dipilih.";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        <SheetHeader className="border-slate-100 border-b px-6 py-5">
          <SheetTitle className="font-semibold text-lg text-slate-950">{title}</SheetTitle>
          <SheetDescription>{subtitle}</SheetDescription>
        </SheetHeader>

        <form action={formAction} className="flex min-h-0 flex-1 flex-col">
          {draft.planId ? <input type="hidden" name="planId" value={draft.planId} /> : null}

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
            <div className="grid gap-2">
              <Label htmlFor="plan-name">Nama Plan</Label>
              <Input
                id="plan-name"
                name="name"
                key={`name-${draft.planId ?? "new"}-${draft.name}`}
                defaultValue={draft.name}
                className="rounded-xl border-slate-200"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="plan-tier">Tier</Label>
              <Select name="tier" value={tier} onValueChange={(value) => setTier(value as PlanFormDraft["tier"])}>
                <SelectTrigger id="plan-tier" className="rounded-xl border-slate-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="plan-duration">Durasi (hari)</Label>
                <Input
                  id="plan-duration"
                  name="durationDays"
                  type="number"
                  min={1}
                  key={`duration-${draft.planId ?? "new"}`}
                  defaultValue={draft.durationDays}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan-price">Harga</Label>
                <Input
                  id="plan-price"
                  name="price"
                  type="number"
                  min={0}
                  key={`price-${draft.planId ?? "new"}-${draft.price}`}
                  defaultValue={draft.price}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="plan-currency">Mata Uang</Label>
              <Select name="currency" defaultValue={draft.currency}>
                <SelectTrigger id="plan-currency" className="rounded-xl border-slate-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IDR">IDR - Rupiah</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="plan-description">Deskripsi</Label>
                <span className="text-slate-400 text-xs">
                  {description.length}/{DESCRIPTION_MAX}
                </span>
              </div>
              <Textarea
                id="plan-description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value.slice(0, DESCRIPTION_MAX))}
                className="min-h-24 rounded-xl border-slate-200"
                placeholder="Jelaskan manfaat dan cakupan akses plan ini."
              />
            </div>

            {tier === "trial" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="trial-tryout-limit">Trial Tryout Limit</Label>
                  <Input
                    id="trial-tryout-limit"
                    name="trialTryoutLimit"
                    type="number"
                    min={0}
                    key={`trial-limit-${draft.planId ?? "new"}`}
                    defaultValue={draft.trialTryoutLimit}
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="trial-day-limit">Trial Day Limit</Label>
                  <Input
                    id="trial-day-limit"
                    name="trialDayLimit"
                    type="number"
                    min={1}
                    key={`trial-days-${draft.planId ?? "new"}`}
                    defaultValue={draft.trialDayLimit}
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </div>
            ) : null}

            <label className="flex items-start gap-3 rounded-2xl border border-slate-100 px-4 py-3">
              <input
                name="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="mt-0.5 size-4"
              />
              <span className="space-y-0.5">
                <span className="block font-medium text-slate-900 text-sm">Plan aktif</span>
                <span className="block text-slate-500 text-xs">Plan aktif dapat dipilih user saat checkout.</span>
              </span>
            </label>
          </div>

          <SheetFooter className="flex-row justify-end gap-2 border-slate-100 border-t bg-white px-6 py-4">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? "Menyimpan..." : mode === "create" ? "Buat Plan" : "Simpan Perubahan"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
