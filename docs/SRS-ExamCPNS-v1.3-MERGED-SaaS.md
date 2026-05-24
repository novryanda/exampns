# Software Requirements Specification (SRS)
# ExamCPNS — Platform Tryout CPNS Berbayar dengan AI Recommendation

---

| Field | Value |
|---|---|
| Document | Software Requirements Specification |
| Product | ExamCPNS — Platform Tryout CPNS Berbayar |
| Version | 1.3 |
| Date | 14 Mei 2026 |
| Author | System Analyst Pro |
| Status | Draft |
| Based On | BRD/PRD/SRS ExamCPNS v1.2 Integrated |

## Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.1 | 14 Mei 2026 | System Analyst Pro | Original section from BRD/PRD/SRS v1.1 |
| 1.2 | 14 Mei 2026 | System Analyst Pro | Integrated updates where required; replaced outdated AI Recommendation details and added new algorithm rules |
| 1.3 | 14 Mei 2026 | System Analyst Pro | Merged SaaS-ready Configurable Tryout Generation directly into existing sections; replaced simple Tryout Catalog with Tryout Catalog, Generation Rules, Manual Question Set, Question Selection Engine, and updated start exam flow. |

---
# Part C — Software Requirements Specification (SRS)

---

# 1. Introduction

## 1.1 Purpose

Dokumen SRS ini mendefinisikan kebutuhan perangkat lunak untuk ExamCPNS v1.1. Dokumen ini digunakan sebagai acuan bagi product owner, developer, QA engineer, UI/UX designer, dan stakeholder teknis dalam membangun MVP platform tryout CPNS berbayar dengan AI Recommendation.

## 1.2 Intended Audience

| Audience | Usage |
|---|---|
| Product Owner | Validasi scope dan prioritas fitur |
| Developer | Implementasi frontend, backend, database, dan integration |
| QA Engineer | Menyusun test case berdasarkan acceptance criteria |
| UI/UX Designer | Mendesain flow dan interface sesuai requirement |
| System Administrator | Deployment, monitoring, dan konfigurasi |

## 1.3 Product Scope

Sistem mencakup fitur web-based tryout, role-based access, bank soal, PDF parsing AI, scoring engine, AI recommendation, trial, subscription, payment gateway, admin panel, dan super admin configuration.

## 1.4 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|---|---|
| CPNS | Calon Pegawai Negeri Sipil |
| SKD | Seleksi Kompetensi Dasar |
| TWK | Tes Wawasan Kebangsaan |
| TIU | Tes Intelegensi Umum |
| TKP | Tes Karakteristik Pribadi |
| AI | Artificial Intelligence |
| LLM | Large Language Model |
| MVP | Minimum Viable Product |
| JWT | JSON Web Token |
| RBAC | Role-Based Access Control |
| PDF Parsing | Proses ekstraksi dan transformasi soal dari PDF ke data terstruktur |
| Passing Grade | Ambang batas minimum skor kelulusan |
| Webhook | HTTP callback dari external service ke sistem |

---

# 2. Overall Description

## 2.1 Product Perspective

ExamCPNS adalah aplikasi web client-server. Frontend digunakan oleh USER, ADMIN, dan SUPER_ADMIN. Backend menyediakan API untuk authentication, exam, scoring, question bank, subscription, payment, dan AI integration. Database menyimpan data user, soal, ujian, transaksi, dan rekomendasi.

## 2.2 Product Functions

Sistem SHALL menyediakan fungsi utama berikut:

1. User registration and login.
2. Role-based authorization.
3. Trial and subscription access control.
4. Question bank management.
5. PDF upload and AI parsing.
6. Exam session management.
7. Answer autosave and submit.
8. Automatic scoring.
9. Result and review.
10. AI Recommendation after exam.
11. Payment gateway integration.
12. Admin and super admin dashboards.
13. Tryout Catalog management.
14. Configurable Tryout Generation.
15. Manual Question Set and Availability Check.

## 2.3 User Classes

| User Class | Description |
|---|---|
| USER | Peserta tryout yang menggunakan platform untuk latihan ujian CPNS |
| ADMIN | Pengelola konten dan operasional platform |
| SUPER_ADMIN | Pengelola utama dengan akses penuh |

## 2.4 Operating Environment

| Layer | Recommended Technology |
|---|---|
| Frontend | Next.js |
| Backend | NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache / Queue | Redis |
| AI Workflow | N8N or backend service integration |
| Payment | Midtrans or Xendit |
| Deployment | Docker / VPS |

## 2.5 Design Constraints

