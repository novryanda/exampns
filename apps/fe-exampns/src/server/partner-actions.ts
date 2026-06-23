"use server";

import "server-only";

import { revalidatePath } from "next/cache";

import type { AdminActionState, ResourceActionState } from "@/server/admin-action-state";
import { serverApiFetch, serverApiUpload } from "@/server/api-client";

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function parseNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function createPartnerAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const phone = String(formData.get("phone") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    const response = await serverApiFetch<{
      success: true;
      message?: string;
      data: { id: string; referralCode: string };
    }>("/api/v1/super-admin/partners", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName: String(formData.get("fullName") ?? "").trim(),
        displayName: String(formData.get("displayName") ?? "").trim() || undefined,
        email: String(formData.get("email") ?? "").trim().toLowerCase(),
        discountType: String(formData.get("discountType") ?? "percentage"),
        discountValue: parseNumber(formData.get("discountValue"), 0),
        commissionType: String(formData.get("commissionType") ?? "percentage"),
        commissionValue: parseNumber(formData.get("commissionValue"), 0),
        ...(phone ? { phone } : {}),
        ...(notes ? { notes } : {}),
      }),
    });

    revalidatePath("/super-admin/partners");
    revalidatePath(`/super-admin/partners/${response.data.id}`);
    revalidatePath("/super-admin/partners/create");
    return {
      status: "success",
      message: `Mitra berhasil dibuat. Kode referral ${response.data.referralCode} digenerate otomatis.`,
      resourceId: response.data.id,
    };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal membuat mitra." };
  }
}

export async function updatePartnerAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const partnerProfileId = String(formData.get("partnerProfileId") ?? "").trim();
  try {
    const phone = String(formData.get("phone") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();
    await serverApiFetch<{ success: true; message?: string }>(`/api/v1/super-admin/partners/${partnerProfileId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        displayName: String(formData.get("displayName") ?? "").trim(),
        phone: phone || null,
        status: String(formData.get("status") ?? "active"),
        notes: notes || null,
      }),
    });

    revalidatePath("/super-admin/partners");
    revalidatePath(`/super-admin/partners/${partnerProfileId}`);
    return { status: "success", message: "Mitra berhasil diperbarui." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal memperbarui mitra." };
  }
}

export async function saveReferralCodeAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const partnerProfileId = String(formData.get("partnerProfileId") ?? "").trim();
  const referralCodeId = String(formData.get("referralCodeId") ?? "").trim();
  try {
    await serverApiFetch<{ success: true; message?: string }>(
      referralCodeId
        ? `/api/v1/super-admin/partners/referral-codes/${referralCodeId}`
        : `/api/v1/super-admin/partners/${partnerProfileId}/referral-codes`,
      {
        method: referralCodeId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          isActive: parseBoolean(formData.get("isActive")),
          discountType: String(formData.get("discountType") ?? "percentage"),
          discountValue: parseNumber(formData.get("discountValue"), 0),
          commissionType: String(formData.get("commissionType") ?? "percentage"),
          commissionValue: parseNumber(formData.get("commissionValue"), 0),
        }),
      },
    );

    revalidatePath("/super-admin/partners");
    revalidatePath(`/super-admin/partners/${partnerProfileId}`);
    return {
      status: "success",
      message: referralCodeId ? "Kode referral diperbarui." : "Kode referral berhasil digenerate.",
    };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal menyimpan kode referral." };
  }
}

export async function deleteReferralCodeAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const partnerProfileId = String(formData.get("partnerProfileId") ?? "").trim();
  const referralCodeId = String(formData.get("referralCodeId") ?? "").trim();

  try {
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/super-admin/partners/referral-codes/${referralCodeId}`,
      {
        method: "DELETE",
      },
    );

    revalidatePath("/super-admin/partners");
    revalidatePath(`/super-admin/partners/${partnerProfileId}`);
    return { status: "success", message: "Kode referral berhasil dihapus." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal menghapus kode referral." };
  }
}

export async function updatePartnerBankAccountAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await serverApiFetch<{ success: true; message?: string }>("/api/v1/partner/bank-account", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        bankName: String(formData.get("bankName") ?? "").trim(),
        accountNumber: String(formData.get("accountNumber") ?? "").trim(),
        accountHolderName: String(formData.get("accountHolderName") ?? "").trim(),
      }),
    });

    revalidatePath("/mitra/pencairan");
    return { status: "success", message: "Rekening berhasil diperbarui." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal memperbarui rekening." };
  }
}

export async function createWithdrawalAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    const requestedNote = String(formData.get("requestedNote") ?? "").trim();
    await serverApiFetch<{ success: true; message?: string }>("/api/v1/partner/withdrawals", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amount: parseNumber(formData.get("amount"), 0),
        ...(requestedNote ? { requestedNote } : {}),
      }),
    });

    revalidatePath("/mitra/dashboard");
    revalidatePath("/mitra/pencairan");
    return { status: "success", message: "Pengajuan pencairan berhasil dibuat." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal membuat pengajuan." };
  }
}

export async function approveWithdrawalAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const withdrawalRequestId = String(formData.get("withdrawalRequestId") ?? "").trim();
  const partnerProfileId = String(formData.get("partnerProfileId") ?? "").trim();
  try {
    await serverApiUpload<{ success: true; message?: string }>(
      `/api/v1/super-admin/partners/withdrawals/${withdrawalRequestId}/approve`,
      formData,
    );

    revalidatePath("/super-admin/partners");
    revalidatePath("/super-admin/withdrawals");
    revalidatePath(`/super-admin/partners/${partnerProfileId}`);
    return { status: "success", message: "Pencairan berhasil disetujui." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal menyetujui pencairan." };
  }
}

export async function rejectWithdrawalAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const withdrawalRequestId = String(formData.get("withdrawalRequestId") ?? "").trim();
  const partnerProfileId = String(formData.get("partnerProfileId") ?? "").trim();
  try {
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/super-admin/partners/withdrawals/${withdrawalRequestId}/reject`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reviewNote: String(formData.get("reviewNote") ?? "").trim(),
        }),
      },
    );

    revalidatePath("/super-admin/partners");
    revalidatePath("/super-admin/withdrawals");
    revalidatePath(`/super-admin/partners/${partnerProfileId}`);
    return { status: "success", message: "Pencairan berhasil ditolak." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Gagal menolak pencairan." };
  }
}
