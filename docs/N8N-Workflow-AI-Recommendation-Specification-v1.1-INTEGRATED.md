# N8N Workflow Technical Specification
# ExamCPNS — RAG Pipeline & PDF Parsing

---

| Field          | Value                                          |
|----------------|-------------------------------------------------|
| Document       | N8N Workflow Technical Specification            |
| Product        | ExamCPNS — Platform Ujian Online CPNS           |
| Version        | 1.1                                             |
| Date           | 13 Mei 2026                                     |
| Author         | System Analyst (AI-Assisted)                    |
| Status         | **Draft**                                       |

---

## Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | 13 Mei 2026 | System Analyst | Initial N8N RAG and PDF Parsing workflow draft |
| 1.1 | 14 Mei 2026 | System Analyst Pro | Updated Workflow 2 for MVP: exam-result-based AI Recommendation without mandatory Vector DB/RAG materials |

## 1. Overview

Dokumen ini menjelaskan dua workflow N8N utama yang menjadi tulang punggung fitur AI di platform ExamCPNS:

1. **Workflow 1: PDF Parsing Pipeline** — Mengubah file PDF soal CPNS menjadi data soal terstruktur yang siap masuk bank soal
2. **Workflow 2: AI Recommendation Pipeline** — Menganalisis weakAreas yang sudah dihitung backend dan menghasilkan rekomendasi naratif setelah ujian
3. **Workflow 3: Materi Embedding Pipeline** — Phase 2, hanya diperlukan jika produk menambahkan learning material retrieval berbasis vector database

Selain itu, dokumen ini juga mencakup setup infrastruktur N8N. ChromaDB dan materi embedding dipertahankan sebagai opsi Phase 2, bukan requirement wajib MVP.

---

## 2. Infrastruktur Setup

### 2.1 Docker Compose untuk N8N + ChromaDB

```yaml
# docker-compose.n8n.yml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=n8n.yourdomain.com
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.yourdomain.com/
      - GENERIC_TIMEZONE=Asia/Jakarta
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./uploads:/uploads
    networks:
      - examcpns

  chromadb:
    image: chromadb/chroma:latest
    restart: always
    ports:
      - "8000:8000"
    environment:
      - ANONYMIZED_TELEMETRY=false
      - CHROMA_SERVER_AUTH_PROVIDER=chromadb.auth.token_authn.TokenAuthenticationServerProvider
      - CHROMA_SERVER_AUTH_TOKEN_TRANSPORT_HEADER=Authorization
      - CHROMA_SERVER_AUTH_CREDENTIALS=${CHROMA_AUTH_TOKEN}
    volumes:
      - chroma_data:/chroma/chroma
    networks:
      - examcpns

volumes:
  n8n_data:
  chroma_data:

networks:
  examcpns:
    external: true
```

### 2.2 Estimasi Resource Usage

| Service   | RAM (idle) | RAM (peak) | Disk        |
|-----------|-----------|------------|-------------|
| N8N       | 300MB     | 1GB        | ~500MB      |
| ChromaDB  | 200MB     | 1.5GB      | ~2GB (awal) |
| **Total** | **500MB** | **2.5GB**  | **~2.5GB**  |

Dari total 16GB RAM VPS, ini menggunakan sekitar 15% — masih comfortable.

### 2.3 Komunikasi NestJS ↔ N8N

NestJS berkomunikasi dengan N8N melalui webhook HTTP. Konfigurasi di NestJS:

```typescript
// n8n.config.ts
export const n8nConfig = {
  baseUrl: process.env.N8N_WEBHOOK_URL || 'https://n8n.yourdomain.com',
  endpoints: {
    parsePdf: '/webhook/parse-pdf',
    generateRecommendation: '/webhook/generate-recommendation',
    embedMaterial: '/webhook/embed-material',
  },
  timeout: 120_000, // 2 menit untuk PDF parsing
  apiKey: process.env.N8N_WEBHOOK_SECRET,
};
```

