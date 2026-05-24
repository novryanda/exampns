# Scope Refinement & Requirement Gap Analysis
# ExamCPNS — Platform Tryout CPNS Berbayar dengan AI Recommendation

---

| Field | Value |
|---|---|
| Document | Scope Refinement & Requirement Gap Analysis |
| Product | ExamCPNS — Platform Tryout CPNS Berbayar |
| Version | 1.3 |
| Date | 14 Mei 2026 |
| Author | System Analyst Pro |
| Status | Draft |
| Based On | PRD ExamCPNS v1.0, N8N Workflow RAG Specification v1.0, Product Owner Clarification |

## Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | 13 Mei 2026 | System Analyst | Initial PRD and N8N workflow draft |
| 1.1 | 14 Mei 2026 | System Analyst Pro | Scope refinement based on confirmed product direction: paid CPNS tryout platform with AI recommendation, not full learning platform |
| 1.2 | 14 Mei 2026 | System Analyst Pro | Integrated AI Recommendation algorithm clarification into scope and gap analysis. |
| 1.3 | 14 Mei 2026 | System Analyst Pro | Merged SaaS-ready Configurable Tryout Generation directly into existing sections; replaced simple Tryout Catalog with Tryout Catalog, Generation Rules, Manual Question Set, Question Selection Engine, and updated start exam flow. |

---

# 1. Executive Summary

ExamCPNS adalah platform tryout CPNS berbasis web dengan model bisnis berlangganan. Fokus utama produk adalah menyediakan simulasi ujian CPNS online yang realistis, lengkap dengan scoring otomatis, riwayat ujian, bank soal, admin panel, trial access, subscription, dan payment gateway.

Fitur AI pada MVP berperan sebagai nilai tambah setelah ujian selesai. AI SHALL menganalisis hasil benar/salah, kategori soal, sub-kategori, topic tag, difficulty, skor per kategori, dan histori ujian untuk menghasilkan rekomendasi area materi yang perlu diperkuat oleh user.

Produk ini bukan platform belajar penuh, bukan chatbot AI, dan tidak menyediakan fitur pembahasan soal otomatis per soal pada MVP. Fitur RAG berbasis materi belajar lengkap dan vector database tidak wajib untuk MVP dan direkomendasikan dipindahkan ke Phase 2.

---

# 2. Confirmed Product Direction

## 2.1 Product Positioning

ExamCPNS SHALL diposisikan sebagai:

> Platform tryout CPNS berbayar dengan fitur AI Recommendation setelah ujian.

Bukan sebagai:

- Platform belajar CPNS penuh.
- AI tutor/chatbot interaktif.
- Sistem pembahasan otomatis per soal.
- Internal tool saja.

## 2.2 Primary Business Goal

Tujuan utama produk adalah menyediakan pengalaman tryout CPNS online berbayar yang dapat membantu user mengetahui performa ujian dan area materi yang harus diperkuat berdasarkan hasil ujian.

## 2.3 Primary User Value

User mendapatkan:

1. Simulasi ujian CPNS yang realistis.
2. Skor otomatis berdasarkan format TWK, TIU, dan TKP.
3. Riwayat performa ujian.
4. Identifikasi area kelemahan.
5. Rekomendasi AI tentang materi yang perlu dipelajari atau diperkuat.

---

# 3. Scope Refinement

## 3.1 In Scope — MVP v1.1

