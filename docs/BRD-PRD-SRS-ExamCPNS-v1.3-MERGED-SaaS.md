# Business Requirements Document (BRD)
# ExamCPNS — Platform Tryout CPNS Berbayar dengan AI Recommendation

---

| Field | Value |
|---|---|
| Document | Business Requirements Document |
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
# Part A — Business Requirements Document (BRD)

---

# 1. Business Overview

## 1.1 Business Context

ExamCPNS adalah platform tryout CPNS berbasis web dengan model bisnis berlangganan. Platform ini menyediakan simulasi ujian CPNS online untuk kategori TWK, TIU, dan TKP. User dapat mengerjakan tryout, memperoleh skor otomatis, melihat status passing grade, meninjau riwayat ujian, dan menerima rekomendasi AI mengenai area materi yang perlu diperkuat berdasarkan hasil ujian.

Produk ini ditujukan untuk calon peserta CPNS yang membutuhkan latihan ujian realistis, terukur, dan terjangkau tanpa harus mengikuti bimbingan belajar konvensional.

## 1.2 Business Problem

Calon peserta CPNS sering menghadapi beberapa masalah utama:

1. Sulit mendapatkan simulasi ujian CPNS yang menyerupai format SKD.
2. Tidak mengetahui area materi yang paling lemah setelah mengerjakan latihan.
3. Hasil latihan sering hanya berupa skor tanpa rekomendasi yang actionable.
4. Bimbingan belajar konvensional relatif mahal dan tidak selalu personal.
5. Pengelolaan bank soal secara manual memakan waktu bagi pengelola platform.

## 1.3 Business Opportunity

ExamCPNS dapat mengisi kebutuhan pasar dengan menyediakan platform tryout CPNS berbayar yang:

1. Mudah diakses melalui web.
2. Menyediakan simulasi ujian CPNS dengan format dan scoring sesuai kebutuhan latihan.
3. Memberikan rekomendasi AI setelah ujian untuk membantu user menentukan fokus belajar.
4. Menggunakan model subscription untuk pendapatan berulang.
5. Mempercepat pengelolaan bank soal melalui input manual dan upload PDF berbantuan AI.
6. Mendukung model SaaS melalui Tryout Catalog yang dapat dipublish, dikunci aksesnya, dan dikonfigurasi untuk beberapa jenis tryout.

---

# 2. Business Objectives

| ID | Business Objective | Success Metric | Target |
|---|---|---|---|
| BO-001 | Menyediakan platform tryout CPNS online berbayar | Platform MVP dapat digunakan untuk daftar, trial, ujian, scoring, rekomendasi AI, dan pembayaran | MVP release |
| BO-002 | Meningkatkan kemampuan user mengenali kelemahan materi | Persentase user yang melihat rekomendasi AI setelah ujian | ≥ 80% dari user yang menyelesaikan ujian |
| BO-003 | Membangun revenue melalui subscription | Trial-to-paid conversion rate | ≥ 10% |
| BO-004 | Menyediakan bank soal terstruktur | Jumlah soal aktif valid dalam 3 bulan pertama | ≥ 500 soal |
| BO-005 | Mengurangi beban input soal manual | Persentase soal dari PDF yang berhasil masuk review | ≥ 70% dari soal yang terdeteksi |
| BO-006 | Meningkatkan retensi user | Monthly active returning users | ≥ 40% |
| BO-007 | Mendukung variasi produk tryout SaaS | Jumlah tryout catalog published | ≥ 3 tryout aktif dalam 3 bulan |
| BO-008 | Meningkatkan monetisasi melalui tryout premium | Revenue dari paid/premium tryout | Tracked monthly |
| BO-009 | Menjaga kualitas komposisi soal | Tryout readiness pass rate | ≥ 95% tryout published lolos availability check |

---

# 3. Business Scope

## 3.1 In Scope

