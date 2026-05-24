# Setup Lokal ExamCPNS

Panduan menjalankan stack development di laptop (Linux).

## Ringkasan sistem

| Komponen | Path | Port |
|----------|------|------|
| Frontend (Next.js 16) | `apps/fe-exampns` | 3000 |
| Backend API (NestJS) | `apps/api` | 3001 |
| PostgreSQL | Docker / lokal | 5432 |
| Redis (opsional MVP) | Docker | 6379 |
| N8N (opsional, AI/PDF) | `docs/n8n/` | 5678 |

Dokumen bisnis & arsitektur ada di folder `docs/` (BRD, PRD, SRS, API Spec, ERD, dll.).

## Prasyarat

- **Node.js 22+** dan **npm** (disarankan via [nvm](https://github.com/nvm-sh/nvm))
- **Docker** + Docker Compose **atau** PostgreSQL 16+ terpasang di host
- (Opsional) **N8N** + API key OpenAI untuk fitur AI recommendation & PDF parse

## 1. Node.js (nvm)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
nvm use 22
node -v && npm -v
```

## 2. Database (Docker — disarankan)

```bash
cd /path/to/exampns
docker compose up -d
docker compose ps
```

Tanpa Docker, buat database `exampns_api` di PostgreSQL lokal dan sesuaikan `DATABASE_URL` di `apps/api/.env`.

## 3. Environment

```bash
cp apps/api/.env.example apps/api/.env
cp apps/fe-exampns/.env.example apps/fe-exampns/.env
```

Edit `apps/api/.env` — set minimal:

- `BETTER_AUTH_SECRET` — string acak ≥ 32 karakter
- `SUPER_ADMIN_EMAIL` / `SUPER_ADMIN_PASSWORD` — akun super admin dev

## 4. Install & migrasi

```bash
cd apps/api
npm install
npm run prisma:generate
npm run db:push
# opsional seed: npm run db:seed

cd ../fe-exampns
npm install
```

## 5. Jalankan

Terminal 1 — API:

```bash
cd apps/api
npm run start:dev
```

Terminal 2 — Frontend:

```bash
cd apps/fe-exampns
npm run dev
```

- Frontend: http://localhost:3000  
- API: http://localhost:3001  

Login super admin memakai kredensial dari `SUPER_ADMIN_*` di `.env` (dibuat saat bootstrap pertama kali).

## 6. N8N (opsional)

Import workflow dari `docs/n8n/*.workflow.json`. Set `N8N_WEBHOOK_URL` dan `N8N_WEBHOOK_SECRET` di `apps/api/.env`. Lihat `docs/n8n/README.md`.

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `npm: command not found` | Pakai nvm (`source ~/.nvm/nvm.sh`) |
| Koneksi DB gagal | Pastikan `docker compose up -d` dan port 5432 bebas |
| Port 3000/3001 dipakai | Hentikan proses lain atau ubah `PORT` / `next dev -p` |
| Bootstrap super admin tidak jalan | Isi `SUPER_ADMIN_EMAIL` dan `SUPER_ADMIN_PASSWORD` |
