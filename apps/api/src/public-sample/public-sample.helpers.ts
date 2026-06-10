import { createHmac, timingSafeEqual } from 'node:crypto';

const TOKEN_TTL_MS = 30 * 60 * 1000;

interface SampleSessionPayload {
  questionIds: string[];
  exp: number;
}

const getSecret = () => process.env.BETTER_AUTH_SECRET?.trim() || 'dev-sample-questions-secret';

export const signSampleSessionToken = (questionIds: string[]) => {
  const payload: SampleSessionPayload = {
    questionIds,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', getSecret()).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
};

export const verifySampleSessionToken = (token: string) => {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) {
    return null;
  }

  const expectedSignature = createHmac('sha256', getSecret()).update(encoded).digest('base64url');
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SampleSessionPayload;
  if (!Array.isArray(payload.questionIds) || payload.questionIds.length === 0 || payload.exp < Date.now()) {
    return null;
  }

  return payload.questionIds;
};