| ID | Scope Item | Description |
|---|---|---|
| BS-001 | Web-based Tryout Platform | Platform dapat diakses melalui browser desktop dan mobile |
| BS-002 | CPNS SKD Simulation | Tryout mencakup TWK, TIU, dan TKP |
| BS-003 | Automatic Scoring | Sistem menghitung skor otomatis sesuai aturan TWK, TIU, dan TKP |
| BS-004 | AI Recommendation | AI memberikan rekomendasi materi yang perlu diperkuat setelah ujian |
| BS-005 | Subscription Business Model | Trial dan pembayaran untuk akses berbayar |
| BS-006 | Admin Question Management | Admin dapat mengelola soal manual dan upload PDF |
| BS-007 | Payment Gateway | Integrasi payment gateway untuk aktivasi subscription |
| BS-008 | Role Management | Role SUPER_ADMIN, ADMIN, dan USER |
| BS-009 | Tryout Catalog | Platform menyediakan katalog tryout yang dapat dipublish ke user. |
| BS-010 | Configurable Tryout Generation | Super Admin dapat mengatur cara soal dipilih melalui generation rules. |
| BS-011 | Manual Question Set | Platform mendukung tryout manual untuk event/premium. |
| BS-012 | Tryout Draft Workflow | Admin dapat membuat draft tryout jika diberi permission. |
| BS-013 | Availability Check | Sistem mengecek kecukupan soal sebelum tryout dipublish atau dimulai. |

## 3.2 Out of Scope

| ID | Out of Scope Item | Reason |
|---|---|---|
| BOS-001 | AI Chatbot | Produk bukan AI tutor interaktif |
| BOS-002 | Learning Module | Produk bukan platform belajar penuh |
| BOS-003 | AI Pembahasan Otomatis per Soal | Tidak menjadi kebutuhan MVP |
| BOS-004 | Native Mobile App | Web responsive cukup untuk MVP |
| BOS-005 | Forum Diskusi | Tidak mendukung tujuan MVP langsung |
| BOS-006 | Live Class / Webinar | Di luar model produk saat ini |
| BOS-007 | Leaderboard / Gamification | Bisa dipertimbangkan Phase 2 |
| BOS-008 | Materi Embedding dan Vector DB | Tidak wajib untuk AI Recommendation MVP |

---

# 4. Stakeholders

| Stakeholder | Role | Interest / Need |
|---|---|---|
| Product Owner | Pemilik produk | Memvalidasi model bisnis dan memastikan produk sesuai kebutuhan pasar |
| SUPER_ADMIN | Pengelola utama sistem | Mengontrol konfigurasi, admin, user, soal, payment, dan subscription |
| ADMIN | Pengelola operasional | Mengelola bank soal, upload PDF, review parsing, dan monitoring user/transaksi |
| USER | Peserta tryout | Mengikuti ujian, melihat skor, riwayat, dan rekomendasi AI |
| Payment Gateway Provider | External service | Memproses pembayaran dan mengirim status transaksi |
| LLM Provider | External service | Memproses PDF parsing dan AI Recommendation |
| Hosting Provider | Infrastructure provider | Menyediakan server aplikasi dan database |

---

# 5. Business Rules

