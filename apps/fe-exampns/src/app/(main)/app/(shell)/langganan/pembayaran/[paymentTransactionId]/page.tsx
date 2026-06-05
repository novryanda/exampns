import { notFound } from "next/navigation";

import { PaymentStatusWorkspace } from "@/app/(main)/app/_components/payment-status-workspace";
import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getPaymentStatus } from "@/server/user-dashboard-data";

export default async function PaymentStatusPage({
  params,
}: {
  readonly params: Promise<{ paymentTransactionId: string }>;
}) {
  const { paymentTransactionId } = await params;
  const payment = await getPaymentStatus(paymentTransactionId).catch(() => notFound());

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Status Pembayaran"
        description={`Invoice ${payment.invoiceNumber} • ${payment.planName}`}
      />
      <PaymentStatusWorkspace initialPayment={payment} />
    </div>
  );
}