| ID | Feature Area | Status | Description |
|---|---|---|---|
| SC-001 | Authentication | In Scope | Registrasi, login, email verification, reset password, session management |
| SC-002 | Role & Permission | In Scope | Role: SUPER_ADMIN, ADMIN, USER |
| SC-003 | Bank Soal Manual | In Scope | Admin dapat input, edit, soft delete, search, dan filter soal |
| SC-004 | Upload Soal via PDF | In Scope | Admin upload PDF, sistem melakukan AI parsing, hasil wajib direview |
| SC-005 | AI PDF Classification | In Scope | AI membantu mendeteksi kategori, sub-kategori, topic tag, difficulty, opsi jawaban, dan kunci jawaban jika tersedia |
| SC-006 | Exam Engine | In Scope | User mengerjakan tryout CPNS dengan timer, navigasi soal, flag soal, auto-submit, dan manual submit |
| SC-007 | Scoring Engine | In Scope | TWK/TIU berbobot 5/0, TKP berbobot 1-5 per opsi |
| SC-008 | Passing Grade Check | In Scope | Sistem menampilkan status lulus/tidak lulus berdasarkan threshold yang dikonfigurasi |
| SC-009 | Result & Review | In Scope | User melihat skor, benar/salah, dan breakdown kategori/sub-kategori |
| SC-010 | AI Recommendation After Exam | In Scope | AI menghasilkan rekomendasi area materi yang harus diperkuat berdasarkan hasil ujian |
| SC-011 | Exam History | In Scope | User melihat riwayat ujian dan rekomendasi sebelumnya |
| SC-012 | Trial Access | In Scope | User baru mendapat trial terbatas |
| SC-013 | Subscription | In Scope | Paket berlangganan bulanan dan/atau beberapa bulan |
| SC-014 | Payment Gateway | In Scope | Integrasi payment gateway untuk aktivasi otomatis subscription |
| SC-015 | Admin Panel | In Scope | Dashboard admin untuk mengelola soal, user, payment, dan hasil parsing |
| SC-016 | Super Admin Panel | In Scope | Super Admin mengelola admin, konfigurasi, subscription plan, dan seluruh data sistem |
| SC-017 | Tryout Catalog | In Scope | User sees available published tryouts based on access. |
| SC-018 | Configurable Tryout Generation | In Scope | Super Admin configures generated/manual tryouts. |
| SC-019 | Question Selection Engine | In Scope | Backend selects questions using configured rules. |
| SC-020 | Manual Question Set | In Scope | Supports curated premium/event tryouts. |
| SC-021 | Availability Check | In Scope | Validates whether enough active questions exist. |
| SC-022 | Tryout Draft Workflow | In Scope | Admin may create draft tryout for review. |

## 3.2 Out of Scope — MVP v1.1

| ID | Feature | Reason |
|---|---|---|
| OS-001 | AI Chatbot | Produk bukan AI tutor interaktif |
| OS-002 | AI Pembahasan Otomatis per Soal | Tidak dikonfirmasi sebagai kebutuhan MVP |
| OS-003 | Learning Module / Materi Belajar Lengkap | Produk bukan platform belajar |
| OS-004 | Vector DB Materi Belajar | Tidak wajib karena rekomendasi berbasis hasil ujian dan metadata soal |
| OS-005 | Materi Embedding Pipeline | Dipindahkan ke Phase 2 jika dibutuhkan |
| OS-006 | Forum Diskusi | Tidak relevan untuk MVP |
| OS-007 | Live Class / Webinar | Di luar positioning produk |
| OS-008 | Mobile Native App | Web responsive cukup untuk MVP |
| OS-009 | Gamification / Leaderboard | Tidak prioritas MVP |
| OS-010 | Export PDF Performance Report | Bisa Phase 2 |
| OS-011 | Adaptive Weak Area Tryout | Phase 2; requires mature user history and selection algorithm. |
| OS-012 | Fully AI-generated Questions | Risk to quality and not aligned with approved question bank process. |
| OS-013 | Public Marketplace for Tryout Creators | Beyond current SaaS control model. |

---

# 4. Key Requirement Decisions

## 4.X Tryout Catalog Decision

Tryout Catalog SHALL replace simple Tryout Catalog configuration for new development.

| ID | Decision |
|---|---|
| DEC-011 | Tryout Catalog replaces simple Exam Config for new development. |
| DEC-012 | `POST /exams/start` SHALL use `tryoutCatalogId`. |
| DEC-013 | Question Selection Engine SHALL be backend-only and not exposed to user. |
| DEC-014 | User-facing UI SHALL remain simple: Tryout card → Mulai Ujian → Exam Room. |
| DEC-015 | Admin can draft tryout; Super Admin controls publish. |
| DEC-016 | Manual Question Set supports premium/event monetization. |
| DEC-017 | Generated tryout supports topic distribution and difficulty distribution. |


## 4.1 AI Recommendation Decision

AI Recommendation SHALL berjalan setelah user menyelesaikan ujian. Implementasi AI Recommendation pada MVP SHALL menggunakan pendekatan:

> Backend-driven performance analytics + AI-generated recommendation narrative.

Artinya, backend bertanggung jawab menentukan fakta performa user, sedangkan AI hanya membantu menyusun narasi rekomendasi yang mudah dipahami.

### 4.1.1 Backend Responsibility

Backend SHALL:

