import { StatusBadge } from "@/app/(main)/_components/page-shell";
import type { QuestionDetail } from "@/server/admin-content-data";

function toDifficultyLabel(value: QuestionDetail["difficulty"]) {
  if (value === "easy") return "Mudah";
  if (value === "hard") return "Sulit";
  return "Sedang";
}

function toStatusLabel(value: QuestionDetail["status"]) {
  if (value === "active") return "Aktif";
  if (value === "archived") return "Diarsipkan";
  if (value === "pending_review") return "Menunggu Review";
  return "Draft";
}

function toStatusTone(value: QuestionDetail["status"]) {
  if (value === "active") return "success" as const;
  if (value === "archived") return "warning" as const;
  return "neutral" as const;
}

function toSourceLabel(value: QuestionDetail["sourceType"]) {
  return value === "pdf_import" ? "Impor PDF" : "Manual";
}

export function QuestionDetailView({ question }: { readonly question: QuestionDetail }) {
  const isWeighted = question.answerMode === "weighted_options";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="brand">{question.category}</StatusBadge>
        <StatusBadge tone="neutral">{question.subCategory}</StatusBadge>
        <StatusBadge tone="neutral">{question.topicTag}</StatusBadge>
        <StatusBadge tone={toStatusTone(question.status)}>{toStatusLabel(question.status)}</StatusBadge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-slate-500 text-xs">Kesulitan</p>
          <p className="font-medium text-slate-950">{toDifficultyLabel(question.difficulty)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-slate-500 text-xs">Sumber</p>
          <p className="font-medium text-slate-950">{toSourceLabel(question.sourceType)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-slate-500 text-xs">Mode Jawaban</p>
          <p className="font-medium text-slate-950">{isWeighted ? "Bobot Opsi (TKP)" : "Satu Jawaban Benar"}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-slate-500 text-xs">Tag Soal</p>
          {(question.tags?.length ?? 0) > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {question.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 font-medium text-slate-700 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="font-medium text-slate-950">-</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base text-slate-950">Pertanyaan</h3>
        <p className="whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-800 leading-7">
          {question.questionText}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-base text-slate-950">Opsi Jawaban</h3>
        <div className="space-y-2">
          {question.options.map((option) => (
            <div
              key={option.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700 text-sm">
                {option.label}
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="whitespace-pre-wrap text-slate-800 leading-6">{option.text}</p>
                <div className="flex flex-wrap gap-2 text-slate-500 text-xs">
                  {isWeighted ? <span>Bobot: {option.optionWeight ?? option.tkpWeight ?? "-"}</span> : null}
                  {!isWeighted && option.isCorrect ? (
                    <span className="font-medium text-emerald-600">Jawaban benar</span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {question.explanation ? (
        <div className="space-y-2">
          <h3 className="font-semibold text-base text-slate-950">Pembahasan</h3>
          <p className="whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-700 leading-7">
            {question.explanation}
          </p>
        </div>
      ) : null}

    </div>
  );
}
