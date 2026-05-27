export const normalizeMetadataName = (value: string) =>
  value.trim().replace(/\s+/g, ' ');

export const toMetadataSlug = (value: string) =>
  normalizeMetadataName(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
