"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Plus, Rocket, Save, Send, X } from "lucide-react";

import { PageHeader, SectionCard, SmallActionButton, StatusBadge } from "@/components/examcpns-admin/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { PassingGradeConfig } from "@/server/admin-data";
import {
  createTryoutCatalogAction,
  initialCreateTryoutActionState,
} from "@/server/admin-actions";

const steps = [
  "Basic Info",
  "Access & Visibility",
  "Exam Settings",
  "Generation Rules",
  "Composition",
  "Manual Question Set",
  "Availability Check",
  "Publish Control",
] as const;

const compositions = [
  {
    label: "TWK - Tes Wawasan Kebangsaan",
    tone: "blue",
    questionCount: 30,
    rows: [
      ["Pancasila", "10", "33,33%"],
      ["UUD 1945", "10", "33,33%"],
      ["NKRI", "5", "16,67%"],
      ["Bhinneka Tunggal Ika", "5", "16,67%"],
    ],
  },
  {
    label: "TIU - Tes Intelegensia Umum",
    tone: "green",
    questionCount: 45,
    rows: [
      ["Kemampuan Verbal", "15", "33,33%"],
      ["Kemampuan Numerik", "15", "33,33%"],
      ["Kemampuan Penalaran", "15", "33,33%"],
    ],
  },
  {
    label: "TKP - Tes Karakteristik Pribadi",
    tone: "violet",
    questionCount: 35,
    rows: [
      ["Pelayanan Publik", "10", "28,57%"],
      ["Jejaring Kerja", "7", "20,00%"],
      ["Sosial Budaya", "7", "20,00%"],
      ["Teknologi Informasi", "6", "17,14%"],
      ["Profesionalisme", "5", "14,29%"],
    ],
  },
] as const;

const toneDot: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  violet: "bg-violet-500",
};

function ControlledSwitch({
  name,
  checked,
  onCheckedChange,
}: {
  readonly name: string;
  readonly checked: boolean;
  readonly onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <>
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </>
  );
}