| ID | Constraint |
|---|---|
| DC-001 | API SHALL use HTTPS in production. |
| DC-002 | Password SHALL be hashed using bcrypt or equivalent secure hashing. |
| DC-003 | Payment card data SHALL NOT be stored in ExamCPNS database. |
| DC-004 | PDF parsing result SHALL require admin approval. |
| DC-005 | Exam answer SHALL be autosaved to prevent data loss. |
| DC-006 | Passing grade SHALL be configurable. |

---

# 3. System Features and Functional Requirements

## 3.X Tryout Catalog & Configurable Tryout Generation

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-TC-001 | Sistem SHALL menyediakan Tryout Catalog untuk USER. | Critical | USER melihat tryout `published` sesuai akses. |
| FR-TC-002 | Tryout Catalog SHALL menyimpan name, description, tryoutType, accessType, status, durationMinutes, totalQuestions, isFeatured, sortOrder. | Critical | Data tampil pada card tryout. |
| FR-TC-003 | SUPER_ADMIN SHALL dapat create, edit, publish, archive, dan duplicate Tryout Catalog. | Critical | Status tryout berubah sesuai action. |
| FR-TC-004 | ADMIN MAY membuat Tryout Draft jika permission aktif. | Medium | Draft tidak tampil ke user. |
| FR-TC-005 | ADMIN SHALL dapat submit Tryout Draft for review. | Medium | Status berubah dari draft ke review. |
| FR-TA-001 | Tryout SHALL support accessType `trial_only`, `paid_only`, `trial_and_paid`, `premium_only`. | Critical | Backend memblokir akses tidak valid. |
| FR-TGR-001 | Tryout SHALL support tryoutType `generated`, `manual`, `hybrid`, `adaptive`. | High | Enum tersedia, launch minimal generated dan manual. |
| FR-TGR-002 | Generated tryout SHALL memiliki Tryout Generation Rules. | Critical | Generated tryout tidak bisa publish tanpa rules. |
| FR-TGR-003 | Rules SHALL define randomizationMode, questionOrderMode, and composition by category. | Critical | Rules tervalidasi sebelum publish. |
| FR-TGR-004 | Rules MAY define difficultyDistribution and topicDistribution. | High | Topic/difficulty distribution tervalidasi jika diisi. |
| FR-MQS-001 | Manual tryout SHALL memiliki Manual Question Set. | Critical | Manual tryout tidak bisa publish tanpa set. |
| FR-MQS-002 | Admin/Super Admin SHALL dapat add/remove/reorder questions in manual set. | Critical | Set items tersimpan dengan question_order. |
| FR-QSE-001 | Sistem SHALL menyediakan Question Selection Engine. | Critical | ExamService memanggil QSE saat start exam. |
| FR-QSE-002 | QSE SHALL memilih soal sesuai tryoutType and rules. | Critical | generated/manual branching benar. |
| FR-QSE-003 | QSE SHALL hanya memilih soal active dengan metadata lengkap untuk generated tryout. | Critical | Soal draft/archived/incomplete tidak masuk. |
| FR-QSE-004 | QSE SHALL validate availability before creating Exam Session. | Critical | Tidak cukup soal returns TRYOUT_NOT_READY. |
| FR-QSE-005 | QSE SHALL snapshot selected questions and tryout rules into Exam Session. | Critical | Refresh tidak random ulang dan historical result stabil. |
| FR-EXAM-START-001 | `POST /exams/start` SHALL accept `tryoutCatalogId`. | Critical | `examConfigId` deprecated. |
| FR-EXAM-START-002 | Backend SHALL validate Tryout Catalog status = published. | Critical | draft/review/archived blocked. |

### Supported Randomization Modes

| Mode | Launch Status |
|---|---|
| random_by_category | Active |
| random_by_category_and_difficulty | Optional |
| random_by_topic_distribution | Active |
| manual_question_set | Active |
| hybrid_manual_and_random | Prepared |
| adaptive_weak_area | Phase 2 |

### AI Recommendation Compatibility

AI Recommendation SHALL remain backend-driven after exam and SHALL use:

```text
Exam Session Questions snapshots
↓
Exam Answers
↓
Exam Result breakdown_json
↓
Weak Area Detection
↓
AI Recommendation
```

AI Recommendation SHALL NOT depend on live Tryout Generation Rules for historical results.


