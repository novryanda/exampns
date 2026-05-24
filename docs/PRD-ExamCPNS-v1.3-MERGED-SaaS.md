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