```typescript
// n8n.service.ts (NestJS)
@Injectable()
export class N8nService {
  private readonly httpService: HttpService;

  async parsePdf(pdfBuffer: Buffer, filename: string): Promise<ParsedQuestion[]> {
    const formData = new FormData();
    formData.append('file', pdfBuffer, filename);
    formData.append('apiKey', n8nConfig.apiKey);

    const response = await firstValueFrom(
      this.httpService.post(
        `${n8nConfig.baseUrl}${n8nConfig.endpoints.parsePdf}`,
        formData,
        { timeout: n8nConfig.timeout }
      )
    );

    return response.data.questions;
  }

  async generateRecommendation(performanceData: UserPerformance): Promise<Recommendation> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${n8nConfig.baseUrl}${n8nConfig.endpoints.generateRecommendation}`,
        {
          apiKey: n8nConfig.apiKey,
          userId: performanceData.userId,
          examResults: performanceData.results,
          weakCategories: performanceData.weakCategories,
        },
        { timeout: 60_000 }
      )
    );

    return response.data.recommendation;
  }
}
```

---

## 3. Workflow 1: PDF Parsing Pipeline

### 3.1 Tujuan

Menerima file PDF berisi soal-soal CPNS, mengekstrak teks, lalu menggunakan LLM untuk memparsing menjadi data soal terstruktur (pertanyaan, pilihan jawaban, kunci jawaban, kategori).

### 3.2 Node-by-Node Specification

#### Node 1: Webhook Trigger

- **Type**: Webhook
- **Method**: POST
- **Path**: `/parse-pdf`
- **Authentication**: Header-based (`x-api-key`)
- **Input**: Multipart form data — file PDF + metadata
- **Output**: File binary + metadata object

```
Input payload:
{
  file: <binary PDF>,
  apiKey: "secret-key",
  category: "TWK" | "TIU" | "TKP" (optional, untuk hint ke LLM)
}
```

#### Node 2: Extract PDF Text

- **Type**: Code Node (JavaScript)
- **Library**: `pdf-parse` (install via N8N community node atau code node)
- **Purpose**: Mengekstrak seluruh teks dari PDF

```javascript
// N8N Code Node
const pdfParse = require('pdf-parse');

const pdfBuffer = await this.helpers.getBinaryDataBuffer(0, 'file');
const pdfData = await pdfParse(pdfBuffer);

return [{
  json: {
    text: pdfData.text,
    pageCount: pdfData.numpages,
    category: $input.first().json.category || 'auto'
  }
}];
```

**Catatan penting**: PDF soal CPNS seringkali memiliki format yang bervariasi. Node ini hanya mengambil teks mentah — LLM yang akan menangani parsing struktur soal.

#### Node 3: Text Chunking

- **Type**: Code Node (JavaScript)
- **Purpose**: Memecah teks panjang menjadi chunk yang manageable untuk LLM (menghindari token limit)

```javascript
// N8N Code Node — Smart Chunking
const fullText = $input.first().json.text;
const category = $input.first().json.category;

// Strategi: split berdasarkan pola nomor soal (1., 2., dst)
// Regex untuk mendeteksi awal soal baru
const questionPattern = /(?:^|\n)\s*(\d{1,3})\s*[\.\)]\s*/g;
const matches = [...fullText.matchAll(questionPattern)];

const chunks = [];
const CHUNK_SIZE = 15; // 15 soal per chunk

for (let i = 0; i < matches.length; i += CHUNK_SIZE) {
  const startIdx = matches[i].index;
  const endIdx = i + CHUNK_SIZE < matches.length
    ? matches[i + CHUNK_SIZE].index
    : fullText.length;

  chunks.push({
    text: fullText.substring(startIdx, endIdx),
    chunkIndex: Math.floor(i / CHUNK_SIZE),
    estimatedQuestions: Math.min(CHUNK_SIZE, matches.length - i),
    category: category,
  });
}

// Fallback: jika tidak ada pola nomor terdeteksi, split per ~3000 karakter
if (chunks.length === 0) {
  const charLimit = 3000;
  for (let i = 0; i < fullText.length; i += charLimit) {
    chunks.push({
      text: fullText.substring(i, i + charLimit),
      chunkIndex: Math.floor(i / charLimit),
      estimatedQuestions: 'unknown',
      category: category,
    });
  }
}

