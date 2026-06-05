import { Medal, Trophy, UserRound } from "lucide-react";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ExamResultRanking } from "@/server/user-dashboard-data";

function rankTone(rank: number) {
  if (rank === 1) {
    return "text-amber-600";
  }

  if (rank === 2) {
    return "text-slate-500";
  }

  if (rank === 3) {
    return "text-orange-700";
  }

  return "text-slate-700";
}

export function ResultRankingPanel({ ranking }: { readonly ranking: ExamResultRanking }) {
  return (
    <div className="flex flex-col gap-6">
      {ranking.currentUser ? (
        <SectionCard
          title="Posisi Anda"
          description={`Peringkat terbaik Anda di tryout ${ranking.tryoutName}.`}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="text-blue-700 text-sm">Peringkat</div>
              <div className="mt-1 flex items-center gap-2 font-semibold text-3xl text-blue-950">
                <Trophy className="size-7" />
                #{ranking.currentUser.rank}
              </div>
              <p className="mt-2 text-blue-800 text-xs">
                dari {ranking.totalParticipants.toLocaleString("id-ID")} peserta
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-slate-500 text-sm">Skor Terbaik</div>
              <div className="mt-1 font-semibold text-3xl text-slate-950">{ranking.currentUser.totalScore}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-slate-500 text-sm">Status</div>
              <StatusBadge
                tone={ranking.currentUser.overallPassed ? "success" : "warning"}
                className="mt-3"
              >
                {ranking.currentUser.overallPassed ? "Lulus Passing Grade" : "Belum Lulus"}
              </StatusBadge>
              {ranking.currentUser.isInTopTen ? (
                <p className="mt-3 text-emerald-700 text-xs">Anda masuk 10 besar peserta tryout ini.</p>
              ) : (
                <p className="mt-3 text-slate-500 text-xs">Lanjutkan latihan untuk naik peringkat.</p>
              )}
            </div>
          </div>
        </SectionCard>
      ) : null}

      <SectionCard
        title="10 Besar Peserta"
        description={`Peringkat berdasarkan skor terbaik tiap peserta di ${ranking.tryoutName}.`}
      >
        {ranking.topTen.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500 text-sm">
            Belum ada peserta lain yang menyelesaikan tryout ini.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Peringkat</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Skor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ranking.topTen.map((entry) => (
                  <TableRow
                    key={`${entry.rank}-${entry.displayName}`}
                    className={cn(entry.isCurrentUser && "bg-blue-50/80")}
                  >
                    <TableCell>
                      <div className={cn("flex items-center gap-2 font-semibold", rankTone(entry.rank))}>
                        {entry.rank <= 3 ? <Medal className="size-4" /> : null}
                        #{entry.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-medium text-slate-950">
                        {entry.isCurrentUser ? <UserRound className="size-4 text-blue-600" /> : null}
                        {entry.displayName}
                        {entry.isCurrentUser ? (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700 text-xs">Anda</span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{entry.totalScore}</TableCell>
                    <TableCell>
                      <StatusBadge tone={entry.overallPassed ? "success" : "warning"}>
                        {entry.overallPassed ? "Lulus" : "Belum lulus"}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
