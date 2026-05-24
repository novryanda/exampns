---
name: ross-project-skills
description: Comprehensive skill set untuk Ross Project mencakup API patterns, NestJS backend, Next.js frontend, database design, dan authentication
---

# Ross Project Skills Guide

Semua skills sudah tersedia dan dapat digunakan di project ini. Berikut adalah daftar lengkap skills yang telah dikonfigurasi:

## 📚 Available Skills

### Backend Development

#### **NestJS Backend** (`@nestjs-backend`)
Panduan lengkap membangun backend berbasis NestJS dengan TypeScript.
- NestJS fundamentals (Controllers, Providers, Modules)
- RESTful API patterns
- Prisma ORM integration
- Authentication & guards
- Validation dengan Zod
- Winston logging

**Trigger:** Saat user menyebut NestJS, membuat API, atau menggunakan NestJS features

#### **Better Auth** (`@better-auth`)
Panduan integrasi dan implementasi Better Auth untuk autentikasi.
- Setup Better Auth
- Adapter integration
- Security patterns
- Plugins configuration

### Frontend Development

#### **Next.js Developer** (`@nextjs-developer`)
Senior Next.js developer skill untuk Next.js 15/16 dengan App Router.
- Project scaffolding
- App Router patterns
- Server & Client Components
- Route handlers
- Middleware setup
- Data fetching patterns

**Trigger:** Saat user ingin bikin halaman, setup Next.js, atau membuat komponen

#### **Next.js Expert** (`@nextjs-expert`)
Advanced Next.js patterns dan optimization.
- Performance optimization
- Testing strategies
- Deployment patterns
- TypeScript best practices

### API & Architecture

#### **API Patterns** (`@api-patterns`)
Prinsip desain API dan decision-making.
- REST vs GraphQL vs tRPC selection
- Response formats & pagination
- API versioning
- Authentication patterns
- Rate limiting
- Security testing

**Trigger:** Saat user merancang API atau memilih API architecture

#### **Architecture** (`@architecture`)
Architectural decision-making dan pattern selection.
- Context discovery
- Pattern selection frameworks
- Trade-off analysis
- System design

### Database

#### **SQL Expert** (`@sql-expert`)
Expertise dalam SQL, database design, dan ORM patterns.
- Prisma ORM
- Drizzle ORM
- Database optimization
- Schema design

---

## 🎯 How to Use Skills

### Method 1: Auto-Trigger
Skills akan otomatis dimuat ketika Copilot mendeteksi konteks relevan berdasarkan deskripsi:
```
User: "Bikin controller NestJS untuk users"
→ @nestjs-backend automatically loaded
```

### Method 2: Manual Slash Command
Ketik `/` di chat window dan pilih skill yang diinginkan:
```
/ @nestjs-backend
/ @nextjs-developer
/ @api-patterns
```

### Method 3: Mention in Chat
Referensikan skill langsung dalam pertanyaan:
```
User: "Using @api-patterns, pilih antara REST atau GraphQL untuk..."
```

---

## 📂 Project Structure

```
.agent/
├── skills/
│   ├── api-patterns/
│   ├── architecture/
│   ├── better-auth/
│   ├── nestjs-backend/
│   ├── nextjs-developer/
│   ├── nextjs-expert/
│   └── sql-expert/
.vscode/
├── settings.json
└── extensions.json
```

---

## 🚀 Quick Start

1. **Backend API:** `@nestjs-backend` + `@api-patterns`
   ```
   Ask: "bikin REST API untuk user management dengan NestJS"
   ```

2. **Frontend UI:** `@nextjs-developer`
   ```
   Ask: "buat halaman login dengan Next.js dan Tailwind"
   ```

3. **Database Design:** `@sql-expert`
   ```
   Ask: "design database schema untuk user management dengan Prisma"
   ```

4. **API Integration:** `@api-patterns` + `@better-auth`
   ```
   Ask: "setup JWT authentication di NestJS API"
   ```

---

## ✅ Verification Checklist

- ✅ Semua skills sudah di `.agent/skills/`
- ✅ VS Code settings sudah dikonfigurasi
- ✅ Extensions recommendations sudah ditambahkan
- ✅ Setiap skill memiliki SKILL.md dengan frontmatter yang valid
- ✅ Reference files dan scripts sudah tersedia di setiap skill folder

---

## 📝 Notes

- Skills automatically discovered oleh Gemini dari folder `.agent/skills/`
- Setiap skill dapat digunakan standalone atau dikombinasikan
- Deskripsi skill sudah dalam Indonesian untuk trigger yang lebih natural
- Referensi dan scripts di setiap skill sudah lengkap dan siap digunakan