| ID | Business Rule |
|---|---|
| BR-001 | User baru SHALL mendapatkan akses trial setelah akun terverifikasi. |
| BR-002 | User SHALL memiliki akses tryout hanya jika trial atau subscription aktif. |
| BR-003 | Setelah trial berakhir, user SHALL diarahkan ke paywall saat mencoba memulai ujian baru. |
| BR-004 | Subscription SHALL aktif otomatis setelah payment gateway mengirim status pembayaran sukses. |
| BR-005 | SUPER_ADMIN MAY melakukan aktivasi manual jika payment gateway bermasalah. |
| BR-006 | Soal hasil parsing PDF SHALL NOT langsung aktif sebelum disetujui ADMIN. |
| BR-007 | Soal aktif SHALL memiliki category, subCategory, topicTag, difficulty, dan opsi jawaban valid. |
| BR-008 | AI Recommendation SHALL dibuat berdasarkan hasil ujian dan metadata soal. Backend SHALL menentukan weak areas, priorityScore, reasonCodes, dan trend; AI SHALL hanya menghasilkan narasi rekomendasi. |
| BR-009 | Passing grade SHALL disimpan sebagai konfigurasi agar dapat diperbarui. |
| BR-010 | Data ujian historis SHALL tetap konsisten meskipun soal diedit setelah ujian selesai. |
| BR-011 | User SHALL hanya melihat Tryout Catalog dengan status `published`, `is_public=true`, dan accessType yang sesuai. |
| BR-012 | Tryout SHALL memiliki accessType: `trial_only`, `paid_only`, `trial_and_paid`, atau `premium_only`. |
| BR-013 | Tryout generated SHALL memiliki Tryout Generation Rules. |
| BR-014 | Tryout manual SHALL memiliki Manual Question Set. |
| BR-015 | SUPER_ADMIN SHALL menjadi role utama yang dapat publish/archive Tryout Catalog. |
| BR-016 | ADMIN MAY membuat Tryout Draft jika permission diberikan, tetapi tidak boleh publish langsung kecuali diberi permission khusus. |
| BR-017 | Sistem SHALL menyimpan snapshot tryout dan soal pada Exam Session agar hasil historis tidak berubah. |
| BR-018 | Jika jumlah soal aktif tidak mencukupi rules, sistem SHALL menolak start exam dengan `TRYOUT_NOT_READY`. |

---

# 6. Business Risks

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| R-BIZ-001 | Scope MVP terlalu besar | Delivery terlambat | Implementasi modular dan prioritaskan core flow |
| R-BIZ-002 | AI Recommendation terlalu generik | User merasa fitur AI kurang bernilai | Wajibkan topicTag dan difficulty pada setiap soal |
| R-BIZ-003 | PDF parsing tidak akurat | Kualitas bank soal menurun | Wajib review admin sebelum soal aktif |
| R-BIZ-004 | Payment gateway error | Revenue dan aktivasi user terganggu | Webhook idempotency dan manual activation |
| R-BIZ-005 | Passing grade berubah | Hasil simulasi tidak relevan | Jadikan passing grade configurable |
| R-BIZ-006 | Biaya LLM meningkat | Biaya operasional naik | Cache rekomendasi dan batasi call AI per exam |

---

# 7. BRD Acceptance Criteria

| ID | Acceptance Criteria |
|---|---|
| BAC-001 | Produk memiliki alur bisnis lengkap: registrasi, trial, tryout, skor, rekomendasi AI, payment, dan subscription. |
| BAC-002 | SUPER_ADMIN dan ADMIN dapat mengelola operasional platform tanpa akses database langsung. |
| BAC-003 | User dapat memahami area kelemahan setelah ujian melalui rekomendasi AI atau fallback statistik. |
| BAC-004 | Model subscription dapat membatasi dan membuka akses tryout secara otomatis. |
| BAC-005 | Bank soal dapat dikelola melalui input manual dan upload PDF berbantuan AI. |

---



---

# Part B — Product Requirements Document (PRD)

# Product Requirements Document (PRD)
# ExamCPNS — Platform Tryout CPNS Berbayar dengan AI Recommendation

---

| Field | Value |
|---|---|
| Document | Product Requirements Document |
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
# Part B — Product Requirements Document (PRD)

---

# 1. Product Summary

ExamCPNS adalah platform tryout CPNS berbayar berbasis web. Produk menyediakan simulasi ujian CPNS SKD yang terdiri dari TWK, TIU, dan TKP. Setelah ujian selesai, user mendapatkan skor otomatis, status passing grade, review benar/salah, dan rekomendasi AI mengenai materi yang perlu diperkuat berdasarkan pola kesalahan.

Fitur utama produk:

1. Authentication dan role-based access.
2. Trial dan subscription.
3. Payment gateway.
4. Bank soal manual.
5. Upload PDF soal berbantuan AI.
6. Exam engine.
7. Scoring engine.
8. AI Recommendation after exam.
9. Riwayat ujian.
10. Admin panel dan super admin panel.
11. Tryout Catalog SaaS untuk mengelola beberapa jenis tryout.
12. Configurable Tryout Generation untuk generated/manual tryout.

