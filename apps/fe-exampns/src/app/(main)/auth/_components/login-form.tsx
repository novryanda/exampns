"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/lib/auth/auth-client";
import { useAsyncFormSubmit } from "@/hooks/use-async-form-submit";
import { getPostAuthRedirectPath, readAuthUserRole } from "@/lib/auth/post-auth-redirect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Masukkan alamat email yang valid." }),
  password: z.string().min(8, { message: "Password minimal 8 karakter." }),
  remember: z.boolean().optional(),
});

export function LoginForm({ defaultEmail = "" }: { readonly defaultEmail?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const { isSubmitting, run } = useAsyncFormSubmit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail,
      password: "",
      remember: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    void run(async () => {
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

      const redirectPath = getPostAuthRedirectPath(readAuthUserRole(data?.user));
      toast.success(
        redirectPath === "/admin/dashboard" ||
          redirectPath === "/super-admin/dashboard" ||
          redirectPath === "/mitra/dashboard"
          ? "Login berhasil. Mengarahkan ke dashboard..."
          : "Login berhasil. Selamat datang di ExamCPNS.",
      );
      window.location.assign(redirectPath);
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
                disabled={isSubmitting}
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
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <Link
                  prefetch={false}
                  href="/auth/forgot-password"
                  className="text-muted-foreground text-xs underline-offset-4 hover:text-foreground hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  {...field}
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password Anda"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-slate-500"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
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
                disabled={isSubmitting}
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
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {isSubmitting ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
