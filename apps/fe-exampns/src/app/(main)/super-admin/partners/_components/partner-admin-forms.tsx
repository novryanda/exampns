"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  initialAdminActionState,
  initialResourceActionState,
  type AdminActionState,
  type ResourceActionState,
} from "@/server/admin-action-state";
import {
  approveWithdrawalAction,
  createPartnerAction,
  deleteReferralCodeAction,
  rejectWithdrawalAction,
  saveReferralCodeAction,
  updatePartnerAction,
} from "@/server/partner-actions";
import type {
  PartnerReferralCode,
  PartnerWithdrawalItem,
  SuperAdminPartnerDetail,
} from "@/server/partner-data";

function useActionToast(state: AdminActionState | ResourceActionState) {
  useEffect(() => {
    if (state.status === "success") toast.success(state.message);
    if (state.status === "error") toast.error(state.message);
  }, [state]);
}

export function CreatePartnerForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(createPartnerAction, initialResourceActionState);
  useActionToast(state);

  useEffect(() => {
    if (state.status === "success" && state.resourceId) {
      router.push(`/super-admin/partners/${state.resourceId}`);
    }
  }, [router, state]);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <Input name="fullName" placeholder="Nama lengkap" required />
        <Input name="displayName" placeholder="Nama display mitra" />
        <Input name="email" type="email" placeholder="Email mitra" required />
        <Input name="phone" placeholder="Nomor HP" />
        <Textarea name="notes" placeholder="Catatan kerja sama" className="lg:col-span-2" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="mb-4">
          <h3 className="font-medium text-slate-950 text-sm">Referral pertama digenerate otomatis</h3>
          <p className="mt-1 text-slate-500 text-sm">
            Tentukan diskon untuk user dan komisi mitra. Sistem akan membuatkan kode referral unik saat mitra dibuat.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-2">
            <Label>Tipe Diskon</Label>
            <Select name="discountType" defaultValue="percentage">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Persentase</SelectItem>
                <SelectItem value="fixed">Nominal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Nilai Diskon</Label>
            <Input name="discountValue" type="number" min={1} defaultValue={10} required />
          </div>
          <div className="grid gap-2">
            <Label>Tipe Komisi</Label>
            <Select name="commissionType" defaultValue="percentage">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Persentase</SelectItem>
                <SelectItem value="fixed">Nominal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Nilai Komisi</Label>
            <Input name="commissionValue" type="number" min={1} defaultValue={10} required />
          </div>
        </div>
      </div>

      <div>
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Membuat mitra..." : "Buat Mitra & Generate Referral"}
        </Button>
      </div>
    </form>
  );
}

export function UpdatePartnerForm({ partner }: { readonly partner: SuperAdminPartnerDetail }) {
  const [state, action, isPending] = useActionState(updatePartnerAction, initialAdminActionState);
  useActionToast(state);

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <input type="hidden" name="partnerProfileId" value={partner.id} />
      <div className="grid gap-2">
        <Label>Nama Display</Label>
        <Input name="displayName" defaultValue={partner.displayName} required />
      </div>
      <div className="grid gap-2">
        <Label>Nomor HP</Label>
        <Input name="phone" defaultValue={partner.user.phone ?? ""} />
      </div>
      <div className="grid gap-2">
        <Label>Status</Label>
        <Select name="status" defaultValue={partner.status}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2 md:col-span-2">
        <Label>Catatan</Label>
        <Textarea name="notes" defaultValue={partner.notes ?? ""} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Mitra"}
        </Button>
      </div>
    </form>
  );
}

const referralSelectClassName =
  "h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm outline-none focus:border-blue-400";

type ReferralRowProps = {
  readonly saveFormId: string;
  readonly deleteFormId?: string;
  readonly code?: PartnerReferralCode;
  readonly mode: "create" | "update";
  readonly isSaving: boolean;
  readonly isDeleting?: boolean;
};