1. Menghitung skor TWK, TIU, TKP, dan total.
2. Mengevaluasi passing grade.
3. Membuat performance breakdown berdasarkan category, subCategory, topicTag, dan difficulty.
4. Menghitung accuracy, wrongAnswerRate, correctAnswers, wrongAnswers, dan emptyAnswers.
5. Menentukan weak areas.
6. Menghitung priorityScore.
7. Menentukan priorityLevel.
8. Menentukan reasonCodes.
9. Menganalisis trend dari histori ujian jika tersedia.
10. Memilih top 3–5 weak areas untuk dikirim ke AI.
11. Memvalidasi output AI.
12. Membuat fallback recommendation jika AI gagal.

### 4.1.2 AI Responsibility

AI SHALL:

1. Menghasilkan summary.
2. Menghasilkan overallAssessment.
3. Menghasilkan reason yang mudah dipahami user.
4. Menghasilkan suggestedFocus.
5. Menghasilkan nextTryoutStrategy.

AI SHALL NOT:

1. Menjadi chatbot.
2. Menjawab pertanyaan bebas dari user.
3. Membuat pembahasan soal otomatis satu per satu pada MVP.
4. Menggunakan materi belajar lengkap sebagai syarat utama rekomendasi.
5. Menentukan skor.
6. Menentukan passing grade.
7. Menentukan sendiri weak area di luar data yang diberikan backend.
8. Membuat topicTag yang tidak ada pada payload.
9. Memberikan klaim “pasti lulus”.

### 4.1.3 Weak Area Detection Rule

Sebuah area dianggap lemah jika:

```text
accuracy < 70
AND totalQuestions >= 3
```

Jika tidak ada weak area signifikan, sistem SHALL membuat positive maintenance recommendation.

### 4.1.4 Priority Score Formula

Backend SHOULD menggunakan formula:

```text
priorityScore =
  wrongAnswerRateScore * 40
+ questionWeightScore * 20
+ passingGradeImpactScore * 25
+ difficultyWeightScore * 10
+ historyTrendScore * 5
```

Priority level:

| Priority Score | Priority Level |
|---:|---|
| 75–100 | HIGH |
| 50–74 | MEDIUM |
| 0–49 | LOW |

### 4.1.5 Reason Codes

| Reason Code | Description |
|---|---|
| LOW_ACCURACY | Accuracy below threshold |
| LOW_ACCURACY_AND_CATEGORY_NOT_PASSED | Low accuracy and category below passing grade |
| REPEATED_WEAKNESS | Same weakness appears across multiple exams |
| DECLINING_TREND | Accuracy is decreasing |
| EASY_MEDIUM_FAILURE | User failed easy/medium questions |
| HIGH_SCORE_IMPACT | Weak area caused significant score loss |
| NEW_WEAK_AREA | Weakness appears for first time |
| NO_SIGNIFICANT_WEAKNESS | Positive maintenance recommendation |

### 4.1.6 Trend Analysis

Backend SHOULD analyze the latest 2–5 submitted exams using the same grouping key:

```text
category + subCategory + topicTag
```

Trend values:

| Trend | Definition |
|---|---|
| improving | Accuracy increased by at least 10 percentage points |
| declining | Accuracy decreased by at least 10 percentage points |
| stagnant | Accuracy change within ±10 percentage points |
| new_weak_area | Topic appears weak for first time |
| no_history | No previous exam data |

## 4.2 Role Decision

MVP SHALL menggunakan 3 role:

| Role | Description |
|---|---|
| SUPER_ADMIN | Akses penuh ke seluruh sistem, konfigurasi, admin, user, soal, subscription, payment, dan laporan |
| ADMIN | Mengelola bank soal, upload PDF, review parsing, melihat user, melihat transaksi, dan monitoring ujian |
| USER | Mengikuti tryout, melihat hasil, melihat rekomendasi AI, mengelola profil, trial, subscription, dan payment |

## 4.3 Question Source Decision

Sumber soal MVP SHALL hanya berasal dari:

1. Input manual oleh Admin.
2. Upload PDF kumpulan soal oleh Admin.

Generated question by AI SHALL NOT masuk scope MVP.

## 4.4 Subscription Decision

MVP SHALL mencakup trial + payment gateway. User baru mendapatkan akses trial terbatas. Setelah trial habis, user harus melakukan pembayaran untuk melanjutkan akses tryout.

---

# 5. Requirement Gap Analysis

## 5.1 Gap Summary