return chunks.map(c => ({ json: c }));
```

**Output**: Array of chunks → masing-masing dikirim ke Node 4 secara paralel (N8N menangani ini otomatis via split-in-batches).

#### Node 4: LLM Structured Parse

- **Type**: OpenAI Chat Model Node / HTTP Request Node
- **Model**: `gpt-4o-mini` (cost-effective untuk parsing) atau `claude-sonnet-4-20250514`
- **Purpose**: Mengubah teks mentah menjadi JSON soal terstruktur

**System Prompt**:

```
Kamu adalah parser soal ujian CPNS Indonesia. Tugasmu adalah mengubah teks soal menjadi format JSON terstruktur.

ATURAN PENTING:
1. Setiap soal HARUS memiliki tepat 5 pilihan jawaban (A, B, C, D, E)
2. Identifikasi kunci jawaban yang benar jika tertera di teks
3. Jika kunci jawaban tidak ada, set correctAnswer ke null
4. Kategorikan setiap soal ke sub-kategori yang tepat
5. Untuk soal TKP, setiap opsi memiliki bobot 1-5 (bukan benar/salah)

KATEGORI DAN SUB-KATEGORI:
- TWK: pancasila, uud_1945, nkri, bahasa_indonesia, sejarah, tata_negara
- TIU: verbal_analogi, verbal_silogisme, verbal_analitis, numerik_deret, numerik_hitung, numerik_perbandingan, figural
- TKP: pelayanan_publik, networking, sosial_budaya, tik, profesionalisme, anti_radikalisme

FORMAT OUTPUT (JSON array, tanpa markdown backticks):
[
  {
    "questionText": "Teks pertanyaan lengkap",
    "options": [
      {"label": "A", "text": "Teks pilihan A"},
      {"label": "B", "text": "Teks pilihan B"},
      {"label": "C", "text": "Teks pilihan C"},
      {"label": "D", "text": "Teks pilihan D"},
      {"label": "E", "text": "Teks pilihan E"}
    ],
    "correctAnswer": "A",
    "category": "TWK",
    "subCategory": "pancasila",
    "difficulty": "medium",
    "explanation": "Penjelasan jawaban jika tersedia, null jika tidak",
    "tkpWeights": null
  }
]

Untuk soal TKP, gunakan format tkpWeights:
"tkpWeights": {"A": 5, "B": 4, "C": 3, "D": 2, "E": 1}

PENTING: Output HANYA JSON array, tanpa teks tambahan.
```

**User Prompt**:
```
Kategori hint: {{category}}

Parse soal-soal berikut menjadi format JSON:

{{chunkText}}
```

**Konfigurasi LLM**:
- Temperature: 0.1 (deterministic untuk parsing)
- Max tokens: 4000
- Response format: JSON mode (jika menggunakan OpenAI)

#### Node 5: Validate + Format

- **Type**: Code Node (JavaScript)
- **Purpose**: Validasi output LLM dan normalisasi format

```javascript
// N8N Code Node — Validation
const llmOutput = $input.first().json.response;

let questions;
try {
  // Parse JSON, handle jika LLM menambahkan backticks
  const cleaned = llmOutput.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  questions = JSON.parse(cleaned);
} catch (e) {
  return [{
    json: {
      success: false,
      error: 'JSON parse failed: ' + e.message,
      rawOutput: llmOutput
    }
  }];
}

if (!Array.isArray(questions)) {
  return [{ json: { success: false, error: 'Output bukan array', rawOutput: llmOutput } }];
}

// Validasi setiap soal
const validQuestions = [];
const invalidQuestions = [];

const validCategories = ['TWK', 'TIU', 'TKP'];
const validSubCategories = {
  TWK: ['pancasila', 'uud_1945', 'nkri', 'bahasa_indonesia', 'sejarah', 'tata_negara'],
  TIU: ['verbal_analogi', 'verbal_silogisme', 'verbal_analitis', 'numerik_deret', 'numerik_hitung', 'numerik_perbandingan', 'figural'],
  TKP: ['pelayanan_publik', 'networking', 'sosial_budaya', 'tik', 'profesionalisme', 'anti_radikalisme'],
};

