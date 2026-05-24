import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";
import { getServerAuthSession } from "@/lib/auth/server-auth";

type VerifyEmailPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const session = await getServerAuthSession();
  if (session?.user?.emailVerified) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = readParam(params.error);
  const verified = readParam(params.verified);

  const isSuccess = verified === "true" || (!error && session?.user?.emailVerified);
  const isError = Boolean(error);

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">
            {isSuccess ? "Email terverifikasi" : isError ? "Verifikasi gagal" : "Verifikasi email"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isSuccess
              ? "Akun Anda sudah aktif. Trial akan tersedia setelah login jika konfigurasi trial aktif di sistem."
              : isError
                ? "Link verifikasi tidak valid atau sudah kedaluwarsa. Kirim ulang email verifikasi dari halaman login."
                : "Buka link verifikasi dari email Anda. Jika belum menerima email, kirim ulang dari halaman login."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground text-sm font-medium"
          >
            Ke halaman login
          </Link>
          {!isSuccess ? (
            <Link
              href="/auth/login?resend=1"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium"
            >
              Kirim ulang verifikasi
            </Link>
          ) : null}
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="text-muted-foreground text-xs">UC-002 Verify Email — ExamCPNS</div>
      </div>
    </>
  );
}