---

# 2. Product Goals & Metrics

| ID | Goal | Metric | Target |
|---|---|---|---|
| PG-001 | User dapat mengikuti tryout CPNS secara online | Completion rate ujian | ≥ 70% dari sesi yang dimulai |
| PG-002 | User mendapat insight kelemahan setelah ujian | AI recommendation generated rate | ≥ 90% dari ujian selesai |
| PG-003 | User trial berubah menjadi paid subscriber | Trial-to-paid conversion | ≥ 10% |
| PG-004 | Platform memiliki bank soal valid | Jumlah soal aktif | ≥ 500 dalam 3 bulan |
| PG-005 | Admin dapat menginput soal lebih efisien | PDF parsing review throughput | ≥ 50 soal per batch PDF teks |
| PG-006 | Platform stabil untuk MVP | Monthly uptime | ≥ 99% |
| PG-007 | User dapat memilih beberapa tryout SaaS | Tryout catalog click-through rate | ≥ 30% user dashboard visitors |
| PG-008 | Sistem dapat membuat sesi ujian dari rules | Start exam success rate | ≥ 95% dari click Mulai Ujian |
| PG-009 | Tryout readiness terjaga | TRYOUT_NOT_READY rate | ≤ 2% dari start attempt |

---

# 3. User Personas

## 3.1 Persona 1 — Fresh Graduate CPNS Candidate

| Attribute | Description |
|---|---|
| Name | Rina |
| Age | 23 |
| Goal | Lolos CPNS pada kesempatan pertama |
| Pain Point | Tidak tahu materi mana yang paling lemah |
| Need | Tryout realistis dan rekomendasi fokus belajar |

## 3.2 Persona 2 — Working Professional CPNS Candidate

| Attribute | Description |
|---|---|
| Name | Budi |
| Age | 28 |
| Goal | Meningkatkan skor setelah beberapa kali gagal CPNS |
| Pain Point | Waktu belajar terbatas dan perlu fokus ke kelemahan utama |
| Need | Hasil ujian, analisis kelemahan, dan rekomendasi prioritas belajar |

## 3.3 Persona 3 — Admin Content

| Attribute | Description |
|---|---|
| Role | ADMIN |
| Goal | Mengelola bank soal dengan cepat dan akurat |
| Pain Point | Input manual soal memakan waktu |
| Need | CRUD soal, upload PDF, parsing AI, dan review hasil parsing |

## 3.4 Persona 4 — Super Admin

| Attribute | Description |
|---|---|
| Role | SUPER_ADMIN |
| Goal | Mengontrol platform, subscription, payment, admin, dan konfigurasi |
| Pain Point | Perlu monitoring operasional dan konfigurasi tanpa intervensi developer |
| Need | Dashboard kontrol penuh, konfigurasi passing grade, subscription plan, dan manual activation |

---

# 4. Product Scope

## 4.X SaaS Tryout Catalog Model

ExamCPNS SHALL support a SaaS-ready Tryout Catalog model.

User-facing model:

```text
Tryout Tersedia
- Tryout SKD CPNS Nasional
- Tryout TWK Intensif
- Tryout TIU Numerik
- Tryout Nasional Minggu 1
```

Backend model:

```text
Tryout Catalog
↓
Tryout Generation Rules / Manual Question Set
↓
Question Selection Engine
↓
Exam Session
```

Halaman USER `/app/tryout` SHALL menampilkan card tryout berisi name, description, duration, totalQuestions, composition, accessType, dan CTA. Jika user tidak memiliki akses, card SHALL menampilkan locked state atau CTA `Upgrade`.

Admin sidebar SHALL include `Tryout Drafts`.

Super Admin sidebar SHALL include `Tryout Catalog`.


## 4.1 MVP In Scope

