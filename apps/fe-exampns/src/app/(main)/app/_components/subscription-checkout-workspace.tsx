"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ReceiptText, Tag } from "lucide-react";
import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import type { SubscriptionPlanItem } from "@/server/user-dashboard-data";

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

type ReferralPreview = {
  code: string;
  partnerName: string;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
};

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

export function SubscriptionCheckoutWorkspace({
  plan,
}: {
  readonly plan: SubscriptionPlanItem;
}) {
  const router = useRouter();
  const [snapReady, setSnapReady] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [preview, setPreview] = useState<ReferralPreview | null>(null);
  const [previewState, setPreviewState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [previewMessage, setPreviewMessage] = useState<string | null>(null);

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
  }, []);

  useEffect(() => {
    const normalizedCode = referralCode.trim().toUpperCase();

    if (!normalizedCode) {
      setPreview(null);
      setPreviewState("idle");
      setPreviewMessage(null);
      return;
    }

    if (normalizedCode.length < 3) {
      setPreview(null);
      setPreviewState("idle");
      setPreviewMessage("Kode referral minimal 3 karakter.");
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setPreviewState("loading");
      setPreviewMessage("Mencocokkan kode referral...");

      try {
        const query = new URLSearchParams({
          subscriptionPlanId: plan.id,
          referralCode: normalizedCode,
        });
        const response = await fetch(`/api/payments/referral-preview?${query.toString()}`);
        const payload = (await response.json()) as {
          message?: string;
          data?: ReferralPreview | null;
        };

        if (cancelled) {
          return;
        }

        if (!response.ok || !payload.data) {
          throw new Error(payload.message ?? "Kode referral tidak valid.");
        }

        setPreview(payload.data);
        setPreviewState("success");
        setPreviewMessage(`Kode ${payload.data.code} aktif untuk ${payload.data.partnerName}.`);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setPreview(null);
        setPreviewState("error");
        setPreviewMessage(error instanceof Error ? error.message : "Gagal mengecek kode referral.");
      }
    }, 450);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [plan.id, referralCode]);

  const pricing = useMemo(() => {
    if (preview) {
      return preview;
    }

    return {
      code: "",
      partnerName: "",
      originalAmount: plan.price,
      discountAmount: 0,
      finalAmount: plan.price,
    };
  }, [plan.price, preview]);

  async function handleCheckout() {
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
          subscriptionPlanId: plan.id,
          paymentMethod: "QRIS",
          ...(referralCode.trim() ? { referralCode: referralCode.trim() } : {}),
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
        window.snap.pay(snapToken, {
          onSuccess: () => {
            toast.success("Pembayaran berhasil dibuat.");
            if (paymentTransactionId) {
              router.push(`/app/langganan/pembayaran/${paymentTransactionId}`);
              return;
            }
            router.refresh();
          },
          onPending: () => {
            toast.info("Pembayaran sedang diproses.");
            if (paymentTransactionId) {
              router.push(`/app/langganan/pembayaran/${paymentTransactionId}`);
              return;
            }
            router.refresh();
          },
          onError: () => {
            toast.error("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            if (paymentTransactionId) {
              router.push(`/app/langganan/pembayaran/${paymentTransactionId}`);
            }
          },
        });
        return;
      }

      if (payload.data?.paymentUrl) {
        window.location.assign(payload.data.paymentUrl);
        return;
      }

      if (paymentTransactionId) {
        router.push(`/app/langganan/pembayaran/${paymentTransactionId}`);
        return;
      }

      toast.success(`Checkout ${plan.name} berhasil dibuat.`);
      router.push("/app/langganan");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal membuat checkout.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <SectionCard
      title="Checkout"
      description="Masukkan kode referral bila ada. Diskon akan langsung dihitung ke total pembayaran."
    >
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="referral-code" className="font-medium text-slate-900 text-sm">
            Kode referral
          </label>
          <div className="relative">
            <Tag className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-slate-400" />
            <Input
              id="referral-code"
              value={referralCode}
              onChange={(event) => setReferralCode(event.target.value.toUpperCase())}
              placeholder="Masukkan kode referral"
              className="h-11 rounded-xl border-slate-200 pl-9"
            />
          </div>
          {previewMessage ? (
            <div
              className={[
                "rounded-xl px-3 py-2 text-sm",
                previewState === "success"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                  : previewState === "error"
                    ? "border border-rose-200 bg-rose-50 text-rose-700"
                    : "border border-slate-200 bg-slate-50 text-slate-500",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                {previewState === "loading" ? <Loader2 className="size-4 animate-spin" /> : null}
                {previewState === "success" ? <CheckCircle2 className="size-4" /> : null}
                <span>{previewMessage}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-950">{plan.name}</p>
              <p className="text-slate-500 text-sm">{plan.durationDays} hari akses tryout</p>
            </div>
            <StatusBadge tone="brand">{plan.tier}</StatusBadge>
          </div>

          <div className="space-y-3 border-slate-200 border-t pt-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Harga paket</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(pricing.originalAmount, { currency: plan.currency, locale: "id-ID", noDecimals: true })}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Diskon referral</span>
              <span className={pricing.discountAmount > 0 ? "font-medium text-emerald-700" : "text-slate-400"}>
                {pricing.discountAmount > 0
                  ? `- ${formatCurrency(pricing.discountAmount, { currency: plan.currency, locale: "id-ID", noDecimals: true })}`
                  : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-slate-200 border-t pt-3">
              <span className="font-medium text-slate-900">Total bayar</span>
              <span className="font-semibold text-slate-950 text-2xl">
                {formatCurrency(pricing.finalAmount, { currency: plan.currency, locale: "id-ID", noDecimals: true })}
              </span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700"
          onClick={() => void handleCheckout()}
          disabled={isPending || !snapReady}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Memproses checkout...
            </>
          ) : (
            <>
              <ReceiptText className="mr-2 size-4" />
              Lanjut ke Pembayaran
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </div>
    </SectionCard>
  );
}
