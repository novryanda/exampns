"use client";

import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MetadataGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl border-blue-200 bg-white text-blue-700 hover:bg-blue-50">
          <BookOpen className="mr-2 size-4" />
          Panduan Metadata
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Panduan Metadata Soal</DialogTitle>
          <DialogDescription>
            Struktur metadata dipakai di bank soal, tinjau parsing, dan penyusunan tryout.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-slate-600 text-sm leading-6">
          <p>
            <strong className="text-slate-900">Sub-kategori</strong> mengelompokkan materi per kategori TWK, TIU, atau
            TKP. Setiap sub-kategori dapat memiliki banyak topik tag.
          </p>
          <p>
            <strong className="text-slate-900">Topik tag</strong> adalah label paling spesifik untuk sebuah soal. Saat
            membuat atau mengedit soal, pilih topik tag yang sesuai agar distribusi materi akurat.
          </p>
          <p>
            Nonaktifkan metadata yang tidak dipakai lagi alih-alih menghapus, agar riwayat soal tetap konsisten.
            Metadata nonaktif tidak muncul pada form pemilihan baru.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
