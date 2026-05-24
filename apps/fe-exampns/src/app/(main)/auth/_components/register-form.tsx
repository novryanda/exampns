"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { passwordPolicySchema, phonePolicySchema } from "@/lib/auth/password-policy";
import { RegisterApiError, registerUser } from "@/lib/auth/register-api";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Nama lengkap minimal 2 karakter." }),
    email: z.string().email({ message: "Masukkan alamat email yang valid." }),
    phone: phonePolicySchema,
    password: passwordPolicySchema,
    confirmPassword: z.string().min(8, { message: "Konfirmasi password minimal 8 karakter." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama.",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      void (async () => {
        try {
          await registerUser({
            fullName: values.fullName,
            email: values.email.trim().toLowerCase(),
            phone: values.phone.trim(),
            password: values.password,
          });

          setRegisteredEmail(values.email.trim().toLowerCase());
          setIsRegistered(true);
          toast.success("Registrasi berhasil. Silakan cek email verifikasi Anda.");
        } catch (error) {
          if (error instanceof RegisterApiError) {
            if (error.code === "EMAIL_ALREADY_REGISTERED") {
              toast.error("Email sudah terdaftar. Silakan login atau gunakan email lain.");
              form.setError("email", { message: "Email sudah terdaftar." });
              return;
            }

            if (error.code === "WEAK_PASSWORD" || error.code === "VALIDATION_ERROR") {
              for (const detail of error.details ?? []) {
                const fieldName = detail.field as keyof z.infer<typeof formSchema>;
                if (fieldName in form.getValues()) {
                  form.setError(fieldName, { message: detail.message });
                }
              }
              toast.error(error.message);
              return;
            }

            toast.error(error.message);
            return;
          }

          toast.error("Pendaftaran gagal. Silakan coba lagi.");
        }
      })();
    });
  };

  if (isRegistered) {
    return (
      <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="font-medium">Cek email Anda</p>
        <p className="text-muted-foreground">
          Kami mengirim link verifikasi ke <span className="font-medium text-foreground">{registeredEmail}</span>.
          Setelah verifikasi, trial akan aktif dan Anda bisa login.
        </p>
        <Button
          type="button"
          className="w-full"
          variant="outline"
          onClick={() => router.push(`/auth/login?email=${encodeURIComponent(registeredEmail)}`)}
        >
          Ke halaman login
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-fullName">Nama lengkap</FieldLabel>
              <Input
                {...field}
                id="register-fullName"
                type="text"
                placeholder="Rina Pratiwi"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-email">Email</FieldLabel>
              <Input
                {...field}
                id="register-email"
                type="email"
                placeholder="rina@example.com"
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
          name="phone"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-phone">Nomor telepon</FieldLabel>
              <Input
                {...field}
                id="register-phone"
                type="tel"
                placeholder="081234567890"
                autoComplete="tel"
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
              <FieldLabel htmlFor="register-password">Password</FieldLabel>
              <Input
                {...field}
                id="register-password"
                type="password"
                placeholder="Password123!"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-confirm-password">Konfirmasi password</FieldLabel>
              <Input
                {...field}
                id="register-confirm-password"
                type="password"
                placeholder="Ulangi password"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
      </FieldGroup>
      <p className="text-muted-foreground text-xs">
        Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.
      </p>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isPending ? "Memproses..." : "Daftar"}
      </Button>
    </form>
  );
}
