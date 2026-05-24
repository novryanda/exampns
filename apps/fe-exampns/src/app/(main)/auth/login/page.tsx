import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";
import { getServerAuthSession } from "@/lib/auth/server-auth";

import { LoginForm } from "../_components/login-form";

export default async function LoginV2() {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">Masuk ke dashboard</h1>
          <p className="text-muted-foreground text-sm">Gunakan akun admin atau super admin ExamCPNS Anda.</p>
        </div>
        <div className="space-y-4">
          <LoginForm />
        </div>
      </div>

      <div className="absolute top-5 flex w-full justify-end px-10">
        <div className="text-muted-foreground text-sm">
          Belum punya akun?{" "}
          <Link prefetch={false} className="text-foreground" href="/auth/register">
            Daftar
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="text-muted-foreground text-xs">Auth dikelola oleh Better Auth via NestJS API.</div>
      </div>
    </>
  );
}
