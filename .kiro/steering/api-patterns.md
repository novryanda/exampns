---
inclusion: fileMatch
fileMatchPattern: "**/api/**,**/route.ts,**/routes/**,**/*.controller.ts,**/swagger*,**/openapi*"
---

# API Patterns Skill

API design principles dan decision-making.

## API Style Decision Tree

```
Pilih berdasarkan konteks:
├── Public API, banyak consumer → REST
├── Complex data graph, mobile → GraphQL
├── TypeScript monorepo, internal → tRPC
├── Real-time → WebSocket / SSE
└── Simple internal → REST atau tRPC
```

## REST Principles
- Resource naming: plural nouns (`/users`, `/posts`)
- HTTP methods sesuai semantik (GET=read, POST=create, PUT=replace, PATCH=update, DELETE=remove)
- Status codes yang tepat
- Jangan gunakan verbs di endpoint (`/getUsers` ❌ → `/users` ✅)

## Response Format (Envelope Pattern)
```json
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 100 },
  "error": null
}
```

## Error Format
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [...]
  }
}
```

## Pagination
- Offset: `?page=1&limit=20` — simple, untuk dataset kecil
- Cursor: `?cursor=abc123&limit=20` — efisien untuk dataset besar

## Versioning Strategy
- URI: `/api/v1/users` — paling umum, paling jelas
- Header: `Accept: application/vnd.api.v1+json` — cleaner URLs
- Query: `?version=1` — mudah testing

## Authentication Patterns
- JWT: stateless, scalable, short-lived access + refresh token
- Session: server-side state, simpler, better for web apps
- API Keys: service-to-service, rate limiting per key
- OAuth 2.0: third-party access delegation

## Rate Limiting
- Token bucket atau sliding window
- Return headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- 429 Too Many Requests response

## Decision Checklist
- [ ] API consumers identified?
- [ ] API style chosen for THIS context?
- [ ] Consistent response format defined?
- [ ] Versioning strategy planned?
- [ ] Authentication needs considered?
- [ ] Rate limiting planned?
- [ ] Documentation approach defined?

## Anti-Patterns
- Default to REST for everything tanpa pertimbangan
- Verbs di REST endpoints
- Inconsistent response formats
- Expose internal errors ke clients
- Skip rate limiting

#[[file:skill/api-patterns/rest.md]]
#[[file:skill/api-patterns/auth.md]]
#[[file:skill/api-patterns/response.md]]
