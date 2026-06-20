"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContinuePaymentButton({
  paymentTransactionId,
  paymentUrl,
}: {
  readonly paymentTransactionId: string;
  readonly paymentUrl?: string | null;
}) {
  const targetUrl = paymentUrl ?? `/app/langganan/pembayaran/${paymentTransactionId}`;

  return (
    <Button asChild size="sm" variant="outline" className="rounded-xl">
      <Link href={targetUrl}>
        Lanjutkan Pembayaran
        <ArrowUpRight className="ml-1 size-4" />
      </Link>
    </Button>
  );
}
