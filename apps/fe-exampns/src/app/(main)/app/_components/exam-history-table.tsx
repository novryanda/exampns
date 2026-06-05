"use client";

import Link from "next/link";
import { useState } from "react";

import { Eye, Sparkles } from "lucide-react";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTimeId, scoreByCategoryCode } from "@/lib/user-app/labels";
import type { ExamHistoryItem, UserDashboardSummary } from "@/server/user-dashboard-data";

import { AiRecommendationDialog } from "./ai-recommendation-dialog";

type HistoryRow = ExamHistoryItem | UserDashboardSummary["recentExams"][number];

export function ExamHistoryTable({
  items,
  emptyCtaHref = "/app/tryout",
}: {
  readonly items: HistoryRow[];
  readonly emptyCtaHref?: string;
}) {
  const [aiDialogTarget, setAiDialogTarget] = useState<{
    examResultId: string;
    tryoutName: string;
  } | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
        <p className="font-medium text-slate-950">Belum ada riwayat tryout.</p>
        <p className="mt-2 text-slate-500 text-sm">
          Mulai tryout pertama Anda untuk melihat skor dan rekomendasi AI.
        </p>
        <Button asChild className="mt-4 rounded-xl bg-blue-600 hover:bg-blue-700">
          <Link href={emptyCtaHref}>Mulai Tryout</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tryout</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>TWK</TableHead>
              <TableHead>TIU</TableHead>
              <TableHead>TKP</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.examResultId}>
                <TableCell className="font-medium">{item.tryoutName}</TableCell>
                <TableCell>{formatDateTimeId(item.examDate)}</TableCell>
                <TableCell>{scoreByCategoryCode(item.categoryScores, "TWK") ?? "-"}</TableCell>
                <TableCell>{scoreByCategoryCode(item.categoryScores, "TIU") ?? "-"}</TableCell>
                <TableCell>{scoreByCategoryCode(item.categoryScores, "TKP") ?? "-"}</TableCell>
                <TableCell>{item.totalScore}</TableCell>
                <TableCell>
                  <StatusBadge tone={item.overallPassed ? "success" : "warning"}>
                    {item.overallPassed ? "Lulus" : "Belum lulus"}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="outline" className="rounded-xl">
                      <Link href={`/app/result/${item.examResultId}`}>
                        <Eye className="mr-1 size-4" />
                        Hasil
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() =>
                        setAiDialogTarget({
                          examResultId: item.examResultId,
                          tryoutName: item.tryoutName,
                        })
                      }
                    >
                      <Sparkles className="mr-1 size-4" />
                      AI
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AiRecommendationDialog
        examResultId={aiDialogTarget?.examResultId ?? ""}
        tryoutName={aiDialogTarget?.tryoutName}
        open={aiDialogTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAiDialogTarget(null);
          }
        }}
      />
    </>
  );
}
