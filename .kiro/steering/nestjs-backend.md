---
inclusion: fileMatch
fileMatchPattern: "**/*.module.ts,**/*.controller.ts,**/*.service.ts,**/*.guard.ts,**/*.pipe.ts,**/*.interceptor.ts,**/*.middleware.ts,**/nest*,**/api/**/*.ts"
---

# NestJS Backend Skill

Panduan lengkap membangun backend berbasis NestJS menggunakan TypeScript.

## Alur Kerja

### Fase 1 — Pahami Kebutuhan
1. Project baru atau menambah fitur?
2. Database apa? (default: PostgreSQL via Prisma)
3. Butuh authentication?
4. Ada spesifikasi API?

### Fase 2 — Setup Project (Baru)
```bash
npm install -g @nestjs/cli
nest new nama-project
npm install zod @prisma/client nest-winston winston bcrypt uuid @nestjs/config
npm install --save-dev prisma @types/bcrypt @types/uuid
```

### Fase 3 — Struktur Module
```
src/
├── common/           ← Prisma, Logger, Validation (shared)
├── user/             ← Satu module per domain/fitur
└── app.module.ts     ← Root module
```

### Fase 4 — Generate Komponen
```bash
nest generate module|controller|service|middleware|guard|pipe|interceptor nama path
```

## Building Blocks

| Komponen | Decorator | Fungsi |
|----------|-----------|--------|
| Module | `@Module()` | Wadah organisasi kode |
| Controller | `@Controller('path')` | Handle HTTP Request/Response |
| Provider/Service | `@Injectable()` | Business logic, DI |
| Middleware | `NestMiddleware` | Pre-processing request |
| Guard | `CanActivate` | Authorization/authentication |
| Pipe | `PipeTransform` | Transformasi & validasi input |
| Interceptor | `NestInterceptor` | Modifikasi request/response |
| Exception Filter | `ExceptionFilter` | Handle error → HTTP response |

## Request → Response Flow
```
Request → Middleware → Guard → Interceptor → Pipe → Controller → Service
Response ← ExceptionFilter ← Interceptor ← Controller ← Service
```

## Best Practices
1. Jangan gunakan `express.Request`/`express.Response` langsung — gunakan decorator NestJS
2. Service hanya di-inject via constructor
3. Selalu export Provider jika digunakan module lain
4. Common Module untuk shared dependency (Prisma, Logger, ValidationService)
5. Gunakan `APP_GUARD`/`APP_FILTER` untuk global provider agar DI tetap bekerja
6. Pipe untuk transformasi input, Interceptor untuk cross-cutting concerns

## Validation dengan Zod
```typescript
@Injectable()
export class ValidationService {
  validate<T>(schema: ZodType, data: unknown): T {
    return schema.parse(data);
  }
}
```

## Guard — Authentication
```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return !!request.headers['authorization'];
  }
}
```

## Referensi tambahan
#[[file:skill/nestjs-backend/references/nestjs-dasar.md]]
#[[file:skill/nestjs-backend/references/nestjs-restful.md]]
