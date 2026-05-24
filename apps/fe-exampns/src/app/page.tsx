import Link from "next/link";
import { redirect } from "next/navigation";

import { getPostAuthRedirectPath } from "@/lib/auth/post-auth-redirect";
import { getServerAuthSession } from "@/lib/auth/server-auth";
import { APP_CONFIG } from "@/config/app-config";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (session?.user) {
    const adminPath = getPostAuthRedirectPath(session.user.role);
    if (adminPath === "/dashboard") {
      redirect("/dashboard");
    }
  }

  const isLoggedInUser = session?.user?.role === "USER";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-linear-to-b from-slate-50 to-white px-6">
      <div className="max-w-lg space-y-3 text-center">
        <h1 className="font-semibold text-3xl tracking-tight">{APP_CONFIG.name}</h1>
        <p className="text-muted-foreground text-sm">
          {isLoggedInUser
            ? `Halo, ${session.user.name}. Area tryout peserta sedang disiapkan.`
            : "Platform tryout CPNS berbayar dengan scoring otomatis dan rekomendasi AI setelah ujian."}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isLoggedInUser ? (
          <SignOutButton label="Keluar / ganti akun" variant="outline" size="lg" />
        ) : (
          <>
            <Button asChild size="lg">
              <Link href="/auth/register">Daftar</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/auth/login">Masuk</Link>
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
