---
inclusion: fileMatch
fileMatchPattern: "**/package.json,**/server.*,**/app.*,**/index.ts,**/main.ts,**/*.service.ts"
---

# Node.js Best Practices

Principles dan decision-making untuk Node.js development.

## Framework Selection (2025)
```
Edge/Serverless → Hono (zero-dependency, ultra-fast)
High Performance API → Fastify (2-3x faster than Express)
Enterprise/Team → NestJS (structured, DI)
Legacy/Stable → Express (mature, most middleware)
Full-stack → Next.js API Routes atau tRPC
```

## Architecture — Layered Structure
```
Controller/Route Layer → HTTP specifics, input validation
Service Layer → Business logic, framework-agnostic
Repository Layer → Data access, database queries
```

## Error Handling
- Create custom error classes
- Throw from any layer, catch at top level (middleware)
- Client gets: status code, error code, user-friendly message, NO internal details
- Logs get: full stack trace, request context, timestamp

## Status Codes
| Situation | Status |
|-----------|--------|
| Bad input | 400 |
| No auth | 401 |
| No permission | 403 |
| Not found | 404 |
| Conflict | 409 |
| Validation fail | 422 |
| Server error | 500 |

## Async Patterns
| Pattern | Use When |
|---------|----------|
| async/await | Sequential operations |
| Promise.all | Parallel independent ops |
| Promise.allSettled | Parallel, some can fail |
| Promise.race | Timeout or first wins |

## Validation
- Validate at boundaries (API entry, before DB, external data)
- Zod (TypeScript first), Valibot (smaller bundle), ArkType (performance)
- Fail fast, be specific, don't trust any input

## Security Checklist
- [ ] All inputs validated
- [ ] Parameterized queries (no string concat for SQL)
- [ ] Password hashing (bcrypt/argon2)
- [ ] JWT verification (signature + expiry)
- [ ] Rate limiting
- [ ] Security headers (Helmet.js)
- [ ] HTTPS everywhere
- [ ] CORS properly configured
- [ ] Secrets in env vars only

## Anti-Patterns
- ❌ Use Express for new edge projects
- ❌ Sync methods in production
- ❌ Business logic in controllers
- ❌ Skip input validation
- ❌ Hardcode secrets
- ❌ Block event loop with CPU work
