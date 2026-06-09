import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";
import { getPostAuthRedirectPath } from "@/lib/auth/post-auth-redirect";
import { getServerAuthSession } from "@/lib/auth/server-auth";

import { ForgotPasswordForm } from "../_components/forgot-password-form";

export default async function ForgotPasswordPage() {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect(getPostAuthRedirectPath(session.user.role));
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">Lupa password</h1>
          <p className="text-muted-foreground text-sm">
            Masukkan email akun Anda. Kami akan mengirim link reset password ke inbox.
          </p>
        </div>
        <div className="space-y-6">
          <ForgotPasswordForm />
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="text-muted-foreground text-sm">
          Ingat password?{" "}
          <Link prefetch={false} className="text-foreground" href="/auth/login">
            Masuk
          </Link>
        </div>
      </div>
    </>
  );
}