## 3.1 Authentication & User Management

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-AUTH-001 | Sistem SHALL menyediakan registrasi user dengan nama, email, password, dan nomor telepon. | Critical | User baru tersimpan dengan status email unverified. |
| FR-AUTH-002 | Sistem SHALL mengirim email verification setelah registrasi. | Critical | Link verifikasi valid selama 24 jam. |
| FR-AUTH-003 | Sistem SHALL mengaktifkan akun setelah email diverifikasi. | Critical | User dapat login setelah verifikasi sukses. |
| FR-AUTH-004 | Sistem SHALL menyediakan login menggunakan email dan password. | Critical | Kredensial valid menghasilkan access token dan refresh token. |
| FR-AUTH-005 | Sistem SHALL menolak login untuk email yang belum diverifikasi. | High | User menerima pesan untuk verifikasi email. |
| FR-AUTH-006 | Sistem SHALL menyediakan reset password melalui email. | High | Link reset valid selama 1 jam. |
| FR-AUTH-007 | Sistem SHALL menyediakan logout. | Medium | Refresh token user tidak dapat digunakan lagi setelah logout. |
| FR-AUTH-008 | Sistem SHALL menyediakan halaman profil user. | Medium | User dapat mengubah nama dan password. |

## 3.2 Role-Based Access Control

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-RBAC-001 | Sistem SHALL mendukung role SUPER_ADMIN, ADMIN, dan USER. | Critical | Setiap akun memiliki satu role aktif. |
| FR-RBAC-002 | SUPER_ADMIN SHALL memiliki akses penuh. | Critical | SUPER_ADMIN dapat mengakses seluruh modul. |
| FR-RBAC-003 | ADMIN SHALL dapat mengelola soal, parsing PDF, user view, transaksi view, dan monitoring. | Critical | ADMIN tidak dapat mengelola SUPER_ADMIN. |
| FR-RBAC-004 | USER SHALL hanya dapat mengakses fitur peserta ujian. | Critical | USER tidak dapat mengakses endpoint admin. |
| FR-RBAC-005 | Sistem SHALL mengembalikan HTTP 403 untuk akses tanpa permission. | Critical | Endpoint protected memiliki authorization guard. |

## 3.3 Trial, Subscription, and Access Control

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-SUB-001 | Sistem SHALL memberikan trial otomatis kepada user baru setelah email verified. | Critical | Trial status tampil di dashboard user. |
| FR-SUB-002 | Trial SHALL dibatasi berdasarkan konfigurasi jumlah tryout atau jumlah hari. | Critical | Default trial: 3 tryout atau 7 hari, mana yang lebih dulu tercapai. |
| FR-SUB-003 | Sistem SHALL memblokir mulai ujian baru jika trial/subscription tidak aktif. | Critical | User diarahkan ke paywall. |
| FR-SUB-004 | SUPER_ADMIN SHALL dapat membuat dan mengubah subscription plan. | Critical | Plan berisi nama, harga, durasi, status, dan deskripsi. |
| FR-SUB-005 | USER SHALL dapat memilih subscription plan. | Critical | Sistem membuat pending payment transaction. |
| FR-SUB-006 | Sistem SHALL mengarahkan user ke payment gateway. | Critical | User mendapatkan payment URL atau payment instruction. |
| FR-SUB-007 | Sistem SHALL menerima webhook payment success. | Critical | Subscription aktif maksimal 1 menit setelah webhook success diterima. |
| FR-SUB-008 | Sistem SHALL menangani webhook secara idempotent. | Critical | Webhook duplikat tidak membuat subscription ganda. |
| FR-SUB-009 | Sistem SHALL menandai subscription expired setelah endDate terlewati. | High | User expired tidak dapat memulai ujian baru. |
| FR-SUB-010 | SUPER_ADMIN SHALL dapat melakukan manual activation. | High | Manual activation tercatat dalam audit log. |

## 3.4 Question Bank Management

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-QBANK-001 | ADMIN SHALL dapat menambahkan soal manual. | Critical | Soal tersimpan jika validasi terpenuhi. |
| FR-QBANK-002 | Soal SHALL memiliki questionText, category, subCategory, topicTag, difficulty, sourceType, dan status. | Critical | Soal tidak bisa active tanpa field wajib. |
| FR-QBANK-003 | Soal TWK/TIU SHALL memiliki tepat 5 opsi dan satu correctAnswer. | Critical | Sistem menolak soal TWK/TIU tanpa correctAnswer. |
| FR-QBANK-004 | Soal TKP SHALL memiliki tepat 5 opsi dengan bobot masing-masing 1-5. | Critical | Sistem menolak soal TKP tanpa bobot valid. |
| FR-QBANK-005 | ADMIN SHALL dapat mengedit soal. | Critical | Perubahan berlaku untuk ujian baru. |
| FR-QBANK-006 | Sistem SHALL mempertahankan snapshot soal untuk hasil ujian historis. | Critical | Hasil ujian lama tidak berubah ketika soal diedit. |
| FR-QBANK-007 | ADMIN SHALL dapat melakukan soft delete soal. | High | Soal tidak muncul di ujian baru tetapi data historis tetap tersedia. |
| FR-QBANK-008 | ADMIN SHALL dapat search/filter soal. | High | Filter mendukung category, subCategory, topicTag, difficulty, status. |