for (const q of questions) {
  const errors = [];

  if (!q.questionText || q.questionText.length < 10) {
    errors.push('questionText terlalu pendek atau kosong');
  }

  if (!q.options || q.options.length !== 5) {
    errors.push('Harus ada tepat 5 opsi jawaban');
  }

  if (!validCategories.includes(q.category)) {
    errors.push('Kategori tidak valid: ' + q.category);
  }

  if (q.category && !validSubCategories[q.category]?.includes(q.subCategory)) {
    errors.push('Sub-kategori tidak valid: ' + q.subCategory);
  }

  if (q.category === 'TKP' && !q.tkpWeights) {
    errors.push('TKP harus memiliki tkpWeights');
  }

  if (q.category !== 'TKP' && !q.correctAnswer) {
    // Bukan error fatal, tapi perlu ditandai untuk review
    q._needsReview = true;
    q._reviewReason = 'Kunci jawaban tidak terdeteksi';
  }

  if (errors.length === 0) {
    q._status = q._needsReview ? 'needs_review' : 'pending_approval';
    validQuestions.push(q);
  } else {
    q._status = 'invalid';
    q._errors = errors;
    invalidQuestions.push(q);
  }
}

return [{
  json: {
    success: true,
    totalParsed: questions.length,
    validCount: validQuestions.length,
    invalidCount: invalidQuestions.length,
    questions: validQuestions,
    invalidQuestions: invalidQuestions,
  }
}];
```

#### Node 6: Respond to Webhook

- **Type**: Respond to Webhook
- **Purpose**: Mengirim hasil parsing kembali ke NestJS

```json
{
  "success": true,
  "totalParsed": 15,
  "validCount": 13,
  "invalidCount": 2,
  "questions": [ /* array of valid questions */ ],
  "invalidQuestions": [ /* array of invalid with error details */ ]
}
```

### 3.3 Error Handling

| Scenario                        | Handling                                                    |
|---------------------------------|--------------------------------------------------------------|
| PDF corrupt / tidak bisa dibaca | Return error response dengan message "PDF tidak bisa dibaca" |
| PDF adalah scan (gambar)        | Return error: "PDF berisi gambar, bukan teks. Gunakan PDF teks." |
| LLM gagal / timeout            | Retry 2x dengan exponential backoff (5s, 15s). Jika tetap gagal, return partial results |
| JSON output LLM invalid        | Return chunk yang gagal sebagai `invalidQuestions` dengan raw output untuk debugging |
| Chunk terlalu besar (>token limit) | Re-chunk menjadi ukuran lebih kecil dan retry                |

### 3.4 Estimasi Biaya LLM per Upload

| Item                  | Perhitungan                                          |
|-----------------------|------------------------------------------------------|
| Input tokens per chunk | ~2000 tokens (15 soal × ~130 token/soal)             |
| System prompt          | ~500 tokens                                          |
| Output tokens per chunk| ~3000 tokens (15 soal × ~200 token/soal output)      |
| Total per chunk        | ~5500 tokens                                         |
| PDF 50 soal (4 chunks) | ~22,000 tokens                                       |
| Biaya GPT-4o-mini      | ~$0.003 per upload (sangat murah)                    |
| Biaya Claude Sonnet    | ~$0.02 per upload                                    |

---

## 4. Workflow 2: AI Recommendation Pipeline for MVP

### 4.1 Tujuan

Workflow ini menghasilkan rekomendasi setelah user menyelesaikan ujian. Pada MVP, workflow ini TIDAK wajib menggunakan Vector DB atau materi embedding. Backend terlebih dahulu menghitung weakAreas, priorityScore, reasonCodes, dan trend. N8N/AI hanya mengubah payload tersebut menjadi rekomendasi naratif dalam format JSON.

### 4.2 Input Contract

```json
{
  "examResultId": "result-001",
  "score": {
    "twk": 60,
    "tiu": 95,
    "tkp": 170,
    "total": 325
  },
  "passingStatus": {
    "twkPassed": false,
    "tiuPassed": true,
    "tkpPassed": true,
    "overallPassed": false
  },
  "weakAreas": [
    {
      "priority": 1,
      "priorityLevel": "HIGH",
      "priorityScore": 91,
      "category": "TWK",
      "subCategory": "Tata Negara",
      "topicTag": "Hak dan Kewajiban Warga Negara",
      "totalQuestions": 8,
      "correctAnswers": 2,
      "wrongAnswers": 6,
      "emptyAnswers": 0,
      "accuracy": 25,
      "wrongAnswerRate": 75,
      "reasonCodes": [
        "LOW_ACCURACY",
        "LOW_ACCURACY_AND_CATEGORY_NOT_PASSED"
      ]
    }
  ],
  "instruction": {
    "language": "id",
    "outputFormat": "json",
    "maxRecommendations": 5,
    "doNotInventTopics": true,
    "doNotActAsChatbot": true,
    "doNotGuaranteePassing": true
  }
}
```

### 4.3 Output Contract

```json
{
  "summary": "Area terlemah Anda berada pada TWK - Tata Negara.",
  "overallAssessment": "Skor total sudah cukup baik, tetapi TWK perlu diperkuat.",
  "recommendations": [
    {
      "priority": 1,
      "priorityLevel": "HIGH",
      "category": "TWK",
      "subCategory": "Tata Negara",
      "topicTag": "Hak dan Kewajiban Warga Negara",
      "reason": "Anda salah 6 dari 8 soal pada topik ini.",
      "suggestedFocus": [
        "Pelajari konsep hak dan kewajiban warga negara.",
        "Perkuat pemahaman pasal UUD 1945 terkait warga negara."
      ]
    }
  ],
  "nextTryoutStrategy": "Targetkan akurasi TWK Tata Negara minimal 70%."
}
```

### 4.4 Node-by-Node Specification

#### Node 1: Webhook Trigger

- Method: POST
- Path: `/generate-recommendation`
- Authentication: Header-based `x-api-key`
- Input: AIRecommendationPayload from backend

#### Node 2: Validate Payload

Validate required fields:

1. examResultId.
2. score.
3. passingStatus.
4. weakAreas.
5. instruction.

Reject if weakAreas contain unsupported category.

#### Node 3: Build Prompt

Prompt SHALL instruct LLM:

1. Use only weakAreas provided.
2. Do not invent topicTag.
3. Do not act as chatbot.
4. Do not guarantee passing.
5. Return JSON only.
6. Use Bahasa Indonesia.
7. Keep recommendation actionable and concise.

#### Node 4: LLM Recommendation Generation

LLM generates JSON based on weakAreas.

#### Node 5: JSON Validation

N8N SHOULD validate:

1. JSON parseable.
2. recommendations array exists.
3. topicTag is present.
4. recommendation count <= 5.

Backend SHALL still perform final validation.

#### Node 6: Response to Backend

Return recommendation JSON to backend.

### 4.5 Deferred from MVP

| Component | MVP Status |
|---|---|
| ChromaDB retrieval for recommendations | Deferred to Phase 2 |
| Materi Embedding Pipeline | Deferred to Phase 2 |
| Learning material vector search | Deferred to Phase 2 |
| AI chatbot | Out of Scope |

## 5. Workflow 3: Materi Embedding Pipeline (Phase 2 / Deferred for MVP)

### 5.1 Tujuan

Mengubah materi belajar CPNS menjadi vector embedding dan menyimpannya di ChromaDB. Workflow ini dijalankan secara manual oleh admin saat menambahkan materi baru.

### 5.2 Sumber Materi

Materi belajar bisa berupa:
- Rangkuman per topik (misalnya: "Rangkuman Pancasila untuk CPNS")
- Modul belajar yang sudah ada (format PDF atau text)
- Tips dan trik per sub-kategori
- Pembahasan soal-soal yang sering salah

### 5.3 Node Specification

#### Node 1: Webhook / Manual Trigger

```
Input:
{
  materials: [
    {
      title: "Rangkuman Pancasila",
      content: "Pancasila adalah dasar negara Indonesia...",
      category: "TWK",
      subCategory: "pancasila",
      source: "modul_internal"
    }
  ]
}
```

#### Node 2: Chunk Materials

```javascript
// Split materi panjang menjadi chunk 500-800 karakter
// dengan overlap 100 karakter untuk konteks
const materials = $input.first().json.materials;
const chunks = [];

