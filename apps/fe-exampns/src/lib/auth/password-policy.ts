import { z } from "zod";

export const passwordPolicySchema = z
  .string()
  .min(8, { message: "Password minimal 8 karakter." })
  .max(128, { message: "Password maksimal 128 karakter." })
  .regex(/[a-z]/, { message: "Password harus mengandung huruf kecil." })
  .regex(/[A-Z]/, { message: "Password harus mengandung huruf besar." })
  .regex(/[0-9]/, { message: "Password harus mengandung angka." });

export const phonePolicySchema = z
  .string()
  .trim()
  .regex(/^(?:\+62|62|0)8\d{8,11}$/, {
    message: "Nomor telepon tidak valid. Contoh: 081234567890",
  });
