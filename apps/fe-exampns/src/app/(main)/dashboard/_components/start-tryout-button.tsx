"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ExamInstructionModal } from "@/components/exam/exam-instruction-modal";

export function StartTryoutButton({
  tryoutCatalogId,
  canStart,
  lockedReason,
  hasActiveExam = false,
}: {
  readonly tryoutCatalogId: string;
  readonly canStart: boolean;
  readonly lockedReason: string | null;
  readonly hasActiveExam?: boolean;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleStartExam = async () => {
    setIsPending(true);
    try {
      const response = await fetch("/api/exams/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tryoutCatalogId }),
      });

      const payload = (await response.json()) as {
        message?: string;
        data?: { examSessionId?: string };
      };

      if (!response.ok || !payload.data?.examSessionId) {
        throw new Error(payload.message ?? "Gagal memulai tryout.");
      }

      toast.success("Tryout berhasil dimulai.");
      router.push(`/dashboard/exams/${payload.data.examSessionId}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memulai tryout.");
    } finally {
      setIsPending(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setShowModal(true)}
        disabled={isPending || !canStart || hasActiveExam}
        className="rounded-xl bg-blue-600 hover:bg-blue-700"
        title={
          hasActiveExam
            ? "Selesaikan atau lanjutkan sesi aktif terlebih dulu."
            : !canStart
              ? (lockedReason ?? "Akses tryout tidak tersedia")
              : undefined
        }
      >
        {hasActiveExam ? <RotateCcw className="mr-2 size-4" /> : null}
        {isPending ? "Memulai..." : hasActiveExam ? "Sesi Aktif Berjalan" : "Mulai Tryout"}
      </Button>

      <ExamInstructionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleStartExam}
        isPending={isPending}
      />
    </>
  );
}
