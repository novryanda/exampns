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

