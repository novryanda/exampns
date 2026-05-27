"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialResourceActionState } from "@/server/admin-action-state";
import { createQuestionAction, updateQuestionAction } from "@/server/admin-content-actions";
import type { QuestionDetail, QuestionMetadataOptions } from "@/server/admin-content-data";

const optionLabels = ["A", "B", "C", "D", "E"] as const;

export function QuestionEditorForm({
  question,
  metadataOptions,
  redirectPath,
}: {
  readonly question?: QuestionDetail;
  readonly metadataOptions: QuestionMetadataOptions;
  readonly redirectPath: string;
}) {
  const router = useRouter();
  const action = question ? updateQuestionAction : createQuestionAction;
  const [state, formAction, isPending] = useActionState(action, initialResourceActionState);
  const initialCategory = question?.category ?? "TWK";
  const initialSubCategories = metadataOptions.subCategories.filter((item) => item.category === initialCategory);
  const initialSubCategoryId = question?.subCategoryId ?? initialSubCategories[0]?.id ?? "";
  const initialTopicTags = metadataOptions.topicTags.filter((item) => item.subCategoryId === initialSubCategoryId);
  const initialTopicTagId = question?.topicTagId ?? initialTopicTags[0]?.id ?? "";
  const [category, setCategory] = useState<"TWK" | "TIU" | "TKP">(initialCategory);
  const [subCategoryId, setSubCategoryId] = useState(initialSubCategoryId);
  const [topicTagId, setTopicTagId] = useState(initialTopicTagId);
  const initialCorrectAnswer =
    question?.options.find((option) => option.isCorrect)?.label ?? question?.options[0]?.label ?? "A";
  const [correctAnswer, setCorrectAnswer] = useState<(typeof optionLabels)[number]>(initialCorrectAnswer);
  const availableSubCategories = metadataOptions.subCategories.filter((item) => item.category === category);
  const availableTopicTags = metadataOptions.topicTags.filter((item) => item.subCategoryId === subCategoryId);
  const isTkp = category === "TKP";

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

  useEffect(() => {
    if (availableSubCategories.some((item) => item.id === subCategoryId)) {
      return;
    }

    setSubCategoryId(availableSubCategories[0]?.id ?? "");
  }, [availableSubCategories, subCategoryId]);

  useEffect(() => {
    if (availableTopicTags.some((item) => item.id === topicTagId)) {
      return;
    }

    setTopicTagId(availableTopicTags[0]?.id ?? "");
  }, [availableTopicTags, topicTagId]);

  return (
    <form action={formAction} className="grid gap-6">
      {question ? <input type="hidden" name="questionId" value={question.id} /> : null}

      <div className="grid gap-2">
        <Label htmlFor="questionText">Teks Soal</Label>
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
          <Label htmlFor="category">Kategori</Label>
          <NativeSelect
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value as "TWK" | "TIU" | "TKP")}
            className="w-full rounded-xl border-slate-200 bg-white"
          >
            <NativeSelectOption value="TWK">TWK</NativeSelectOption>
            <NativeSelectOption value="TIU">TIU</NativeSelectOption>
            <NativeSelectOption value="TKP">TKP</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subCategoryId">Sub-kategori</Label>
          <NativeSelect
            id="subCategoryId"
            name="subCategoryId"
            value={subCategoryId}
            onChange={(event) => setSubCategoryId(event.target.value)}
            className="w-full rounded-xl border-slate-200 bg-white"
            required
            disabled={availableSubCategories.length === 0}
          >
            {availableSubCategories.length === 0 ? (
              <NativeSelectOption value="">Belum ada sub-kategori aktif</NativeSelectOption>
            ) : null}
            {availableSubCategories.map((item) => (
              <NativeSelectOption key={item.id} value={item.id}>
                {item.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="topicTagId">Topik Tag</Label>
          <NativeSelect
            id="topicTagId"
            name="topicTagId"
            value={topicTagId}
            onChange={(event) => setTopicTagId(event.target.value)}
            className="w-full rounded-xl border-slate-200 bg-white"
            required
            disabled={availableTopicTags.length === 0}
          >
            {availableTopicTags.length === 0 ? (
              <NativeSelectOption value="">Belum ada topik tag aktif</NativeSelectOption>
            ) : null}
            {availableTopicTags.map((item) => (
              <NativeSelectOption key={item.id} value={item.id}>
                {item.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
          <Select name="difficulty" defaultValue={question?.difficulty ?? "medium"}>
            <SelectTrigger id="difficulty" className="rounded-xl border-slate-200 bg-white">
              <SelectValue placeholder="Pilih tingkat kesulitan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Mudah</SelectItem>
              <SelectItem value="medium">Sedang</SelectItem>
              <SelectItem value="hard">Sulit</SelectItem>
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
              <SelectItem value="active">Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="space-y-1">
          <Label htmlFor="competencyArea">Area Kompetensi</Label>
          <p className="text-sm text-slate-500">
            Opsional. Dipakai untuk mengelompokkan materi yang lebih luas, misalnya "Nasionalisme",
            "Penalaran Umum", atau "Pelayanan Publik".
          </p>
        </div>
        <Input
          id="competencyArea"
          name="competencyArea"
          defaultValue={question?.competencyArea ?? ""}
          className="rounded-xl border-slate-200"
          placeholder="Contoh: Nasionalisme"
        />
      </div>

      <div className="grid gap-4">
        {isTkp ? null : (
          <div className="grid gap-2">
            <Label htmlFor="correctAnswer">Jawaban Benar (untuk TWK/TIU)</Label>
            <Select name="correctAnswer" value={correctAnswer} onValueChange={(value) => setCorrectAnswer(value as (typeof optionLabels)[number])}>
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
        )}

        {optionLabels.map((label, index) => {
          const option = question?.options[index];
          return (
            <div
              key={label}
              className={`grid gap-3 rounded-2xl border border-slate-100 p-4 ${
                isTkp ? "md:grid-cols-[80px_1fr_140px]" : "md:grid-cols-[80px_1fr]"
              }`}
            >
              <div className="flex items-center font-medium text-slate-950">{label}</div>
              <Input
                name={`optionText${label}`}
                defaultValue={option?.text ?? ""}
                className="rounded-xl border-slate-200"
                placeholder={`Opsi ${label}`}
                required
              />
              {isTkp ? (
                <div className="grid gap-2">
                  <Label htmlFor={`optionWeight${label}`}>Nilai TKP</Label>
                  <Input
                    id={`optionWeight${label}`}
                    name={`optionWeight${label}`}
                    type="number"
                    min={1}
                    max={5}
                    defaultValue={option?.tkpWeight ?? 1}
                    className="rounded-xl border-slate-200"
                    placeholder="Nilai 1-5"
                    required
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="explanation">Pembahasan</Label>
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
