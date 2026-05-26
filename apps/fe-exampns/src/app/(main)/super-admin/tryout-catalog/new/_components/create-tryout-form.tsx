"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialCreateTryoutActionState } from "@/server/admin-action-state";
import { createTryoutCatalogAction } from "@/server/admin-actions";
import type { PassingGradeConfig } from "@/server/admin-data";

function ToggleField({
  name,
  label,
  defaultChecked,
}: {
  readonly name: string;
  readonly label: string;
  readonly defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
      <Label htmlFor={name}>{label}</Label>
      <input id={name} name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4" />
    </div>
  );
}

export function CreateTryoutForm({
  passingGrade,
  basePath,
}: {
  readonly passingGrade: PassingGradeConfig;
  readonly basePath: string;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createTryoutCatalogAction, initialCreateTryoutActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      router.push(basePath);
      router.refresh();
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [basePath, router, state]);

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="passingGradeConfigId" value={passingGrade.id} />

      <div className="grid gap-2">
        <Label htmlFor="name">Nama Tryout</Label>
        <Input id="name" name="name" className="rounded-xl border-slate-200" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" name="description" className="min-h-28 rounded-xl border-slate-200" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <div className="grid gap-2">
          <Label htmlFor="tryoutType">Type</Label>
          <Select name="tryoutType" defaultValue="generated">
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
          <Select name="accessType" defaultValue="trial_and_paid">
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
          <Select name="status" defaultValue="draft">
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
          <Label htmlFor="totalQuestions">Total Questions</Label>
          <Input
            id="totalQuestions"
            name="totalQuestions"
            type="number"
            min={1}
            defaultValue={110}
            className="rounded-xl border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="durationMinutes">Duration Minutes</Label>
          <Input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min={1}
            defaultValue={100}
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
            defaultValue={0}
            className="rounded-xl border-slate-200"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="randomizationMode">Randomization Mode</Label>
          <Select name="randomizationMode" defaultValue="random_by_category_and_difficulty">
            <SelectTrigger id="randomizationMode" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Randomization mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random_by_category_and_difficulty">By Category & Difficulty</SelectItem>
              <SelectItem value="fully_random">Fully Random</SelectItem>
              <SelectItem value="hybrid_manual_and_random">Hybrid Manual & Random</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="questionOrderMode">Question Order Mode</Label>
          <Select name="questionOrderMode" defaultValue="mixed_random">
            <SelectTrigger id="questionOrderMode" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Question order mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mixed_random">Mixed Random</SelectItem>
              <SelectItem value="grouped_by_category">Grouped by Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="avoidRecentExamCount">Avoid Recent Exam Count</Label>
          <Input
            id="avoidRecentExamCount"
            name="avoidRecentExamCount"
            type="number"
            min={0}
            defaultValue={5}
            className="rounded-xl border-slate-200"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <ToggleField name="isPublic" label="Public" defaultChecked={false} />
        <ToggleField name="isFeatured" label="Featured" defaultChecked={false} />
        <ToggleField name="showResultImmediately" label="Show Result" defaultChecked={true} />
        <ToggleField name="showAnswerReview" label="Answer Review" defaultChecked={true} />
        <ToggleField name="avoidRecentQuestions" label="Avoid Recent Questions" defaultChecked={true} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Buat Tryout Draft"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-slate-200"
          onClick={() => router.push(basePath)}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
