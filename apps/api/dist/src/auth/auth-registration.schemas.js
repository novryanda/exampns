import { z } from 'zod';
const phoneRegex = /^(?:\+62|62|0)8\d{8,11}$/;
const passwordSchema = z
    .string()
    .min(8, 'Password minimal 8 karakter.')
    .max(128, 'Password maksimal 128 karakter.')
    .regex(/[a-z]/, 'Password harus mengandung huruf kecil.')
    .regex(/[A-Z]/, 'Password harus mengandung huruf besar.')
    .regex(/[0-9]/, 'Password harus mengandung angka.');
export const registerUserSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, 'Nama lengkap minimal 2 karakter.')
        .max(150, 'Nama lengkap maksimal 150 karakter.'),
    email: z.string().trim().email('Format email tidak valid.'),
    phone: z
        .string()
        .trim()
        .regex(phoneRegex, 'Nomor telepon tidak valid. Gunakan format Indonesia (contoh: 081234567890).'),
    password: passwordSchema,
});
export const resendVerificationSchema = z.object({
    email: z.string().trim().email('Format email tidak valid.'),
});
//# sourceMappingURL=auth-registration.schemas.js.map