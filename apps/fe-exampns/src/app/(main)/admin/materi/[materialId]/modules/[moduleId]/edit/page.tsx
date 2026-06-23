"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Save,
  Loader2,
  Video,
  FileOutput,
  FileText,
  HelpCircle,
  X,
  CheckCircle2,
  Upload,
  Plus,
  Trash2,
  Check,
  Minus,
  ArrowLeft,
} from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RichTextEditor = dynamic(
  () =>
    import("@/components/ui/rich-text-editor").then((m) => ({
      default: m.RichTextEditor,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-48 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-400">
        <Loader2 className="mr-2 size-4 animate-spin" /> Memuat editor...
      </div>
    ),
  },
);

type OptionData = {
  label: string;
  optionText: string;
  isCorrect: boolean;
};

type QuestionData = {
  id: string; // internal temp id
  questionText: string;
  options: OptionData[];
};

const DEFAULT_OPTIONS: OptionData[] = [
  { label: "A", optionText: "", isCorrect: true },
  { label: "B", optionText: "", isCorrect: false },
  { label: "C", optionText: "", isCorrect: false },
  { label: "D", optionText: "", isCorrect: false },
  { label: "E", optionText: "", isCorrect: false },
];

function TypeCard({
  value,
  label,
  icon,
  selected,
  onClick,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-4 transition-all text-sm font-medium",
        selected
          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}

export default function EditModulePage() {
  const router = useRouter();
  const params = useParams<{ materialId: string; moduleId: string }>();
  const materialId = params.materialId;
  const moduleId = params.moduleId;

  const [isLoading, setIsLoading] = useState(true);
  const [moduleType, setModuleType] = useState("video");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [content, setContent] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<QuestionData[]>([]);

  // ── Question Builder Helpers ───────────────────────────────────────────────
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Math.random().toString(36).substr(2, 9),
        questionText: "",
        options: JSON.parse(JSON.stringify(DEFAULT_OPTIONS)),
      },
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionTextChange = (id: string, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, questionText: text } : q));
  };

  const handleOptionTextChange = (questionId: string, label: string, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(opt => opt.label === label ? { ...opt, optionText: text } : opt)
        };
      }
      return q;
    }));
  };

  const handleSetCorrectOption = (questionId: string, correctLabel: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(opt => ({
            ...opt,
            isCorrect: opt.label === correctLabel
          }))
        };
      }
      return q;
    }));
  };

  const handleAddOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        if (q.options.length >= 10) return q; // max 10
        const nextChar = String.fromCharCode(65 + q.options.length); // A=65
        return {
          ...q,
          options: [
            ...q.options,
            { label: nextChar, optionText: "", isCorrect: false }
          ]
        };
      }
      return q;
    }));
  };

  const handleRemoveOption = (questionId: string, labelToRemove: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        if (q.options.length <= 2) return q; // min 2
        const filteredOptions = q.options.filter(opt => opt.label !== labelToRemove);
        // re-label options
        const reorderedOptions = filteredOptions.map((opt, idx) => ({
          ...opt,
          label: String.fromCharCode(65 + idx)
        }));
        // Ensure at least one correct option exists if the removed one was correct
        if (!reorderedOptions.some(opt => opt.isCorrect)) {
            reorderedOptions[0].isCorrect = true;
        }
        return { ...q, options: reorderedOptions };
      }
      return q;
    }));
  };

  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...questions];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setQuestions(newItems);
  };

  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const newItems = [...questions];
    [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    setQuestions(newItems);
  };

  useEffect(() => {
    async function loadModule() {
      try {
        const res = await fetch(`/api/admin-data/learning-materials/${materialId}/modules/${moduleId}`);
        if (!res.ok) throw new Error("Gagal memuat data modul");
        const { data: mod } = await res.json();
        
        if (!mod) throw new Error("Modul tidak ditemukan");

        setModuleType(mod.moduleType);
        setTitle(mod.title || "");
        setVideoUrl(mod.videoUrl || "");
        setPdfUrl(mod.pdfUrl || "");
        setContent(mod.content || "");
        setDurationMinutes(mod.durationMinutes ? mod.durationMinutes.toString() : "");

        if (mod.manualQuestions && mod.manualQuestions.length > 0) {
          const loadedQuestions = mod.manualQuestions
            .sort((a: any, b: any) => a.questionOrder - b.questionOrder)
            .map((q: any) => ({
              id: q.id,
              questionText: q.questionText,
              options: q.options
                .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                .map((opt: any) => ({
                  label: opt.label,
                  optionText: opt.optionText,
                  isCorrect: opt.isCorrect,
                })),
            }));
          setQuestions(loadedQuestions);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan memuat modul");
      } finally {
        setIsLoading(false);
      }
    }
    loadModule();
  }, [materialId, moduleId]);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("Ukuran file maksimal 50MB");
      return;
    }

    setIsUploadingPdf(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin-data/learning-materials/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Gagal mengunggah file");
      }

      const { data } = await res.json();
      setPdfUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah");
    } finally {
      setIsUploadingPdf(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        moduleType,
        content: content || null,
        videoUrl: moduleType === "video" ? videoUrl : null,
        pdfUrl: moduleType === "pdf" ? pdfUrl : null,
        durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) : null,
        manualQuestions: moduleType === "quiz" ? questions : undefined,
      };

      const res = await fetch(
        `/api/admin-data/learning-materials/${materialId}/modules/${moduleId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(body.message ?? "Gagal menyimpan perubahan");
      }

      setSaved(true);

      setTimeout(() => {
        router.push(`/admin/materi/${materialId}`);
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="size-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (saved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="size-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Perubahan Berhasil Disimpan!</h2>
          <p className="text-sm text-slate-500">Mengarahkan kembali…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`/admin/materi/${materialId}`)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Kembali
          </button>
          <div className="h-5 w-px bg-slate-300" />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Edit Modul</h1>
        </div>

        <Button
          type="submit"
          form="module-edit-form"
          disabled={isSubmitting || !title.trim()}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 gap-2 px-5"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {isSubmitting ? "Menyimpan…" : "Simpan Perubahan"}
        </Button>
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <form id="module-edit-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <X className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Tipe Modul</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <TypeCard
                value="video"
                label="Video"
                icon={<Video className="size-5 text-blue-500" />}
                selected={moduleType === "video"}
                onClick={() => setModuleType("video")}
              />
              <TypeCard
                value="pdf"
                label="Dokumen PDF/Word"
                icon={<FileOutput className="size-5 text-red-500" />}
                selected={moduleType === "pdf"}
                onClick={() => setModuleType("pdf")}
              />
              <TypeCard
                value="text"
                label="Teks Artikel"
                icon={<FileText className="size-5 text-slate-500" />}
                selected={moduleType === "text"}
                onClick={() => setModuleType("text")}
              />
              <TypeCard
                value="quiz"
                label="Latihan Soal"
                icon={<HelpCircle className="size-5 text-orange-500" />}
                selected={moduleType === "quiz"}
                onClick={() => setModuleType("quiz")}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Informasi Modul</h2>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Judul Modul <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Pengantar TWK — Pembahasan Soal"
                  className="text-base"
                />
              </div>
            </div>
          </section>

          {moduleType === "video" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">URL Video</h2>
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">
                  Link YouTube / Google Drive <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="videoUrl"
                  required
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-slate-500">
                  Gunakan link YouTube biasa atau Google Drive yang dapat diakses publik.
                </p>
              </div>
            </section>
          )}

          {moduleType === "pdf" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">Dokumen PDF / Word</h2>
              <div className="flex flex-col gap-6">
                
                <div className="grid gap-2">
                  <Label>Upload File Dokumen</Label>
                  <div className="flex items-center gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('pdf-upload')?.click()}
                      disabled={isUploadingPdf}
                      className="gap-2"
                    >
                      {isUploadingPdf ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                      {isUploadingPdf ? "Mengunggah..." : "Pilih File (.pdf, .doc, .docx)"}
                    </Button>
                    <input 
                      id="pdf-upload"
                      type="file" 
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                      onChange={handlePdfUpload}
                      className="hidden" 
                    />
                    {isUploadingPdf && <span className="text-sm text-slate-500">Mohon tunggu...</span>}
                  </div>
                  <p className="text-xs text-slate-500">Maksimal 50MB. Dokumen akan langsung tersimpan di server.</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Atau masukkan link langsung</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="pdfUrl">
                    Link URL Dokumen <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pdfUrl"
                    required
                    type="url"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="https://example.com/file.pdf"
                  />
                  {pdfUrl && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="size-3" /> Link terisi
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {(moduleType === "text" || moduleType === "video") && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-base font-semibold text-slate-900">
                {moduleType === "text" ? "Konten Teks" : "Catatan / Penjelasan Video"}
                {moduleType === "text" && <span className="text-red-500"> *</span>}
              </h2>
              <p className="mb-4 text-xs text-slate-500">
                {moduleType === "text"
                  ? "Tulis artikel lengkap. Gunakan toolbar untuk format teks, heading, list, dan lainnya."
                  : "Opsional — teks tambahan yang ditampilkan di bawah video."}
              </p>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder={
                  moduleType === "text"
                    ? "Mulai menulis artikel materi di sini…"
                    : "Tambahkan penjelasan atau catatan untuk video ini…"
                }
                minHeight={moduleType === "text" ? 480 : 240}
              />
            </section>
          )}

          {/* Quiz — Builder */}
          {moduleType === "quiz" && (
            <>
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-slate-900">Pengaturan Latihan Soal</h2>
                <div className="grid max-w-xs gap-2">
                  <Label htmlFor="durationMinutes">
                    Estimasi Durasi Pengerjaan (menit) — Opsional
                  </Label>
                  <Input
                    id="durationMinutes"
                    type="number"
                    min="1"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    placeholder="Contoh: 30"
                  />
                </div>
              </section>

              <section className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Daftar Soal Latihan</h2>
                    <p className="text-sm text-slate-500">Tambahkan pertanyaan beserta pilihan ganda untuk modul ini.</p>
                  </div>
                  <Button 
                    type="button"
                    onClick={handleAddQuestion}
                    variant="outline"
                    className="bg-white"
                  >
                    <Plus className="mr-2 size-4" /> Tambah Soal
                  </Button>
                </div>

                {questions.map((q, index) => (
                  <div key={q.id} className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm relative">
                    <div className="absolute top-6 right-6 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveQuestionUp(index)}
                        disabled={index === 0}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-30"
                        title="Naikkan urutan"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => moveQuestionDown(index)}
                        disabled={index === questions.length - 1}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-30"
                        title="Turunkan urutan"
                      >
                        ▼
                      </button>
                      <div className="w-px h-6 bg-slate-200 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(q.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Soal"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>

                    <div className="mb-6">
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
                        Soal No. {index + 1}
                      </span>
                      
                      <Label className="block mb-2 text-slate-700 font-semibold">Pertanyaan</Label>
                      <textarea
                        value={q.questionText}
                        onChange={(e) => handleQuestionTextChange(q.id, e.target.value)}
                        placeholder="Tuliskan pertanyaan di sini..."
                        className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        rows={4}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-slate-700 font-semibold">Pilihan Jawaban</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddOption(q.id)}
                          disabled={q.options.length >= 10}
                          className="h-8 rounded-lg text-xs"
                        >
                          <Plus className="mr-1 size-3" /> Tambah Opsi
                        </Button>
                      </div>
                      <div className="flex flex-col gap-3">
                        {q.options.map((opt) => (
                          <div 
                            key={opt.label} 
                            className={`flex items-start gap-3 rounded-xl border-2 p-3 transition-colors ${
                              opt.isCorrect ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 bg-white"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleSetCorrectOption(q.id, opt.label)}
                              className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                opt.isCorrect 
                                  ? "border-emerald-500 bg-emerald-500 text-white" 
                                  : "border-slate-300 text-transparent hover:border-emerald-400"
                              }`}
                              title={opt.isCorrect ? "Jawaban Benar" : "Jadikan Jawaban Benar"}
                            >
                              <Check className="size-4" />
                            </button>
                            
                            <div className="flex-1 flex items-center gap-3">
                              <span className="font-bold text-slate-500 w-4 text-center">{opt.label}.</span>
                              <Input
                                value={opt.optionText}
                                onChange={(e) => handleOptionTextChange(q.id, opt.label, e.target.value)}
                                placeholder={`Teks pilihan ${opt.label}...`}
                                className={`bg-transparent border-transparent shadow-none focus-visible:ring-0 focus-visible:border-b-blue-500 rounded-none px-0 h-auto py-1 ${
                                  opt.isCorrect ? "font-medium text-emerald-900" : "text-slate-700"
                                }`}
                              />
                            </div>

                            {q.options.length > 2 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveOption(q.id, opt.label)}
                                className="mt-1 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus Opsi"
                              >
                                <Minus className="size-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-slate-500">
                        * Klik lingkaran di sebelah kiri untuk menandai opsi sebagai kunci jawaban yang benar.
                      </p>
                    </div>
                  </div>
                ))}

                {questions.length > 0 && (
                  <Button 
                    type="button"
                    onClick={handleAddQuestion}
                    variant="outline"
                    className="w-full rounded-2xl border-dashed py-8 text-slate-500 hover:text-slate-900 bg-transparent hover:bg-slate-50"
                  >
                    <Plus className="mr-2 size-5" /> Tambah Soal Lagi
                  </Button>
                )}
              </section>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