| Area | Current State in PRD/N8N | Gap | Recommended Action |
|---|---|---|---|
| AI Recommendation | Mengarah ke RAG dengan materi belajar dan vector DB | Terlalu luas untuk produk yang bukan platform belajar | Ubah menjadi AI Recommendation berbasis exam result + question metadata, dengan backend weak area detection dan AI sebagai narrative generator |
| Question Metadata | Ada kategori dan sub-kategori | Belum cukup untuk rekomendasi spesifik | Tambahkan topicTag dan competencyArea |
| Role | PRD menyebut user dan admin | Belum ada SUPER_ADMIN secara eksplisit | Tambahkan role SUPER_ADMIN, ADMIN, USER |
| Payment | Trial + payment sudah ada | Perlu definisi status subscription dan webhook handling | Tambahkan requirement status lifecycle dan webhook idempotency |
| PDF Parsing | Sudah ada upload PDF + review | Belum eksplisit perlu topicTag dan confidence score | Tambahkan output parsing: topicTag, difficulty, confidenceScore |
| Passing Grade | Ditulis sebagai threshold tetap | Bisa berubah sesuai kebijakan resmi | Simpan passing grade sebagai configurable setting |
| AI Failure | Ada fallback umum di N8N | Belum masuk requirement PRD | Tambahkan fallback recommendation berbasis statistik |
| Exam Integrity | Anti-cheat basic ada | Perlu dinyatakan bukan anti-cheat kuat | Batasi sebagai event logging tab switch |
| Timeline | Semua fitur dalam 4 minggu | Risiko tinggi | Prioritaskan implementation path yang modular |

---

# 6. Revised Functional Requirements

## 6.1 Role & Permission

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-RBAC-001 | Sistem SHALL menyediakan role SUPER_ADMIN, ADMIN, dan USER. | Critical | Setiap akun memiliki tepat satu role aktif. |
| FR-RBAC-002 | SUPER_ADMIN SHALL memiliki akses penuh ke seluruh modul sistem. | Critical | SUPER_ADMIN dapat mengelola admin, user, soal, subscription plan, payment, dan konfigurasi sistem. |
| FR-RBAC-003 | ADMIN SHALL dapat mengelola bank soal, upload PDF, review parsing, melihat user, dan melihat transaksi. | Critical | ADMIN tidak dapat membuat/menghapus SUPER_ADMIN. |
| FR-RBAC-004 | USER SHALL hanya dapat mengakses fitur peserta ujian. | Critical | USER tidak dapat mengakses endpoint admin. |
| FR-RBAC-005 | Sistem SHALL menerapkan authorization guard pada seluruh endpoint protected. | Critical | Request tanpa permission sesuai role ditolak dengan HTTP 403. |

## 6.2 Question Metadata

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-QMETA-001 | Setiap soal SHALL memiliki category: TWK, TIU, atau TKP. | Critical | Soal tidak dapat aktif tanpa category. |
| FR-QMETA-002 | Setiap soal SHALL memiliki subCategory sesuai category. | Critical | Sistem memvalidasi subCategory berdasarkan category. |
| FR-QMETA-003 | Setiap soal SHALL memiliki topicTag untuk mendukung AI Recommendation. | Critical | Soal tidak dapat masuk status active tanpa minimal satu topicTag. |
| FR-QMETA-004 | Setiap soal SHALL memiliki difficulty: easy, medium, atau hard. | High | Difficulty wajib diisi saat input manual atau review parsing. |
| FR-QMETA-005 | Sistem SHOULD menyediakan competencyArea untuk mengelompokkan topik yang lebih luas. | Medium | competencyArea dapat digunakan dalam laporan rekomendasi. |

## 6.3 Manual Question Management

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-QBANK-001 | ADMIN SHALL dapat menambahkan soal manual. | Critical | Soal tersimpan dalam status draft atau active sesuai validasi. |
| FR-QBANK-002 | ADMIN SHALL dapat mengedit soal, opsi, kunci jawaban, bobot TKP, category, subCategory, topicTag, dan difficulty. | Critical | Perubahan berlaku untuk sesi ujian baru, tidak mengubah hasil ujian historis. |
| FR-QBANK-003 | ADMIN SHALL dapat melakukan soft delete soal. | High | Soal tidak muncul pada ujian baru tetapi tetap tersimpan untuk data historis. |
| FR-QBANK-004 | ADMIN SHALL dapat mencari dan memfilter soal. | High | Filter mendukung category, subCategory, topicTag, difficulty, status, dan sourceType. |

