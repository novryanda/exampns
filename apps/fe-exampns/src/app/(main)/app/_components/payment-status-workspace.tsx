"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { CheckCircle2, Clock3, Loader2, ReceiptText } from "lucide-react";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { formatDateTimeId } from "@/lib/user-app/labels";
import type { PaymentStatusDetail } from "@/server/user-dashboard-data";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function toneForStatus(status: string) {
  if (status === "success") {
    return "success";
  }

  if (status === "pending") {
    return "warning";
  }

  return "danger";
}

export function PaymentStatusWorkspace({
  initialPayment,
}: {
  readonly initialPayment: PaymentStatusDetail;
}) {
  const router = useRouter();
  const [payment, setPayment] = useState(initialPayment);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshPayment = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/user/payments/${payment.id}`);
      const payload = (await response.json()) as { data?: PaymentStatusDetail };
      if (response.ok && payload.data) {
        setPayment(payload.data);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [payment.id]);

  useEffect(() => {
    if (payment.status !== "pending") {
      return;
    }

    const intervalId = window.setInterval(() => {
      void refreshPayment();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [payment.status, refreshPayment]);

  useEffect(() => {
    if (payment.subscriptionActivated) {
      router.refresh();
    }
  }, [payment.subscriptionActivated, router]);

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Instruksi Pembayaran"
        description="Selesaikan pembayaran sesuai metode yang dipilih. Status akan diperbarui otomatis setelah admin mengonfirmasi."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-slate-500 text-sm">Invoice</div>
            <div className="mt-1 font-semibold text-slate-950">{payment.invoiceNumber}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-slate-500 text-sm">Paket</div>
            <div className="mt-1 font-semibold text-slate-950">{payment.planName}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-slate-500 text-sm">Nominal</div>
            <div className="mt-1 font-semibold text-2xl text-slate-950">
              {formatCurrency(payment.amount, payment.currency)}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-slate-500 text-sm">Metode</div>
            <div className="mt-1 font-semibold text-slate-950">{payment.paymentMethod ?? "-"}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <StatusBadge tone={toneForStatus(payment.status)}>{payment.status}</StatusBadge>
          {payment.expiredAt ? (
            <span className="inline-flex items-center gap-2 text-slate-500 text-sm">
              <Clock3 className="size-4" />
              Batas waktu: {formatDateTimeId(payment.expiredAt)}
            </span>
          ) : null}
        </div>

        {payment.status === "pending" ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm leading-6">
            Transfer sesuai nominal ke rekening/virtual account yang ditentukan admin, lalu tunggu konfirmasi
            manual dari tim ExamCPNS. Halaman ini akan otomatis memperbarui status pembayaran Anda.
          </div>
        ) : null}

        {payment.status === "success" ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 text-sm">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            <div>
              Pembayaran berhasil dikonfirmasi.
              {payment.subscriptionActivated ? " Langganan Anda sudah aktif." : ""}
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="outline" className="rounded-xl" onClick={() => void refreshPayment()} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className="mr-2 size-4 animate-spin" /> : <ReceiptText className="mr-2 size-4" />}
            Perbarui Status
          </Button>
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/app/langganan">Kembali ke Langganan</Link>
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