function ReferralCodeEditorRow({
  saveFormId,
  deleteFormId,
  code,
  mode,
  isSaving,
  isDeleting,
}: ReferralRowProps) {
  return (
    <TableRow className={mode === "create" ? "bg-slate-50/70" : undefined}>
      <TableCell>
        <div className="font-semibold text-slate-950 tracking-tight">
          {code?.code ?? "Auto-generate"}
        </div>
        <div className="text-slate-400 text-xs">
          {code ? new Date(code.createdAt).toLocaleDateString("id-ID") : "Kode baru akan dibuat sistem"}
        </div>
      </TableCell>
      <TableCell>
        <select
          form={saveFormId}
          name="discountType"
          defaultValue={code?.discountType ?? "percentage"}
          className={referralSelectClassName}
        >
          <option value="percentage">Diskon %</option>
          <option value="fixed">Diskon nominal</option>
        </select>
      </TableCell>
      <TableCell>
        <Input
          form={saveFormId}
          name="discountValue"
          type="number"
          min={1}
          defaultValue={code?.discountValue ?? 10}
          required
        />
      </TableCell>
      <TableCell>
        <select
          form={saveFormId}
          name="commissionType"
          defaultValue={code?.commissionType ?? "percentage"}
          className={referralSelectClassName}
        >
          <option value="percentage">Komisi %</option>
          <option value="fixed">Komisi nominal</option>
        </select>
      </TableCell>
      <TableCell>
        <Input
          form={saveFormId}
          name="commissionValue"
          type="number"
          min={1}
          defaultValue={code?.commissionValue ?? 10}
          required
        />
      </TableCell>
      <TableCell>
        {mode === "create" ? (
          <StatusBadge tone="info">Siap dibuat</StatusBadge>
        ) : (
          <label className="flex items-center gap-2 text-sm">
            <input form={saveFormId} name="isActive" type="checkbox" defaultChecked={code?.isActive ?? true} />
            <StatusBadge tone={code?.isActive ? "success" : "neutral"}>
              {code?.isActive ? "Aktif" : "Nonaktif"}
            </StatusBadge>
          </label>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            form={saveFormId}
            type="submit"
            size="sm"
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            disabled={isSaving}
          >
            {isSaving ? "Menyimpan..." : mode === "create" ? "Generate" : "Update"}
          </Button>
          {code && deleteFormId ? (
            <Button
              form={deleteFormId}
              type="submit"
              size="sm"
              variant="outline"
              className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              disabled={isDeleting}
            >
              <Trash2 className="size-4" />
              {isDeleting ? "Menghapus..." : "Hapus"}
            </Button>
          ) : null}
        </div>
      </TableCell>
    </TableRow>
  );
}

function ReferralCreateForms({
  partnerProfileId,
}: {
  readonly partnerProfileId: string;
}) {
  const [saveState, saveAction] = useActionState(saveReferralCodeAction, initialAdminActionState);
  useActionToast(saveState);

  const saveFormId = `partner-referral-create-${partnerProfileId}`;

  return (
    <>
      <form id={saveFormId} action={saveAction} className="hidden">
        <input type="hidden" name="partnerProfileId" value={partnerProfileId} />
        <input type="hidden" name="isActive" value="true" />
      </form>
    </>
  );
}

function ReferralUpdateForms({
  partnerProfileId,
  code,
}: {
  readonly partnerProfileId: string;
  readonly code: PartnerReferralCode;
}) {
  const [saveState, saveAction] = useActionState(saveReferralCodeAction, initialAdminActionState);
  const [deleteState, deleteAction] = useActionState(deleteReferralCodeAction, initialAdminActionState);
  useActionToast(saveState);
  useActionToast(deleteState);

  const saveFormId = `partner-referral-save-${code.id}`;
  const deleteFormId = `partner-referral-delete-${code.id}`;

  return (
    <>
      <form id={saveFormId} action={saveAction} className="hidden">
        <input type="hidden" name="partnerProfileId" value={partnerProfileId} />
        <input type="hidden" name="referralCodeId" value={code.id} />
      </form>
      <form id={deleteFormId} action={deleteAction} className="hidden">
        <input type="hidden" name="partnerProfileId" value={partnerProfileId} />
        <input type="hidden" name="referralCodeId" value={code.id} />
      </form>
    </>
  );
}

export function ReferralCodesTable({
  partnerProfileId,
  referralCodes,
}: {
  readonly partnerProfileId: string;
  readonly referralCodes: PartnerReferralCode[];
}) {
  return (
    <div className="space-y-3">
      <div className="hidden">
        <ReferralCreateForms partnerProfileId={partnerProfileId} />
        {referralCodes.map((code) => (
          <ReferralUpdateForms key={code.id} partnerProfileId={partnerProfileId} code={code} />
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Tipe Diskon</TableHead>
            <TableHead>Nilai Diskon</TableHead>
            <TableHead>Tipe Komisi</TableHead>
            <TableHead>Nilai Komisi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ReferralCodeEditorRow
            saveFormId={`partner-referral-create-${partnerProfileId}`}
            mode="create"
            isSaving={false}
          />
          {referralCodes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-8 text-center text-slate-500">
                Belum ada kode referral. Gunakan baris di atas untuk generate kode pertama.
              </TableCell>
            </TableRow>
          ) : (
            referralCodes.map((code) => (
              <ReferralCodeEditorRow
                key={code.id}
                saveFormId={`partner-referral-save-${code.id}`}
                deleteFormId={`partner-referral-delete-${code.id}`}
                code={code}
                mode="update"
                isSaving={false}
                isDeleting={false}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function WithdrawalReviewActions({
  partnerProfileId,
  withdrawal,
}: {
  readonly partnerProfileId: string;
  readonly withdrawal: PartnerWithdrawalItem;
}) {
  const [approveState, approveAction, isApproving] = useActionState(approveWithdrawalAction, initialAdminActionState);
  const [rejectState, rejectAction, isRejecting] = useActionState(rejectWithdrawalAction, initialAdminActionState);
  useActionToast(approveState);
  useActionToast(rejectState);

  if (withdrawal.status !== "pending") {
    return null;
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <form action={approveAction} className="grid gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
        <input type="hidden" name="partnerProfileId" value={partnerProfileId} />
        <input type="hidden" name="withdrawalRequestId" value={withdrawal.id} />
        <Input name="reviewNote" placeholder="Catatan approve" />
        <Input name="file" type="file" accept="image/*,application/pdf" required />
        <Button type="submit" size="sm" disabled={isApproving} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
          {isApproving ? "Approve..." : "Approve"}
        </Button>
      </form>
      <form action={rejectAction} className="grid gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3">
        <input type="hidden" name="partnerProfileId" value={partnerProfileId} />
        <input type="hidden" name="withdrawalRequestId" value={withdrawal.id} />
        <Input name="reviewNote" placeholder="Alasan reject" required />
        <Button type="submit" size="sm" variant="outline" disabled={isRejecting} className="rounded-xl border-rose-200">
          {isRejecting ? "Reject..." : "Reject"}
        </Button>
      </form>
    </div>
  );
}
