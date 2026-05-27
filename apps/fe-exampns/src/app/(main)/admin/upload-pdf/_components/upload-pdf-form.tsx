"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { initialResourceActionState } from "@/server/admin-action-state";
import { uploadPdfAction } from "@/server/admin-content-actions";

export function UploadPdfForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(uploadPdfAction, initialResourceActionState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      router.refresh();
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [router, state]);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="file">Pilih PDF</Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          className="rounded-xl border-slate-200"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categoryHint">Petunjuk Kategori</Label>
        <Select name="categoryHint" defaultValue="auto">
          <SelectTrigger id="categoryHint" className="rounded-xl border-slate-200 bg-white md:w-56">
            <SelectValue placeholder="Pilih petunjuk kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Otomatis</SelectItem>
            <SelectItem value="TWK">TWK</SelectItem>
            <SelectItem value="TIU">TIU</SelectItem>
            <SelectItem value="TKP">TKP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-fit rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
        {isPending ? "Mengunggah..." : "Unggah dan Proses"}
      </Button>
    </form>
  );
}