## 3.5 PDF Upload & AI Parsing

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-PDF-001 | ADMIN SHALL dapat upload file PDF. | Critical | Sistem menerima PDF teks dengan ukuran maksimum default 20MB. |
| FR-PDF-002 | Sistem SHALL membuat import batch untuk setiap upload PDF. | Critical | Batch memiliki status processing, completed, partial_failed, atau failed. |
| FR-PDF-003 | Sistem SHALL mengirim PDF ke AI parsing workflow. | Critical | Workflow mengembalikan daftar parsed questions. |
| FR-PDF-004 | AI SHALL mencoba mengekstrak questionText, options, correctAnswer, category, subCategory, topicTag, difficulty, explanation, dan confidenceScore. | Critical | Output tersedia dalam review queue. |
| FR-PDF-005 | Parsed questions SHALL memiliki status pending_review. | Critical | Tidak ada parsed question langsung active. |
| FR-PDF-006 | ADMIN SHALL dapat approve parsed question. | Critical | Approved question masuk bank soal aktif jika valid. |
| FR-PDF-007 | ADMIN SHALL dapat edit parsed question sebelum approve. | Critical | Perubahan tersimpan dan divalidasi ulang. |
| FR-PDF-008 | ADMIN SHALL dapat reject parsed question. | High | Rejected question tidak masuk bank soal. |
| FR-PDF-009 | Sistem SHALL menampilkan parsing errors. | High | Admin dapat melihat alasan gagal per item/batch. |

## 3.6 Exam Engine

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-EXAM-001 | USER SHALL dapat memulai ujian jika memiliki access aktif. | Critical | User trial/subscription expired diarahkan ke paywall. |
| FR-EXAM-002 | Sistem SHALL membuat exam session dengan komposisi soal sesuai konfigurasi. | Critical | Default: TWK 30, TIU 35, TKP 45. |
| FR-EXAM-003 | Sistem SHALL mengambil soal aktif secara random. | Critical | Soal archived/deleted tidak terpilih. |
| FR-EXAM-004 | Sistem SHALL menampilkan timer countdown. | Critical | Default durasi 100 menit. |
| FR-EXAM-005 | USER SHALL dapat navigasi antar soal. | Critical | Navigasi tidak menghapus jawaban. |
| FR-EXAM-006 | USER SHALL dapat memilih dan mengganti jawaban sebelum submit. | Critical | Jawaban terbaru tersimpan. |
| FR-EXAM-007 | Sistem SHALL autosave jawaban setiap kali user memilih opsi. | Critical | Jawaban tetap ada setelah reconnect. |
| FR-EXAM-008 | USER SHALL dapat menandai soal sebagai ragu-ragu. | Medium | Status flag tampil di panel navigasi. |
| FR-EXAM-009 | Sistem SHALL auto-submit saat timer habis. | Critical | Jawaban kosong dihitung skor 0. |
| FR-EXAM-010 | USER SHALL dapat submit manual dengan konfirmasi. | Critical | Setelah submit, exam session berstatus submitted. |
| FR-EXAM-011 | Sistem SHOULD mencatat tab switch event. | Medium | Event tersimpan sebagai exam integrity log. |

## 3.7 Scoring Engine

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-SCORE-001 | Sistem SHALL menghitung skor TWK dengan benar 5 dan salah/kosong 0. | Critical | Range skor TWK default 0-150. |
| FR-SCORE-002 | Sistem SHALL menghitung skor TIU dengan benar 5 dan salah/kosong 0. | Critical | Range skor TIU default 0-175. |
| FR-SCORE-003 | Sistem SHALL menghitung skor TKP berdasarkan bobot opsi 1-5. | Critical | Range skor TKP default 45-225 jika semua dijawab. |
| FR-SCORE-004 | Sistem SHALL menghitung total skor. | Critical | Total = TWK + TIU + TKP. |
| FR-SCORE-005 | Sistem SHALL mengevaluasi passing grade berdasarkan konfigurasi aktif. | Critical | Threshold dapat diubah SUPER_ADMIN. |
| FR-SCORE-006 | Sistem SHALL menghasilkan breakdown per category, subCategory, topicTag, dan difficulty. | Critical | Breakdown menjadi input AI Recommendation. |
| FR-SCORE-007 | Sistem SHALL menyimpan exam result. | Critical | Result dapat diakses dari history. |

