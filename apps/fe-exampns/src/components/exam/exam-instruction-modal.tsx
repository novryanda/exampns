"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Lightbulb,
  Monitor,
  Play,
  Shield,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// ─── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "welcome",
    icon: BookOpen,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    title: "Selamat Datang di Ujian",
    subtitle: "Baca panduan ini sebelum memulai",
    content: [
      {
        heading: "Apa itu Tryout CPNS?",
        body: "Tryout ini mensimulasikan ujian Seleksi Kompetensi Dasar (SKD) CPNS secara nyata. Kerjakan dengan serius agar hasilmu mencerminkan kemampuan sesungguhnya.",
      },
      {
        heading: "Persiapkan dirimu",
        body: "Pastikan koneksi internet stabil, baterai cukup, dan kamu berada di tempat yang tenang sebelum memulai ujian.",
      },
    ],
  },
  {
    id: "rules",
    icon: Clock,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    title: "Aturan & Waktu Ujian",
    subtitle: "Pahami aturan ini dengan baik",
    content: [
      {
        heading: "⏱️ Batas Waktu",
        body: "Ujian memiliki batas waktu yang ditentukan. Timer akan berjalan terus meskipun kamu menutup tab. Pastikan selesai sebelum waktu habis.",
      },
      {
        heading: "📝 Cara Menjawab",
        body: "Klik pada opsi jawaban yang kamu anggap benar. Kamu bisa mengubah jawaban selama waktu masih tersisa. Gunakan tombol ← → untuk navigasi antar soal.",
      },
      {
        heading: "🚩 Tandai Soal",
        body: "Kamu bisa menandai soal yang ingin ditinjau ulang menggunakan fitur flag. Soal yang ditandai akan mudah ditemukan di panel navigasi.",
      },
    ],
  },
  {
    id: "anticheat",
    icon: Shield,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    title: "Sistem Anti-Kecurangan",
    subtitle: "Penting! Harap diperhatikan",
    urgent: true,
    content: [
      {
        heading: "🚫 Dilarang Pindah Tab",
        body: "Sistem akan mendeteksi setiap kali kamu berpindah tab atau aplikasi. Setiap pelanggaran akan tercatat dan kamu akan mendapat peringatan.",
      },
      {
        heading: "⚠️ Batas Pelanggaran",
        body: "Jika kamu melakukan lebih dari 3 kali pelanggaran (pindah tab/keluar fullscreen), ujian akan otomatis dikumpulkan dan tidak dapat dilanjutkan.",
      },
      {
        heading: "🖥️ Mode Fullscreen",
        body: "Ujian berjalan dalam mode fullscreen. Keluar dari fullscreen akan dianggap sebagai pelanggaran dan dicatat oleh sistem.",
      },
    ],
  },
  {
    id: "tips",
    icon: Lightbulb,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    title: "Tips & Strategi Ujian",
    subtitle: "Maksimalkan skormu dengan strategi ini",
    content: [
      {
        heading: "💡 Manajemen Waktu",
        body: "Jangan terlalu lama di satu soal. Jika ragu, tandai dan lanjut ke soal berikutnya. Kembali ke soal yang ditandai jika masih ada waktu.",
      },
      {
        heading: "🎯 Prioritas Soal",
        body: "Kerjakan soal yang kamu yakini jawabannya terlebih dahulu. Soal TWK dan TIU butuh fokus lebih, sedangkan TKP lebih bersifat situasional.",
      },
      {
        heading: "✅ Review Sebelum Submit",
        body: "Sebelum mengumpulkan, gunakan waktu tersisa untuk meninjau soal yang belum dijawab atau yang sudah ditandai (flag).",
      },
    ],
  },
  {
    id: "ready",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    title: "Siap Memulai Ujian!",
    subtitle: "Kamu sudah membaca semua panduan",
    isLast: true,
    content: [
      {
        heading: "Checklist Terakhir",
        body: null,
        checklist: [
          "Koneksi internet stabil ✓",
          "Berada di tempat yang tenang ✓",
          "Tidak akan berpindah tab selama ujian ✓",
          "Siap menyelesaikan ujian dalam satu sesi ✓",
        ],
      },
      {
        heading: "Semangat!",
        body: "Percayai kemampuanmu. Fokus, tenang, dan kerjakan yang terbaik. Kamu pasti bisa! 💪",
      },
    ],
  },
] as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

