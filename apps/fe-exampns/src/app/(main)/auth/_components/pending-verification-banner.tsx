"use client";

import { useEffect } from "react";

import { toast } from "sonner";

export function PendingVerificationBanner({ show }: { readonly show: boolean }) {
  useEffect(() => {
    if (show) {
      toast.info("Registrasi berhasil. Verifikasi email Anda terlebih dahulu sebelum login.");
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950 text-sm">
      Registrasi berhasil. Buka link verifikasi di email Anda (cek folder spam jika belum ada), lalu login di halaman ini.
    </div>
  );
}
