"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { performLogout } from "@/lib/auth/logout";

type SignOutButtonProps = {
  readonly label?: string;
  readonly variant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link";
  readonly size?: "default" | "sm" | "lg" | "icon";
  readonly className?: string;
};

export function SignOutButton({ label = "Keluar", variant = "outline", size = "lg", className }: SignOutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      void (async () => {
        const result = await performLogout();

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Anda berhasil keluar.");
        router.replace("/auth/login");
        router.refresh();
      })();
    });
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      disabled={isPending}
      onClick={handleSignOut}
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      {isPending ? "Keluar..." : label}
    </Button>
  );
}
