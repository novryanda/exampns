"use client";

import { AlertTriangle, Shield, ShieldAlert, ShieldX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MAX_VIOLATIONS } from "@/hooks/use-exam-integrity-guard";

interface ExamIntegrityWarningProps {
  readonly violationCount: number;
  readonly onDismiss: () => void;
  readonly isAutoSubmitting?: boolean;
}

function ViolationDots({ count, max }: { count: number; max: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: max }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={[
            "size-4 rounded-full border-2 transition-all duration-300",
            i < count
              ? "border-red-500 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
              : "border-slate-300 bg-white",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function WarningIcon({ violationCount }: { violationCount: number }) {
  const isLastChance = violationCount >= MAX_VIOLATIONS - 1;

  if (violationCount >= MAX_VIOLATIONS) {
    return (
      <div className="flex size-20 items-center justify-center rounded-full bg-red-100">
        <ShieldX className="size-10 text-red-600" strokeWidth={1.5} />
      </div>
    );
  }

  if (isLastChance) {
    return (
      <div className="flex size-20 items-center justify-center rounded-full bg-orange-100">
        <ShieldAlert className="size-10 text-orange-500" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className="flex size-20 items-center justify-center rounded-full bg-amber-100">
      <AlertTriangle className="size-10 text-amber-500" strokeWidth={1.5} />
    </div>
  );
}

/**
 * Overlay peringatan yang muncul saat user terdeteksi melakukan pelanggaran
 * exam browser (pindah tab, alt+tab, back button, keluar fullscreen).
 * Menampilkan hitungan pelanggaran dari MAX_VIOLATIONS kesempatan.
 */
export function ExamIntegrityWarning({
  violationCount,
  onDismiss,
  isAutoSubmitting = false,
}: ExamIntegrityWarningProps) {
  const remaining = MAX_VIOLATIONS - violationCount;
  const isLastChance = remaining === 1;
  const isExhausted = remaining <= 0;

  return (
    /* Overlay backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Card */}
      <div
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border bg-white shadow-2xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="integrity-warning-title"
        aria-describedby="integrity-warning-desc"
      >
        {/* Top accent bar */}
        <div
          className={[
            "h-1.5 w-full",
            isExhausted
              ? "bg-red-500"
              : isLastChance
                ? "bg-orange-500"
                : "bg-amber-400",
          ].join(" ")}
        />

        <div className="flex flex-col items-center gap-6 px-6 py-8 text-center">
          {/* Icon */}
          <WarningIcon violationCount={violationCount} />

          {/* Title */}
          <div>
            <h2
              id="integrity-warning-title"
              className={[
                "mb-1 text-xl font-bold tracking-tight",
                isExhausted ? "text-red-700" : "text-slate-900",
              ].join(" ")}
            >
              {isExhausted
                ? "Ujian Dikumpulkan Otomatis"
                : isLastChance
                  ? "Peringatan Terakhir!"
                  : "Pelanggaran Terdeteksi"}
            </h2>
            <p
              id="integrity-warning-desc"
              className="text-sm leading-relaxed text-slate-500"
            >
              {isExhausted ? (
                <>
                  Kamu telah meninggalkan halaman ujian sebanyak{" "}
                  <strong className="text-red-600">{MAX_VIOLATIONS}x</strong>. Ujian
                  dikumpulkan secara otomatis dengan jawaban yang telah terisi.
                </>
              ) : (
                <>
                  Kamu terdeteksi meninggalkan halaman ujian. Setiap tindakan ini
                  dihitung sebagai pelanggaran.{" "}
                  {isLastChance ? (
                    <strong className="text-orange-600">
                      Ini adalah kesempatan terakhirmu — pelanggaran berikutnya akan
                      mengumpulkan ujian secara otomatis.
                    </strong>
                  ) : (
                    <>
                      Kamu masih memiliki{" "}
                      <strong className="text-slate-800">{remaining - 1} kesempatan</strong>{" "}
                      lagi sebelum ujian dikumpulkan otomatis.
                    </>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Violation dots indicator */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Pelanggaran
            </p>
            <ViolationDots count={violationCount} max={MAX_VIOLATIONS} />
            <p className="text-xs text-slate-500">
              {violationCount} dari {MAX_VIOLATIONS} pelanggaran
            </p>
          </div>

          {/* Info box */}
          <div
            className={[
              "w-full rounded-2xl border px-4 py-3 text-left text-xs leading-relaxed",
              isExhausted || isLastChance
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-amber-100 bg-amber-50 text-amber-800",
            ].join(" ")}
          >
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 size-3.5 shrink-0 opacity-70" />
              <span>
                Tindakan yang dihitung sebagai pelanggaran: membuka tab baru, berpindah
                aplikasi, menekan tombol back, atau keluar dari mode layar penuh.
              </span>
            </div>
          </div>

          {/* Action button */}
          {isExhausted ? (
            <div className="flex w-full items-center justify-center gap-2 text-sm text-slate-500">
              <div className="size-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
              {isAutoSubmitting ? "Mengumpulkan ujian..." : "Memproses hasil ujian..."}
            </div>
          ) : (
            <Button
              type="button"
              className={[
                "w-full rounded-2xl py-6 text-base font-semibold",
                isLastChance
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-slate-900 hover:bg-slate-800 text-white",
              ].join(" ")}
              onClick={onDismiss}
            >
              Kembali ke Ujian
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
