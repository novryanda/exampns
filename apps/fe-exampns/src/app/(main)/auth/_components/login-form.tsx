"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/lib/auth/auth-client";
import { getPostAuthRedirectPath } from "@/lib/auth/post-auth-redirect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Masukkan alamat email yang valid." }),
  password: z.string().min(8, { message: "Password minimal 8 karakter." }),
  remember: z.boolean().optional(),
});

interface CurrentUserProfileResponse {
  success: true;
  data: {
    role: "SUPER_ADMIN" | "ADMIN" | "USER";
  };
}

async function getCurrentUserRole() {
  const response = await fetch("/api/me", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as CurrentUserProfileResponse;
  return payload.data.role;
}

export function LoginForm({ defaultEmail = "" }: { readonly defaultEmail?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail,
      password: "",
      remember: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      void (async () => {
        const { data, error } = await signIn.email({
          email: values.email.trim().toLowerCase(),
          password: values.password,
          rememberMe: values.remember ?? true,
        });

        if (error) {
          const message = error.message ?? "Login gagal. Periksa kembali email dan password Anda.";
          const normalized = message.toLowerCase();

          if (normalized.includes("verify") || normalized.includes("verif")) {
            toast.error("Email belum diverifikasi. Cek inbox atau kirim ulang link verifikasi.");
          } else {
            toast.error(message);
          }

          return;
        }

        const role = await getCurrentUserRole();
        const redirectPath = getPostAuthRedirectPath(role);
        toast.success(
          redirectPath === "/admin/dashboard" || redirectPath === "/super-admin/dashboard"
            ? "Login berhasil. Mengarahkan ke dashboard..."
            : "Login berhasil. Selamat datang di ExamCPNS.",
        );
        router.replace(redirectPath);
        router.refresh();
      })();
    });
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="admin@examcpns.id"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="Masukkan password Anda"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="remember"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="login-remember"
                name={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              <FieldContent>
                <FieldLabel htmlFor="login-remember" className="font-normal">
                  Tetap masuk di browser ini
                </FieldLabel>
                {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isPending ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