## 6.4 PDF Parsing with AI

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-PDF-001 | ADMIN SHALL dapat mengupload PDF kumpulan soal. | Critical | Sistem menerima file PDF dengan batas ukuran yang dikonfigurasi, default maksimum 20MB. |
| FR-PDF-002 | Sistem SHALL mengirim PDF ke AI parsing workflow. | Critical | Workflow menerima file dan mengembalikan daftar soal terstruktur. |
| FR-PDF-003 | AI Parsing SHALL mengekstrak questionText, options A-E, correctAnswer jika tersedia, category, subCategory, topicTag, difficulty, dan explanation jika tersedia. | Critical | Output parsing memiliki field terstruktur untuk review admin. |
| FR-PDF-004 | AI Parsing SHOULD menghasilkan confidenceScore untuk setiap soal. | High | Soal dengan confidenceScore rendah ditandai perlu review khusus. |
| FR-PDF-005 | Hasil parsing SHALL masuk status pending_review. | Critical | Tidak ada soal hasil parsing yang langsung aktif tanpa approval admin. |
| FR-PDF-006 | ADMIN SHALL dapat approve, edit, atau reject setiap soal hasil parsing. | Critical | Hanya soal approved yang dapat masuk bank soal aktif. |
| FR-PDF-007 | Sistem SHALL menampilkan error jika PDF tidak dapat dibaca. | High | Admin menerima pesan error yang jelas dan actionable. |

## 6.5 Exam Engine

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-EXAM-001 | USER SHALL dapat memulai tryout CPNS jika trial/subscription aktif. | Critical | User tanpa akses aktif diarahkan ke paywall. |
| FR-EXAM-002 | Sistem SHALL membuat sesi ujian dengan komposisi TWK, TIU, dan TKP sesuai konfigurasi. | Critical | Default SKD: TWK 30, TIU 35, TKP 45. |
| FR-EXAM-003 | Sistem SHALL menampilkan timer ujian. | Critical | Default waktu ujian 100 menit. |
| FR-EXAM-004 | USER SHALL dapat memilih jawaban, berpindah soal, dan menandai soal ragu-ragu. | Critical | Status jawaban tersimpan dan terlihat pada panel navigasi. |
| FR-EXAM-005 | Sistem SHALL melakukan auto-save jawaban setiap kali user memilih opsi. | Critical | Jawaban tetap tersedia saat user reconnect. |
| FR-EXAM-006 | Sistem SHALL melakukan auto-submit saat waktu habis. | Critical | Jawaban tersimpan dihitung, jawaban kosong bernilai 0. |
| FR-EXAM-007 | USER SHALL dapat submit manual dengan konfirmasi. | Critical | Setelah submit, user tidak dapat mengubah jawaban. |
| FR-EXAM-008 | Sistem SHOULD mencatat tab switch event selama ujian. | Medium | Event tersimpan sebagai log, bukan penentu diskualifikasi otomatis. |

## 6.6 Scoring & Result

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-SCORE-001 | Sistem SHALL menghitung skor TWK dan TIU dengan bobot benar = 5, salah/kosong = 0. | Critical | Skor TWK dan TIU akurat berdasarkan answerKey. |
| FR-SCORE-002 | Sistem SHALL menghitung skor TKP berdasarkan bobot 1-5 pada opsi yang dipilih. | Critical | Skor TKP tidak menggunakan benar/salah konvensional. |
| FR-SCORE-003 | Sistem SHALL menampilkan skor per kategori dan skor total. | Critical | Result tersedia maksimal 3 detik setelah submit, tidak termasuk waktu AI recommendation. |
| FR-SCORE-004 | Sistem SHALL mengevaluasi passing grade berdasarkan konfigurasi aktif. | Critical | Passing grade dapat diperbarui oleh SUPER_ADMIN. |
| FR-SCORE-005 | Sistem SHALL menampilkan breakdown benar/salah per category, subCategory, topicTag, dan difficulty. | Critical | Breakdown digunakan sebagai input AI Recommendation. |
| FR-SCORE-006 | USER SHALL dapat melihat review jawaban benar/salah setelah ujian. | High | User melihat jawaban sendiri dan status benar/salah. |

