import { Loader2 } from "lucide-react";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import type { AiRecommendationDetail } from "@/server/user-dashboard-data";

export function AiRecommendationContent({
  recommendation,
  isLoading = false,
  isPolling = false,
}: {
  readonly recommendation: AiRecommendationDetail | null;
  readonly isLoading?: boolean;
  readonly isPolling?: boolean;
}) {
  if (isLoading || isPolling) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-slate-600 text-sm">
        <Loader2 className="size-4 animate-spin" />
        AI Recommendation sedang diproses...
      </div>
    );
  }

  if (!recommendation) {
    return <p className="text-slate-500 text-sm">Rekomendasi belum tersedia untuk hasil ini.</p>;
  }

  return (
    <div className="space-y-4">
      {recommendation.isFallback ? <StatusBadge tone="warning">Fallback statistik</StatusBadge> : null}
      {recommendation.summary ? (
        <p className="text-slate-700 leading-7">{recommendation.summary}</p>
      ) : null}
      {recommendation.overallAssessment ? (
        <p className="text-slate-600 text-sm">{recommendation.overallAssessment}</p>
      ) : null}
      <div className="space-y-3">
        {recommendation.items.map((item, index) => (
          <div key={`${item.topicTag}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-medium text-slate-950">
              {index + 1}. {item.category} - {item.subCategory} | {item.topicTag}
            </div>
            <div className="mt-1 text-slate-500 text-xs">
              Prioritas {item.priorityLevel}
              {item.accuracy !== null ? ` • Akurasi ${item.accuracy}%` : ""}
            </div>
            <p className="mt-2 text-slate-600 text-sm">{item.reason}</p>
          </div>
        ))}
      </div>
      {recommendation.nextTryoutStrategy ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-900 text-sm">
          <span className="font-medium">Strategi tryout berikutnya:</span> {recommendation.nextTryoutStrategy}
        </div>
      ) : null}
    </div>
  );
}
