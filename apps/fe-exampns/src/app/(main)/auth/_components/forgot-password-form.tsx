"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { getSession, requestPasswordReset } from "@/lib/auth/auth-client";
import { useAsyncFormSubmit } from "@/hooks/use-async-form-submit";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Masukkan alamat email yang valid." }),
});

function resolveResetPasswordRedirectUrl() {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/reset-password`;
  }

  return "/auth/reset-password";
}

export function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const { isSubmitting, run } = useAsyncFormSubmit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    void getSession();
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    void run(async () => {
      const { error } = await requestPasswordReset({
        email: values.email.trim().toLowerCase(),
        redirectTo: resolveResetPasswordRedirectUrl(),
      });

      if (error) {
        toast.error(error.message ?? "Gagal mengirim email reset password. Coba lagi.");
        return;
      }

      setEmailSent(true);
      toast.success("Jika email terdaftar, link reset password telah dikirim.");
    });
  };

  if (emailSent) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950 text-sm">
        Jika email terdaftar di ExamCPNS, kami sudah mengirim link reset password. Cek inbox dan folder spam,
        lalu buka link tersebut untuk membuat password baru.
      </div>
    );
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="forgot-password-email">Email</FieldLabel>
              <Input
                {...field}
                id="forgot-password-email"
                type="email"
                placeholder="nama@email.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {isSubmitting ? "Mengirim..." : "Kirim link reset password"}
      </Button>
    </form>
  );
}
