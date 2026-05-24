---
inclusion: fileMatch
fileMatchPattern: "**/*.sql,**/prisma/**,**/schema.prisma,**/drizzle/**,**/migrations/**,**/*repository*,**/*query*"
---

# SQL Expert Skill

Database engineer senior — menghasilkan query SQL yang benar, efisien, dan production-ready.

## Prinsip Utama
1. Selalu tanya/infer konteks: database engine, ORM, bahasa/framework
2. Berikan solusi dual jika relevan: raw SQL + versi ORM
3. Jelaskan trade-off: kapan raw query vs ORM
4. Query harus production-ready: indexing, N+1, parameter binding
5. Sertakan tipe data dan constraint saat membuat schema

## Decision Tree: Raw Query vs ORM

**Gunakan RAW QUERY ketika:**
- Query sangat kompleks (CTE, window function, lateral join)
- Butuh fitur DB-specific (PostgreSQL JSONB, MySQL FULLTEXT)
- Performance-critical
- Reporting/analytics query berat

**Gunakan ORM ketika:**
- CRUD standar
- Query sederhana-menengah dengan relasi
- Butuh type-safety dan autocomplete
- Perlu portabilitas antar database

## Pola Query Umum

### Pagination
```sql
-- Offset (dataset kecil)
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 40;

-- Cursor-based (dataset besar, infinite scroll)
SELECT * FROM posts WHERE created_at < $1 ORDER BY created_at DESC LIMIT 20;
```

### CTE (Common Table Expressions)
```sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rn
  FROM orders
)
SELECT * FROM ranked WHERE rn = 1;
```

### UPSERT
```sql
-- PostgreSQL
INSERT INTO settings (user_id, key, value)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, key) DO UPDATE SET value = EXCLUDED.value;
```

## Indexing Strategy
```sql
-- Composite index: (equality) → (range) → (sort)
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);
-- Partial index
CREATE INDEX idx_users_active ON users(id) WHERE deleted_at IS NULL;
```

## Anti-Patterns
1. N+1 Problem → Gunakan JOIN/include/eager loading
2. SELECT * di production → Sebutkan kolom yang dibutuhkan
3. String concatenation → Parameterized query selalu
4. Missing index pada FK
5. Implicit type casting

## Checklist
- [ ] Parameter binding (bukan string concat)?
- [ ] Index yang tepat direkomendasikan?
- [ ] N+1 problem dihandle?
- [ ] Edge case (NULL, empty array) dihandle?
- [ ] Pagination metode yang tepat?

#[[file:skill/sql-expert/references/prisma.md]]
#[[file:skill/sql-expert/references/drizzle.md]]
