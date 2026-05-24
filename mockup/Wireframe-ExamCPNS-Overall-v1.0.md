# Wireframe Specification — ExamCPNS Overall

| Field | Value |
|---|---|
| Product | ExamCPNS |
| Version | 1.0 |
| Date | 16 Mei 2026 |
| Author | System Analyst Pro |
| Status | Draft |

## Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | 16 Mei 2026 | System Analyst Pro | Initial overall wireframe specification |

---

# 1. Purpose

Dokumen ini mendefinisikan struktur wireframe keseluruhan ExamCPNS versi SaaS. Wireframe dipisah menjadi:

1. Public/Auth.
2. USER.
3. ADMIN.
4. SUPER_ADMIN.

Core concept:

```text
Question Bank
↓
Tryout Catalog
↓
Tryout Generation Rules / Manual Question Set
↓
Question Selection Engine
↓
Exam Session
↓
Exam Result
↓
AI Recommendation
```

User-facing concept:

```text
Pilih Tryout → Mulai Ujian → Lihat Hasil → Rekomendasi AI
```

---

# 2. Global Rules

| ID | Rule |
|---|---|
| WF-GR-001 | USER tidak boleh melihat istilah teknis seperti Question Selection Engine, Generation Rules, atau Manual Question Set. |
| WF-GR-002 | ADMIN fokus pada content operation: Bank Soal, PDF Parsing, Tryout Drafts. |
| WF-GR-003 | ADMIN tidak melihat Users, Transactions, Payment, Subscription, atau Business Settings. |
| WF-GR-004 | SUPER_ADMIN memiliki kontrol penuh atas Tryout Catalog, Users, Admin Accounts, Subscription, Payment, Configuration, dan Monitoring. |
| WF-GR-005 | AI hanya muncul sebagai rekomendasi setelah ujian, bukan chatbot. |
| WF-GR-006 | Produk bukan learning course platform; tidak ada video course, forum, leaderboard, atau live class. |

---

# 3. Global Layouts

## 3.1 Public Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Navbar: Logo | Fitur | Tryout | Harga | FAQ | Login | Daftar │
├──────────────────────────────────────────────────────────────┤
│ Page Content                                                 │
├──────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└──────────────────────────────────────────────────────────────┘
```

## 3.2 USER Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Topbar: Logo | Dashboard | Tryout | Hasil | Riwayat | Profil │
├──────────────────────────────────────────────────────────────┤
│ Page Content                                                 │
└──────────────────────────────────────────────────────────────┘
```

Mobile bottom navigation:

```text
Dashboard | Tryout | Hasil | Riwayat | Profil
```

## 3.3 ADMIN Layout

```text
┌───────────────┬──────────────────────────────────────────────┐
│ Sidebar       │ Topbar: Page Title | Search | Profile        │
│ Dashboard     ├──────────────────────────────────────────────┤
│ Bank Soal     │ Page Content                                 │
│ Upload PDF    │                                              │
│ Review Parsing│                                              │
│ Tryout Drafts │                                              │
│ Audit Aktiv.  │                                              │
│ Profil        │                                              │
│ Logout        │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

## 3.4 SUPER_ADMIN Layout

```text
┌──────────────────┬───────────────────────────────────────────┐
│ Grouped Sidebar  │ Topbar: Page Title | Search | Profile     │
│ Dashboard        ├───────────────────────────────────────────┤
│ Content          │ Page Content                              │
│ Users & Access   │                                           │
│ Business         │                                           │
│ Configuration    │                                           │
│ Monitoring       │                                           │
│ Profile / Logout │                                           │
└──────────────────┴───────────────────────────────────────────┘
```

---

# 4. Navigation Summary

## USER

```text
Dashboard
Tryout
Hasil Ujian
Riwayat
Langganan
Profil
```

## ADMIN

```text
Dashboard
Bank Soal
Upload PDF
Review Parsing
Tryout Drafts
Audit Aktivitas
Profil
Logout
```

## SUPER_ADMIN

```text
Dashboard

Content
- Tryout Catalog
- Bank Soal
- PDF Uploads
- Review Parsing

Users & Access
- Users
- Admin Accounts
- Manual Activation

Business
- Subscription Plans
- Transactions
- Payment Webhooks

Configuration
- Passing Grade
- Trial Rules
- AI Recommendation Settings
- System Settings

Monitoring
- Audit Logs
- Error Logs
- AI Job Logs

Profile
Logout
```

---

# 5. Public Pages

## 5.1 Landing Page

Route: `/`

```text
┌──────────────────────────────────────────────────────────────┐
│ Navbar                                                       │
├──────────────────────────────────────────────────────────────┤
│ Hero                                                         │
│ ┌─────────────────────────────┬────────────────────────────┐ │
│ │ Headline: Tryout CPNS...    │ Product UI Preview          │ │
│ │ Subtitle                    │ Score + AI Recommendation   │ │
│ │ CTA: Mulai Tryout           │ Tryout Catalog Preview      │ │
│ │ CTA: Lihat Paket            │                            │ │
│ └─────────────────────────────┴────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ Trust Strip: SKD | Scoring | Passing Grade | AI Recommendation│
├──────────────────────────────────────────────────────────────┤
│ Feature Cards: Tryout, Scoring, Passing Grade, AI Rec, History│
├──────────────────────────────────────────────────────────────┤
│ How It Works: Pilih → Kerjakan → Skor → Rekomendasi AI       │
├──────────────────────────────────────────────────────────────┤
│ Pricing Preview: Trial | Monthly | Premium                   │
├──────────────────────────────────────────────────────────────┤
│ FAQ                                                          │
├──────────────────────────────────────────────────────────────┤
│ Final CTA                                                    │
├──────────────────────────────────────────────────────────────┤
│ Footer                                                       │
└──────────────────────────────────────────────────────────────┘
```

Rules:

| ID | Rule |
|---|---|
| WF-PUB-001 | Jangan memakai klaim “Akurasi Prediksi 94.5%”. |
| WF-PUB-002 | Hero visual harus berupa preview UI produk. |
| WF-PUB-003 | AI disebut sebagai rekomendasi setelah ujian. |

## 5.2 Pricing Page

Route: `/pricing`

```text
Header
Pricing Cards: Trial | Monthly | Premium
Feature Comparison Table
FAQ
CTA
```

## 5.3 Login Page

Route: `/login`

```text
Logo
Login Card
- Email
- Password
- Forgot Password
- Button Masuk
- Link Daftar
```

## 5.4 Register Page

Route: `/register`

```text
Logo
Register Card
- Full Name
- Email
- Phone
- Password
- Confirm Password
- Terms Checkbox
- Button Daftar
- Link Login
```

---

# 6. File Separation

| File | Scope |
|---|---|
| Wireframe-ExamCPNS-Overall-v1.0.md | Global layout, navigation, public pages |
| Wireframe-ExamCPNS-USER-v1.0.md | USER pages |
| Wireframe-ExamCPNS-ADMIN-v1.0.md | ADMIN pages |
| Wireframe-ExamCPNS-SUPER-ADMIN-v1.0.md | SUPER_ADMIN pages |