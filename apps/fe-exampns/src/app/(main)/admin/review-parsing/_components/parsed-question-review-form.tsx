"use client";

import { useActionState, useEffect, useMemo, useState } from "react";

import {
  BarChart3,
  CheckCircle2,
  CheckSquare2,
  ClipboardList,
  Clock3,
  FilePenLine,
  FolderKanban,
  Info,
  ShieldCheck,
  Sparkles,
  Tags,
  TagsIcon,
  Workflow,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { SearchableCombobox } from "@/components/ui/searchable-combobox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { initialResourceActionState } from "@/server/admin-action-state";
import {
  rejectParsedQuestionAction,
  saveAndApproveParsedQuestionAction,
  updateParsedQuestionAction,
} from "@/server/admin-content-actions";
import type { ParsedQuestionDetail, QuestionMetadataOptions } from "@/server/admin-content-data";

const optionLabels = ["A", "B", "C", "D", "E"] as const;

function toDifficultyLabel(value: "easy" | "medium" | "hard" | null) {
  if (value === "easy") return "Mudah";
  if (value === "hard") return "Sulit";
  if (value === "medium") return "Sedang";
  return "-";
}

function toReviewStatusLabel(status: ParsedQuestionDetail["status"]) {
  if (status === "pending_review") return "Pending Review";
  if (status === "approved") return "Disetujui";
  if (status === "rejected") return "Ditolak";
  return "Draft";
}

function formatRelativeReviewTime(value: string | null) {
  if (!value) {
    return "Belum ada perubahan yang tersimpan";
  }

  const target = new Date(value).getTime();
  const diffMinutes = Math.max(0, Math.round((Date.now() - target) / 60000));

  if (diffMinutes < 1) return "Terakhir diperbarui barusan";
  if (diffMinutes < 60) return `Terakhir diperbarui ${diffMinutes} menit yang lalu`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `Terakhir diperbarui ${diffHours} jam yang lalu`;

  const diffDays = Math.round(diffHours / 24);
  return `Terakhir diperbarui ${diffDays} hari yang lalu`;
}

function getTkpScoreSummary(options: ParsedQuestionDetail["options"]) {
  const weightedOptions = options.filter(
    (option): option is (typeof options)[number] & { tkpWeight: number } => typeof option.tkpWeight === "number",
  );

  if (weightedOptions.length === 0) {
    return "Skor tiap opsi belum terisi. Lengkapi nilai 1-5 saat review.";
  }

  const highestWeight = Math.max(...weightedOptions.map((option) => option.tkpWeight));
  const topLabels = weightedOptions
    .filter((option) => option.tkpWeight === highestWeight)
    .map((option) => option.label)
    .join(", ");

  return `Skor tertinggi saat ini: ${topLabels} (${highestWeight})`;
}

function SectionCard({
  icon: Icon,
  title,
  description,
  className,
  children,
}: {
  readonly icon: typeof FilePenLine;
  readonly title: string;
  readonly description: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(37,99,235,0.24)]",
        className,
      )}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <h2 className="font-semibold text-[28px] text-slate-950 leading-none sm:text-[30px]">{title}</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-slate-500 leading-7">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: {
  readonly label: string;
  readonly value: string;
  readonly helper?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm">
      <p className="text-[11px] text-slate-400 uppercase tracking-[0.22em]">{label}</p>
      <p className="mt-2 font-semibold text-[28px] text-slate-950 leading-none">{value}</p>
      {helper ? <p className="mt-2 text-slate-500 text-sm">{helper}</p> : null}
    </div>
  );
}

function MetadataFieldCard({
  icon: Icon,
  title,
  children,
  footer,
}: {
  readonly icon: typeof FolderKanban;
  readonly title: string;
  readonly children: React.ReactNode;
  readonly footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-[26px] border border-slate-200/90 bg-white p-5 shadow-[0_14px_40px_-36px_rgba(37,99,235,0.45)]">
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
          <Icon className="size-5" />
        </div>
        <h3 className="font-semibold text-[18px] text-slate-950">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
      {footer ? <div className="mt-4 space-y-3">{footer}</div> : null}
    </div>
  );
}

