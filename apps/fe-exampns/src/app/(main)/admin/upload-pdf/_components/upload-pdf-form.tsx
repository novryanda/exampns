"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { FileText, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { initialResourceActionState } from "@/server/admin-action-state";
import { uploadPdfAction } from "@/server/admin-content-actions";
import type { QuestionCategorySummary } from "@/server/admin-content-data";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function UploadPdfForm({ categories }: { readonly categories: QuestionCategorySummary[] }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(uploadPdfAction, initialResourceActionState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: isPending,
    onDropAccepted: (files) => {
      setSelectedFile(files[0] ?? null);
    },
    onDropRejected: () => {
      setSelectedFile(null);
    },
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.refresh();
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [router, state]);

  const dropzoneError = useMemo(() => {
    if (fileRejections.length === 0) return null;
    const firstError = fileRejections[0]?.errors[0];
    if (!firstError) return "File tidak valid.";

    if (firstError.code === "file-too-large") {
      return "Ukuran file maksimal 20MB.";
    }

    if (firstError.code === "file-invalid-type") {
      return "Hanya file PDF yang diperbolehkan.";
    }

    return firstError.message;
  }, [fileRejections]);

  return (
    <form
      action={formAction}
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        if (!selectedFile) {
          toast.error("Pilih file PDF terlebih dahulu.");
          return;
        }

        const formData = new FormData(event.currentTarget);
        formData.set("file", selectedFile);

        startTransition(() => {
          formAction(formData);
        });
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="file">Upload PDF</Label>
        <div
          {...getRootProps()}
          className={cn(
            "rounded-2xl border border-dashed bg-slate-50/70 p-6 transition-colors",
            "cursor-pointer border-slate-300 hover:border-blue-300 hover:bg-blue-50/40",
            isDragActive && "border-blue-500 bg-blue-50",
            dropzoneError && "border-rose-400 bg-rose-50/50",
            isPending && "cursor-not-allowed opacity-70",
          )}
        >
          <input
            {...getInputProps({
              id: "file",
              name: "file",
              className: "hidden",
              style: { display: "none" },
              tabIndex: -1,
              "aria-hidden": "true",
              ref: fileInputRef,
            })}
          />
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <UploadCloud className={cn("size-8 text-slate-500", isDragActive && "text-blue-600")} />
            <p className="font-medium text-slate-900 text-sm">
              {isDragActive ? "Lepas file PDF di sini" : "Drag & drop file PDF di sini"}
            </p>
            <p className="text-slate-500 text-xs">atau klik area ini untuk browse file</p>
            <p className="text-slate-400 text-xs">Hanya PDF, maksimal 20MB</p>
          </div>
        </div>
        {selectedFile ? (
          <div className="grid gap-1">
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
              <FileText className="size-4 text-blue-600" />
              <span className="font-medium text-slate-800">{selectedFile.name}</span>
            </div>
            <p className="text-emerald-600 text-sm">
              File sudah dipilih dan siap diunggah. Mengganti kategori tidak akan menghapus file ini.
            </p>
          </div>
        ) : null}
        {dropzoneError ? <p className="text-rose-600 text-sm">{dropzoneError}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categoryHint">Petunjuk Kategori</Label>
        <Select name="categoryHint" defaultValue="auto">
          <SelectTrigger id="categoryHint" className="rounded-xl border-slate-200 bg-white md:w-56">
            <SelectValue placeholder="Pilih petunjuk kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Otomatis</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.code} value={category.code}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-fit rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
        {isPending ? "Mengunggah..." : "Unggah dan Proses"}
      </Button>
    </form>
  );
}
