import Link from "next/link";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminPdfImportBatches } from "@/server/admin-content-data";

import { UploadPdfForm } from "./_components/upload-pdf-form";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default async function UploadPdfPage() {
  const batches = await getAdminPdfImportBatches({ limit: 10 });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Upload PDF" description="Upload PDF berbasis teks untuk diproses ke queue review parsing." />

      <SectionCard
        title="Upload Card"
        description="Maksimum default 20MB. PDF teks lebih direkomendasikan daripada scan gambar."
      >
        <UploadPdfForm />
      </SectionCard>

      <SectionCard title="Recent Upload Batches" description="Pantau status batch upload terakhir.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Valid</TableHead>
              <TableHead>Invalid</TableHead>
              <TableHead>Uploaded At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  Belum ada batch upload.
                </TableCell>
              </TableRow>
            ) : (
              batches.data.map((batch) => (
                <TableRow key={batch.batchId}>
                  <TableCell className="font-medium text-slate-950">{batch.fileName}</TableCell>
                  <TableCell>
                    <StatusBadge
                      tone={
                        batch.status === "completed" ? "success" : batch.status === "processing" ? "warning" : "danger"
                      }
                    >
                      {toLabel(batch.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{batch.totalDetected}</TableCell>
                  <TableCell>{batch.validCount}</TableCell>
                  <TableCell>{batch.invalidCount}</TableCell>
                  <TableCell>{formatDateTime(batch.createdAt)}</TableCell>
                  <TableCell>
                    <Link
                      className="text-blue-600 text-sm hover:underline"
                      href={`/admin/review-parsing?batchId=${batch.batchId}`}
                    >
                      Review Parsing
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
