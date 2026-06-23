"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialResourceActionState } from "@/server/admin-action-state";
import { createTryoutDraftAction, updateTryoutDraftAction } from "@/server/admin-content-actions";
import type { AdminTryoutDraftDetail } from "@/server/admin-content-data";
import type { SubscriptionPlanItem } from "@/server/user-dashboard-data";

function ToggleField({
  name,
  defaultChecked,
  label,
}: {
  readonly name: string;
  readonly defaultChecked: boolean;
  readonly label: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
      <Label htmlFor={name}>{label}</Label>
      <input id={name} name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4" />
    </div>
  );
}

export function TryoutDraftForm({
  draft,
  subscriptionPlans,
  scope = "admin",
  redirectPath,
  createRedirectBasePath,
}: {
  readonly draft?: AdminTryoutDraftDetail;
  readonly subscriptionPlans: SubscriptionPlanItem[];
  readonly scope?: "admin" | "super-admin";
  readonly redirectPath: string;
  readonly createRedirectBasePath?: string;
}) {
  const router = useRouter();
  const action = draft ? updateTryoutDraftAction : createTryoutDraftAction;
  const [state, formAction, isPending] = useActionState(action, initialResourceActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      if (!draft && state.resourceId) {
        router.push(`${createRedirectBasePath ?? "/admin/tryout-drafts"}/${state.resourceId}/edit`);
      } else {
        router.push(redirectPath);
      }
      router.refresh();
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [createRedirectBasePath, draft, redirectPath, router, state]);

  return (
    <form action={formAction} className="grid gap-6">
      {draft ? <input type="hidden" name="tryoutDraftId" value={draft.id} /> : null}
      <input type="hidden" name="scope" value={scope} />
      <input type="hidden" name="status" value="draft" />

      <div className="grid gap-2">
        <Label htmlFor="name">Nama Draft</Label>
        <Input
          id="name"
          name="name"
          defaultValue={draft?.name ?? ""}
          className="rounded-xl border-slate-200"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={draft?.description ?? ""}
          className="min-h-28 rounded-xl border-slate-200"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <div className="grid gap-2">
          <Label htmlFor="tryoutType">Tipe</Label>
          <Select name="tryoutType" defaultValue={draft?.tryoutType ?? "generated"}>
            <SelectTrigger id="tryoutType" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Pilih tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="generated">Otomatis</SelectItem>
              <SelectItem value="adaptive">Adaptive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="requiredSubscriptionPlanId">Akses Subscription Plan</Label>
          <Select
            name="requiredSubscriptionPlanId"
            defaultValue={draft?.requiredSubscriptionPlanId ?? subscriptionPlans[0]?.id ?? ""}
          >
            <SelectTrigger id="requiredSubscriptionPlanId" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Pilih plan" />
            </SelectTrigger>
            <SelectContent>
              {subscriptionPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name} ({plan.tier})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="durationMinutes">Durasi</Label>
          <Input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min={1}
            defaultValue={draft?.durationMinutes ?? 100}
            className="rounded-xl border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="totalQuestions">Total Soal</Label>
          <Input
            id="totalQuestions"
            name="totalQuestions"
            type="number"
            min={1}
            defaultValue={draft?.totalQuestions ?? 110}
            className="rounded-xl border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sortOrder">Urutan</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={draft?.sortOrder ?? 0}
            className="rounded-xl border-slate-200"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ToggleField name="isFeatured" defaultChecked={draft?.isFeatured ?? false} label="Unggulan" />
        <ToggleField
          name="showResultImmediately"
          defaultChecked={draft?.showResultImmediately ?? true}
          label="Tampilkan Hasil"
        />
        <ToggleField name="showAnswerReview" defaultChecked={draft?.showAnswerReview ?? true} label="Tinjau Jawaban" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Menyimpan..." : draft ? "Simpan Tryout" : "Buat Tryout"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-slate-200"
          onClick={() => router.push(redirectPath)}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
