import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";
import { getServerAuthSession } from "@/lib/auth/server-auth";

import { LoginForm } from "../_components/login-form";
import { ResendVerificationForm } from "../_components/resend-verification-form";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function LoginV2({ searchParams }: LoginPageProps) {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const defaultEmail = readParam(params.email);
  const showResend = readParam(params.resend) === "1";

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">Masuk ke ExamCPNS</h1>
          <p className="text-muted-foreground text-sm">
            Gunakan email dan password yang sudah diverifikasi.
          </p>
        </div>
        <div className="space-y-6">
          <LoginForm defaultEmail={defaultEmail} />
          {showResend ? (
            <div className="space-y-3 rounded-lg border border-dashed p-4">
              <p className="font-medium text-sm">Belum verifikasi email?</p>
              <ResendVerificationForm defaultEmail={defaultEmail} />
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-xs">
              Belum verifikasi?{" "}
              <Link className="text-foreground underline-offset-4 hover:underline" href="/auth/login?resend=1">
                Kirim ulang email verifikasi
              </Link>
            </p>
          )}
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
        <div className="text-muted-foreground text-xs">FR-AUTH-004/005 — Login & verifikasi email.</div>
      </div>
    </>
  );
}