for (const mat of materials) {
  const CHUNK_SIZE = 600;
  const OVERLAP = 100;
  const text = mat.content;

  if (text.length <= CHUNK_SIZE) {
    chunks.push({
      id: `${mat.category}_${mat.subCategory}_0`,
      text: text,
      metadata: {
        title: mat.title,
        category: mat.category,
        subCategory: mat.subCategory,
        source: mat.source,
        chunkIndex: 0,
      }
    });
  } else {
    let idx = 0;
    for (let i = 0; i < text.length; i += CHUNK_SIZE - OVERLAP) {
      chunks.push({
        id: `${mat.category}_${mat.subCategory}_${idx}`,
        text: text.substring(i, i + CHUNK_SIZE),
        metadata: {
          title: mat.title,
          category: mat.category,
          subCategory: mat.subCategory,
          source: mat.source,
          chunkIndex: idx,
        }
      });
      idx++;
    }
  }
}

return chunks.map(c => ({ json: c }));
```

#### Node 3: Generate Embeddings (via OpenAI)

- **Type**: HTTP Request
- **URL**: `https://api.openai.com/v1/embeddings`
- **Model**: `text-embedding-3-small` (murah: $0.02 per 1M tokens)

```json
{
  "input": "{{chunkText}}",
  "model": "text-embedding-3-small"
}
```

