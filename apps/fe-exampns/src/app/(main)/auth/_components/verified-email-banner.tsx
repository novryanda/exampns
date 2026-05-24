"use client";

import { useEffect } from "react";

import { toast } from "sonner";

export function VerifiedEmailBanner({ show }: { readonly show: boolean }) {
  useEffect(() => {
    if (show) {
      toast.success("Email berhasil diverifikasi. Silakan login.");
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900 text-sm">
      Email Anda sudah diverifikasi. Masuk dengan email dan password yang didaftarkan.
    </div>
  );
}
