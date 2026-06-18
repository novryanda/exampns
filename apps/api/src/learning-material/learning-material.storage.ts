import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';

import { BadRequestException } from '@nestjs/common';
import { getApiPublicBase } from '../me/me-avatar.storage.js';

export const MATERIAL_FILE_MAX_BYTES = 50 * 1024 * 1024; // 50MB
export const MATERIAL_FILE_ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
]);

const MATERIAL_FILE_DIR = join(process.cwd(), 'uploads', 'materials');

const mimeToExtension: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
};

export type UploadedMaterialFile = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

export function buildMaterialFilePublicUrl(filename: string) {
  return `${getApiPublicBase()}/api/v1/uploads/materials/${filename}`;
}

export function validateMaterialFile(file: UploadedMaterialFile | undefined) {
  if (!file?.buffer?.length) {
    throw new BadRequestException('File dokumen wajib diunggah');
  }

  if (file.size > MATERIAL_FILE_MAX_BYTES) {
    throw new BadRequestException('Ukuran file maksimal 50 MB');
  }

  if (!MATERIAL_FILE_ALLOWED_MIME.has(file.mimetype)) {
    throw new BadRequestException('Format file harus PDF, DOC, atau DOCX');
  }

  const extension = mimeToExtension[file.mimetype];
  if (!extension) {
    throw new BadRequestException('Format file tidak didukung');
  }

  return extension;
}

export async function saveMaterialFile(file: UploadedMaterialFile) {
  const extension = validateMaterialFile(file);
  await mkdir(MATERIAL_FILE_DIR, { recursive: true });

  const filename = `${randomBytes(16).toString('hex')}${extension}`;
  await writeFile(join(MATERIAL_FILE_DIR, filename), file.buffer);

  return {
    filename,
    publicUrl: buildMaterialFilePublicUrl(filename),
  };
}
