---
inclusion: fileMatch
fileMatchPattern: "**/auth*,**/login*,**/signup*,**/session*,**/better-auth*,**/*auth-client*"
---

# Better Auth Skill

Framework-agnostic TypeScript authentication library implementation guide.

## Installation
```bash
npm install better-auth
```

## Environment Variables
```env
BETTER_AUTH_SECRET=<min 32 chars, high entropy>
BETTER_AUTH_URL=http://localhost:3000
```

## Server Instance — `lib/auth.ts`
```ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    revokeSessionsOnPasswordReset: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,  // 7 days
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  rateLimit: { enabled: true, window: 10, max: 100 },
  trustedOrigins: ["https://yourdomain.com"],
  advanced: { useSecureCookies: true },
});
```

## Mount Handler

**Next.js App Router:**
```ts
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
export const { POST, GET } = toNextJsHandler(auth);
```

**Express:**
```ts
import { toNodeHandler } from "better-auth/node";
app.all("/api/auth/*", toNodeHandler(auth));
```

## Client Setup
```ts
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
export const { signIn, signUp, signOut, useSession } = authClient;
```

## Security Checklist
- ✅ Strong secret (≥32 chars)
- ✅ Set base URL explicitly
- ✅ Require email verification
- ✅ Revoke sessions on password reset
- ✅ Use HTTPS cookies
- ✅ Set trusted origins
- ✅ Rate limit in production
- ✅ Never disable CSRF/origin check

## Key Pitfalls
- Never call client methods from server — use `auth.api.*`
- Mount express.json() AFTER Better Auth handler
- CommonJS (CJS) not supported — ESM only
- Rate limit storage: switch to DB/Redis in production

## Database Setup
```bash
npx @better-auth/cli generate  # Generate schema
npx @better-auth/cli migrate   # Apply migration
```

#[[file:skill/better-auth/references/adapters.md]]
#[[file:skill/better-auth/references/plugins.md]]
#[[file:skill/better-auth/references/security.md]]
