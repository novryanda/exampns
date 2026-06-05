"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ApprovePaymentButton({
  paymentTransactionId,
  invoiceNumber,
}: {
  readonly paymentTransactionId: string;
  readonly invoiceNumber: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleApprove = async () => {
    const confirmed = window.confirm(`Konfirmasi pembayaran untuk invoice ${invoiceNumber}?`);
    if (!confirmed) {
      return;
    }

    setIsPending(true);
    try {
      const response = await fetch(`/api/admin-data/payments/${paymentTransactionId}/approve`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message ?? "Gagal mengonfirmasi pembayaran.");
      }

      toast.success(payload.message ?? "Pembayaran berhasil dikonfirmasi.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengonfirmasi pembayaran.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="rounded-xl"
      onClick={() => void handleApprove()}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="mr-1 size-4 animate-spin" /> : <CheckCircle2 className="mr-1 size-4" />}
      Acc Manual
    </Button>
  );
}
