"use client";

import { Ban, CheckCircle2, FileText, Layers3, Tags } from "lucide-react";

import { MetricCard } from "@/app/(main)/_components/page-shell";
import type { QuestionBankOverview } from "@/server/admin-content-data";

function formatPercent(part: number, total: number) {
  if (total <= 0) {
    return "0%";
  }

  return `${((part / total) * 100).toFixed(1)}%`;
}

export function BankSoalKpiCards({ overview }: { readonly overview: QuestionBankOverview }) {
  const activePercent = formatPercent(overview.activeQuestions, overview.totalQuestions);
  const inactivePercent = formatPercent(overview.inactiveQuestions, overview.totalQuestions);

  const cards = [
    {
      title: "Total Soal",
      value: overview.totalQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "Semua kategori",
      icon: FileText,
      tint: "violet" as const,
    },
    {
      title: "Soal Aktif",
      value: overview.activeQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `${activePercent} dari total`,
      icon: CheckCircle2,
      tint: "green" as const,
    },
    {
      title: "Soal Nonaktif",
      value: overview.inactiveQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `${inactivePercent} dari total`,
      icon: Ban,
      tint: "red" as const,
    },
    {
      title: "Total Sub-kategori",
      value: overview.totalSubCategories.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `dari ${overview.totalTopicTags.toLocaleString("id-ID")} topik tag`,
      icon: Layers3,
      tint: "blue" as const,
    },
    {
      title: "Total Topik Tag",
      value: overview.totalTopicTags.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "Aktif",
      icon: Tags,
      tint: "violet" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((item) => (
        <MetricCard
          key={item.title}
          title={item.title}
          value={item.value}
          delta={item.delta}
          deltaLabel={item.deltaLabel}
          direction="neutral"
          icon={item.icon}
          tint={item.tint}
        />
      ))}
    </div>
  );
}
