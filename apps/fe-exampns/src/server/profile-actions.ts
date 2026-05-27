"use server";

import "server-only";

import { revalidatePath } from "next/cache";

import type { CurrentUserProfile } from "@/lib/auth/server-auth";
import { serverApiFetch, serverApiUpload, type ApiSuccessResponse } from "@/server/api-client";
import type { AdminActionState } from "@/server/admin-action-state";

const profileRevalidatePaths = ["/profil", "/admin", "/super-admin"];

function revalidateProfileSurfaces() {
  for (const path of profileRevalidatePaths) {
    revalidatePath(path, "layout");
  }
}

export async function updateProfileAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!name) {
      return { status: "error", message: "Nama lengkap wajib diisi." };
    }

    if (!phone) {
      return { status: "error", message: "Nomor telepon wajib diisi." };
    }

    await serverApiFetch<ApiSuccessResponse<CurrentUserProfile>>("/api/v1/me", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });

    revalidatePath("/profil");
    revalidateProfileSurfaces();

    return { status: "success", message: "Profil berhasil diperbarui." };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal memperbarui profil.",
    };
  }
}

export async function uploadProfileAvatarAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return { status: "error", message: "Pilih file foto terlebih dahulu." };
    }

    if (file.size > 2 * 1024 * 1024) {
      return { status: "error", message: "Ukuran foto maksimal 2 MB." };
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      return { status: "error", message: "Format foto harus JPEG, PNG, atau WebP." };
    }

    const body = new FormData();
    body.append("file", file);

    await serverApiUpload<ApiSuccessResponse<CurrentUserProfile>>("/api/v1/me/avatar", body);

    revalidatePath("/profil");
    revalidateProfileSurfaces();

    return { status: "success", message: "Foto profil berhasil diunggah." };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengunggah foto profil.",
    };
  }
}

export async function removeProfileAvatarAction(
  _previousState: AdminActionState,
): Promise<AdminActionState> {
  try {
    await serverApiFetch<ApiSuccessResponse<CurrentUserProfile>>("/api/v1/me/avatar", {
      method: "DELETE",
    });

    revalidatePath("/profil");
    revalidateProfileSurfaces();

    return { status: "success", message: "Foto profil dihapus." };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal menghapus foto profil.",
    };
  }
}

export async function changePasswordAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { status: "error", message: "Semua field password wajib diisi." };
    }

    if (newPassword.length < 8) {
      return { status: "error", message: "Password baru minimal 8 karakter." };
    }

    if (newPassword !== confirmPassword) {
      return { status: "error", message: "Konfirmasi password tidak cocok." };
    }

    if (currentPassword === newPassword) {
      return { status: "error", message: "Password baru harus berbeda dari password saat ini." };
    }

    await serverApiFetch<{ success: true; message?: string }>("/api/v1/me/password", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      }),
    });

    return { status: "success", message: "Password berhasil diperbarui." };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengubah password.",
    };
  }
}