## 6.7 AI Recommendation After Exam

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-AI-001 | Sistem SHALL menganalisis hasil ujian user setelah submit berdasarkan jawaban benar/salah, category, subCategory, topicTag, difficulty, dan skor. | Critical | Sistem menghasilkan weakAreas dari data hasil ujian. |
| FR-AI-002 | Sistem SHALL mengidentifikasi minimal 3 dan maksimal 5 area kelemahan utama user. | Critical | Area kelemahan dihitung berdasarkan persentase kesalahan, jumlah soal, dan prioritas kategori. |
| FR-AI-003 | Sistem SHALL mengirim summary performa ke AI workflow untuk menghasilkan rekomendasi. | Critical | Payload tidak mengirim data sensitif yang tidak diperlukan. |
| FR-AI-004 | AI SHALL menghasilkan rekomendasi yang mencakup category, subCategory, topicTag, alasan rekomendasi, dan suggestedFocus. | Critical | Output AI valid JSON dan dapat dirender di dashboard. |
| FR-AI-005 | Sistem SHALL menyimpan rekomendasi AI pada exam result. | Critical | Rekomendasi dapat dilihat ulang dari riwayat ujian. |
| FR-AI-006 | Sistem SHALL menampilkan rekomendasi AI maksimal 30 detik setelah hasil ujian tersedia. | High | Jika lebih dari 30 detik, sistem menampilkan status processing atau fallback. |
| FR-AI-007 | Jika AI gagal, sistem SHALL menampilkan fallback recommendation berbasis statistik. | Critical | User tetap menerima rekomendasi tanpa narasi AI. |
| FR-AI-008 | AI SHALL NOT menghasilkan rekomendasi di luar data hasil ujian dan metadata soal. | Critical | Prompt membatasi AI pada evidence yang dikirim sistem. |
| FR-AI-009 | Sistem SHOULD menggunakan histori 2-5 ujian terakhir untuk mendeteksi pola kelemahan berulang. | Medium | Jika histori belum cukup, rekomendasi berbasis ujian terbaru. |

## 6.8 Subscription & Payment

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-SUB-001 | Sistem SHALL memberikan trial kepada user baru. | Critical | Trial aktif otomatis setelah email verified. |
| FR-SUB-002 | Sistem SHALL membatasi akses tryout ketika trial atau subscription tidak aktif. | Critical | User diarahkan ke paywall saat mencoba mulai ujian. |
| FR-SUB-003 | SUPER_ADMIN SHALL dapat mengelola subscription plan. | Critical | Plan memiliki nama, durasi, harga, status aktif/nonaktif. |
| FR-SUB-004 | USER SHALL dapat memilih paket subscription dan melakukan pembayaran. | Critical | Sistem membuat transaksi dan mengarahkan user ke payment gateway. |
| FR-SUB-005 | Sistem SHALL menerima payment webhook dari payment gateway. | Critical | Webhook success mengaktifkan subscription user. |
| FR-SUB-006 | Payment webhook SHALL bersifat idempotent. | Critical | Webhook duplikat tidak membuat subscription ganda. |
| FR-SUB-007 | ADMIN dan SUPER_ADMIN SHALL dapat melihat riwayat transaksi. | High | Transaksi dapat difilter berdasarkan status dan tanggal. |
| FR-SUB-008 | SUPER_ADMIN SHALL dapat melakukan manual activation jika payment gateway bermasalah. | High | Aktivasi manual tercatat di audit log. |

---

# 7. AI Recommendation Data Design

## 7.1 Minimum Input Payload to AI

```json
{
  "userId": "user-001",
  "examId": "exam-001",
  "examDate": "2026-05-14T10:00:00+07:00",
  "score": {
    "twk": 60,
    "tiu": 95,
    "tkp": 170,
    "total": 325
  },
  "passingGradeStatus": {
    "twk": "NOT_PASSED",
    "tiu": "PASSED",
    "tkp": "PASSED",
    "overall": "PASSED"
  },
  "weakAreas": [
    {
      "category": "TWK",
      "subCategory": "Tata Negara",
      "topicTag": "Hak dan Kewajiban Warga Negara",
      "totalQuestions": 8,
      "wrongAnswers": 6,
      "correctAnswers": 2,
      "accuracy": 25,
      "dominantDifficulty": "medium"
    }
  ],
  "recentTrend": [
    {
      "category": "TWK",
      "subCategory": "Tata Negara",
      "accuracyTrend": "declining"
    }
  ]
}
```

## 7.2 Expected AI Output

```json
{
  "summary": "Area terlemah Anda berada pada TWK - Tata Negara, khususnya Hak dan Kewajiban Warga Negara.",
  "overallAssessment": "Skor total Anda sudah memenuhi ambang total, tetapi skor TWK masih perlu diperkuat agar lebih aman.",
  "recommendations": [
    {
      "priority": 1,
      "category": "TWK",
      "subCategory": "Tata Negara",
      "topic": "Hak dan Kewajiban Warga Negara",
      "reason": "Anda salah 6 dari 8 soal pada topik ini dengan akurasi 25%.",
      "suggestedFocus": [
        "Pelajari kembali konsep hak, kewajiban, dan tanggung jawab warga negara.",
        "Perkuat pemahaman pasal-pasal UUD 1945 yang berkaitan dengan warga negara.",
        "Latih soal studi kasus tentang penerapan hak dan kewajiban dalam kehidupan bernegara."
      ],
      "priorityLevel": "HIGH"
    }
  ],
  "nextTryoutStrategy": "Pada tryout berikutnya, fokus evaluasi pada peningkatan akurasi TWK terutama Tata Negara hingga minimal 70%."
}
```

