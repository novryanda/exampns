"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const MAX_VIOLATIONS = 3;

export type ViolationType = "tab_switch" | "window_blur" | "back_button" | "fullscreen_exit";

export interface IntegrityViolation {
  type: ViolationType;
  count: number;
  timestamp: Date;
}

interface UseExamIntegrityGuardOptions {
  examSessionId: string;
  isActive: boolean;
  onAutoSubmit: () => Promise<void>;
  /** Diambil dari DB (tabSwitchCount) agar tidak reset saat refresh */
  initialViolationCount?: number;
}

interface UseExamIntegrityGuardReturn {
  violationCount: number;
  lastViolation: IntegrityViolation | null;
  showWarning: boolean;
  dismissWarning: () => void;
  isAutoSubmitting: boolean;
  requestFullscreen: () => void;
}

/**
 * Hook Exam Integrity Guard — memantau aktivitas user selama ujian:
 * - Pindah tab / document visibility change
 * - Alt+Tab / switch ke aplikasi lain (window blur)
 * - Tombol Back browser (history API trick)
 * - Keluar dari fullscreen mode
 *
 * Setiap pelanggaran di-log ke backend via POST /api/exams/:id/integrity-events
 * (eventType: "tab_switch"). Setelah MAX_VIOLATIONS (3x), otomatis memanggil
 * onAutoSubmit. initialViolationCount dibaca dari DB sehingga refresh tidak
 * mereset counter.
 */
export function useExamIntegrityGuard({
  examSessionId,
  isActive,
  onAutoSubmit,
  initialViolationCount = 0,
}: UseExamIntegrityGuardOptions): UseExamIntegrityGuardReturn {
  const [violationCount, setViolationCount] = useState(initialViolationCount);
  const [lastViolation, setLastViolation] = useState<IntegrityViolation | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);

  // Ref untuk mencegah double-fire dari kombinasi visibilitychange + blur
  const lastViolationTimeRef = useRef<number>(0);
  // Ref untuk melacak apakah sudah auto-submit (hindari multiple calls)
  const hasAutoSubmittedRef = useRef(false);
  // Ref untuk violationCount terbaru agar bisa diakses di event handler tanpa stale closure
  const violationCountRef = useRef(initialViolationCount);

  // Sync ref setiap kali state berubah
  useEffect(() => {
    violationCountRef.current = violationCount;
  }, [violationCount]);

  // ── Fullscreen helpers ──────────────────────────────────────────────────────
  const requestFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {
        // Browser mungkin menolak jika tidak ada gesture user — tidak fatal
      });
    }
  }, []);

  const exitFullscreenSilently = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => undefined);
    }
  }, []);

  // ── Log integrity event ke backend ─────────────────────────────────────────
  const logIntegrityEvent = useCallback(
    async (eventType: "tab_switch" | "warning_shown") => {
      try {
        await fetch(`/api/exams/${examSessionId}/integrity-events`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ eventType }),
        });
      } catch {
        // Gagal log tidak boleh menghentikan alur ujian
      }
    },
    [examSessionId],
  );

  // ── Auto submit ─────────────────────────────────────────────────────────────
  const triggerAutoSubmit = useCallback(async () => {
    if (hasAutoSubmittedRef.current) return;
    hasAutoSubmittedRef.current = true;
    setIsAutoSubmitting(true);
    setShowWarning(false);
    exitFullscreenSilently();
    try {
      await onAutoSubmit();
    } finally {
      setIsAutoSubmitting(false);
    }
  }, [onAutoSubmit, exitFullscreenSilently]);

  // ── Core: handle setiap pelanggaran ────────────────────────────────────────
  const handleViolation = useCallback(
    (type: ViolationType) => {
      if (!isActive || hasAutoSubmittedRef.current) return;

      // Debounce 1.5 detik — mencegah double-fire visibilitychange + blur
      const now = Date.now();
      if (now - lastViolationTimeRef.current < 1500) return;
      lastViolationTimeRef.current = now;

      const newCount = violationCountRef.current + 1;
      setViolationCount(newCount);
      setLastViolation({ type, count: newCount, timestamp: new Date() });

      // Log ke backend
      void logIntegrityEvent("tab_switch");

      if (newCount >= MAX_VIOLATIONS) {
        // Kesempatan habis → auto submit langsung
        void triggerAutoSubmit();
      } else {
        // Masih ada kesempatan → tampilkan peringatan
        setShowWarning(true);
        void logIntegrityEvent("warning_shown");
      }
    },
    [isActive, logIntegrityEvent, triggerAutoSubmit],
  );

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
    // Kembali paksa fullscreen setelah user dismiss warning
    requestFullscreen();
  }, [requestFullscreen]);

  // ── Request fullscreen saat ujian pertama kali aktif ───────────────────────
  useEffect(() => {
    if (!isActive) return;
    // Delay kecil agar gesture user (klik start) sudah terjadi
    const timer = setTimeout(() => {
      requestFullscreen();
    }, 500);
    return () => clearTimeout(timer);
  }, [isActive, requestFullscreen]);

  // ── Listener: Fullscreen change (keluar dari fullscreen) ───────────────────
  useEffect(() => {
    if (!isActive) return;

    const handleFullscreenChange = () => {
      // Jika tidak ada fullscreenElement → user keluar dari fullscreen
      if (!document.fullscreenElement) {
        handleViolation("fullscreen_exit");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isActive, handleViolation]);

  // ── Listener: visibilitychange (pindah tab / minimize) ────────────────────
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleViolation("tab_switch");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, handleViolation]);

  // ── Listener: window blur (alt+tab ke aplikasi lain) ──────────────────────
  useEffect(() => {
    if (!isActive) return;

    const handleWindowBlur = () => {
      // Hanya trigger jika document masih visible (bukan minimize yang sudah
      // ditangani oleh visibilitychange)
      if (document.visibilityState === "visible") {
        handleViolation("window_blur");
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [isActive, handleViolation]);

  // ── Listener: Back Button via history pushState trick ─────────────────────
  useEffect(() => {
    if (!isActive) return;

    // Tambahkan dummy state sehingga back button selalu bisa di-intercept
    window.history.pushState({ examGuard: true }, "");

    const handlePopState = () => {
      // Selalu re-push dummy state agar tombol back terus bisa di-intercept
      window.history.pushState({ examGuard: true }, "");
      handleViolation("back_button");
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isActive, handleViolation]);

  // ── Cleanup: keluar fullscreen saat ujian tidak aktif lagi ────────────────
  useEffect(() => {
    if (isActive) return;
    exitFullscreenSilently();
  }, [isActive, exitFullscreenSilently]);

  return {
    violationCount,
    lastViolation,
    showWarning,
    dismissWarning,
    isAutoSubmitting,
    requestFullscreen,
  };
}