export function ParsedQuestionReviewForm({
  parsedQuestion,
  metadataOptions,
  redirectPath,
}: {
  readonly parsedQuestion: ParsedQuestionDetail;
  readonly metadataOptions: QuestionMetadataOptions;
  readonly redirectPath: string;
}) {
  const [saveState, saveAction, isSaving] = useActionState(updateParsedQuestionAction, initialResourceActionState);
  const [approveState, approveAction, isApproving] = useActionState(
    saveAndApproveParsedQuestionAction,
    initialResourceActionState,
  );
  const [rejectState, rejectAction, isRejecting] = useActionState(
    rejectParsedQuestionAction,
    initialResourceActionState,
  );

  const [category, setCategory] = useState(parsedQuestion.category ?? metadataOptions.categories[0]?.code ?? "");
  const [resolvedSubCategoryId, setResolvedSubCategoryId] = useState(parsedQuestion.resolvedSubCategoryId ?? "");
  const [resolvedTopicTagId, setResolvedTopicTagId] = useState(parsedQuestion.resolvedTopicTagId ?? "");
  const selectedCategory =
    metadataOptions.categories.find((item) => item.code === category) ??
    metadataOptions.categories[0] ??
    null;
  const answerMode = selectedCategory?.answerMode ?? parsedQuestion.answerMode ?? "single_correct";
  const isWeightedCategory = answerMode === "weighted_options";

  const availableSubCategories = useMemo(
    () => metadataOptions.subCategories.filter((item) => item.category === category),
    [category, metadataOptions.subCategories],
  );
  const availableTopicTags = useMemo(
    () => metadataOptions.topicTags.filter((item) => item.subCategoryId === resolvedSubCategoryId),
    [metadataOptions.topicTags, resolvedSubCategoryId],
  );

  const canAutoCreateSubCategory = !resolvedSubCategoryId && Boolean(parsedQuestion.subCategory?.trim());
  const canAutoCreateTopicTag = !resolvedTopicTagId && Boolean(parsedQuestion.topicTag?.trim());
  const confidenceValue = Math.min(100, Math.max(0, parsedQuestion.confidenceScore ?? 0));
  const reviewFootnote = formatRelativeReviewTime(parsedQuestion.reviewedAt);
  const tkpWeightedOptions = useMemo(
    () =>
      parsedQuestion.options.filter(
        (option): option is (typeof parsedQuestion.options)[number] & { tkpWeight: number } =>
          typeof option.tkpWeight === "number",
      ),
    [parsedQuestion.options],
  );
  const highestTkpWeight =
    tkpWeightedOptions.length > 0 ? Math.max(...tkpWeightedOptions.map((option) => option.tkpWeight)) : null;

  useEffect(() => {
    if (approveState.status === "success") {
      toast.success(approveState.message);
      window.location.assign(redirectPath);
      return;
    }

    if (rejectState.status === "success") {
      toast.success(rejectState.message);
      window.location.assign(redirectPath);
      return;
    }

    if (saveState.status === "success") {
      toast.success(saveState.message);
      return;
    }

    const failedState = [saveState, approveState, rejectState].find((item) => item.status === "error");
    if (failedState) {
      toast.error(failedState.message);
    }
  }, [approveState, redirectPath, rejectState, saveState]);

  useEffect(() => {
    if (!resolvedSubCategoryId) {
      return;
    }

    if (availableSubCategories.some((item) => item.id === resolvedSubCategoryId)) {
      return;
    }

    setResolvedSubCategoryId("");
  }, [availableSubCategories, resolvedSubCategoryId]);

  useEffect(() => {
    if (!resolvedTopicTagId) {
      return;
    }

    if (availableTopicTags.some((item) => item.id === resolvedTopicTagId)) {
      return;
    }

    setResolvedTopicTagId("");
  }, [availableTopicTags, resolvedTopicTagId]);

  return (
    <form action={saveAction} className="space-y-6">
      <input type="hidden" name="parsedQuestionId" value={parsedQuestion.id} />
      <input type="hidden" name="answerMode" value={answerMode} />

      <div className="grid gap-6 xl:grid-cols-[1.02fr_1fr]">
        <div className="space-y-6">
          <SectionCard
            icon={FilePenLine}
            title="Editor Soal"
            description="Area ini jadi sumber final sebelum soal diaktifkan. Simpan dulu perubahan teks soal, opsi, atau metadata sebelum Anda klik setujui."
          >
            <div className="space-y-5">
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="rounded-2xl bg-blue-50 px-5 text-blue-700 shadow-none hover:bg-blue-100"
                  disabled={isSaving}
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/50 p-5">
                <Label htmlFor="questionText" className="font-semibold text-slate-900 text-sm">
                  Teks Soal
                </Label>
                <Textarea
                  id="questionText"
                  name="questionText"
                  defaultValue={parsedQuestion.questionText}
                  className="mt-3 min-h-44 rounded-[20px] border-slate-200 bg-white text-[17px] leading-8"
                  required
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            icon={Tags}
            title="Metadata Review"
            description="Anda bisa memilih metadata yang sudah ada, atau biarkan kosong agar metadata baru dibuat dari deteksi AI saat disetujui."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <MetadataFieldCard icon={FolderKanban} title="Kategori">
                <NativeSelect
                  id="category"
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border-slate-200 bg-white"
                >
                  {metadataOptions.categories.map((item) => (
                    <NativeSelectOption key={item.code} value={item.code}>
                      {item.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </MetadataFieldCard>

              <MetadataFieldCard icon={BarChart3} title="Kesulitan">
                <NativeSelect
                  id="difficulty"
                  name="difficulty"
                  defaultValue={parsedQuestion.difficulty ?? "medium"}
                  className="w-full rounded-2xl border-slate-200 bg-white"
                >
                  <NativeSelectOption value="easy">Mudah</NativeSelectOption>
                  <NativeSelectOption value="medium">Sedang</NativeSelectOption>
                  <NativeSelectOption value="hard">Sulit</NativeSelectOption>
                </NativeSelect>
              </MetadataFieldCard>

              <MetadataFieldCard
                icon={TagsIcon}
                title="Topik Tag"
                footer={
                  <>
                    <div className="flex items-center gap-2 text-[13px] text-blue-600">
                      <Sparkles className="size-4 shrink-0" />
                      <span>Deteksi AI: {parsedQuestion.topicTag ?? "-"}</span>
                    </div>
                    {canAutoCreateTopicTag ? (
                      <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-[13px] text-orange-600 leading-6">
                        <div className="flex items-start gap-3">
                          <Info className="mt-0.5 size-4 shrink-0" />
                          <span>
                            Belum dipetakan. Jika disetujui, sistem akan membuat topik tag baru dari deteksi AI.
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </>
                }
              >
                <SearchableCombobox
                  id="resolvedTopicTagId"
                  name="resolvedTopicTagId"
                  value={resolvedTopicTagId}
                  onValueChange={setResolvedTopicTagId}
                  allowEmpty
                  emptyOptionLabel={canAutoCreateTopicTag ? "Buat dari deteksi AI saat setujui" : "Pilih topik tag"}
                  searchPlaceholder="Cari topik tag..."
                  emptyMessage="Topik tag tidak ditemukan."
                  triggerClassName="rounded-2xl"
                  options={availableTopicTags.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              </MetadataFieldCard>

              <MetadataFieldCard
                icon={Workflow}
                title="Sub-kategori"
                footer={
                  <>
                    <div className="flex items-center gap-2 text-[13px] text-blue-600">
                      <Sparkles className="size-4 shrink-0" />
                      <span>Deteksi AI: {parsedQuestion.subCategory ?? "-"}</span>
                    </div>
                    {canAutoCreateSubCategory ? (
                      <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-[13px] text-orange-600 leading-6">
                        <div className="flex items-start gap-3">
                          <Info className="mt-0.5 size-4 shrink-0" />
                          <span>
                            Belum dipetakan. Jika disetujui, sistem akan membuat sub-kategori baru dari deteksi AI.
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </>
                }
              >
                <SearchableCombobox
                  id="resolvedSubCategoryId"
                  name="resolvedSubCategoryId"
                  value={resolvedSubCategoryId}
                  onValueChange={setResolvedSubCategoryId}
                  allowEmpty
                  emptyOptionLabel={
                    canAutoCreateSubCategory ? "Buat dari deteksi AI saat setujui" : "Pilih sub-kategori"
                  }
                  searchPlaceholder="Cari sub-kategori..."
                  emptyMessage="Sub-kategori tidak ditemukan."
                  triggerClassName="rounded-2xl"
                  options={availableSubCategories.map((item) => ({
                    value: item.id,
                    label: item.name,
                    keywords: [item.category],
                  }))}
                />
              </MetadataFieldCard>

              <div className="lg:col-span-2">
                <MetadataFieldCard icon={CheckSquare2} title={isWeightedCategory ? "Bobot Nilai Opsi" : "Jawaban Terdeteksi"}>
                  {isWeightedCategory ? (
                    <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-[13px] text-sky-700 leading-6">
                      Nilai tiap opsi diatur langsung pada daftar pilihan jawaban di bawah. Sistem tidak memakai
                      satu jawaban benar untuk kategori ini.
                    </div>
                  ) : (
                    <NativeSelect
                      id="detectedAnswer"
                      name="detectedAnswer"
                      defaultValue={parsedQuestion.detectedAnswer ?? "A"}
                      className="w-full max-w-28 rounded-2xl border-slate-200 bg-white"
                    >
                      {optionLabels.map((label) => (
                        <NativeSelectOption key={label} value={label}>
                          {label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  )}
                </MetadataFieldCard>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/80 to-blue-50/80 p-6 shadow-[0_20px_60px_-40px_rgba(37,99,235,0.28)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[15px] text-slate-500">Skor Keyakinan</p>
                <div className="mt-2 flex items-end gap-3">
                  <p className="font-semibold text-5xl text-slate-950 leading-none">
                    {parsedQuestion.confidenceScore === null ? "-" : `${parsedQuestion.confidenceScore}%`}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200/70">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 transition-[width]"
                style={{ width: `${confidenceValue}%` }}
              />
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <MetricCard
                label="Status"
                value={toReviewStatusLabel(parsedQuestion.status)}
                helper="Siap direview sebelum masuk bank soal aktif."
              />
              <MetricCard
                label="Deteksi Awal"
                value={`${parsedQuestion.category ?? "-"} / ${toDifficultyLabel(parsedQuestion.difficulty)}`}
                helper={
                  isWeightedCategory
                    ? getTkpScoreSummary(parsedQuestion.options)
                    : `Jawaban: ${parsedQuestion.detectedAnswer ?? "-"}`
                }
              />
            </div>
          </section>

          <SectionCard
            icon={ShieldCheck}
            title="Keputusan Review"
            description="Tombol setujui akan menyimpan isi editor terbaru dulu, lalu langsung menjalankan approve."
          >
            <div className="space-y-5">
              <div className="grid gap-2.5">
                <input type="hidden" name="approvedStatus" value="active" />
                <Label htmlFor="approveReviewNotes" className="font-semibold text-slate-900 text-sm">
                  Catatan Review (Setujui)
                </Label>
                <Textarea
                  id="approveReviewNotes"
                  name="reviewNotes"
                  defaultValue={parsedQuestion.reviewNotes ?? "Metadata lengkap dan siap diaktifkan."}
                  className="min-h-28 rounded-2xl border-slate-200 bg-white"
                  required
                />
                <Button
                  type="submit"
                  formAction={approveAction}
                  className="h-12 rounded-2xl bg-emerald-500 text-base text-white shadow-[0_16px_32px_-18px_rgba(16,185,129,0.75)] hover:bg-emerald-600"
                  disabled={isApproving || isSaving}
                >
                  <CheckCircle2 className="mr-2 size-4" />
                  {isApproving ? "Menyimpan & menyetujui..." : "Simpan lalu Setujui"}
                </Button>
              </div>

              <div className="grid gap-2.5">
                <Label htmlFor="rejectReviewNotes" className="font-semibold text-slate-900 text-sm">
                  Catatan Review (Tolak)
                </Label>
                <Textarea
                  id="rejectReviewNotes"
                  name="rejectReviewNotes"
                  defaultValue={parsedQuestion.reviewNotes ?? ""}
                  className="min-h-28 rounded-2xl border-slate-200 bg-white"
                  placeholder="Jelaskan alasan penolakan"
                />
                <Button
                  type="submit"
                  formAction={rejectAction}
                  variant="destructive"
                  className="h-12 rounded-2xl border border-rose-200 bg-rose-50 text-base text-rose-600 shadow-none hover:bg-rose-100"
                  disabled={isRejecting}
                >
                  <XCircle className="mr-2 size-4" />
                  {isRejecting ? "Menolak..." : "Tolak"}
                </Button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard
        icon={ClipboardList}
        title="Pilihan Jawaban"
        description={
          isWeightedCategory
            ? "Untuk kategori berbobot, lengkapi juga skor 1-5 pada setiap opsi sebelum menyimpan hasil review."
            : "Pastikan setiap opsi lengkap dan nyaman dibaca sebelum menyimpan hasil review."
        }
      >
        <div className="space-y-3">
          {optionLabels.map((label, index) => {
            const option = parsedQuestion.options[index];
            const isDetected = !isWeightedCategory && parsedQuestion.detectedAnswer === label;
            const isTopTkpOption =
              isWeightedCategory && highestTkpWeight !== null && (option?.tkpWeight ?? null) === highestTkpWeight;
            const isHighlighted = isWeightedCategory ? isTopTkpOption : isDetected;

            return (
              <div
                key={label}
                className={cn(
                  "grid gap-3 rounded-2xl border px-4 py-3 transition-colors",
                  isWeightedCategory ? "md:grid-cols-[80px_1fr_150px_32px]" : "md:grid-cols-[80px_1fr_32px]",
                  isHighlighted
                    ? isWeightedCategory
                      ? "border-sky-200 bg-sky-50/70 shadow-[0_12px_30px_-24px_rgba(14,165,233,0.75)]"
                      : "border-emerald-200 bg-emerald-50/70 shadow-[0_12px_30px_-24px_rgba(16,185,129,0.85)]"
                    : "border-slate-200 bg-white",
                )}
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl font-semibold text-sm",
                    isHighlighted
                      ? isWeightedCategory
                        ? "bg-sky-100 text-sky-700"
                        : "bg-emerald-100 text-emerald-700"
                      : "bg-blue-50 text-blue-600",
                  )}
                >
                  {label}
                </div>

                <Input
                  id={`optionText${label}`}
                  name={`optionText${label}`}
                  defaultValue={option?.text ?? ""}
                  className={cn(
                    "h-auto border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0",
                    isHighlighted ? "font-medium text-slate-950" : "text-slate-700",
                  )}
                  required
                />

                {isWeightedCategory ? (
                  <div className="grid gap-2">
                    <Label htmlFor={`optionWeight${label}`} className="text-slate-500 text-xs">
                      Bobot Nilai
                    </Label>
                    <Input
                      id={`optionWeight${label}`}
                      name={`optionWeight${label}`}
                      type="number"
                      min={1}
                      max={5}
                      defaultValue={option?.tkpWeight ?? 1}
                      className="rounded-xl border-slate-200 bg-white"
                      placeholder="Nilai 1-5"
                      required
                    />
                  </div>
                ) : null}

                <div className="flex items-center justify-end gap-3">
                  {isHighlighted ? (
                    <CheckCircle2
                      className={cn("size-5", isWeightedCategory ? "text-sky-600" : "text-emerald-600")}
                    />
                  ) : null}
                  <div className="grid gap-0.5 text-slate-300">
                    <span className="block size-1 rounded-full bg-current" />
                    <span className="block size-1 rounded-full bg-current" />
                    <span className="block size-1 rounded-full bg-current" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <Clock3 className="size-4" />
        <span>{reviewFootnote}</span>
      </div>
    </form>
  );
}
