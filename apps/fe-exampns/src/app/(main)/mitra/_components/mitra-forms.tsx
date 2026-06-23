"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initialAdminActionState } from "@/server/admin-action-state";
import { createWithdrawalAction, updatePartnerBankAccountAction } from "@/server/partner-actions";
import type { PartnerBankAccount } from "@/server/partner-data";

function useActionToast(state: { status: string; message: string }) {
  useEffect(() => {
    if (state.status === "success") toast.success(state.message);
    if (state.status === "error") toast.error(state.message);
  }, [state]);
}

function normalizeAmountInput(value: string) {
  return value.replace(/\D+/g, "");
}

function formatAmountInput(value: string) {
  if (!value) {
    return "";
  }

  return Number(value).toLocaleString("id-ID");
}

export function BankAccountForm({ account }: { readonly account: PartnerBankAccount | null }) {
  const [state, action, isPending] = useActionState(updatePartnerBankAccountAction, initialAdminActionState);
  useActionToast(state);

  return (
    <form action={action} className="grid gap-4 md:grid-cols-3">
      <div className="grid gap-2">
        <Label htmlFor="bankName">Bank</Label>
        <Input id="bankName" name="bankName" defaultValue={account?.bankName ?? ""} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="accountNumber">Nomor Rekening</Label>
        <Input id="accountNumber" name="accountNumber" defaultValue={account?.accountNumber ?? ""} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="accountHolderName">Nama Pemilik</Label>
        <Input
          id="accountHolderName"
          name="accountHolderName"
          defaultValue={account?.accountHolderName ?? ""}
          required
        />
      </div>
      <div className="md:col-span-3">
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Rekening"}
        </Button>
      </div>
    </form>
  );
}

export function WithdrawalForm({ availableBalance }: { readonly availableBalance: number }) {
  const [state, action, isPending] = useActionState(createWithdrawalAction, initialAdminActionState);
  const [amountInput, setAmountInput] = useState("");
  useActionToast(state);

  useEffect(() => {
    if (state.status === "success") {
      setAmountInput("");
    }
  }, [state.status]);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-1">
          <p className="text-slate-500 text-xs uppercase tracking-[0.24em]">Saldo Siap Dicairkan</p>
          <p className="font-semibold text-2xl text-slate-950">Rp {availableBalance.toLocaleString("id-ID")}</p>
          <p className="text-slate-500 text-sm">
            Ajukan nominal sesuai saldo tersedia ke rekening aktif Anda.
          </p>
        </div>
        <div className="grid gap-2 rounded-2xl bg-white p-4 ring-1 ring-slate-200/80">
          <p className="font-medium text-slate-950 text-sm">Catatan pengajuan</p>
          <p className="text-slate-500 text-sm">
            Tambahkan keterangan singkat bila pencairan ini perlu konteks tambahan untuk superadmin.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="grid gap-2">
          <Label htmlFor="amount">Nominal Pencairan</Label>
          <input type="hidden" name="amount" value={amountInput} />
          <Input
            id="amount"
            type="text"
            inputMode="numeric"
            placeholder="Contoh: 250.000"
            value={formatAmountInput(amountInput)}
            onChange={(event) => setAmountInput(normalizeAmountInput(event.target.value))}
            required
          />
          <p className="text-slate-500 text-xs">
            Maksimal pengajuan: Rp {availableBalance.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="requestedNote">Catatan</Label>
          <Textarea
            id="requestedNote"
            name="requestedNote"
            className="min-h-24"
            placeholder="Tulis catatan bila diperlukan, misalnya periode komisi atau kebutuhan pencairan."
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-slate-100 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-500 text-sm">
          Pengajuan akan masuk ke antrian review superadmin sebelum dana ditransfer.
        </p>
        <Button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Mengajukan..." : "Ajukan Pencairan"}
        </Button>
      </div>
    </form>
  );
}