## 7.3 Fallback Recommendation Logic

Jika AI gagal, sistem SHALL menghasilkan rekomendasi otomatis berbasis template:

```text
Anda paling banyak salah pada {category} - {subCategory}, terutama topik {topicTag}. Dari {totalQuestions} soal, Anda menjawab salah {wrongAnswers} soal. Prioritaskan belajar pada topik ini sebelum mengikuti tryout berikutnya.
```

---

# 8. Revised N8N Workflow Scope

## 8.1 Workflow Retained for MVP

| Workflow | Status | Notes |
|---|---|---|
| PDF Parsing Pipeline | Retain | Digunakan untuk parsing soal dari PDF dan klasifikasi metadata |
| AI Recommendation Pipeline | Retain | Digunakan untuk rekomendasi setelah ujian |

## 8.2 Workflow Deferred to Phase 2

| Workflow | Status | Reason |
|---|---|---|
| Materi Embedding Pipeline | Deferred | Produk bukan platform belajar penuh |
| Vector DB Query for Learning Materials | Deferred | Rekomendasi MVP cukup berbasis hasil ujian dan metadata soal |
| ChromaDB/Qdrant Setup | Optional/Deferred | Tidak wajib untuk MVP jika tidak ada knowledge base materi |

## 8.3 Simplified AI Recommendation Workflow

1. Webhook menerima exam performance payload dari backend.
2. Code node menghitung/validasi weak areas jika belum dihitung backend.
3. LLM node menghasilkan rekomendasi JSON.
4. Code node validasi JSON output.
5. Respond to webhook mengirim hasil ke backend.
6. Backend menyimpan rekomendasi pada exam result.

---

# 9. Data Model Implications

## 9.1 Required Entities

| Entity | Purpose |
|---|---|
| User | Menyimpan akun user, admin, dan super admin |
| Role | Role berbasis enum: SUPER_ADMIN, ADMIN, USER |
| Question | Menyimpan soal aktif dan draft |
| QuestionOption | Menyimpan opsi jawaban A-E dan bobot TKP |
| QuestionImportBatch | Menyimpan batch upload PDF |
| ParsedQuestionReview | Menyimpan hasil parsing yang perlu direview |
| ExamSession | Menyimpan sesi ujian user |
| ExamAnswer | Menyimpan jawaban user per soal |
| ExamResult | Menyimpan skor dan status passing grade |
| AIRecommendation | Menyimpan rekomendasi AI per exam result |
| SubscriptionPlan | Menyimpan paket berlangganan |
| UserSubscription | Menyimpan subscription aktif user |
| PaymentTransaction | Menyimpan transaksi payment gateway |
| SystemSetting | Menyimpan konfigurasi passing grade, timer, trial, dan lain-lain |
| AuditLog | Mencatat aksi penting admin/super admin |

## 9.2 Critical Fields for Question

| Field | Required | Purpose |
|---|---|---|
| id | Yes | Unique identifier |
| questionText | Yes | Teks soal |
| category | Yes | TWK/TIU/TKP |
| subCategory | Yes | Klasifikasi materi |
| topicTag | Yes | Dasar rekomendasi AI yang lebih spesifik |
| competencyArea | No | Grouping topik yang lebih luas |
| difficulty | Yes | easy/medium/hard |
| sourceType | Yes | manual/pdf_import |
| status | Yes | draft/pending_review/active/archived |
| explanation | No | Pembahasan opsional, bukan AI chat |

---

# 10. Risks & Mitigation

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-001 | Scope MVP terlalu besar karena mencakup exam, AI, PDF parsing, admin, subscription, dan payment | High | High | Implementasi modular dan prioritaskan core flow daftar → bayar/trial → ujian → skor → rekomendasi |
| R-002 | AI recommendation terlalu generik | Medium | High | Wajibkan topicTag dan difficulty pada setiap soal |
| R-003 | AI salah mengklasifikasi soal dari PDF | High | Medium | Semua hasil parsing wajib pending_review dan approve manual oleh admin |
| R-004 | Payment webhook duplikat atau gagal | Medium | High | Implementasi idempotency key dan manual activation oleh SUPER_ADMIN |
| R-005 | Passing grade berubah | Medium | High | Simpan passing grade di SystemSetting, bukan hardcoded |
| R-006 | User menganggap AI sebagai pembahasan resmi | Medium | Medium | Tampilkan label bahwa rekomendasi berbasis hasil tryout dan bukan jaminan kelulusan |
| R-007 | PDF berupa scan/gambar tidak bisa diparse | High | Medium | Validasi dan beri pesan bahwa MVP hanya mendukung PDF teks; OCR menjadi Phase 2 |
| R-008 | Data historis berubah jika soal diedit | Medium | High | Snapshot soal dan jawaban pada ExamAnswer/ExamSession |

