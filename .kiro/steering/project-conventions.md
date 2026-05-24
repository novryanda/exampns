---
inclusion: auto
---

# Ross Project Conventions

## Tech Stack
- **Backend:** NestJS + TypeScript + Prisma + PostgreSQL
- **Frontend:** Next.js 15/16 + React 19 + TypeScript + Tailwind CSS v4
- **Auth:** Better Auth
- **Validation:** Zod
- **Testing:** Vitest (unit/integration), Playwright (E2E)

## Project Structure
```
ross-project/
├── api/              # NestJS Backend
├── fe-ross/          # Next.js Frontend
├── docs/             # Documentation
├── skill/            # Skill references (read-only)
├── .agent/           # Agent configurations & skills
└── .kiro/steering/   # Kiro steering files
```

## Coding Standards
- TypeScript strict mode always
- Zod for all input validation
- Server Components by default (Next.js)
- Guard clauses over deep nesting
- Named exports preferred
- Descriptive variable/function names
- Max 20 lines per function

## API Conventions
- RESTful with consistent envelope response format
- Versioned: `/api/v1/...`
- Authentication via Better Auth
- Rate limiting on all public endpoints
- Zod validation on all inputs

## Database Conventions
- Prisma as ORM
- UUID primary keys
- `created_at`, `updated_at` on all tables
- Soft delete where appropriate
- Index all foreign keys
- Migrations tested on staging first

## Git Conventions
- Branch naming: `feature/`, `fix/`, `chore/`
- Commit messages: conventional commits
- PR required for main branch
