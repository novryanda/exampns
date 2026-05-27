import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';

import { BadRequestException } from '@nestjs/common';

export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
export const AVATAR_ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

const AVATAR_DIR = join(process.cwd(), 'uploads', 'avatars');

const mimeToExtension: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

export type UploadedAvatarFile = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

export function getApiPublicBase() {
  const base = (process.env.PUBLIC_API_URL ?? process.env.BETTER_AUTH_URL ?? 'http://localhost:3001')
    .replace(/\/$/, '')
    .replace(/\/api\/auth$/, '');

  return base;
}

export function buildAvatarPublicUrl(filename: string) {
  return `${getApiPublicBase()}/api/v1/uploads/avatars/${filename}`;
}

export function isManagedAvatarUrl(url: string | null | undefined) {
  if (!url) {
    return false;
  }

  try {
    const pathname = new URL(url).pathname;
    return pathname.startsWith('/api/v1/uploads/avatars/');
  } catch {
    return url.includes('/api/v1/uploads/avatars/');
  }
}

export function validateAvatarFile(file: UploadedAvatarFile | undefined) {
  if (!file?.buffer?.length) {
    throw new BadRequestException('File foto wajib diunggah');
  }

  if (file.size > AVATAR_MAX_BYTES) {
    throw new BadRequestException('Ukuran foto maksimal 2 MB');
  }

  if (!AVATAR_ALLOWED_MIME.has(file.mimetype)) {
    throw new BadRequestException('Format foto harus JPEG, PNG, atau WebP');
  }

  const extension = mimeToExtension[file.mimetype];
  if (!extension) {
    throw new BadRequestException('Format foto tidak didukung');
  }

  return extension;
}

export async function saveAvatarFile(userId: string, file: UploadedAvatarFile) {
  const extension = validateAvatarFile(file);
  await mkdir(AVATAR_DIR, { recursive: true });

  const filename = `${userId}-${randomBytes(8).toString('hex')}${extension}`;
  await writeFile(join(AVATAR_DIR, filename), file.buffer);

  return {
    filename,
    publicUrl: buildAvatarPublicUrl(filename),
  };
}

export async function deleteAvatarFileByUrl(url: string | null | undefined) {
  if (!isManagedAvatarUrl(url)) {
    return;
  }

  let filename: string | undefined;

  try {
    const pathname = new URL(url!).pathname;
    filename = pathname.split('/avatars/')[1];
  } catch {
    filename = url!.split('/avatars/')[1];
  }

  if (!filename || filename.includes('..') || filename.includes('/')) {
    return;
  }

  try {
    await unlink(join(AVATAR_DIR, filename));
  } catch {
    // ignore missing files
  }
}
