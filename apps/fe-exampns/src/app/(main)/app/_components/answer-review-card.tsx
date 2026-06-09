"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { ExamResultAnswerItem } from "@/server/user-dashboard-data";

export function AnswerReviewCard({ answer }: { readonly answer: ExamResultAnswerItem }) {
  const [open, setOpen] = useState(false);
  const hasExplanation = Boolean(answer.explanation?.trim());

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-slate-950">Soal {answer.number}</span>
        <StatusBadge tone="neutral">{answer.category}</StatusBadge>
        <StatusBadge
          tone={answer.isCorrect === true ? "success" : answer.isCorrect === false ? "danger" : "warning"}
        >
          {answer.isCorrect === true ? "Benar" : answer.isCorrect === false ? "Salah" : "Kosong"}
        </StatusBadge>
      </div>

      <p className="mt-3 flex-1 text-slate-700 text-sm leading-6">{answer.questionText}</p>

      <div className="mt-3 border-slate-100 border-t pt-3 text-slate-500 text-sm">
        <p>
          Jawaban Anda: <span className="font-medium text-slate-800">{answer.selectedLabel ?? "-"}</span>
        </p>
        <p className="mt-1">
          Kunci: <span className="font-medium text-slate-800">{answer.correctLabel ?? "-"}</span>
        </p>

        {hasExplanation ? (
          <Collapsible open={open} onOpenChange={setOpen} className="mt-3">
            <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2 text-left font-medium text-blue-700 text-sm transition-colors hover:bg-blue-50">
              <span>{open ? "Sembunyikan Pembahasan" : "Lihat Pembahasan"}</span>
              <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 text-sm leading-6">
              <p className="mb-1 font-medium text-slate-900 text-xs uppercase tracking-wide">Pembahasan</p>
              <p className="whitespace-pre-wrap">{answer.explanation}</p>
            </CollapsibleContent>
          </Collapsible>
        ) : null}
      </div>
    </article>
  );
}
