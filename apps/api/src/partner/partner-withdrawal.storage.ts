import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BadRequestException } from '@nestjs/common';
import { getApiPublicBase } from '../me/me-avatar.storage.js';

export const WITHDRAWAL_PROOF_MAX_BYTES = 4 * 1024 * 1024;
export const WITHDRAWAL_PROOF_ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

const PROOF_DIR = join(process.cwd(), 'uploads', 'partner-withdrawals');

const mimeToExtension: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
};

export type UploadedWithdrawalProofFile = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

export function buildWithdrawalProofPublicUrl(filename: string) {
  return `${getApiPublicBase()}/api/v1/uploads/partner-withdrawals/${filename}`;
}

export function validateWithdrawalProofFile(file: UploadedWithdrawalProofFile | undefined) {
  if (!file?.buffer?.length) {
    throw new BadRequestException('Bukti transfer wajib diunggah');
  }

  if (file.size > WITHDRAWAL_PROOF_MAX_BYTES) {
    throw new BadRequestException('Ukuran bukti transfer maksimal 4 MB');
  }

  if (!WITHDRAWAL_PROOF_ALLOWED_MIME.has(file.mimetype)) {
    throw new BadRequestException('Format bukti transfer harus JPEG, PNG, WebP, atau PDF');
  }

  const extension = mimeToExtension[file.mimetype];
  if (!extension) {
    throw new BadRequestException('Format bukti transfer tidak didukung');
  }

  return extension;
}

export async function saveWithdrawalProofFile(
  withdrawalRequestId: string,
  file: UploadedWithdrawalProofFile | undefined,
) {
  const extension = validateWithdrawalProofFile(file);
  const upload = file!;
  await mkdir(PROOF_DIR, { recursive: true });

  const filename = `${withdrawalRequestId}-${randomBytes(8).toString('hex')}${extension}`;
  await writeFile(join(PROOF_DIR, filename), upload.buffer);

  return {
    filename,
    publicUrl: buildWithdrawalProofPublicUrl(filename),
  };
}