## 3.8 Result, Review, and History

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-RESULT-001 | Sistem SHALL menampilkan result page setelah submit. | Critical | Result memuat skor per kategori dan total. |
| FR-RESULT-002 | Sistem SHALL menampilkan status passing grade. | Critical | Status ditampilkan per kategori dan overall. |
| FR-RESULT-003 | Sistem SHALL menampilkan breakdown performa. | Critical | User melihat kategori/sub-kategori/topik yang lemah. |
| FR-RESULT-004 | USER SHALL dapat melihat jawaban benar/salah. | High | User melihat jawaban user dan status benar/salah. |
| FR-RESULT-005 | Sistem SHALL menyimpan riwayat ujian user. | Critical | History diurutkan dari terbaru. |
| FR-RESULT-006 | USER SHALL dapat membuka detail ujian lama. | High | Detail memuat skor, breakdown, dan rekomendasi AI. |

## 3.9 AI Recommendation After Exam

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-AI-001 | Sistem SHALL menghitung weakAreas dari hasil ujian. | Critical | WeakAreas berisi category, subCategory, topicTag, totalQuestions, wrongAnswers, accuracy, dan difficulty. |
| FR-AI-002 | Sistem SHALL memilih 3-5 weakAreas prioritas. | Critical | Prioritas berdasarkan wrong answer rate, jumlah soal, dan passing grade impact. |
| FR-AI-003 | Sistem SHALL mengirim payload performa ke AI workflow setelah scoring selesai. | Critical | Payload tidak mengandung password, payment data, atau data sensitif tidak relevan. |
| FR-AI-004 | AI workflow SHALL menghasilkan structured JSON recommendation. | Critical | JSON valid dan dapat disimpan ke database. |
| FR-AI-005 | Rekomendasi SHALL mencakup summary, recommendations, reason, suggestedFocus, dan nextTryoutStrategy. | Critical | Field wajib tersedia pada output. |
| FR-AI-006 | Sistem SHALL menyimpan AI Recommendation pada exam result. | Critical | Rekomendasi dapat dilihat dari history. |
| FR-AI-007 | Sistem SHALL menyediakan fallback recommendation jika AI gagal. | Critical | User tetap mendapat rekomendasi berbasis statistik. |
| FR-AI-008 | Sistem SHALL menampilkan rekomendasi maksimal 30 detik setelah result tersedia. | High | Jika belum selesai, UI menampilkan status processing. |
| FR-AI-009 | Sistem SHOULD cache atau membatasi AI call per exam. | Medium | Satu exam result hanya memicu satu rekomendasi aktif kecuali regenerated oleh admin/sistem. |

## 3.10 Admin Dashboard

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-ADMIN-001 | ADMIN SHALL dapat melihat dashboard ringkasan. | High | Ringkasan memuat total user, total soal, upload batch, dan transaksi. |
| FR-ADMIN-002 | ADMIN SHALL dapat melihat daftar user. | High | ADMIN dapat search/filter user. |
| FR-ADMIN-003 | ADMIN SHALL dapat melihat transaksi. | High | ADMIN tidak dapat mengubah konfigurasi payment. |
| FR-ADMIN-004 | ADMIN SHALL dapat mengelola bank soal. | Critical | Semua CRUD soal tersedia. |
| FR-ADMIN-005 | ADMIN SHALL dapat mengelola review hasil parsing. | Critical | Approve/edit/reject tersedia. |

## 3.11 Super Admin Configuration

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-SADMIN-001 | SUPER_ADMIN SHALL dapat mengelola akun ADMIN. | Critical | SUPER_ADMIN dapat create, deactivate, dan reset admin. |
| FR-SADMIN-002 | SUPER_ADMIN SHALL dapat mengelola subscription plan. | Critical | Plan dapat dibuat, diubah, aktif/nonaktif. |
| FR-SADMIN-003 | SUPER_ADMIN SHALL dapat mengelola passing grade. | Critical | Perubahan berlaku untuk ujian baru. |
| FR-SADMIN-004 | SUPER_ADMIN SHALL dapat mengelola konfigurasi trial. | High | Jumlah tryout dan durasi trial dapat diubah. |
| FR-SADMIN-005 | SUPER_ADMIN SHALL dapat melakukan manual subscription activation. | High | Aktivasi manual dicatat dalam audit log. |
| FR-SADMIN-006 | SUPER_ADMIN SHALL dapat melihat audit log. | Medium | Audit log memuat actor, action, target, timestamp. |

---

## 11.9 AI Recommendation After Exam

