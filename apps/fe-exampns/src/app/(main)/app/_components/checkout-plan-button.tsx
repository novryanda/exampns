"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  checkoutPaymentMethods,
  type CheckoutPaymentMethod,
} from "@/lib/user-app/payment-methods";

function getCheckoutErrorMessage(payload: {
  message?: string;
  code?: string;
  error?: {
    code?: string;
    details?: Array<{ field?: string; message?: string }>;
  };
}) {
  const detailMessage = payload.error?.details?.map((item) => item.message).find(Boolean);
  if (detailMessage) {
    return detailMessage;
  }

  const errorCode = payload.error?.code ?? payload.code;
  if (errorCode && errorCode !== "VALIDATION_ERROR") {
    return payload.message ?? errorCode;
  }

  return payload.message ?? "Gagal membuat checkout.";
}

function navigateToPaymentUrl(redirectUrl: string, navigate: (path: string) => void) {
  const target = new URL(redirectUrl, window.location.origin);

  if (target.origin === window.location.origin) {
    navigate(`${target.pathname}${target.search}${target.hash}`);
    return;
  }

  window.location.assign(redirectUrl);
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>("QRIS");

  const handleCheckout = async () => {
    setIsPending(true);
    try {
      const response = await fetch("/api/user/payments/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-idempotency-key": crypto.randomUUID(),
        },
        body: JSON.stringify({
          subscriptionPlanId: planId,
          paymentMethod,
        }),
      });

      const payload = (await response.json()) as {
        message?: string;
        code?: string;
        error?: {
          code?: string;
          details?: Array<{ field?: string; message?: string }>;
        };
        data?: { paymentUrl?: string | null; paymentTransactionId?: string };
      };

      if (!response.ok) {
        throw new Error(getCheckoutErrorMessage(payload));
      }

      setIsDialogOpen(false);

      const redirectUrl =
        payload.data?.paymentUrl ??
        (payload.data?.paymentTransactionId
          ? `/app/langganan/pembayaran/${payload.data.paymentTransactionId}`
          : null);

      if (redirectUrl) {
        navigateToPaymentUrl(redirectUrl, (path) => router.push(path));
        return;
      }

      toast.success(`Checkout ${planName} berhasil dibuat.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal membuat checkout.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
        onClick={() => setIsDialogOpen(true)}
        disabled={isPending}
      >
        <ShoppingCart className="mr-2 size-4" />
        Pilih Paket
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout {planName}</DialogTitle>
            <DialogDescription>
              Pilih metode pembayaran, lalu lanjutkan ke halaman instruksi pembayaran.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor={`payment-method-${planId}`}>Metode Pembayaran</Label>
            <Select
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as CheckoutPaymentMethod)}
            >
              <SelectTrigger id={`payment-method-${planId}`} className="rounded-xl">
                <SelectValue placeholder="Pilih metode pembayaran" />
              </SelectTrigger>
              <SelectContent>
                {checkoutPaymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isPending}>
              Batal
            </Button>
            <Button type="button" onClick={() => void handleCheckout()} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Lanjutkan Pembayaran"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
