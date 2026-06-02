"use client";

import { Ban, CheckCircle2, Layers3, Tags } from "lucide-react";

import { MetricCard } from "@/app/(main)/_components/page-shell";
import type { QuestionMetadataSummary } from "@/server/admin-content-data";

function formatPercent(part: number, total: number) {
  if (total <= 0) {
    return "0%";
  }

  return `${((part / total) * 100).toFixed(1)}%`;
}

export function MetadataKpiCards({ summary }: { readonly summary: QuestionMetadataSummary }) {
  const activeSubPercent = formatPercent(summary.activeSubCategories, summary.totalSubCategories);
  const inactiveSubPercent = formatPercent(summary.inactiveSubCategories, summary.totalSubCategories);

  const cards = [
    {
      title: "Sub-kategori",
      value: summary.totalSubCategories.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `dari ${summary.totalTopicTags.toLocaleString("id-ID")} topik tag`,
      direction: "neutral" as const,
      icon: Layers3,
      tint: "blue" as const,
    },
    {
      title: "Aktif",
      value: summary.activeSubCategories.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `${activeSubPercent} aktif`,
      direction: "neutral" as const,
      icon: CheckCircle2,
      tint: "green" as const,
    },
    {
      title: "Nonaktif",
      value: summary.inactiveSubCategories.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `${inactiveSubPercent} nonaktif`,
      direction: "neutral" as const,
      icon: Ban,
      tint: "red" as const,
    },
    {
      title: "Topik Tag",
      value: summary.totalTopicTags.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "total topik tag",
      direction: "neutral" as const,
      icon: Tags,
      tint: "violet" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <MetricCard
          key={item.title}
          title={item.title}
          value={item.value}
          delta={item.delta}
          deltaLabel={item.deltaLabel}
          direction={item.direction}
          icon={item.icon}
          tint={item.tint}
        />
      ))}
    </div>
  );
}