### 11.9.1 Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-AI-001 | Sistem SHALL membuat AI Recommendation setelah ExamResult tersedia. | Critical | Recommendation status menjadi processing setelah submit berhasil. |
| FR-AI-002 | Sistem SHALL membuat performance breakdown berdasarkan category, subCategory, topicTag, dan difficulty. | Critical | Breakdown berisi totalQuestions, correctAnswers, wrongAnswers, emptyAnswers, accuracy, wrongAnswerRate, dan dominantDifficulty. |
| FR-AI-003 | Sistem SHALL menentukan weak area jika accuracy < 70 dan totalQuestions >= 3. | Critical | Area yang memenuhi rule masuk kandidat rekomendasi. |
| FR-AI-004 | Sistem SHALL menghitung priorityScore untuk setiap weak area. | Critical | priorityScore berada pada rentang 0–100. |
| FR-AI-005 | priorityScore SHALL mempertimbangkan wrongAnswerRate, totalQuestions, passingGradeImpact, difficultyWeight, dan historyTrend. | Critical | Formula terdokumentasi dan dapat diuji. |
| FR-AI-006 | Sistem SHALL menetapkan priorityLevel berdasarkan priorityScore. | Critical | 75–100 HIGH, 50–74 MEDIUM, 0–49 LOW. |
| FR-AI-007 | Sistem SHALL menetapkan reasonCodes untuk setiap weak area. | High | reasonCodes mencakup LOW_ACCURACY, LOW_ACCURACY_AND_CATEGORY_NOT_PASSED, REPEATED_WEAKNESS, DECLINING_TREND, EASY_MEDIUM_FAILURE, HIGH_SCORE_IMPACT, NEW_WEAK_AREA. |
| FR-AI-008 | Sistem SHOULD menganalisis trend dari 2–5 ujian terakhir jika tersedia. | Medium | Trend berupa improving, declining, stagnant, new_weak_area, atau no_history. |
| FR-AI-009 | Sistem SHALL memilih maksimal 5 weak areas dengan priorityScore tertinggi untuk dikirim ke AI. | Critical | Payload AI tidak berisi semua raw answers. |
| FR-AI-010 | Sistem SHALL mengirim payload AI yang hanya berisi data performa relevan. | Critical | Payload tidak mengandung password, token, atau payment data. |
| FR-AI-011 | AI SHALL menghasilkan rekomendasi dalam JSON terstruktur. | Critical | Output berisi summary, overallAssessment, recommendations, dan nextTryoutStrategy. |
| FR-AI-012 | Sistem SHALL memvalidasi output AI sebelum disimpan. | Critical | Output harus valid JSON dan topicTag harus sesuai input weakAreas. |
| FR-AI-013 | Sistem SHALL menolak atau fallback jika AI membuat topicTag yang tidak ada dalam payload. | Critical | Tidak ada invented topic tersimpan. |
| FR-AI-014 | Sistem SHALL menolak output AI yang mengandung klaim jaminan lulus. | High | Output tidak mengandung guarantee. |
| FR-AI-015 | Sistem SHALL membuat fallback recommendation jika AI gagal, timeout, atau output invalid. | Critical | User tetap menerima rekomendasi berbasis statistik. |
| FR-AI-016 | Sistem SHALL menyimpan raw_request_payload dan raw_ai_response untuk traceability. | Medium | Data tersimpan di ai_recommendations. |
| FR-AI-017 | Sistem SHALL menampilkan AI Recommendation di result page, dashboard, dan history detail. | Critical | User dapat melihat rekomendasi setelah dan sesudah ujian. |

### 11.9.2 Backend vs AI Responsibility

| Responsibility | Backend | AI/N8N |
|---|---|---|
| Calculate score | Yes | No |
| Evaluate passing grade | Yes | No |
| Detect weak areas | Yes | No |
| Calculate priority score | Yes | No |
| Determine reason codes | Yes | No |
| Analyze trend | Yes | No |
| Generate recommendation narrative | No | Yes |
| Validate AI output | Yes | No |
| Generate fallback | Yes | No |
| Store recommendation | Yes | No |

### 11.9.3 Weak Area Detection Rule

```text
weakArea = accuracy < 70 AND totalQuestions >= 3
```

### 11.9.4 Priority Score Formula

```text
priorityScore =
  wrongAnswerRateScore * 40
+ questionWeightScore * 20
+ passingGradeImpactScore * 25
+ difficultyWeightScore * 10
+ historyTrendScore * 5
```

### 11.9.5 Fallback Recommendation

Fallback SHALL be generated by backend using template:

```text
Anda paling banyak salah pada {category} - {subCategory}, terutama topik {topicTag}. Dari {totalQuestions} soal, Anda menjawab salah {wrongAnswers} soal dengan akurasi {accuracy}%. Prioritaskan topik ini sebelum mengikuti tryout berikutnya.
```


