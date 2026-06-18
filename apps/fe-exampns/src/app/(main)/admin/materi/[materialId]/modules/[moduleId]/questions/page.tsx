"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, Plus, Trash2, X, Save, CheckCircle2, GripVertical, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function ModuleManualQuestionsPage() {
  const params = useParams<{ materialId: string; moduleId: string }>();
  const materialId = params.materialId;
  const moduleId = params.moduleId;

  const [isLoading, setIsLoading] = useState(true);
  const [moduleData, setModuleData] = useState<any>(null);
  
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitial() {
      try {
        const res = await fetch(`/api/admin-data/learning-materials/${materialId}/modules/${moduleId}`);
        if (!res.ok) throw new Error("Gagal memuat data modul");
        const { data } = await res.json();
        setModuleData(data);
        
        // Map existing manual questions
        if (data.manualQuestions && data.manualQuestions.length > 0) {
          const loadedQuestions = data.manualQuestions
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
        } else {
          // Start with one empty question if none
          handleAddQuestion();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan memuat modul");
      } finally {
        setIsLoading(false);
      }
    }
    loadInitial();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialId, moduleId]);

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

  const handleSave = async () => {
    // Validate
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) {
        setError(`Soal No. ${i + 1} masih kosong.`);
        return;
      }
      for (const opt of questions[i].options) {
        if (!opt.optionText.trim()) {
          setError(`Opsi ${opt.label} pada Soal No. ${i + 1} masih kosong.`);
          return;
        }
      }
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin-data/learning-materials/${materialId}/modules/${moduleId}/manual-quiz-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Gagal menyimpan soal");
      }

      setSaved(true);
      setTimeout(() => {
        window.close();
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan");
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
          <h2 className="text-xl font-semibold text-slate-900">Soal Berhasil Disimpan!</h2>
          <p className="text-sm text-slate-500">Tab ini akan ditutup secara otomatis…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.close()}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="size-4" />
              Tutup
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <h1 className="text-sm font-semibold text-slate-800">
              Kelola Soal: <span className="font-normal text-slate-500">{moduleData?.title}</span>
            </h1>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSubmitting || questions.length === 0}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 gap-2"
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isSubmitting ? "Menyimpan…" : "Simpan Perubahan"}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <X className="size-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Daftar Soal Latihan</h2>
          <Button 
            onClick={handleAddQuestion}
            variant="outline"
            className="bg-white"
          >
            <Plus className="mr-2 size-4" /> Tambah Soal
          </Button>
        </div>

        <div className="flex flex-col gap-8">
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
                <Label className="block mb-3 text-slate-700 font-semibold">Pilihan Jawaban</Label>
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
              onClick={handleAddQuestion}
              variant="outline"
              className="w-full rounded-2xl border-dashed py-8 text-slate-500 hover:text-slate-900 bg-transparent hover:bg-slate-50"
            >
              <Plus className="mr-2 size-5" /> Tambah Soal Lagi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
