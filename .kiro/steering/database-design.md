---
inclusion: fileMatch
fileMatchPattern: "**/prisma/**,**/schema.prisma,**/drizzle/**,**/migrations/**,**/*.sql,**/database*,**/db*"
---

# Database Design Skill

Database design principles dan decision-making.

## Core Principle
- ASK user for database preferences when unclear
- Choose database/ORM based on CONTEXT
- Don't default to PostgreSQL for everything

## Database Selection
```
Simple app, embedded → SQLite
Serverless, edge → Turso (libSQL) / Neon (PostgreSQL)
General purpose, relational → PostgreSQL
High read throughput → MySQL/MariaDB
Document-oriented → MongoDB
```

## ORM Selection
```
Type-safe, schema-first → Prisma
SQL-like, lightweight → Drizzle
Full-featured, decorators → TypeORM
Query builder only → Knex/Kysely
```

## Schema Design Principles
1. Normalize to 3NF, denormalize only for proven performance needs
2. Use UUIDs for distributed systems, auto-increment for simple apps
3. Always add `created_at`, `updated_at` timestamps
4. Soft delete (`deleted_at`) for audit-critical data
5. Index foreign keys (not auto in PostgreSQL)

## Relationship Types
| Type | Example | Implementation |
|------|---------|----------------|
| 1:1 | User → Profile | FK + unique constraint |
| 1:N | User → Posts | FK on "many" side |
| N:M | Posts ↔ Tags | Junction table |

## Indexing Strategy
- Index columns in WHERE, JOIN, ORDER BY
- Composite index order: (equality) → (range) → (sort)
- Partial indexes for filtered queries
- Don't over-index: each index slows writes

## Migration Best Practices
- Always backward-compatible migrations
- Never drop columns in production without deprecation period
- Use `ALTER TABLE ... ADD COLUMN` with defaults
- Test migrations on staging first

## Decision Checklist
- [ ] Database preference asked?
- [ ] Deployment environment considered?
- [ ] Index strategy planned?
- [ ] Relationship types defined?
- [ ] Migration strategy planned?

## Anti-Patterns
- ❌ Default to PostgreSQL for simple apps (SQLite may suffice)
- ❌ Skip indexing
- ❌ SELECT * in production
- ❌ Store JSON when structured data is better
- ❌ Ignore N+1 queries
