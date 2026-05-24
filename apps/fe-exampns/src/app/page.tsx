import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/lib/auth/server-auth";
import { APP_CONFIG } from "@/config/app-config";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-linear-to-b from-slate-50 to-white px-6">
      <div className="max-w-lg space-y-3 text-center">
        <h1 className="font-semibold text-3xl tracking-tight">{APP_CONFIG.name}</h1>
        <p className="text-muted-foreground text-sm">
          Platform tryout CPNS berbayar dengan scoring otomatis dan rekomendasi AI setelah ujian.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/auth/register">Daftar</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/auth/login">Masuk</Link>
        </Button>
      </div>
    </main>
  );
}
