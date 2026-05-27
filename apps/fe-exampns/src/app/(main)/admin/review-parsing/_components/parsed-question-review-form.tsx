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
import {
  approveParsedQuestionAction,
  rejectParsedQuestionAction,
  updateParsedQuestionAction,
} from "@/server/admin-content-actions";
import type { ParsedQuestionDetail, QuestionMetadataOptions } from "@/server/admin-content-data";

const optionLabels = ["A", "B", "C", "D", "E"] as const;

export function ParsedQuestionReviewForm({
  parsedQuestion,
  metadataOptions,
  redirectPath,
}: {
  readonly parsedQuestion: ParsedQuestionDetail;
  readonly metadataOptions: QuestionMetadataOptions;
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
  const initialCategory = parsedQuestion.category ?? "TWK";
  const initialSubCategories = metadataOptions.subCategories.filter((item) => item.category === initialCategory);
  const initialResolvedSubCategoryId = parsedQuestion.resolvedSubCategoryId ?? initialSubCategories[0]?.id ?? "";
  const initialTopicTags = metadataOptions.topicTags.filter((item) => item.subCategoryId === initialResolvedSubCategoryId);
  const initialResolvedTopicTagId = parsedQuestion.resolvedTopicTagId ?? initialTopicTags[0]?.id ?? "";
  const [category, setCategory] = useState<"TWK" | "TIU" | "TKP">(initialCategory);
  const [resolvedSubCategoryId, setResolvedSubCategoryId] = useState(initialResolvedSubCategoryId);
  const [resolvedTopicTagId, setResolvedTopicTagId] = useState(initialResolvedTopicTagId);
  const availableSubCategories = metadataOptions.subCategories.filter((item) => item.category === category);
  const availableTopicTags = metadataOptions.topicTags.filter((item) => item.subCategoryId === resolvedSubCategoryId);

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

  useEffect(() => {
    if (availableSubCategories.some((item) => item.id === resolvedSubCategoryId)) {
      return;
    }

    setResolvedSubCategoryId(availableSubCategories[0]?.id ?? "");
  }, [availableSubCategories, resolvedSubCategoryId]);

  useEffect(() => {
    if (availableTopicTags.some((item) => item.id === resolvedTopicTagId)) {
      return;
    }

    setResolvedTopicTagId(availableTopicTags[0]?.id ?? "");
  }, [availableTopicTags, resolvedTopicTagId]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div>
          <p className="text-slate-500 text-sm">Skor Keyakinan</p>
          <p className="font-semibold text-2xl text-slate-950">
            {parsedQuestion.confidenceScore === null ? "-" : `${parsedQuestion.confidenceScore}%`}
          </p>
        </div>
        <div>
          <p className="mb-2 text-slate-500 text-sm">Output AI Mentah</p>
          <pre className="overflow-auto rounded-2xl bg-slate-950 p-4 text-slate-100 text-xs">
            {JSON.stringify(parsedQuestion.rawAiOutput, null, 2)}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <form action={saveAction} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5">
          <input type="hidden" name="parsedQuestionId" value={parsedQuestion.id} />
          <div className="grid gap-2">
            <Label htmlFor="questionText">Teks Soal</Label>
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
              <Label htmlFor="resolvedSubCategoryId">Sub-kategori</Label>
              <NativeSelect
                id="resolvedSubCategoryId"
                name="resolvedSubCategoryId"
                value={resolvedSubCategoryId}
                onChange={(event) => setResolvedSubCategoryId(event.target.value)}
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
              <p className="text-xs text-slate-500">Deteksi AI: {parsedQuestion.subCategory ?? "-"}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resolvedTopicTagId">Topik Tag</Label>
              <NativeSelect
                id="resolvedTopicTagId"
                name="resolvedTopicTagId"
                value={resolvedTopicTagId}
                onChange={(event) => setResolvedTopicTagId(event.target.value)}
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
              <p className="text-xs text-slate-500">Deteksi AI: {parsedQuestion.topicTag ?? "-"}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Kesulitan</Label>
              <Select name="difficulty" defaultValue={parsedQuestion.difficulty ?? "medium"}>
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
              <Label htmlFor="detectedAnswer">Jawaban Terdeteksi</Label>
              <Select name="detectedAnswer" defaultValue={parsedQuestion.detectedAnswer ?? "A"}>
                <SelectTrigger id="detectedAnswer" className="rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Pilih jawaban terdeteksi" />
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
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>

        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-2">
          <form action={approveAction} className="grid gap-3">
            <input type="hidden" name="parsedQuestionId" value={parsedQuestion.id} />
            <input type="hidden" name="approvedStatus" value="active" />
            <Label htmlFor="approveReviewNotes">Catatan Review (Setujui)</Label>
            <Textarea
              id="approveReviewNotes"
              name="reviewNotes"
              defaultValue={parsedQuestion.reviewNotes ?? "Metadata lengkap dan siap diaktifkan."}
              className="min-h-28 rounded-xl border-slate-200"
              required
            />
            <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700" disabled={isApproving}>
              {isApproving ? "Menyetujui..." : "Setujui"}
            </Button>
          </form>

          <form action={rejectAction} className="grid gap-3">
            <input type="hidden" name="parsedQuestionId" value={parsedQuestion.id} />
            <Label htmlFor="rejectReviewNotes">Catatan Review (Tolak)</Label>
            <Textarea
              id="rejectReviewNotes"
              name="reviewNotes"
              defaultValue={parsedQuestion.reviewNotes ?? ""}
              className="min-h-28 rounded-xl border-slate-200"
              placeholder="Jelaskan alasan penolakan"
              required
            />
            <Button type="submit" variant="destructive" className="rounded-xl" disabled={isRejecting}>
              {isRejecting ? "Menolak..." : "Tolak"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
