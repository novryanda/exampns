# 🎯 Copilot Skills Setup Guide

Semua skills di Ross Project sudah dikonfigurasi dan siap digunakan oleh Copilot Anda.

## ✅ Apa yang Sudah Dilakukan

1. **✓ Skills Relocated** - Semua skills dipindahkan ke `.github/skills/`
   - API Patterns
   - Architecture
   - Better Auth
   - NestJS Backend
   - Next.js Developer
   - Next.js Expert
   - SQL Expert

2. **✓ VS Code Configured** - File konfigurasi dibuat:
   - `.vscode/settings.json` - Mengaktifkan custom skills di Copilot
   - `.vscode/extensions.json` - Merekomendasikan extensions yang diperlukan
   - `.github/AGENTS.md` - Dokumentasi lengkap semua skills

3. **✓ Proper Structure** - Setiap skill memiliki:
   - `SKILL.md` dengan frontmatter YAML yang valid
   - Reference files untuk dokumentasi detail
   - Scripts dan examples (jika ada)
   - Agents configuration

## 🚀 Cara Menggunakan

### Option 1: Auto-Load (Recommended)
Cukup chat dengan Copilot tentang topik yang relevan, skill akan otomatis dimuat:

```
You: "Bikin REST API untuk user management dengan NestJS"
→ @nestjs-backend akan otomatis dimuat
```

### Option 2: Slash Command
Ketik `/` untuk menampilkan daftar skills:

```
/ @nestjs-backend
/ @nextjs-developer
/ @api-patterns
/ dst...
```

### Option 3: Mention Explicitly
Sebutkan skill dalam pertanyaan:

```
You: "Using @api-patterns, design sebuah API untuk e-commerce"
```

## 📚 Available Skills Reference

| Skill | Gunakan Untuk | Trigger Words |
|-------|---------------|---------------|
| `@nestjs-backend` | Backend API development | NestJS, Controller, Module, API |
| `@nextjs-developer` | Frontend development | Next.js, page, component, layout |
| `@nextjs-expert` | Advanced Next.js patterns | performance, optimization, testing |
| `@api-patterns` | API design decisions | REST, GraphQL, tRPC, versioning |
| `@better-auth` | Authentication setup | auth, login, session, credentials |
| `@architecture` | System design | architecture, design pattern, trade-off |
| `@sql-expert` | Database & ORM | Prisma, database, schema, SQL |

## 🎓 Learning Resources

Setiap skill sudah memiliki dokumentasi lengkap di:

```
.github/skills/<skill-name>/
├── SKILL.md                    # Main guide
├── references/                 # Detailed docs
│   ├── *.md (various topics)
├── scripts/                    # Executables/validators
├── agents/                     # Agent configurations
```

## 💡 Tips

- **Combine Skills**: Gunakan multiple skills untuk task kompleks
  ```
  "Using @api-patterns and @nestjs-backend, design user authentication API"
  ```

- **Context Sharing**: Skills akan menggunakan file yang sedang Anda edit sebagai konteks
  ```
  Open: src/auth.ts
  Ask: "@nestjs-backend, improve this guard implementation"
  ```

- **Progressive Learning**: Baca `SKILL.md` untuk overview, lalu dive ke `references/` untuk detail

## 📋 Checklist for Next Steps

- [ ] Reload VS Code (Cmd/Ctrl + Shift + P → "Developer: Reload Window")
- [ ] Try `/` command to see all skills
- [ ] Test one skill: Ask something like "bikin controller NestJS untuk todos"
- [ ] Check that skill auto-loaded correctly
- [ ] Share workspace with team so everyone gets these skills!

## 🔗 Related Files

- **Main Documentation**: [AGENTS.md](./AGENTS.md)
- **Project Root**: Skills discoverable from `.github/skills/`
- **VS Code Config**: [.vscode/settings.json](./.vscode/settings.json)