#### Node 4: Upsert to ChromaDB

- **Type**: HTTP Request
- **URL**: `http://chromadb:8000/api/v1/collections/{collection_id}/upsert`

```json
{
  "ids": ["{{chunkId}}"],
  "embeddings": [[0.123, 0.456, ...]],
  "documents": ["{{chunkText}}"],
  "metadatas": [{"category": "TWK", "subCategory": "pancasila", "title": "..."}]
}
```

### 5.4 Collection Setup di ChromaDB

```javascript
// One-time setup: buat collection
// POST http://chromadb:8000/api/v1/collections
{
  "name": "cpns_learning_materials",
  "metadata": {
    "description": "Materi belajar CPNS untuk RAG recommendation",
    "hnsw:space": "cosine"
  }
}
```

---

## 6. Caching Strategy

### 6.1 Redis Cache di NestJS

Untuk menghindari pemanggilan N8N/LLM yang berlebihan:

```typescript
// recommendation.service.ts
@Injectable()
export class RecommendationService {
  constructor(
    private readonly redis: RedisService,
    private readonly n8n: N8nService,
  ) {}

  async getRecommendation(userId: string): Promise<Recommendation> {
    const cacheKey = `recommendation:${userId}`;

    // Cek cache dulu
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Generate baru via N8N
    const performance = await this.getUserPerformance(userId);
    const recommendation = await this.n8n.generateRecommendation(performance);

    // Cache selama 24 jam ATAU sampai user selesai ujian baru
    await this.redis.set(cacheKey, JSON.stringify(recommendation), 'EX', 86400);

    return recommendation;
  }

  // Invalidate cache saat user selesai ujian baru
  async invalidateCache(userId: string): Promise<void> {
    await this.redis.del(`recommendation:${userId}`);
  }
}
```

### 6.2 Kapan Cache Di-invalidate

| Event                          | Action                              |
|--------------------------------|--------------------------------------|
| User menyelesaikan ujian baru  | Hapus cache recommendation user     |
| Admin menambah materi baru     | Tidak perlu invalidate (materi baru akan ter-embed dan muncul di query berikutnya) |
| Setelah 24 jam                 | Auto-expire oleh Redis TTL          |

---

## 7. Monitoring & Logging

### 7.1 Metrics yang Perlu Di-track

| Metric                        | Purpose                                     |
|-------------------------------|----------------------------------------------|
| PDF parsing success rate       | Berapa % PDF yang berhasil di-parse          |
| Avg questions parsed per PDF   | Rata-rata soal yang berhasil diekstrak       |
| LLM API latency               | Waktu respons API LLM                        |
| LLM API cost per day           | Biaya harian untuk monitoring budget         |
| Recommendation generation time | Waktu dari request hingga response            |
| Cache hit rate                 | Berapa % recommendation dilayani dari cache  |
| ChromaDB query latency         | Waktu query vector database                  |