| ID | Feature | Description |
|---|---|---|
| PS-001 | Landing Page | Informasi produk, pricing, dan CTA daftar/login |
| PS-002 | Authentication | Register, login, email verification, reset password |
| PS-003 | Role-Based Access | SUPER_ADMIN, ADMIN, USER |
| PS-004 | User Dashboard | Ringkasan trial/subscription, riwayat, dan CTA mulai tryout |
| PS-005 | Exam Engine | Tryout dengan timer, navigasi soal, flag, autosave, submit |
| PS-006 | Scoring Engine | Skor otomatis TWK, TIU, TKP, total, dan passing grade |
| PS-007 | Result Page | Skor, status lulus/tidak, breakdown, benar/salah, AI Recommendation |
| PS-008 | AI Recommendation | Rekomendasi area materi yang perlu diperkuat setelah ujian |
| PS-009 | Exam History | Riwayat ujian dan rekomendasi sebelumnya |
| PS-010 | Bank Soal Manual | Admin CRUD soal |
| PS-011 | PDF Upload Parsing | Admin upload PDF dan AI parsing soal |
| PS-012 | Parsed Question Review | Admin approve/edit/reject hasil parsing |
| PS-013 | Subscription Plan | Trial, paket berbayar, status subscription |
| PS-014 | Payment Gateway | Pembayaran dan aktivasi otomatis via webhook |
| PS-015 | Admin Dashboard | Kelola soal, user, transaksi, parsing batch |
| PS-016 | Super Admin Configuration | Kelola admin, subscription plan, passing grade, dan settings |

## 4.2 MVP Out of Scope

| ID | Feature | Reason |
|---|---|---|
| PO-001 | AI Chatbot | Tidak sesuai positioning MVP |
| PO-002 | AI Explanation per Question | Bisa Phase 2 |
| PO-003 | Learning Content Module | Produk bukan platform belajar |
| PO-004 | Vector DB for Learning Materials | Tidak wajib MVP |
| PO-005 | Native Mobile App | Web responsive cukup |
| PO-006 | Leaderboard | Tidak prioritas |
| PO-007 | Community Forum | Tidak prioritas |

---

# 5. Product Features

## 5.1 Authentication & Account Management

User dapat daftar, verifikasi email, login, reset password, dan mengelola profil dasar.

## 5.2 Trial & Subscription

User baru mendapat trial. Setelah trial habis, user harus berlangganan untuk memulai ujian baru.

## 5.3 Exam Engine

User dapat mengikuti tryout CPNS dengan komposisi default:

| Category | Jumlah Soal | Scoring |
|---|---:|---|
| TWK | 30 | Benar 5, salah/kosong 0 |
| TIU | 35 | Benar 5, salah/kosong 0 |
| TKP | 45 | Bobot opsi 1-5 |

Default durasi ujian adalah 100 menit dan harus dapat dikonfigurasi.

## 5.4 Result & Scoring

Setelah submit, sistem menampilkan:

1. Skor TWK.
2. Skor TIU.
3. Skor TKP.
4. Total skor.
5. Status passing grade.
6. Breakdown benar/salah.
7. Review jawaban.
8. AI Recommendation.

## 5.5 AI Recommendation After Exam

AI Recommendation memberikan saran fokus belajar berdasarkan:

1. Kategori yang paling lemah.
2. Sub-kategori yang paling banyak salah.
3. Topic tag yang dominan salah.
4. Difficulty yang sering gagal.
5. Histori ujian jika tersedia.

Contoh rekomendasi:

> Anda banyak salah pada TWK - Tata Negara, terutama topik Hak dan Kewajiban Warga Negara. Prioritaskan belajar konsep hak, kewajiban, tanggung jawab warga negara, serta pasal-pasal UUD 1945 yang relevan.

## 5.6 Question Bank Management

Admin dapat mengelola soal manual. Setiap soal wajib memiliki:

1. Question text.
2. Lima opsi jawaban.
3. Correct answer untuk TWK/TIU.
4. Bobot opsi untuk TKP.
5. Category.
6. SubCategory.
7. TopicTag.
8. Difficulty.
9. Status.

