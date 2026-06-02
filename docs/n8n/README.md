# ExamCPNS N8N Workflows

File di folder ini disiapkan agar bisa langsung di-import ke n8n:

- `examcpns-ai-recommendation.workflow.json`
- `examcpns-pdf-parse.workflow.json`

## Cara Import

1. Buka n8n.
2. Pilih `Import from File` atau paste isi JSON ke editor workflow.
3. Simpan workflow.
4. Ganti credential atau env sesuai kebutuhan.
5. Aktifkan workflow agar production webhook aktif.

## Environment Variables

### Workflow AI Recommendation

- `N8N_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_BASE_URL`

Default `OPENAI_BASE_URL` yang dipakai workflow:

`https://api.openai.com/v1/chat/completions`

Jika memakai Gemini via endpoint OpenAI-compatible, gunakan:

`https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`

### Workflow PDF Parse

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_BASE_URL`
- `PDF_IMPORT_WEBHOOK_SECRET` (opsional, hanya jika ingin validasi header secret di workflow)

## Header yang Dipakai Backend

### AI Recommendation

Backend sudah mengirim:

- `x-api-key: <N8N_WEBHOOK_SECRET>`

dan memanggil:

- `{N8N_WEBHOOK_URL}/generate-recommendation`

### PDF Parse

Backend saat ini memanggil:

- `PDF_IMPORT_WEBHOOK_URL`

dengan body JSON:

```json
{
  "batchId": "uuid",
  "fileName": "soal.pdf",
  "fileMimeType": "application/pdf",
  "fileContentBase64": "...",
  "categoryHint": "auto",
  "callbackUrl": "http://localhost:3001/api/v1/internal/pdf-imports/callback",
  "callbackSecret": "dev-pdf-import-callback-secret"
}
```

Catatan:

- Backend PDF parser saat ini belum mengirim `x-api-key`.
- Backend sekarang tidak lagi menunggu hasil parsing sinkron.
- Workflow n8n perlu mengirim callback sukses ke `callbackUrl` dengan header `x-api-key: <callbackSecret>`.
- Jika workflow gagal sebelum callback, backend akan menandai batch gagal dari error/HTTP response workflow.

## Bentuk Response yang Diharapkan Backend

### AI Recommendation

Workflow harus mengembalikan JSON langsung, tanpa wrapper `success`:

```json
{
  "summary": "string",
  "overallAssessment": "string",
  "recommendations": [],
  "nextTryoutStrategy": "string"
}
```

### PDF Parse

Backend masih kompatibel dengan response sinkron lama:

```json
{
  "parsedQuestions": []
}
```

Namun mode yang direkomendasikan sekarang adalah callback async ke backend:

```json
{
  "batchId": "uuid",
  "success": true,
  "parsedQuestions": [],
  "totalParsed": 100,
  "validCount": 100,
  "invalidCount": 0
}
```

Untuk gagal:

```json
{
  "batchId": "uuid",
  "success": false,
  "errorMessage": "Pesan error dari workflow"
}
```

## Catatan Implementasi

- Workflow AI recommendation sudah divalidasi agar tidak mengarang `topicTag` di luar `weakAreas`.
- Workflow PDF parse memakai `Extract From File` untuk mengambil teks PDF, lalu satu panggilan LLM untuk mengubah teks menjadi array soal.
- Workflow PDF parse ini cocok untuk PDF ukuran kecil sampai menengah. Kalau PDF Anda besar, sebaiknya nanti kita upgrade ke versi chunking per blok soal.
- Untuk keamanan, API key LLM sebaiknya tetap disimpan di environment n8n dan tidak di-hardcode ke file workflow JSON.
