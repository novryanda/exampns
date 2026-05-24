"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { RegisterApiError, resendVerificationEmail } from "@/lib/auth/register-api";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Masukkan alamat email yang valid." }),
});

export function ResendVerificationForm({ defaultEmail = "" }: { readonly defaultEmail?: string }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      void (async () => {
        try {
          const message = await resendVerificationEmail(values.email.trim().toLowerCase());
          toast.success(message ?? "Jika email terdaftar, link verifikasi akan dikirim ulang.");
        } catch (error) {
          const message =
            error instanceof RegisterApiError
              ? error.message
              : "Gagal mengirim ulang email verifikasi.";
          toast.error(message);
        }
      })();
    });
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <FieldGroup className="gap-3">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="resend-email">Email</FieldLabel>
              <Input
                {...field}
                id="resend-email"
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
      </FieldGroup>
      <Button className="w-full" type="submit" variant="outline" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isPending ? "Mengirim..." : "Kirim ulang email verifikasi"}
      </Button>
    </form>
  );
}