## 5.7 PDF Upload & AI Parsing

Admin dapat upload PDF soal. AI membantu parsing menjadi struktur soal. Semua hasil parsing masuk ke review queue. Admin wajib approve sebelum soal aktif.

## 5.8 Admin & Super Admin

ADMIN mengelola konten dan monitoring operasional. SUPER_ADMIN memiliki akses penuh termasuk konfigurasi sistem, subscription plan, passing grade, dan role admin.

---

# 6. Product User Flows

## 6.1 Flow 1 — Register to First Tryout

1. User membuka landing page.
2. User klik daftar.
3. User mengisi form registrasi.
4. Sistem mengirim email verification.
5. User melakukan verifikasi email.
6. User login.
7. Sistem mengaktifkan trial.
8. User masuk dashboard.
9. User klik mulai tryout.
10. User mengerjakan ujian.
11. User submit.
12. Sistem menampilkan skor dan rekomendasi AI.

## 6.2 Flow 2 — Trial Expired to Subscription

1. User mencoba memulai ujian baru.
2. Sistem mendeteksi trial/subscription tidak aktif.
3. Sistem menampilkan paywall.
4. User memilih paket subscription.
5. User melakukan pembayaran.
6. Payment gateway mengirim webhook sukses.
7. Sistem mengaktifkan subscription.
8. User dapat memulai ujian.

## 6.3 Flow 3 — Admin Manual Question Input

1. Admin login.
2. Admin membuka menu Bank Soal.
3. Admin klik tambah soal.
4. Admin mengisi soal, opsi, jawaban/bobot, category, subCategory, topicTag, difficulty.
5. Sistem validasi.
6. Soal disimpan sebagai active atau draft.

## 6.4 Flow 4 — Admin Upload PDF

1. Admin login.
2. Admin membuka menu Upload PDF.
3. Admin upload file PDF.
4. Sistem mengirim PDF ke AI parsing workflow.
5. AI mengembalikan daftar soal terstruktur.
6. Sistem menampilkan hasil parsing dalam pending review.
7. Admin approve, edit, atau reject.
8. Soal approved masuk bank soal aktif.

## 6.5 Flow 5 — AI Recommendation After Exam

1. User submit ujian.
2. Sistem menghitung skor.
3. Sistem menghitung breakdown weak areas.
4. Sistem mengirim payload ke AI workflow.
5. AI menghasilkan rekomendasi.
6. Sistem menyimpan rekomendasi pada hasil ujian.
7. User melihat rekomendasi di result page dan history.

---

# 7. Product Constraints

| ID | Constraint |
|---|---|
| PC-001 | MVP harus berbasis web responsive. |
| PC-002 | Payment harus menggunakan payment gateway pihak ketiga. |
| PC-003 | PDF parsing MVP hanya mendukung PDF teks; OCR untuk scan tidak wajib MVP. |
| PC-004 | AI Recommendation tidak boleh bergantung pada materi belajar lengkap. |
| PC-005 | Semua hasil parsing PDF harus direview admin. |
| PC-006 | Passing grade harus configurable. |

---

# 8. Product Acceptance Criteria

| ID | Criteria |
|---|---|
| PAC-001 | User dapat menyelesaikan flow daftar → verifikasi → login → trial → ujian → hasil → AI Recommendation. |
| PAC-002 | User dengan trial/subscription tidak aktif tidak dapat memulai ujian baru. |
| PAC-003 | Admin dapat membuat soal manual dan soal tersebut dapat muncul di ujian. |
| PAC-004 | Admin dapat upload PDF, mereview hasil parsing, dan mengaktifkan soal approved. |
| PAC-005 | Sistem dapat menghitung skor TWK, TIU, TKP, total, dan passing grade secara benar. |
| PAC-006 | Sistem dapat menghasilkan rekomendasi AI atau fallback statistik setelah ujian. |
| PAC-007 | SUPER_ADMIN dapat mengubah passing grade dan subscription plan. |

---



---

# Part C — Software Requirements Specification (SRS)

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