function SlideIndicator({
  total,
  current,
  onGo,
}: {
  total: number;
  current: number;
  onGo: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onGo(i)}
          aria-label={`Slide ${i + 1}`}
          className={[
            "h-2 rounded-full transition-all duration-300 focus:outline-none",
            i === current
              ? "w-6 bg-blue-500"
              : i < current
                ? "w-2 bg-blue-300"
                : "w-2 bg-gray-300 dark:bg-gray-600",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function SlideContent({ slide }: { slide: (typeof SLIDES)[number] }) {
  const Icon = slide.icon;

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <div className={`rounded-2xl p-4 ${slide.iconBg}`}>
          <Icon className={`size-8 ${slide.iconColor}`} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{slide.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{slide.subtitle}</p>
        </div>
        {"urgent" in slide && slide.urgent && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
            <AlertTriangle className="size-3.5 shrink-0" />
            Pelanggaran dapat menyebabkan ujian otomatis dikumpulkan
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {slide.content.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/50 bg-muted/40 p-4"
          >
            <p className="mb-1.5 text-sm font-semibold text-foreground">
              {item.heading}
            </p>
            {"checklist" in item && item.checklist ? (
              <ul className="flex flex-col gap-1.5">
                {item.checklist.map((c, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main modal ────────────────────────────────────────────────────────────────
export function ExamInstructionModal({
  isOpen,
  onClose,
  onConfirm,
  isPending = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [reachedLast, setReachedLast] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const touchStartX = useRef<number | null>(null);

  const total = SLIDES.length;

  // Reset state every time modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrent(0);
      setReachedLast(false);
    }
  }, [isOpen]);

  const goTo = useCallback(
    (next: number, dir: "left" | "right" = "right") => {
      if (isAnimating || next < 0 || next >= total) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(next);
        if (next === total - 1) setReachedLast(true);
        setIsAnimating(false);
      }, 200);
    },
    [isAnimating, total],
  );

  const next = useCallback(() => {
    if (current < total - 1) goTo(current + 1, "right");
  }, [current, goTo, total]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, "left");
  }, [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, next, prev, onClose]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  if (!isOpen) return null;

  const isFirst = current === 0;
  const isLast = current === total - 1;
  const canStart = reachedLast;

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-border"
        style={{ maxHeight: "90dvh" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Eye className="size-4" />
            Panduan Ujian
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {current + 1} / {total}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Tutup"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-muted">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>

        {/* Slide area */}
        <div className="flex-1 overflow-hidden p-5">
          <div
            className="h-full transition-all duration-200"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating
                ? `translateX(${direction === "right" ? "20px" : "-20px"})`
                : "translateX(0)",
            }}
          >
            <SlideContent slide={SLIDES[current]!} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-muted/30 px-5 py-4">
          {/* Dot indicators */}
          <div className="mb-4">
            <SlideIndicator total={total} current={current} onGo={(i) => goTo(i, i > current ? "right" : "left")} />
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={prev}
              disabled={isFirst}
              className="gap-1.5"
            >
              <ChevronLeft className="size-4" />
              Sebelumnya
            </Button>

            <div className="flex-1" />

            {isLast ? (
              <Button
                type="button"
                onClick={onConfirm}
                disabled={!canStart || isPending}
                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                size="sm"
              >
                <Play className="size-4" />
                {isPending ? "Memulai..." : "Mulai Ujian Sekarang"}
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={next}
                className="gap-1.5 bg-blue-600 text-white hover:bg-blue-700"
              >
                Selanjutnya
                <ChevronRight className="size-4" />
              </Button>
            )}
          </div>

          {!canStart && isLast && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Baca semua slide panduan untuk mengaktifkan tombol mulai
            </p>
          )}

          {!isLast && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              <Monitor className="mr-1 inline size-3" />
              Geser atau gunakan tombol ← → untuk navigasi
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
