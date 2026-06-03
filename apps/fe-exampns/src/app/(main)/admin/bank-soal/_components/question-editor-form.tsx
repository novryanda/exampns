"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { SearchableCombobox } from "@/components/ui/searchable-combobox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { initialResourceActionState } from "@/server/admin-action-state";
import { createQuestionAction, updateQuestionAction } from "@/server/admin-content-actions";
import type { QuestionDetail, QuestionMetadataOptions } from "@/server/admin-content-data";

const optionLabels = ["A", "B", "C", "D", "E"] as const;

function FormSection({
  title,
  hint,
  children,
}: {
  readonly title: string;
  readonly hint?: string;
  readonly children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="font-semibold text-base text-slate-950">{title}</h3>
        {hint ? <p className="text-slate-500 text-sm">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

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
  const initialCategory = question?.category ?? metadataOptions.categories[0]?.code ?? "";
  const initialSubCategories = metadataOptions.subCategories.filter((item) => item.category === initialCategory);
  const initialSubCategoryId = question?.subCategoryId ?? initialSubCategories[0]?.id ?? "";
  const initialTopicTags = metadataOptions.topicTags.filter((item) => item.subCategoryId === initialSubCategoryId);
  const initialTopicTagId = question?.topicTagId ?? initialTopicTags[0]?.id ?? "";
  const [category, setCategory] = useState(initialCategory);
  const [subCategoryId, setSubCategoryId] = useState(initialSubCategoryId);
  const [topicTagId, setTopicTagId] = useState(initialTopicTagId);
  const initialCorrectAnswer =
    question?.options.find((option) => option.isCorrect)?.label ?? question?.options[0]?.label ?? "A";
  const [correctAnswer, setCorrectAnswer] = useState<(typeof optionLabels)[number]>(initialCorrectAnswer);
  const availableSubCategories = metadataOptions.subCategories.filter((item) => item.category === category);
  const availableTopicTags = metadataOptions.topicTags.filter((item) => item.subCategoryId === subCategoryId);
  const selectedCategory =
    metadataOptions.categories.find((item) => item.code === category) ??
    metadataOptions.categories[0] ??
    null;
  const answerMode = selectedCategory?.answerMode ?? question?.answerMode ?? "single_correct";
  const isWeightedCategory = answerMode === "weighted_options";

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
    <form action={formAction} className="space-y-8">
      {question ? <input type="hidden" name="questionId" value={question.id} /> : null}
      <input type="hidden" name="answerMode" value={answerMode} />

      <FormSection title="Teks Soal">
        <Textarea
          id="questionText"
          name="questionText"
          defaultValue={question?.questionText ?? ""}
          className="min-h-36 rounded-xl border-slate-200 bg-white"
          required
        />
      </FormSection>

      <FormSection title="Metadata Soal">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <NativeSelect
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border-slate-200 bg-white"
            >
              {metadataOptions.categories.map((item) => (
                <NativeSelectOption key={item.code} value={item.code}>
                  {item.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subCategoryId">Sub-kategori</Label>
            <SearchableCombobox
              id="subCategoryId"
              name="subCategoryId"
              value={subCategoryId}
              onValueChange={setSubCategoryId}
              placeholder="Belum ada sub-kategori aktif"
              searchPlaceholder="Cari sub-kategori..."
              emptyMessage="Sub-kategori tidak ditemukan."
              disabled={availableSubCategories.length === 0}
              options={availableSubCategories.map((item) => ({
                value: item.id,
                label: item.name,
                keywords: [item.category],
              }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topicTagId">Topik Tag</Label>
            <SearchableCombobox
              id="topicTagId"
              name="topicTagId"
              value={topicTagId}
              onValueChange={setTopicTagId}
              placeholder="Belum ada topik tag aktif"
              searchPlaceholder="Cari topik tag..."
              emptyMessage="Topik tag tidak ditemukan."
              disabled={availableTopicTags.length === 0}
              options={availableTopicTags.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
            <Select name="difficulty" defaultValue={question?.difficulty ?? "medium"}>
              <SelectTrigger id="difficulty" className="w-full rounded-xl border-slate-200 bg-white">
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
              <SelectTrigger id="status" className="w-full rounded-xl border-slate-200 bg-white">
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
            <Label htmlFor="competencyArea">Area Kompetensi (Opsional)</Label>
            <p className="text-slate-500 text-sm">
              Opsional. Dipakai untuk mengelompokkan materi yang lebih luas, misalnya &quot;Nasionalisme&quot;,
              &quot;Penalaran Umum&quot;, atau &quot;Pelayanan Publik&quot;.
            </p>
          </div>
          <Input
            id="competencyArea"
            name="competencyArea"
            defaultValue={question?.competencyArea ?? ""}
            className="rounded-xl border-slate-200 bg-white"
            placeholder="Contoh: Nasionalisme"
          />
        </div>
      </FormSection>

      <FormSection
        title="Pilihan Jawaban"
        hint={
          isWeightedCategory
            ? "Isi jawaban dan bobot nilai 1-5 untuk setiap opsi."
            : "Isi jawaban dan pilih satu jawaban benar."
        }
      >
        {!isWeightedCategory ? (
          <div className="grid max-w-xs gap-2">
            <Label htmlFor="correctAnswer">Jawaban Benar</Label>
            <Select
              name="correctAnswer"
              value={correctAnswer}
              onValueChange={(value) => setCorrectAnswer(value as (typeof optionLabels)[number])}
            >
              <SelectTrigger id="correctAnswer" className="rounded-xl border-slate-200 bg-white">
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
        ) : null}

        <div className="space-y-3">
          {isWeightedCategory ? (
            <div className="hidden gap-3 sm:grid sm:grid-cols-[3rem_minmax(0,1fr)_7.5rem] sm:items-center">
              <span />
              <span />
              <span className="text-right font-medium text-slate-600 text-sm">Bobot Nilai</span>
            </div>
          ) : null}

          {optionLabels.map((label, index) => {
            const option = question?.options[index];
            const isCorrectOption = !isWeightedCategory && correctAnswer === label;

            return (
              <div
                key={label}
                className={cn(
                  "rounded-xl transition-colors",
                  isCorrectOption && "border border-emerald-200 bg-emerald-50/80 p-3",
                  isWeightedCategory
                    ? "grid grid-cols-1 items-center gap-3 sm:grid-cols-[3rem_minmax(0,1fr)_7.5rem]"
                    : "grid grid-cols-1 items-center gap-3 sm:grid-cols-[3rem_minmax(0,1fr)]",
                )}
              >
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl border font-semibold",
                    isCorrectOption
                      ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-700",
                  )}
                >
                  {label}
                </div>
                <Input
                  name={`optionText${label}`}
                  defaultValue={option?.text ?? ""}
                  className={cn(
                    "rounded-xl bg-white",
                    isCorrectOption ? "border-emerald-300 focus-visible:ring-emerald-200" : "border-slate-200",
                  )}
                  placeholder={`Opsi ${label}`}
                  required
                />
                {isWeightedCategory ? (
                  <Input
                    id={`optionWeight${label}`}
                    name={`optionWeight${label}`}
                    type="number"
                    min={1}
                    max={5}
                    defaultValue={option?.optionWeight ?? 1}
                    className="rounded-xl border-slate-200 bg-white sm:text-right"
                    placeholder="1-5"
                    required
                    aria-label={`Bobot nilai opsi ${label}`}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </FormSection>

      <FormSection title="Pembahasan (Opsional)">
        <Textarea
          id="explanation"
          name="explanation"
          defaultValue={question?.explanation ?? ""}
          className="min-h-28 rounded-xl border-slate-200 bg-white"
          placeholder="Tulis pembahasan jawaban..."
        />
      </FormSection>

      <div className="flex flex-wrap justify-end gap-3 border-slate-100 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-slate-200 bg-white px-6"
          onClick={() => router.push(redirectPath)}
          disabled={isPending}
        >
          Batal
        </Button>
        <Button type="submit" className="rounded-xl bg-blue-600 px-6 hover:bg-blue-700" disabled={isPending}>
          {isPending ? (
            "Menyimpan..."
          ) : (
            <>
              <Save className="size-4" />
              {question ? "Simpan Perubahan" : "Simpan Soal"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