export function CreateTryoutForm({
  passingGrade,
}: {
  readonly passingGrade: PassingGradeConfig;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createTryoutCatalogAction,
    initialCreateTryoutActionState,
  );
  const [tryoutType, setTryoutType] = useState<"generated" | "manual" | "hybrid">("generated");
  const [status, setStatus] = useState<"draft" | "review">("draft");
  const [accessType, setAccessType] = useState<"trial_and_paid" | "paid_only" | "premium_only">("trial_and_paid");
  const [questionOrderMode, setQuestionOrderMode] = useState<"mixed_random" | "category_order">("mixed_random");
  const [randomizationMode, setRandomizationMode] = useState<
    "random_by_category_and_difficulty" | "random_by_category" | "random_by_topic_distribution"
  >("random_by_category_and_difficulty");
  const [isPublic, setIsPublic] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);
  const [avoidRecentQuestions, setAvoidRecentQuestions] = useState(true);
  const [showResultImmediately, setShowResultImmediately] = useState(true);
  const [showAnswerReview, setShowAnswerReview] = useState(true);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      router.push("/dashboard/tryout-catalog");
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [router, state]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="tryoutType" value={tryoutType} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="accessType" value={accessType} />
      <input type="hidden" name="questionOrderMode" value={questionOrderMode} />
      <input
        type="hidden"
        name="randomizationMode"
        value={tryoutType === "hybrid" ? "hybrid_manual_and_random" : randomizationMode}
      />
      <input type="hidden" name="passingGradeConfigId" value={passingGrade.id} />

      <PageHeader
        title="Buat Tryout Baru"
        description="Konfigurasi tryout SaaS untuk pengguna, termasuk akses, aturan generasi, dan kontrol publish."
        actions={
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white" asChild>
            <Link href="/dashboard/tryout-catalog">
              <ArrowLeft className="size-4" />
              Kembali ke Katalog
            </Link>
          </Button>
        }
      />

      <div className="grid gap-3 xl:grid-cols-8">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm shadow-sm",
              index === 0 ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-500",
            )}
          >
            <div className="mb-1 flex items-center gap-2">
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                  index === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500",
                )}
              >
                {index + 1}
              </span>
              <span className="font-medium">{step}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1.45fr_1fr]">
        <SectionCard title="1. Basic Info" description="Informasi dasar tryout yang tampil di katalog pengguna.">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm" htmlFor="name">
                Nama Tryout
              </label>
              <Input
                id="name"
                name="name"
                className="rounded-xl border-slate-200"
                defaultValue="Tryout CPNS 2025 - Simulasi SKD Premium"
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm" htmlFor="description">
                Deskripsi
              </label>
              <Textarea
                id="description"
                name="description"
                className="min-h-28 rounded-xl border-slate-200"
                defaultValue="Simulasi lengkap SKD CPNS 2025 dengan komposisi soal aktual dan pembahasan mendetail untuk membantu persiapan optimal."
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <div className="grid gap-3">
                <label className="font-medium text-slate-700 text-sm">Tryout Type</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {([
                    ["generated", "Generated", "Soal dibuat otomatis dari bank soal"],
                    ["manual", "Manual", "Semua soal dipilih secara manual"],
                    ["hybrid", "Hybrid", "Kombinasi otomatis dan manual"],
                  ] as const).map(([value, title, desc]) => {
                    const active = tryoutType === value;

                    return (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setTryoutType(value)}
                        className={cn(
                          "rounded-2xl border p-4 text-left shadow-sm",
                          active ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white",
                        )}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium text-slate-950">{title}</span>
                          {active ? <CheckCircle2 className="size-4 text-blue-600" /> : null}
                        </div>
                        <p className="text-slate-500 text-sm">{desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-2">
                <label className="font-medium text-slate-700 text-sm">Status</label>
                <Select value={status} onValueChange={(value) => setStatus(value as "draft" | "review")}>
                  <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Aktif (Draft)</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="2. Access & Visibility" description="Atur siapa yang boleh mengakses tryout ini dan bagaimana tampilnya.">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm">Access Type</label>
              <Select
                value={accessType}
                onValueChange={(value) =>
                  setAccessType(value as "trial_and_paid" | "paid_only" | "premium_only")
                }
              >
                <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Pilih access type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trial_and_paid">Trial & Paid</SelectItem>
                  <SelectItem value="paid_only">Paid Only</SelectItem>
                  <SelectItem value="premium_only">Premium Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-950">Is Public</p>
                  <p className="text-slate-500 text-sm">Tampilkan di katalog pengguna</p>
                </div>
                <ControlledSwitch name="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-950">Is Featured</p>
                  <p className="text-slate-500 text-sm">Prioritaskan di halaman depan tryout</p>
                </div>
                <ControlledSwitch name="isFeatured" checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm" htmlFor="sortOrder">
                Sort Order
              </label>
              <Input id="sortOrder" name="sortOrder" className="rounded-xl border-slate-200" defaultValue="10" />
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1.45fr_1fr]">
        <SectionCard title="3. Exam Settings" description="Durasi, total soal, urutan soal, dan passing grade.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm" htmlFor="durationMinutes">
                Durasi (Menit)
              </label>
              <Input id="durationMinutes" name="durationMinutes" className="rounded-xl border-slate-200" defaultValue="100" type="number" min={1} />
            </div>
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm" htmlFor="totalQuestions">
                Total Soal
              </label>
              <Input id="totalQuestions" name="totalQuestions" className="rounded-xl border-slate-200" defaultValue="110" type="number" min={1} />
            </div>
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm">Question Order Mode</label>
              <Select
                value={questionOrderMode}
                onValueChange={(value) => setQuestionOrderMode(value as "mixed_random" | "category_order")}
              >
                <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Urutan soal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed_random">Acak Semua Soal</SelectItem>
                  <SelectItem value="category_order">Urutan per Kategori</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm">Passing Grade Config</label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 text-sm">
                {passingGrade.name}
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 rounded-2xl border border-slate-100 p-4 md:grid-cols-[1fr_160px_160px]">
            <div>
              <p className="font-medium text-slate-950">Result Settings</p>
              <p className="text-slate-500 text-sm">
                Hasil akan memakai passing grade aktif: total {passingGrade.totalMinScore}, TWK {passingGrade.twkMinScore},
                TIU {passingGrade.tiuMinScore}, TKP {passingGrade.tkpMinScore}.
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3">
              <span className="text-slate-700 text-sm">Show Result</span>
              <ControlledSwitch
                name="showResultImmediately"
                checked={showResultImmediately}
                onCheckedChange={setShowResultImmediately}
              />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3">
              <span className="text-slate-700 text-sm">Answer Review</span>
              <ControlledSwitch
                name="showAnswerReview"
                checked={showAnswerReview}
                onCheckedChange={setShowAnswerReview}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="4. Generation Rules" description="Aturan randomisasi dan pembatasan soal baru-baru ini.">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm">Randomization Mode</label>
              <Select
                value={tryoutType === "hybrid" ? "hybrid_manual_and_random" : randomizationMode}
                onValueChange={(value) =>
                  setRandomizationMode(
                    value as "random_by_category_and_difficulty" | "random_by_category" | "random_by_topic_distribution",
                  )
                }
                disabled={tryoutType === "manual" || tryoutType === "hybrid"}
              >
                <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Mode randomisasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random_by_category_and_difficulty">Acak per Kategori & Kesulitan</SelectItem>
                  <SelectItem value="random_by_category">Acak per Kategori</SelectItem>
                  <SelectItem value="random_by_topic_distribution">Acak per Distribusi Topik</SelectItem>
                  <SelectItem value="hybrid_manual_and_random">Hybrid Manual & Random</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
              <div>
                <p className="font-medium text-slate-950">Avoid Recent Questions</p>
                <p className="text-slate-500 text-sm">Hindari soal yang terlalu sering muncul.</p>
              </div>
              <ControlledSwitch
                name="avoidRecentQuestions"
                checked={avoidRecentQuestions}
                onCheckedChange={setAvoidRecentQuestions}
              />
            </div>
            <div className="grid gap-2">
              <label className="font-medium text-slate-700 text-sm" htmlFor="avoidRecentExamCount">
                Avoid Recent Exam Count
              </label>
              <Input
                id="avoidRecentExamCount"
                name="avoidRecentExamCount"
                className="rounded-xl border-slate-200"
                defaultValue="5"
                type="number"
                min={0}
              />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="5. Composition (Komposisi Soal)" description="Proporsi default akan dikirim ke generation rule saat draft dibuat.">
        <div className="grid gap-4 xl:grid-cols-3">
          {compositions.map((composition) => (
            <div key={composition.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className={cn("size-3 rounded-full", toneDot[composition.tone])} />
                <div>
                  <h3 className="font-medium text-slate-950">{composition.label}</h3>
                  <p className="text-slate-400 text-sm">Question Count: {composition.questionCount}</p>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
                {([
                  ["Mudah", "30%", "bg-emerald-50 text-emerald-700"],
                  ["Sedang", "50%", "bg-amber-50 text-amber-700"],
                  ["Sulit", "20%", "bg-rose-50 text-rose-700"],
                ] as const).map(([label, value, tone]) => (
                  <div key={label} className={cn("rounded-xl px-3 py-2 text-center", tone)}>
                    <div className="font-medium">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {composition.rows.map(([topic, total, share]) => (
                  <div key={topic} className="grid grid-cols-[1.4fr_72px_72px] gap-3 text-sm">
                    <span className="text-slate-600">{topic}</span>
                    <span className="text-right text-slate-500">{total}</span>
                    <span className="text-right text-slate-500">{share}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 2xl:grid-cols-[1.4fr_0.9fr]">
        <SectionCard title="6. Availability Check" description="Draft akan tersimpan dulu. Availability check final dilakukan dari halaman katalog/detail.">
          <div className="grid gap-4 sm:grid-cols-3">
            {([
              ["TWK Ready", "Akan diverifikasi backend", "setelah generation rule tersimpan"],
              ["TIU Ready", "Akan diverifikasi backend", "setelah generation rule tersimpan"],
              ["TKP Ready", "Akan diverifikasi backend", "setelah generation rule tersimpan"],
            ] as const).map(([title, count, note]) => (
              <div key={title} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <CheckCircle2 className="size-5" />
                </div>
                <p className="font-medium text-emerald-800">{title}</p>
                <p className="mt-1 font-semibold text-base text-slate-950">{count}</p>
                <p className="text-emerald-700 text-sm">{note}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Ringkasan Tryout" description="Ringkasan konfigurasi sebelum draft disimpan.">
          <div className="grid gap-4 sm:grid-cols-2">
            {([
              ["Passing Grade", `${passingGrade.totalMinScore}`],
              ["Tipe", tryoutType],
              ["Status", status],
              ["Access", accessType],
              ["Featured", isFeatured ? "Ya" : "Tidak"],
              ["Public", isPublic ? "Ya" : "Tidak"],
            ] as const).map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-100 px-4 py-3">
                <p className="text-slate-400 text-sm">{label}</p>
                <p className="mt-1 font-medium text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="sticky bottom-0 z-20 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <p className="text-slate-500 text-sm">
          Simpan sebagai draft atau kirim ke review. Publish final tetap dilakukan dari katalog setelah availability check.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <SmallActionButton>
            <Save className="size-4" />
            {isPending ? "Menyimpan..." : "Save Draft"}
          </SmallActionButton>
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-slate-200 bg-white text-slate-700"
            onClick={() => setStatus("review")}
          >
            <Send className="size-4" />
            Set Review
          </Button>
          <Button type="button" className="rounded-xl bg-blue-600 hover:bg-blue-700" onClick={() => setStatus("review")}>
            <Rocket className="size-4" />
            Siapkan untuk Review
          </Button>
          <Button type="button" variant="outline" className="rounded-xl border-rose-200 bg-white text-rose-600">
            <Plus className="size-4 rotate-45" />
            Archive Nanti
          </Button>
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white" asChild>
            <Link href="/dashboard/tryout-catalog">
              <X className="size-4" />
              Cancel
            </Link>
          </Button>
        </div>
      </div>

      {tryoutType === "manual" ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
          Tryout manual hanya akan membuat draft katalog terlebih dahulu. Manual question set perlu ditambahkan setelah draft tersimpan.
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <StatusBadge tone="brand">Passing Grade Active</StatusBadge>
        <StatusBadge tone="neutral">{passingGrade.name}</StatusBadge>
      </div>
    </form>
  );
}
