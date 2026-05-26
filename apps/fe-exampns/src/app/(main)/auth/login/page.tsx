import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";
import { getPostAuthRedirectPath } from "@/lib/auth/post-auth-redirect";
import { getServerAuthSession } from "@/lib/auth/server-auth";

import { LoginForm } from "../_components/login-form";
import { PendingVerificationBanner } from "../_components/pending-verification-banner";
import { VerifiedEmailBanner } from "../_components/verified-email-banner";

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
    redirect(getPostAuthRedirectPath(session.user.role));
  }

  const params = await searchParams;
  const defaultEmail = readParam(params.email);
  const emailVerified = readParam(params.verified) === "1";
  const pendingVerification = readParam(params.pending) === "1";

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
          <PendingVerificationBanner show={pendingVerification} />
          <VerifiedEmailBanner show={emailVerified} />
          <LoginForm defaultEmail={defaultEmail} />
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="text-muted-foreground text-sm">
          Belum punya akun?{" "}
          <Link prefetch={false} className="text-foreground" href="/auth/register">
            Daftar
          </Link>
        </div>
      </div>
    </>
  );
}
