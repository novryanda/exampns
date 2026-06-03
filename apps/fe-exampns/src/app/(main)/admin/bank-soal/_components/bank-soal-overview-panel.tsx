"use client";

import { useState, useTransition } from "react";

import Link from "next/link";

import { toast } from "sonner";

import { SectionCard } from "@/app/(main)/_components/page-shell";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { fetchAdminData } from "@/lib/admin-data-client";
import type { QuestionBankOverview, QuestionCategorySummary } from "@/server/admin-content-data";

import { BankSoalDonutChart, type DonutSegment } from "./bank-soal-donut-chart";

interface ClientSuccessResponse<T> {
  success: true;
  data: T;
}

const categoryPalette = ["#2F6FED", "#22C55E", "#F59E0B", "#0EA5E9", "#EC4899", "#8B5CF6", "#14B8A6"];

const difficultyMeta: Record<string, { label: string; color: string }> = {
  easy: { label: "Mudah", color: "#22C55E" },
  medium: { label: "Sedang", color: "#F59E0B" },
  hard: { label: "Sulit", color: "#EF4444" },
};

function toCategorySegments(
  overview: QuestionBankOverview,
  categories: QuestionCategorySummary[],
): DonutSegment[] {
  const categoryMap = new Map(categories.map((category, index) => [category.code, { category, index }]));

  return overview.categoryDistribution.map((item) => ({
    key: item.key,
    label: categoryMap.get(item.key)?.category.name ?? item.key,
    count: item.count,
    percentage: item.percentage,
    color: categoryPalette[(categoryMap.get(item.key)?.index ?? 0) % categoryPalette.length] ?? "#94A3B8",
  }));
}

function toStatusSegments(overview: QuestionBankOverview): DonutSegment[] {
  return overview.statusDistribution.map((item) => ({
    key: item.key,
    label: item.key === "active" ? "Aktif" : "Nonaktif",
    count: item.count,
    percentage: item.percentage,
    color: item.key === "active" ? "#22C55E" : "#EF4444",
  }));
}

function toDifficultySegments(overview: QuestionBankOverview): DonutSegment[] {
  return overview.difficultyDistribution.map((item) => ({
    key: item.key,
    label: difficultyMeta[item.key]?.label ?? item.key,
    count: item.count,
    percentage: item.percentage,
    color: difficultyMeta[item.key]?.color ?? "#94A3B8",
  }));
}

export function BankSoalOverviewPanel({
  initialOverview,
  categories,
}: {
  readonly initialOverview: QuestionBankOverview;
  readonly categories: QuestionCategorySummary[];
}) {
  const [overview, setOverview] = useState(initialOverview);
  const [statusPeriod, setStatusPeriod] = useState<"7d" | "all">(initialOverview.statusPeriod);
  const [isPending, startTransition] = useTransition();

  const statusPeriodTotal = overview.statusDistribution.reduce((sum, item) => sum + item.count, 0);

  const handleStatusPeriodChange = (value: "7d" | "all") => {
    setStatusPeriod(value);
    startTransition(async () => {
      try {
        const response = await fetchAdminData<ClientSuccessResponse<QuestionBankOverview>>("questions/overview", {
          statusPeriod: value,
        });
        setOverview(response.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat distribusi status.");
      }
    });
  };

  const topTopicMax = Math.max(...overview.topTopicTags.map((item) => item.questionCount), 1);

  return (
    <>
      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Distribusi Soal per Kategori"
          description="Perbandingan jumlah soal aktif per kategori."
          contentClassName="pt-2"
        >
          <BankSoalDonutChart
            segments={toCategorySegments(overview, categories)}
            centerLabel="Total Soal"
            centerValue={overview.totalQuestions.toLocaleString("id-ID")}
          />
        </SectionCard>

        <SectionCard
          title="Distribusi Soal per Status"
          description="Proporsi soal aktif dan nonaktif."
          trailing={
            <NativeSelect
              value={statusPeriod}
              onChange={(event) => handleStatusPeriodChange(event.target.value as "7d" | "all")}
              className="h-9 w-40 rounded-xl border-slate-200 bg-white text-sm"
              disabled={isPending}
            >
              <NativeSelectOption value="all">Semua waktu</NativeSelectOption>
              <NativeSelectOption value="7d">7 hari terakhir</NativeSelectOption>
            </NativeSelect>
          }
          contentClassName="pt-2"
        >
          <BankSoalDonutChart
            segments={toStatusSegments(overview)}
            centerLabel="Total Soal"
            centerValue={statusPeriodTotal.toLocaleString("id-ID")}
          />
        </SectionCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="Top Topik Tag" description="Lima topik tag dengan jumlah soal terbanyak.">
          <div className="space-y-4">
            {overview.topTopicTags.length === 0 ? (
              <p className="py-6 text-center text-slate-400 text-sm">Belum ada topik tag dengan soal.</p>
            ) : (
              overview.topTopicTags.map((item, index) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-start justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="font-medium text-slate-950">
                        {index + 1}. {item.name}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {item.category} / {item.subCategory}
                      </p>
                    </div>
                    <span className="shrink-0 font-medium text-slate-700 tabular-nums">
                      {item.questionCount.toLocaleString("id-ID")} soal
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${(item.questionCount / topTopicMax) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
            <Link href="/admin/metadata-soal" className="inline-block text-blue-600 text-sm hover:underline">
              Lihat semua topik tag
            </Link>
          </div>
        </SectionCard>

        <SectionCard
          title="Distribusi Kesulitan"
          description="Proporsi soal berdasarkan tingkat kesulitan."
          contentClassName="pt-2"
        >
          <BankSoalDonutChart
            segments={toDifficultySegments(overview)}
            centerLabel="Total Soal"
            centerValue={overview.totalQuestions.toLocaleString("id-ID")}
          />
        </SectionCard>
      </div>
    </>
  );
}
