import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";
import { getPostAuthRedirectPath } from "@/lib/auth/post-auth-redirect";
import { getServerAuthSession } from "@/lib/auth/server-auth";

import { RegisterForm } from "../_components/register-form";

export default async function RegisterV2() {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect(getPostAuthRedirectPath(session.user.role));
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">Daftar akun ExamCPNS</h1>
          <p className="text-muted-foreground text-sm">
            Isi nama lengkap, email, nomor telepon, dan password. Setelah daftar, verifikasi email untuk mengaktifkan trial.
          </p>
        </div>
        <div className="space-y-4">
          <RegisterForm />
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="text-muted-foreground text-sm">
          Sudah punya akun?{" "}
          <Link prefetch={false} className="text-foreground" href="/auth/login">
            Masuk
          </Link>
        </div>
      </div>
    </>
  );
}
