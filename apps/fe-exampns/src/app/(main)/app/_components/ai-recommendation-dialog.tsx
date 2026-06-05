"use client";

import { useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AiRecommendationDetail } from "@/server/user-dashboard-data";

import { AiRecommendationContent } from "./ai-recommendation-content";

export function AiRecommendationDialog({
  examResultId,
  tryoutName,
  open,
  onOpenChange,
}: {
  readonly examResultId: string;
  readonly tryoutName?: string;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}) {
  const [recommendation, setRecommendation] = useState<AiRecommendationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPollingAi, setIsPollingAi] = useState(false);

  const fetchRecommendation = useCallback(async () => {
    const response = await fetch(`/api/user/results/${examResultId}/ai-recommendation`);
    if (response.status === 202) {
      setIsPollingAi(true);
      return null;
    }

    if (!response.ok) {
      setIsPollingAi(false);
      return null;
    }

    const payload = (await response.json()) as { data?: AiRecommendationDetail };
    const next = payload.data ?? null;

    if (next?.status === "processing") {
      setIsPollingAi(true);
    } else {
      setIsPollingAi(false);
    }

    return next;
  }, [examResultId]);

  useEffect(() => {
    if (!open) {
      setRecommendation(null);
      setIsLoading(false);
      setIsPollingAi(false);
      return;
    }

    setIsLoading(true);
    void fetchRecommendation()
      .then((next) => {
        setRecommendation(next);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [open, fetchRecommendation]);

  useEffect(() => {
    if (!open || !isPollingAi) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void fetchRecommendation().then((next) => {
        if (next && next.status !== "processing") {
          setRecommendation(next);
          setIsPollingAi(false);
        }
      });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [fetchRecommendation, isPollingAi, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(85vh,720px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="border-slate-200 border-b px-5 py-4">
          <DialogTitle>Rekomendasi AI</DialogTitle>
          <DialogDescription>
            {tryoutName
              ? `Rekomendasi belajar untuk ${tryoutName}.`
              : "Rekomendasi belajar berdasarkan pola kesalahan Anda."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto px-5 py-4">
          <AiRecommendationContent
            recommendation={recommendation}
            isLoading={isLoading}
            isPolling={isPollingAi}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
