---
inclusion: fileMatch
fileMatchPattern: "**/app/**/page.tsx,**/app/**/layout.tsx,**/app/**/route.ts,**/app/**/loading.tsx,**/app/**/error.tsx,**/*.tsx,**/next.config.*,**/middleware.ts"
---

# Next.js Developer Skill

Senior Next.js Developer dengan expertise di Next.js 15/16, React 19, TypeScript, dan App Router.

## Step 0 - Understand Request
1. Project type: scaffold, component, feature, config fix?
2. Scope: UI, route/page, API/route handler, middleware, config?
3. Constraints: auth, database, styling, state management?

## Step 1 - App Router (Default)
- App Router (`src/app/`) untuk semua project baru
- Server Components by default, nested layouts, streaming, Server Actions
- Pages Router hanya untuk legacy migration

## Step 2 - Project Structure
```
src/
├── app/                   # App Router routes
│   ├── layout.tsx         # Root layout (required)
│   ├── page.tsx           # Homepage
│   ├── (auth)/            # Route group
│   ├── (main)/            # Route group
│   └── api/               # Route Handlers
├── components/
│   ├── ui/                # Reusable primitives
│   └── features/          # Feature-specific
├── hooks/                 # Custom hooks
├── lib/                   # Shared logic, utils, validations
├── stores/                # State management
├── types/                 # TypeScript types
├── providers/             # Context providers
└── middleware.ts          # Auth guards, redirects
```

## Step 3 - Server vs Client Components
**Default: Server Component.** Tambah `'use client'` hanya ketika butuh:
- useState, useEffect, hooks
- Browser APIs (window, localStorage)
- Event listeners (onClick, onChange)
- Third-party libraries yang butuh browser

**Pattern: Push `'use client'` ke leaf nodes.**

## Step 4 - Data Fetching (Next.js 15+)
- `fetch` TIDAK di-cache by default (breaking change dari v14)
- Tambah `{ cache: 'force-cache' }` atau `{ next: { revalidate: N } }` secara eksplisit
- Server Actions untuk mutations

```tsx
// Server Component fetch
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  }).then(r => r.json())
  return <div>{data.title}</div>
}

// Server Action
'use server'
export async function createPost(formData: FormData) {
  await db.post.create({ data: { title: formData.get('title') as string } })
  revalidatePath('/blog')
}
```

## Step 5 - Route Handlers (API)
```ts
// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
  return NextResponse.json(await db.post.findMany())
}
export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json(await db.post.create({ data: body }), { status: 201 })
}
```

## Step 6 - Middleware
```ts
// src/middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}
export const config = { matcher: ['/dashboard/:path*'] }
```

## Output Checklist
- [ ] Import paths benar (gunakan `@/` alias)
- [ ] Server/Client boundary jelas
- [ ] async/await di Server Components, bukan useEffect
- [ ] Cache behavior eksplisit
- [ ] Types eksplisit (no implicit any)
- [ ] Accessible HTML
- [ ] Error dan loading states handled
