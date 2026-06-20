"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

// Extend Window interface for Midtrans Snap
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: Record<string, unknown>) => void;
          onPending?: (result: Record<string, unknown>) => void;
          onError?: (result: Record<string, unknown>) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

function getCheckoutErrorMessage(payload: {
  message?: string;
  code?: string;
  error?: {
    code?: string;
    details?: Array<{ field?: string; message?: string }>;
  };
}) {
  const detailMessage = payload.error?.details?.map((item) => item.message).find(Boolean);
  if (detailMessage) return detailMessage;
  const errorCode = payload.error?.code ?? payload.code;
  if (errorCode && errorCode !== "VALIDATION_ERROR") return payload.message ?? errorCode;
  return payload.message ?? "Gagal membuat checkout.";
}

export function CheckoutPlanButton({
  planId,
  planName,
}: {
  readonly planId: string;
  readonly planName: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [snapReady, setSnapReady] = useState(false);

  // Load Midtrans Snap.js script on mount
  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
    const snapUrl = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

    if (document.getElementById("midtrans-snap-script")) {
      setSnapReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "midtrans-snap-script";
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey ?? "");
    script.onload = () => setSnapReady(true);
    script.onerror = () => console.error("Gagal memuat Midtrans Snap.js");
    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount — keep it for other buttons on same page
    };
  }, []);

  const handleCheckout = async () => {
    if (!snapReady || !window.snap) {
      toast.error("Sistem pembayaran belum siap. Coba lagi dalam beberapa detik.");
      return;
    }

    setIsPending(true);
    try {
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-idempotency-key": crypto.randomUUID(),
        },
        body: JSON.stringify({
          subscriptionPlanId: planId,
          // Let Midtrans Snap handle all payment methods
          paymentMethod: "QRIS",
        }),
      });

      const payload = (await response.json()) as {
        message?: string;
        code?: string;
        error?: {
          code?: string;
          details?: Array<{ field?: string; message?: string }>;
        };
        data?: {
          snapToken?: string | null;
          paymentUrl?: string | null;
          paymentTransactionId?: string;
        };
      };

      if (!response.ok) {
        throw new Error(getCheckoutErrorMessage(payload));
      }

      const snapToken = payload.data?.snapToken;
      const paymentTransactionId = payload.data?.paymentTransactionId;

      if (snapToken) {
        // Open Midtrans Snap popup directly
        window.snap.pay(snapToken, {
          onSuccess: () => {
            toast.success("Pembayaran berhasil!");
            router.refresh();
          },
          onPending: () => {
            toast.info("Pembayaran sedang diproses.");
            router.refresh();
          },
          onError: () => {
            toast.error("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            if (paymentTransactionId) {
              // User closed popup — they can retry via "Lanjutkan Pembayaran"
              router.refresh();
            }
          },
        });
      } else if (payload.data?.paymentUrl) {
        // Fallback: redirect to payment URL
        window.location.assign(payload.data.paymentUrl);
      } else if (paymentTransactionId) {
        router.push(`/app/langganan/pembayaran/${paymentTransactionId}`);
      } else {
        toast.success(`Checkout ${planName} berhasil dibuat.`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal membuat checkout.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      id={`checkout-btn-${planId}`}
      className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
      onClick={() => void handleCheckout()}
      disabled={isPending || !snapReady}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Memproses...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 size-4" />
          Pilih Paket
        </>
      )}
    </Button>
  );
}
