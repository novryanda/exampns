import Link from "next/link";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { ServerPagination } from "@/components/server-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminPdfImportBatches, getAdminQuestionMetadataOptions } from "@/server/admin-content-data";

import { UploadPdfForm } from "./_components/upload-pdf-form";

const batchStatusOptions = [
  { value: "all", label: "Semua" },
  { value: "processing", label: "Diproses" },
  { value: "completed", label: "Selesai" },
  { value: "partial_failed", label: "Sebagian Gagal" },
  { value: "failed", label: "Gagal" },
] as const;

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toLabel(value: string) {
  const labels: Record<string, string> = {
    processing: "Diproses",
    completed: "Selesai",
    partial_failed: "Sebagian Gagal",
    failed: "Gagal",
  };

  return labels[value] ?? value;
}

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function readPageParam(value: string | string[] | undefined) {
  const text = readParam(value);
  const parsed = Number(text);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function readStatusParam(value: string | string[] | undefined) {
  const status = readParam(value);

  if (batchStatusOptions.some((option) => option.value === status && option.value !== "all")) {
    return status as "processing" | "completed" | "partial_failed" | "failed";
  }

  return undefined;
}

function buildUploadPdfHref(status?: string) {
  const searchParams = new URLSearchParams();

  if (status) {
    searchParams.set("status", status);
  }

  const query = searchParams.toString();
  return query ? `/admin/upload-pdf?${query}` : "/admin/upload-pdf";
}

export default async function UploadPdfPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = readPageParam(params.page);
  const status = readStatusParam(params.status);
  const [batches, metadataOptions] = await Promise.all([
    getAdminPdfImportBatches({ page, limit: 10, status }),
    getAdminQuestionMetadataOptions(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Unggah PDF" description="Unggah PDF berbasis teks untuk diproses ke antrean tinjau parsing." />

      <SectionCard
        title="Unggah File"
        description="Maksimum default 20MB. PDF teks lebih direkomendasikan daripada scan gambar."
      >
        <UploadPdfForm categories={metadataOptions.categories} />
      </SectionCard>

      <SectionCard title="Batch Upload Terbaru" description="Pantau status batch upload terakhir.">
        <div className="mb-4 flex flex-wrap gap-2">
          {batchStatusOptions.map((option) => {
            const isActive = (option.value === "all" && !status) || option.value === status;

            return (
              <Link
                key={option.value}
                href={buildUploadPdfHref(option.value === "all" ? undefined : option.value)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama File</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Valid</TableHead>
              <TableHead>Invalid</TableHead>
              <TableHead>Diunggah</TableHead>
              <TableHead>Aksi</TableHead>
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
                      Tinjau Parsing
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <ServerPagination
          page={batches.meta.page}
          totalPages={batches.meta.totalPages}
          params={{ status }}
          basePath="/admin/upload-pdf"
        />
      </SectionCard>
    </div>
  );
}