# 4. External Interface Requirements

## 4.1 User Interface Requirements

| ID | Requirement |
|---|---|
| UI-001 | UI SHALL responsive pada viewport mobile dan desktop. |
| UI-002 | Exam page SHALL menampilkan timer, soal, opsi, panel nomor, dan tombol submit. |
| UI-003 | Result page SHALL menampilkan skor, passing grade, breakdown, dan rekomendasi AI. |
| UI-004 | Admin question form SHALL memvalidasi field wajib sebelum submit. |
| UI-005 | PDF review page SHALL memungkinkan approve/edit/reject per soal. |
| UI-006 | Paywall page SHALL menampilkan status akses dan pilihan paket subscription. |

## 4.2 API Interface Requirements

| ID | Requirement |
|---|---|
| API-001 | Backend SHALL expose REST API for frontend. |
| API-002 | Protected API SHALL require JWT access token. |
| API-003 | Admin API SHALL enforce RBAC. |
| API-004 | Payment webhook endpoint SHALL verify signature from provider. |
| API-005 | AI workflow webhook SHALL use API key or secret header. |

## 4.3 External Service Interfaces

| Service | Purpose | Integration Type |
|---|---|---|
| SMTP Provider | Email verification, reset password, notification | SMTP/API |
| Payment Gateway | Payment creation and webhook confirmation | REST API + Webhook |
| LLM Provider | PDF parsing and AI Recommendation | API via N8N/backend |
| N8N | AI workflow orchestration | Webhook |

---

# 5. Data Requirements

## 5.1 Core Entities

| Entity | Description |
|---|---|
| User | Akun user/admin/super admin |
| Question | Soal ujian |
| QuestionOption | Opsi jawaban dan bobot |
| QuestionImportBatch | Batch upload PDF |
| ParsedQuestionReview | Hasil parsing PDF |
| ExamSession | Sesi ujian |
| ExamAnswer | Jawaban user |
| ExamResult | Hasil skor ujian |
| AIRecommendation | Rekomendasi AI |
| SubscriptionPlan | Paket langganan |
| UserSubscription | Langganan user |
| PaymentTransaction | Transaksi pembayaran |
| SystemSetting | Konfigurasi sistem |
| AuditLog | Log aktivitas penting |

## 5.2 Data Retention

| Data | Retention Rule |
|---|---|
| User account | Disimpan selama akun aktif atau sesuai kebijakan penghapusan |
| Exam history | Disimpan selama akun aktif |
| Payment transaction | Disimpan sesuai kebutuhan audit bisnis |
| Audit log | Minimal 1 tahun |
| Soft-deleted questions | Disimpan untuk menjaga konsistensi histori ujian |

---

# 6. Non-Functional Requirements

## 6.1 Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-PERF-001 | Halaman utama SHALL load cepat pada koneksi 4G. | FCP < 1.5 detik, full load < 3 detik |
| NFR-PERF-002 | API umum SHALL merespons cepat. | p95 < 500ms, tidak termasuk AI/payment external call |
| NFR-PERF-003 | Result scoring SHALL selesai cepat. | < 3 detik setelah submit |
| NFR-PERF-004 | AI Recommendation SHALL tersedia dalam batas wajar. | Maksimal 30 detik atau fallback/processing state |
| NFR-PERF-005 | Sistem SHALL mendukung concurrent users MVP. | Minimal 200 concurrent users |

## 6.2 Security

| ID | Requirement | Target |
|---|---|---|
| NFR-SEC-001 | Password SHALL di-hash. | bcrypt minimum 10 rounds atau setara |
| NFR-SEC-002 | Production traffic SHALL menggunakan HTTPS. | TLS 1.2+ |
| NFR-SEC-003 | API SHALL dilindungi dari common web attacks. | OWASP Top 10 baseline |
| NFR-SEC-004 | Payment data sensitif SHALL NOT disimpan. | Gunakan payment gateway hosted/payment token |
| NFR-SEC-005 | Webhook payment SHALL diverifikasi. | Signature verification |
| NFR-SEC-006 | N8N/AI webhook SHALL dilindungi secret. | x-api-key atau signed request |
| NFR-SEC-007 | Role authorization SHALL diterapkan di backend. | Tidak hanya di frontend |

## 6.3 Reliability

| ID | Requirement | Target |
|---|---|---|
| NFR-REL-001 | Jawaban ujian SHALL autosave. | Setiap perubahan jawaban tersimpan |
| NFR-REL-002 | Sistem SHALL mendukung resume ujian saat reconnect. | User kembali ke sesi aktif jika belum submit |
| NFR-REL-003 | Payment webhook SHALL idempotent. | Tidak ada double activation |
| NFR-REL-004 | AI failure SHALL tidak memblokir hasil ujian. | Fallback recommendation tersedia |