---

# 11. Recommended MVP Implementation Sequence

Walaupun semua fitur PRD masuk MVP, implementasi sebaiknya dilakukan bertahap secara internal.

## Stage 1 — Foundation

1. Project setup.
2. Database schema.
3. Authentication.
4. Role & permission.
5. Basic dashboard layout.

## Stage 2 — Question Bank & Admin

1. Manual question CRUD.
2. Metadata soal: category, subCategory, topicTag, difficulty.
3. Admin question listing, filter, search.
4. Soft delete.

## Stage 3 — Exam Core

1. Exam session creation.
2. Timer.
3. Answer autosave.
4. Manual submit.
5. Auto-submit.
6. Scoring TWK/TIU/TKP.
7. Result page.

## Stage 4 — AI Recommendation

1. Weak area calculation.
2. AI recommendation workflow.
3. Fallback recommendation.
4. Save recommendation to result.
5. Display in result and history.

## Stage 5 — PDF Upload AI

1. PDF upload batch.
2. N8N AI parsing.
3. Parsed question review.
4. Approve/edit/reject.
5. Activate approved questions.

## Stage 6 — Subscription & Payment

1. Trial logic.
2. Paywall.
3. Subscription plan.
4. Payment gateway integration.
5. Payment webhook.
6. Activation and expiry handling.

## Stage 7 — Hardening

1. Audit log.
2. Error handling.
3. Security review.
4. Performance test.
5. Deployment.

---

# 12. SMART Quality Validation

## 12.1 Specific

Requirements sudah dipisahkan antara exam platform, AI recommendation, PDF parsing, subscription, dan role management. AI scope juga sudah dibatasi secara eksplisit.

## 12.2 Measurable

Beberapa requirement memiliki target terukur:

- Result score tampil maksimal 3 detik setelah submit.
- AI recommendation tampil maksimal 30 detik.
- Role unauthorized request ditolak dengan HTTP 403.
- Soal tidak dapat active tanpa category, subCategory, topicTag, dan difficulty.

## 12.3 Achievable

Secara teknis feasible dengan stack Next.js, NestJS, PostgreSQL, Redis, N8N, dan payment gateway. Namun, scope MVP tetap berisiko tinggi jika timeline terlalu pendek.

## 12.4 Relevant

Semua requirement mendukung positioning produk sebagai platform tryout CPNS berbayar dengan AI recommendation.

## 12.5 Time-bound

Timeline awal 4 minggu berisiko tinggi. Jika tetap dipertahankan, fitur harus dikerjakan secara paralel dan beberapa fitur seperti invoice download, reminder email, dan grafik detail dapat dibuat minimal terlebih dahulu.

---

# 13. Final Recommendation

PRD v1.0 sudah valid sebagai fondasi, tetapi perlu direvisi menjadi PRD v1.1 dengan perubahan utama berikut:

1. Ubah istilah RAG Recommendation menjadi AI Recommendation After Exam untuk MVP.
2. Pindahkan vector database dan materi embedding ke Phase 2.
3. Tambahkan topicTag sebagai metadata wajib pada soal.
4. Tetapkan role final: SUPER_ADMIN, ADMIN, USER.
5. Tambahkan requirement payment webhook idempotency.
6. Tambahkan fallback recommendation jika AI gagal.
7. Jadikan passing grade configurable.
8. Tegaskan bahwa AI tidak menyediakan chatbot atau pembahasan otomatis per soal pada MVP.

---

# 14. Open Items for Next Document

Dokumen berikutnya yang direkomendasikan:

1. Software Requirements Specification (SRS) v1.1.
2. Use Case Specification + Mermaid Use Case Diagram.
3. ERD + Entity Definition.
4. System Architecture Document.
5. API Specification.
6. Product Backlog / User Stories.

---

*Document generated: 14 Mei 2026 | Version 1.1 | Status: Draft*

