"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContinuePaymentButton({
  paymentTransactionId,
}: {
  readonly paymentTransactionId: string;
}) {
  return (
    <Button asChild size="sm" variant="outline" className="rounded-xl">
      <Link href={`/app/langganan/pembayaran/${paymentTransactionId}`}>
        Lanjutkan Pembayaran
        <ArrowUpRight className="ml-1 size-4" />
      </Link>
    </Button>
  );
}
