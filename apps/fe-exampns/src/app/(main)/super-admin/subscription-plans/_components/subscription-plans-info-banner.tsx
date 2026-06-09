import { BookOpen, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SubscriptionPlansInfoBanner() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 to-sky-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 ring-1 ring-blue-200">
          <Sparkles className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-slate-950">Kelola tier akses dengan konsisten</p>
          <p className="max-w-2xl text-slate-600 text-sm">
            Trial, standard, dan premium menentukan batas tryout, durasi akses, dan fitur yang tersedia bagi
            pengguna platform.
          </p>
        </div>
      </div>
      <Button variant="outline" className="shrink-0 rounded-xl border-blue-200 bg-white text-blue-700 hover:bg-blue-50">
        <BookOpen className="size-4" />
        Pelajari Lebih Lanjut
      </Button>
    </div>
  );
}
