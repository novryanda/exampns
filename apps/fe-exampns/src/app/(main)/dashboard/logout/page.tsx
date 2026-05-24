"use client";

import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { performLogout } from "@/lib/auth/logout";

export default function DashboardLogoutPage() {
  const router = useRouter();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    void (async () => {
      const result = await performLogout();

      if (!result.success) {
        toast.error(result.message);
        router.replace("/dashboard");
        return;
      }

      toast.success("Anda berhasil keluar.");
      router.replace("/auth/login");
      router.refresh();
    })();
  }, [router]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="size-8 animate-spin" />
      <p className="text-sm">Sedang keluar...</p>
    </div>
  );
}