### 7.2 N8N Error Notification

Setup workflow tambahan di N8N yang mengirim notifikasi (email/Telegram) ketika:
- PDF parsing gagal total (semua chunk error)
- LLM API return error 3x berturut-turut
- ChromaDB tidak bisa dihubungi
- Biaya LLM API melebihi threshold harian

---

## 8. Security Considerations

| Concern                          | Mitigation                                                     |
|----------------------------------|----------------------------------------------------------------|
| N8N webhook terbuka              | Autentikasi via `x-api-key` header di setiap webhook           |
| ChromaDB exposed                 | Token auth + bind hanya ke Docker network internal (tidak expose ke public) |
| Data siswa dikirim ke LLM API    | Hanya kirim statistik agregat, BUKAN data personal (nama, email) ke LLM |
| LLM API key di N8N               | Gunakan N8N credentials vault (encrypted at rest)              |
| PDF upload malicious             | Validasi file type + size limit (20MB) di NestJS sebelum kirim ke N8N |

---

## 9. Estimasi Biaya Operasional LLM

### Skenario: 100 active users per bulan

| Activity                      | Volume/bulan | Cost per call   | Monthly cost    |
|-------------------------------|-------------|-----------------|-----------------|
| PDF Parsing (GPT-4o-mini)     | 20 uploads  | ~$0.003         | ~$0.06          |
| Recommendation (GPT-4o)       | 500 calls   | ~$0.02          | ~$10            |
| Embedding (text-embedding-3-small) | 100 materials | ~$0.001    | ~$0.10          |
| **Total**                     |             |                 | **~$10/bulan**  |

### Skenario: 1000 active users per bulan

| Activity                      | Volume/bulan | Cost per call   | Monthly cost    |
|-------------------------------|-------------|-----------------|-----------------|
| PDF Parsing (GPT-4o-mini)     | 50 uploads  | ~$0.003         | ~$0.15          |
| Recommendation (GPT-4o)       | 5000 calls  | ~$0.02          | ~$100           |
| Embedding (text-embedding-3-small) | 200 materials | ~$0.001    | ~$0.20          |
| **Total**                     |             |                 | **~$100/bulan** |

**Catatan**: Dengan caching yang efektif (cache hit rate 70%), biaya recommendation bisa turun 70%. Jadi realistisnya ~$30/bulan untuk 1000 users.

---

## 10. Materi Belajar Awal yang Perlu Di-embed

Untuk MVP, siapkan minimal materi berikut di ChromaDB:

### TWK (minimal 18 dokumen)
- Pancasila: 5 sila + penerapan + sejarah perumusan (3 docs)
- UUD 1945: struktur + amandemen + pasal penting (3 docs)
- NKRI: Bhinneka Tunggal Ika + wilayah + otonomi (3 docs)
- Bahasa Indonesia: EYD + kalimat efektif + paragraf (3 docs)
- Sejarah: kemerdekaan + orde baru + reformasi (3 docs)
- Tata Negara: lembaga + pemilu + pemerintahan (3 docs)

### TIU (minimal 14 dokumen)
- Verbal: teknik analogi + silogisme + analitis (3 docs)
- Numerik: pola deret + rumus cepat + perbandingan (4 docs)
- Figural: pattern recognition + tips (2 docs)
- Tips umum: time management + eliminasi jawaban (2 docs)
- Rumus-rumus penting (3 docs)

### TKP (minimal 12 dokumen)
- Pelayanan publik: prinsip + contoh kasus (2 docs)
- Networking: strategi + etika (2 docs)
- Profesionalisme: nilai ASN + integritas (2 docs)
- Sosial budaya + anti radikalisme (2 docs)
- Tips menjawab TKP: cara identifikasi bobot tertinggi (2 docs)
- Contoh skenario + pembahasan (2 docs)

**Total: ~44 dokumen awal** — bisa dimulai dengan versi ringkas, lalu diperkaya seiring waktu.

---

*Document generated: 13 Mei 2026 | Version 1.0 | Status: Draft*
