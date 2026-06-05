"use client";

import { useMemo, useState } from "react";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatAccessTypeLabel, formatTryoutTypeLabel } from "@/lib/user-app/labels";
import type { QuestionCategoryItem, UserTryoutCatalogItem } from "@/server/user-dashboard-data";

import { StartTryoutButton } from "./start-tryout-button";

function matchesCategoryFilter(tryout: UserTryoutCatalogItem, categoryCode: string) {
  if (categoryCode === "all") {
    return true;
  }

  return tryout.composition.some(
    (section) => section.categoryCode.toUpperCase() === categoryCode.toUpperCase(),
  );
}

export function TryoutCatalog({
  tryouts,
  categories,
  hasActiveExam,
}: {
  readonly tryouts: UserTryoutCatalogItem[];
  readonly categories: QuestionCategoryItem[];
  readonly hasActiveExam: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTryouts = useMemo(
    () => tryouts.filter((tryout) => matchesCategoryFilter(tryout, selectedCategory)),
    [selectedCategory, tryouts],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="tryout-category-filter" className="font-medium text-slate-700 text-sm">
          Kategori Soal
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger
            id="tryout-category-filter"
            className="w-full max-w-xs rounded-xl border-slate-200 bg-white"
          >
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.code}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredTryouts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500 text-sm lg:col-span-2">
            Tidak ada tryout untuk kategori yang dipilih.
          </div>
        ) : (
          filteredTryouts.map((tryout) => (
            <article key={tryout.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                {tryout.isFeatured ? <StatusBadge tone="brand">Unggulan</StatusBadge> : null}
                <StatusBadge tone="neutral">{formatAccessTypeLabel(tryout.accessType)}</StatusBadge>
                <StatusBadge tone={tryout.canStart ? "success" : "warning"}>
                  {formatTryoutTypeLabel(tryout.tryoutType)}
                </StatusBadge>
                <StatusBadge tone="neutral">{tryout.totalQuestions} soal</StatusBadge>
                <StatusBadge tone="neutral">{tryout.durationMinutes} menit</StatusBadge>
              </div>
              <h3 className="mt-4 font-semibold text-slate-950 text-xl">{tryout.name}</h3>
              <p className="mt-2 min-h-12 text-slate-600 text-sm">
                {tryout.description || "Tryout ini belum memiliki deskripsi tambahan."}
              </p>
              {tryout.composition.length > 0 ? (
                <p className="mt-2 font-medium text-slate-700 text-sm">
                  {tryout.composition
                    .map((section) => `${section.categoryName} ${section.questionCount} soal`)
                    .join(" • ")}
                </p>
              ) : tryout.compositionLabel ? (
                <p className="mt-2 font-medium text-slate-700 text-sm">{tryout.compositionLabel}</p>
              ) : null}
              <p className="mt-2 text-slate-500 text-xs">Soal dikunci saat ujian dimulai.</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-slate-500 text-xs">
                  {tryout.lockedReason && !tryout.canStart
                    ? tryout.lockedReason
                    : "Soal disiapkan otomatis sesuai aturan tryout."}
                </div>
                <StartTryoutButton
                  tryoutCatalogId={tryout.id}
                  canStart={tryout.canStart}
                  lockedReason={tryout.lockedReason}
                  hasActiveExam={hasActiveExam}
                />
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
