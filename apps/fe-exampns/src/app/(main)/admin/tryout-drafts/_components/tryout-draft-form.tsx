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
  redirectPath,
}: {
  readonly draft?: AdminTryoutDraftDetail;
  readonly redirectPath: string;
}) {
  const router = useRouter();
  const action = draft ? updateTryoutDraftAction : createTryoutDraftAction;
  const [state, formAction, isPending] = useActionState(action, initialResourceActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      router.push(redirectPath);
      router.refresh();
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [redirectPath, router, state]);

  return (
    <form action={formAction} className="grid gap-6">
      {draft ? <input type="hidden" name="tryoutDraftId" value={draft.id} /> : null}

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
          <Label htmlFor="tryoutType">Type</Label>
          <Select name="tryoutType" defaultValue={draft?.tryoutType ?? "generated"}>
            <SelectTrigger id="tryoutType" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="accessType">Access</Label>
          <Select name="accessType" defaultValue={draft?.accessType ?? "trial_and_paid"}>
            <SelectTrigger id="accessType" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Access" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trial_and_paid">Trial & Paid</SelectItem>
              <SelectItem value="paid_only">Paid Only</SelectItem>
              <SelectItem value="premium_only">Premium Only</SelectItem>
              <SelectItem value="trial_only">Trial Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={draft?.status ?? "draft"}>
            <SelectTrigger id="status" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
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
          <Label htmlFor="sortOrder">Sort Order</Label>
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
        <ToggleField name="isFeatured" defaultChecked={draft?.isFeatured ?? false} label="Featured" />
        <ToggleField
          name="showResultImmediately"
          defaultChecked={draft?.showResultImmediately ?? true}
          label="Show Result"
        />
        <ToggleField name="showAnswerReview" defaultChecked={draft?.showAnswerReview ?? true} label="Answer Review" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Menyimpan..." : draft ? "Simpan Draft" : "Buat Draft"}
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
