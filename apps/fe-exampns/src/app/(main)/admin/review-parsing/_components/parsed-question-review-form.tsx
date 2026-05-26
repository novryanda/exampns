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
import {
  approveParsedQuestionAction,
  rejectParsedQuestionAction,
  updateParsedQuestionAction,
} from "@/server/admin-content-actions";
import type { ParsedQuestionDetail } from "@/server/admin-content-data";

const optionLabels = ["A", "B", "C", "D", "E"] as const;

export function ParsedQuestionReviewForm({
  parsedQuestion,
  redirectPath,
}: {
  readonly parsedQuestion: ParsedQuestionDetail;
  readonly redirectPath: string;
}) {
  const router = useRouter();
  const [saveState, saveAction, isSaving] = useActionState(updateParsedQuestionAction, initialResourceActionState);
  const [approveState, approveAction, isApproving] = useActionState(
    approveParsedQuestionAction,
    initialResourceActionState,
  );
  const [rejectState, rejectAction, isRejecting] = useActionState(
    rejectParsedQuestionAction,
    initialResourceActionState,
  );

  useEffect(() => {
    const successfulState = [saveState, approveState, rejectState].find((item) => item.status === "success");
    if (successfulState) {
      toast.success(successfulState.message);
      router.push(redirectPath);
      router.refresh();
      return;
    }

    const failedState = [saveState, approveState, rejectState].find((item) => item.status === "error");
    if (failedState) {
      toast.error(failedState.message);
    }
  }, [approveState, redirectPath, rejectState, router, saveState]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div>
          <p className="text-slate-500 text-sm">Confidence Score</p>
          <p className="font-semibold text-2xl text-slate-950">
            {parsedQuestion.confidenceScore === null ? "-" : `${parsedQuestion.confidenceScore}%`}
          </p>
        </div>
        <div>
          <p className="mb-2 text-slate-500 text-sm">Raw AI Output</p>
          <pre className="overflow-auto rounded-2xl bg-slate-950 p-4 text-slate-100 text-xs">
            {JSON.stringify(parsedQuestion.rawAiOutput, null, 2)}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <form action={saveAction} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5">
          <input type="hidden" name="parsedQuestionId" value={parsedQuestion.id} />
          <div className="grid gap-2">
            <Label htmlFor="questionText">Question Text</Label>
            <Textarea
              id="questionText"
              name="questionText"
              defaultValue={parsedQuestion.questionText}
              className="min-h-32 rounded-xl border-slate-200"
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={parsedQuestion.category ?? "TWK"}>
                <SelectTrigger id="category" className="rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TWK">TWK</SelectItem>
                  <SelectItem value="TIU">TIU</SelectItem>
                  <SelectItem value="TKP">TKP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subCategory">SubCategory</Label>
              <Input
                id="subCategory"
                name="subCategory"
                defaultValue={parsedQuestion.subCategory ?? ""}
                className="rounded-xl border-slate-200"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="topicTag">TopicTag</Label>
              <Input
                id="topicTag"
                name="topicTag"
                defaultValue={parsedQuestion.topicTag ?? ""}
                className="rounded-xl border-slate-200"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" defaultValue={parsedQuestion.difficulty ?? "medium"}>
                <SelectTrigger id="difficulty" className="rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="detectedAnswer">Detected Answer</Label>
              <Select name="detectedAnswer" defaultValue={parsedQuestion.detectedAnswer ?? "A"}>
                <SelectTrigger id="detectedAnswer" className="rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Detected answer" />
                </SelectTrigger>
                <SelectContent>
                  {optionLabels.map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {optionLabels.map((label, index) => (
            <div key={label} className="grid gap-2">
              <Label htmlFor={`optionText${label}`}>Opsi {label}</Label>
              <Input
                id={`optionText${label}`}
                name={`optionText${label}`}
                defaultValue={parsedQuestion.options[index]?.text ?? ""}
                className="rounded-xl border-slate-200"
                required
              />
            </div>
          ))}

          <Button
            type="submit"
            className="w-fit rounded-xl border border-slate-200 bg-white text-slate-950 hover:bg-slate-50"
            disabled={isSaving}
          >
            {isSaving ? "Menyimpan..." : "Simpan Edit"}
          </Button>
        </form>

        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-2">
          <form action={approveAction} className="grid gap-3">
            <input type="hidden" name="parsedQuestionId" value={parsedQuestion.id} />
            <input type="hidden" name="approvedStatus" value="active" />
            <Label htmlFor="approveReviewNotes">Review Notes (Approve)</Label>
            <Textarea
              id="approveReviewNotes"
              name="reviewNotes"
              defaultValue={parsedQuestion.reviewNotes ?? "Metadata lengkap dan siap diaktifkan."}
              className="min-h-28 rounded-xl border-slate-200"
              required
            />
            <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700" disabled={isApproving}>
              {isApproving ? "Menyetujui..." : "Approve"}
            </Button>
          </form>

          <form action={rejectAction} className="grid gap-3">
            <input type="hidden" name="parsedQuestionId" value={parsedQuestion.id} />
            <Label htmlFor="rejectReviewNotes">Review Notes (Reject)</Label>
            <Textarea
              id="rejectReviewNotes"
              name="reviewNotes"
              defaultValue={parsedQuestion.reviewNotes ?? ""}
              className="min-h-28 rounded-xl border-slate-200"
              placeholder="Jelaskan alasan penolakan"
              required
            />
            <Button type="submit" variant="destructive" className="rounded-xl" disabled={isRejecting}>
              {isRejecting ? "Menolak..." : "Reject"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
