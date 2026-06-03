"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { Ban, CheckCircle2, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { initialResourceActionState } from "@/server/admin-action-state";
import {
  createQuestionCategoryAction,
  toggleQuestionCategoryStatusAction,
  updateQuestionCategoryAction,
} from "@/server/admin-content-actions";
import type { QuestionCategorySummary } from "@/server/admin-content-data";

function useResourceToast(state: { status: string; message: string }, onSuccess?: () => void) {
  const lastHandledStateRef = useRef(state);

  useEffect(() => {
    if (lastHandledStateRef.current === state) {
      return;
    }

    lastHandledStateRef.current = state;

    if (state.status === "success") {
      toast.success(state.message);
      onSuccess?.();
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [onSuccess, state]);
}

function answerModeLabel(mode: QuestionCategorySummary["answerMode"]) {
  return mode === "weighted_options" ? "Weighted options" : "Single correct";
}

function CategoryStatusBadge({ isActive }: { readonly isActive: boolean }) {
  return <StatusBadge tone={isActive ? "success" : "warning"}>{isActive ? "Aktif" : "Arsip"}</StatusBadge>;
}

function CreateCategoryDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createQuestionCategoryAction, initialResourceActionState);

  useResourceToast(state, () => {
    router.refresh();
  });

  useEffect(() => {
    if (state.status === "success") {
      setOpen(false);
    }
  }, [state.status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 size-4" />
          Tambah Kategori
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Tambah kategori soal</DialogTitle>
          <DialogDescription>
            Kode kategori bersifat permanen. Passing grade aktif akan otomatis mendapat minimum skor awal `0`.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="category-code">Kode</Label>
              <Input
                id="category-code"
                name="code"
                placeholder="Contoh: SKD_WAWASAN"
                className="rounded-xl border-slate-200"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-sort-order">Urutan</Label>
              <Input
                id="category-sort-order"
                name="sortOrder"
                type="number"
                min={0}
                defaultValue={0}
                className="rounded-xl border-slate-200"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category-name">Nama kategori</Label>
            <Input
              id="category-name"
              name="name"
              placeholder="Contoh: Tes Integritas Organisasi"
              className="rounded-xl border-slate-200"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category-answer-mode">Mode penilaian</Label>
            <Select name="answerMode" defaultValue="single_correct">
              <SelectTrigger id="category-answer-mode" className="rounded-xl border-slate-200 bg-white">
                <SelectValue placeholder="Pilih mode penilaian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single_correct">Single correct</SelectItem>
                <SelectItem value="weighted_options">Weighted options</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan kategori"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditCategoryDialog({ category }: { readonly category: QuestionCategorySummary }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(updateQuestionCategoryAction, initialResourceActionState);

  useResourceToast(state, () => {
    router.refresh();
  });

  useEffect(() => {
    if (state.status === "success") {
      setOpen(false);
    }
  }, [state.status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-lg">
          <Pencil className="mr-1 size-4" />
          Ubah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ubah kategori soal</DialogTitle>
          <DialogDescription>Nama, mode penilaian, dan urutan bisa diubah. Kode kategori tetap.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="categoryId" value={category.id ?? ""} />
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Kode</Label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-medium text-slate-700 text-sm">
                {category.code}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`category-sort-order-${category.code}`}>Urutan</Label>
              <Input
                id={`category-sort-order-${category.code}`}
                name="sortOrder"
                type="number"
                min={0}
                defaultValue={category.sortOrder}
                className="rounded-xl border-slate-200"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`category-name-${category.code}`}>Nama kategori</Label>
            <Input
              id={`category-name-${category.code}`}
              name="name"
              defaultValue={category.name}
              className="rounded-xl border-slate-200"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`category-answer-mode-${category.code}`}>Mode penilaian</Label>
            <Select name="answerMode" defaultValue={category.answerMode}>
              <SelectTrigger id={`category-answer-mode-${category.code}`} className="rounded-xl border-slate-200 bg-white">
                <SelectValue placeholder="Pilih mode penilaian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single_correct">Single correct</SelectItem>
                <SelectItem value="weighted_options">Weighted options</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending || !category.id}>
            {isPending ? "Menyimpan..." : "Simpan perubahan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CategoryStatusButton({ categoryId, isActive }: { readonly categoryId?: string; readonly isActive: boolean }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(toggleQuestionCategoryStatusAction, initialResourceActionState);

  useResourceToast(state, () => {
    router.refresh();
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="categoryId" value={categoryId ?? ""} />
      <input type="hidden" name="isActive" value={String(!isActive)} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className={
          isActive
            ? "rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50"
            : "rounded-lg border-emerald-200 text-emerald-600 hover:bg-emerald-50"
        }
        disabled={isPending || !categoryId}
      >
        {isActive ? <Ban className="mr-1 size-4" /> : <CheckCircle2 className="mr-1 size-4" />}
        {isPending ? "Memproses..." : isActive ? "Arsipkan" : "Aktifkan"}
      </Button>
    </form>
  );
}

export function QuestionCategoryManager({ initialCategories }: { readonly initialCategories: QuestionCategorySummary[] }) {
  return (
    <SectionCard
      title="Kategori Soal"
      description="Kategori baru akan langsung tersedia di bank soal, metadata, review parsing, dan builder tryout."
      trailing={<CreateCategoryDialog />}
    >
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Urutan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                  Belum ada kategori soal.
                </TableCell>
              </TableRow>
            ) : (
              initialCategories.map((category) => (
                <TableRow key={category.id ?? category.code}>
                  <TableCell className="font-mono text-slate-700 text-sm">{category.code}</TableCell>
                  <TableCell className="font-medium text-slate-950">{category.name}</TableCell>
                  <TableCell>{answerModeLabel(category.answerMode)}</TableCell>
                  <TableCell>{category.sortOrder}</TableCell>
                  <TableCell>
                    <CategoryStatusBadge isActive={category.isActive} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditCategoryDialog category={category} />
                      <CategoryStatusButton categoryId={category.id} isActive={category.isActive} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </SectionCard>
  );
}
