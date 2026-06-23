"use client";

import { toast } from "sonner";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import type { PartnerReferralCode } from "@/server/partner-data";

export function PartnerReferralCodeCards({
  codes,
}: {
  readonly codes: PartnerReferralCode[];
}) {
  if (codes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-6 text-slate-500 text-sm">
        Belum ada kode referral yang aktif untuk akun ini.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {codes.map((code) => (
        <div key={code.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-[0.24em]">Kode Referral</p>
              <button
                type="button"
                className="mt-2 text-left font-semibold text-slate-950 text-2xl tracking-tight transition-colors hover:text-blue-600"
                onClick={async () => {
                  await navigator.clipboard.writeText(code.code);
                  toast.success(`Kode ${code.code} berhasil disalin.`);
                }}
              >
                {code.code}
              </button>
            </div>
            <StatusBadge tone={code.isActive ? "success" : "neutral"}>
              {code.isActive ? "Aktif" : "Nonaktif"}
            </StatusBadge>
          </div>
        </div>
      ))}
    </div>
  );
}
