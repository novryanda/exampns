"use client";

import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialAdminActionState } from "@/server/admin-action-state";
import { saveSubscriptionPlanAction } from "@/server/admin-actions";
import type { SubscriptionPlanItem } from "@/server/admin-data";

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toneForTier(tier: string) {
  if (tier === "premium") return "success";
  if (tier === "standard") return "brand";
  return "warning";
}

export function SubscriptionPlansManager({ plans }: { readonly plans: SubscriptionPlanItem[] }) {
  const [state, formAction, isPending] = useActionState(saveSubscriptionPlanAction, initialAdminActionState);
  const [selectedTier, setSelectedTier] = useState<"trial" | "standard" | "premium">("standard");

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_1.8fr]">
      <SectionCard
        title="Buat Plan Baru"
        description="Tentukan tier plan agar logic akses trial, standard, dan premium berjalan konsisten."
      >
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="plan-name">Nama Plan</Label>
            <Input id="plan-name" name="name" className="rounded-xl border-slate-200" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan-description">Deskripsi</Label>
            <Textarea id="plan-description" name="description" className="min-h-24 rounded-xl border-slate-200" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="plan-tier">Tier</Label>
              <Select
                name="tier"
                value={selectedTier}
                onValueChange={(value) => setSelectedTier(value as typeof selectedTier)}
              >
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
            <div className="grid gap-2">
              <Label htmlFor="plan-duration">Durasi (hari)</Label>
              <Input
                id="plan-duration"
                name="durationDays"
                type="number"
                min={1}
                defaultValue={30}
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
                defaultValue={selectedTier === "trial" ? 0 : 99000}
                className="rounded-xl border-slate-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plan-currency">Mata Uang</Label>
              <Input id="plan-currency" name="currency" defaultValue="IDR" className="rounded-xl border-slate-200" />
            </div>
            {selectedTier === "trial" ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="trial-tryout-limit">Batas Tryout Trial</Label>
                  <Input
                    id="trial-tryout-limit"
                    name="trialTryoutLimit"
                    type="number"
                    min={0}
                    defaultValue={3}
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="trial-day-limit">Durasi Trial (hari)</Label>
                  <Input
                    id="trial-day-limit"
                    name="trialDayLimit"
                    type="number"
                    min={1}
                    defaultValue={7}
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </>
            ) : null}
          </div>
          <label className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
            <span className="text-sm">Aktifkan plan</span>
            <input name="isActive" type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
          <div className="flex justify-end">
            <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan Plan"}
            </Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Daftar Plan" description="Plan lama non-trial sudah diperlakukan sebagai standard.">
        <div className="grid gap-4">
          {plans.map((plan) => (
            <form key={plan.id} action={formAction} className="grid gap-4 rounded-2xl border border-slate-200 p-4">
              <input type="hidden" name="planId" value={plan.id} />
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-slate-950">{plan.name}</div>
                  <div className="text-slate-500 text-sm">{plan.description ?? "Tanpa deskripsi"}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={toneForTier(plan.tier)}>{toLabel(plan.tier)}</StatusBadge>
                  <StatusBadge tone={plan.isActive ? "success" : "neutral"}>
                    {plan.isActive ? "Aktif" : "Nonaktif"}
                  </StatusBadge>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="grid gap-2">
                  <Label htmlFor={`name-${plan.id}`}>Nama</Label>
                  <Input
                    id={`name-${plan.id}`}
                    name="name"
                    defaultValue={plan.name}
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`tier-${plan.id}`}>Tier</Label>
                  <Select name="tier" defaultValue={plan.tier}>
                    <SelectTrigger id={`tier-${plan.id}`} className="rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`duration-${plan.id}`}>Durasi</Label>
                  <Input
                    id={`duration-${plan.id}`}
                    name="durationDays"
                    type="number"
                    min={1}
                    defaultValue={plan.durationDays}
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`price-${plan.id}`}>Harga</Label>
                  <Input
                    id={`price-${plan.id}`}
                    name="price"
                    type="number"
                    min={0}
                    defaultValue={plan.price}
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`description-${plan.id}`}>Deskripsi</Label>
                <Textarea
                  id={`description-${plan.id}`}
                  name="description"
                  defaultValue={plan.description ?? ""}
                  className="min-h-20 rounded-xl border-slate-200"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor={`trial-limit-${plan.id}`}>Trial Tryout Limit</Label>
                  <Input
                    id={`trial-limit-${plan.id}`}
                    name="trialTryoutLimit"
                    type="number"
                    min={0}
                    defaultValue={plan.trialTryoutLimit ?? ""}
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`trial-days-${plan.id}`}>Trial Day Limit</Label>
                  <Input
                    id={`trial-days-${plan.id}`}
                    name="trialDayLimit"
                    type="number"
                    min={1}
                    defaultValue={plan.trialDayLimit ?? ""}
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-slate-600 text-sm">
                  <input name="isActive" type="checkbox" defaultChecked={plan.isActive} className="h-4 w-4" />
                  Plan aktif
                </label>
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-xl border-slate-200 bg-white"
                  disabled={isPending}
                >
                  Perbarui Plan
                </Button>
              </div>
            </form>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
