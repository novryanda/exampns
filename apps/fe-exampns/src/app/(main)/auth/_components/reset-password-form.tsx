"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { resetPassword } from "@/lib/auth/auth-client";
import { passwordPolicySchema } from "@/lib/auth/password-policy";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    password: passwordPolicySchema,
    confirmPassword: z.string().min(8, { message: "Konfirmasi password minimal 8 karakter." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama.",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({ token }: { readonly token: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      void (async () => {
        const { error } = await resetPassword({
          newPassword: values.password,
          token,
        });

        if (error) {
          const message = error.message ?? "Gagal mengatur password. Coba minta link baru.";
          toast.error(message);
          return;
        }

        toast.success("Password berhasil diatur. Silakan masuk.");
        router.replace("/auth/login");
        router.refresh();
      })();
    });
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-password">Password baru</FieldLabel>
              <Input
                {...field}
                id="reset-password"
                type="password"
                placeholder="Minimal 8 karakter"
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
              <FieldLabel htmlFor="reset-confirm-password">Konfirmasi password</FieldLabel>
              <Input
                {...field}
                id="reset-confirm-password"
                type="password"
                placeholder="Ulangi password baru"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isPending ? "Menyimpan..." : "Simpan password"}
      </Button>
    </form>
  );
}