## 6.4 Availability

| ID | Requirement | Target |
|---|---|---|
| NFR-AVL-001 | Sistem SHALL memiliki uptime bulanan minimal. | ≥ 99% |
| NFR-AVL-002 | Database SHALL memiliki backup otomatis. | Harian, retensi minimal 30 hari |

## 6.5 Usability

| ID | Requirement | Target |
|---|---|---|
| NFR-USE-001 | Flow utama daftar → mulai ujian SHALL sederhana. | Maksimal 5 klik setelah login |
| NFR-USE-002 | Exam UI SHALL jelas dan minim distraksi. | Timer, soal, opsi, dan navigasi terlihat jelas |
| NFR-USE-003 | Result page SHALL mudah dipahami. | Skor, status, dan rekomendasi tampil terstruktur |

## 6.6 Maintainability

| ID | Requirement | Target |
|---|---|---|
| NFR-MNT-001 | Backend SHALL modular. | Module auth, exam, question, payment, AI, admin terpisah |
| NFR-MNT-002 | Database schema SHALL versioned. | Migration menggunakan Prisma |
| NFR-MNT-003 | System settings SHALL configurable. | Passing grade, trial, exam duration tidak hardcoded |

---

# 7. System Constraints and Assumptions

## 7.1 Assumptions

| ID | Assumption |
|---|---|
| AS-001 | Soal CPNS pada platform adalah soal latihan, bukan bocoran soal resmi. |
| AS-002 | Format soal MVP adalah pilihan ganda 5 opsi. |
| AS-003 | PDF upload MVP menggunakan PDF teks, bukan scan/gambar. |
| AS-004 | LLM provider tersedia untuk PDF parsing dan AI Recommendation. |
| AS-005 | Payment gateway mendukung webhook real-time. |
| AS-006 | User memiliki koneksi internet selama ujian. |

## 7.2 Dependencies

| ID | Dependency | Impact if Unavailable |
|---|---|---|
| DEP-001 | SMTP Provider | Email verification/reset password gagal |
| DEP-002 | Payment Gateway | Pembayaran otomatis terganggu |
| DEP-003 | LLM Provider | PDF parsing dan AI Recommendation terganggu |
| DEP-004 | N8N Workflow | AI workflow tidak berjalan jika N8N down |
| DEP-005 | Database | Sistem utama tidak dapat berjalan |

---

# 8. Traceability Matrix

| Business Objective | Product Feature | Functional Requirements |
|---|---|---|
| BO-001 | Web Tryout Platform | FR-AUTH, FR-RBAC, FR-EXAM, FR-SCORE |
| BO-002 | AI Weakness Insight | FR-AI, FR-RESULT, FR-QBANK metadata |
| BO-003 | Subscription Revenue | FR-SUB, Payment webhook |
| BO-004 | Valid Question Bank | FR-QBANK, FR-PDF |
| BO-005 | Efficient Content Management | FR-PDF, FR-ADMIN |
| BO-006 | User Retention | FR-RESULT, FR-HISTORY, FR-AI |

---

# 9. SMART Quality Validation

## 9.1 Specific

Requirement telah dikelompokkan berdasarkan modul: auth, RBAC, subscription, question bank, PDF parsing, exam, scoring, result, AI recommendation, admin, dan super admin.

## 9.2 Measurable

Target terukur tersedia, termasuk:

- Scoring < 3 detik.
- AI Recommendation maksimal 30 detik.
- API p95 < 500ms.
- Uptime ≥ 99%.
- 200 concurrent users.

## 9.3 Achievable

Requirement feasible dengan arsitektur web modern. Risiko terbesar adalah jumlah fitur MVP yang luas, terutama integrasi payment, AI, PDF parsing, dan exam engine dalam satu fase.

## 9.4 Relevant

Semua fitur mendukung positioning produk sebagai platform tryout CPNS berbayar dengan AI Recommendation.

## 9.5 Time-bound

Target MVP perlu dipecah ke milestone implementasi. Jika timeline tetap 4 minggu, scope harus dikerjakan modular dan beberapa fitur admin/analytics dibuat versi minimal.

---

# 10. Recommended Next Documents

Dokumen lanjutan yang direkomendasikan:

1. Use Case Specification + Use Case Diagram.
2. ERD + Database Schema Definition.
3. System Architecture Document.
4. API Specification.
5. Product Backlog / User Stories.
6. Test Scenario & Acceptance Test Plan.

---

*Document generated: 14 Mei 2026 | Version 1.1 | Status: Draft*