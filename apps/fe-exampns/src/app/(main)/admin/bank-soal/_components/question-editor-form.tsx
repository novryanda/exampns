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
import { createQuestionAction, updateQuestionAction } from "@/server/admin-content-actions";
import type { QuestionDetail } from "@/server/admin-content-data";

const optionLabels = ["A", "B", "C", "D", "E"] as const;

export function QuestionEditorForm({
  question,
  redirectPath,
}: {
  readonly question?: QuestionDetail;
  readonly redirectPath: string;
}) {
  const router = useRouter();
  const action = question ? updateQuestionAction : createQuestionAction;
  const [state, formAction, isPending] = useActionState(action, initialResourceActionState);
  const category = question?.category ?? "TWK";
  const correctAnswer =
    question?.options.find((option) => option.isCorrect)?.label ?? question?.options[0]?.label ?? "A";

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
      {question ? <input type="hidden" name="questionId" value={question.id} /> : null}

      <div className="grid gap-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Textarea
          id="questionText"
          name="questionText"
          defaultValue={question?.questionText ?? ""}
          className="min-h-36 rounded-xl border-slate-200"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={category}>
            <SelectTrigger id="category" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Pilih category" />
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
            defaultValue={question?.subCategory ?? ""}
            className="rounded-xl border-slate-200"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="topicTag">TopicTag</Label>
          <Input
            id="topicTag"
            name="topicTag"
            defaultValue={question?.topicTag ?? ""}
            className="rounded-xl border-slate-200"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select name="difficulty" defaultValue={question?.difficulty ?? "medium"}>
            <SelectTrigger id="difficulty" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Pilih difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={question?.status ?? "draft"}>
            <SelectTrigger id="status" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="competencyArea">Competency Area</Label>
        <Input
          id="competencyArea"
          name="competencyArea"
          defaultValue={question?.competencyArea ?? ""}
          className="rounded-xl border-slate-200"
        />
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="correctAnswer">Correct Answer (untuk TWK/TIU)</Label>
          <Select name="correctAnswer" defaultValue={correctAnswer}>
            <SelectTrigger id="correctAnswer" className="rounded-xl border-slate-200 bg-white md:w-48">
              <SelectValue placeholder="Jawaban benar" />
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

        {optionLabels.map((label, index) => {
          const option = question?.options[index];
          return (
            <div
              key={label}
              className="grid gap-3 rounded-2xl border border-slate-100 p-4 md:grid-cols-[80px_1fr_120px]"
            >
              <div className="flex items-center font-medium text-slate-950">{label}</div>
              <Input
                name={`optionText${label}`}
                defaultValue={option?.text ?? ""}
                className="rounded-xl border-slate-200"
                placeholder={`Opsi ${label}`}
                required
              />
              <Input
                name={`optionWeight${label}`}
                type="number"
                min={1}
                max={5}
                defaultValue={option?.tkpWeight ?? 1}
                className="rounded-xl border-slate-200"
                placeholder="Bobot TKP"
              />
            </div>
          );
        })}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="explanation">Explanation</Label>
        <Textarea
          id="explanation"
          name="explanation"
          defaultValue={question?.explanation ?? ""}
          className="min-h-28 rounded-xl border-slate-200"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Menyimpan..." : question ? "Simpan Perubahan" : "Simpan Soal"}
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
