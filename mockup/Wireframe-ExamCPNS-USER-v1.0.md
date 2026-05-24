# Wireframe Specification — ExamCPNS USER

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
| 1.0 | 16 Mei 2026 | System Analyst Pro | Initial USER wireframe specification |

---

# 1. USER Navigation

```text
Dashboard
Tryout
Hasil Ujian
Riwayat
Langganan
Profil
```

USER must not see technical labels:

```text
Question Selection Engine
Generation Rules
Manual Question Set
```

Use user-friendly copy:

```text
Soal disiapkan otomatis sesuai aturan tryout.
Soal dikunci saat ujian dimulai.
```

---

# 2. Page: Dashboard

Route: `/app/dashboard`

Purpose: Menampilkan ringkasan akses, skor terakhir, rekomendasi AI terakhir, dan CTA tryout.

```text
┌──────────────────────────────────────────────────────────────┐
│ Topbar                                                       │
├──────────────────────────────────────────────────────────────┤
│ Header: Dashboard                                            │
│ Selamat datang kembali, Rina                                 │
├──────────────────────────────────────────────────────────────┤
│ KPI Cards                                                    │
│ [Trial: 2 dari 3] [Skor Terakhir: 330] [CTA Mulai Tryout]    │
├──────────────────────────────────────────────────────────────┤
│ Latest Exam Summary                                          │
│ TWK 75 | TIU 85 | TKP 170 | Total 330 | Lulus                │
├──────────────────────────────────────────────────────────────┤
│ AI Recommendation Preview                                    │
│ Fokus utama: TWK - Tata Negara                               │
│ [Lihat Rekomendasi]                                          │
├──────────────────────────────────────────────────────────────┤
│ Recent Exam History                                          │
│ Tryout | Date | Score | Status | Action                      │
└──────────────────────────────────────────────────────────────┘
```

Empty state:

```text
Belum ada riwayat tryout.
Mulai tryout pertama Anda untuk melihat skor dan rekomendasi AI.
[Mulai Tryout]
```

---

# 3. Page: Tryout Tersedia

Route: `/app/tryout`

Purpose: Menampilkan Tryout Catalog yang tersedia untuk user.

```text
┌──────────────────────────────────────────────────────────────┐
│ Header: Tryout Tersedia                                      │
│ Pilih tryout yang tersedia. Soal akan disiapkan otomatis...  │
├──────────────────────────────────────────────────────────────┤
│ Filter Chips: Semua | Trial | Premium | SKD | TWK | TIU | TKP│
├──────────────────────────────────────────────────────────────┤
│ Tryout Cards Grid                                            │
│ ┌──────────────────────┐ ┌──────────────────────┐            │
│ │ Tryout SKD Nasional  │ │ Tryout TWK Intensif  │            │
│ │ Featured             │ │ Paid Only            │            │
│ │ 110 soal | 100 menit │ │ 50 soal | 45 menit   │            │
│ │ TWK30 TIU35 TKP45    │ │ Fokus TWK            │            │
│ │ [Mulai Ujian]        │ │ [Upgrade]            │            │
│ │ Soal dikunci saat... │ │                      │            │
│ └──────────────────────┘ └──────────────────────┘            │
│ ┌──────────────────────┐                                     │
│ │ Tryout Nasional M1   │                                     │
│ │ Premium              │                                     │
│ │ 110 soal | 100 menit │                                     │
│ │ [Upgrade]            │                                     │
│ └──────────────────────┘                                     │
└──────────────────────────────────────────────────────────────┘
```

Rules:

| ID | Rule |
|---|---|
| WF-U-TRY-001 | USER hanya melihat tryout published. |
| WF-U-TRY-002 | Locked tryout boleh terlihat untuk upsell. |
| WF-U-TRY-003 | Locked CTA = Upgrade. |
| WF-U-TRY-004 | Tidak menampilkan istilah teknis backend. |

---

# 4. Page: Exam Room

Route: `/app/exam/{examSessionId}`

```text
┌──────────────────────────────────────────────────────────────┐
│ Exam Topbar: Tryout Name | Timer 01:24:32 | Autosaved        │
├────────────────────────────────────┬─────────────────────────┤
│ Main Question Area                 │ Right Panel             │
│ Category: TWK                      │ Timer Card              │
│ Question 12 of 110                 │ Question Palette        │
│                                    │ [1][2][3][4][5]...      │
│ Question Text                      │ Legend: Answered/Empty  │
│ Options A-E                        │ Flagged                 │
│                                    │ [Submit]                │
│ [Flag] [Previous] [Next]           │                         │
└────────────────────────────────────┴─────────────────────────┘
```

Rules:

| ID | Rule |
|---|---|
| WF-U-EXAM-001 | Answer autosave setelah pilih opsi. |
| WF-U-EXAM-002 | Submit menampilkan confirmation modal. |
| WF-U-EXAM-003 | Timer habis memicu auto-submit. |
| WF-U-EXAM-004 | Refresh memakai snapshot, bukan random ulang. |
| WF-U-EXAM-005 | Correct answer tidak ditampilkan saat exam aktif. |

Submit modal:

```text
Submit Ujian?
Anda masih memiliki 8 soal kosong.
Setelah submit, jawaban tidak dapat diubah.
[Batal] [Submit Ujian]
```

---

# 5. Page: Exam Result + AI Recommendation

Route: `/app/result/{examResultId}`

```text
┌──────────────────────────────────────────────────────────────┐
│ Header: Hasil Ujian                                          │
│ Tryout SKD CPNS Nasional | 16 Mei 2026                       │
├──────────────────────────────────────────────────────────────┤
│ Score Cards                                                  │
│ [TWK 75 Lulus] [TIU 85 Lulus] [TKP 170 Lulus] [Total 330]    │
├──────────────────────────────────────────────────────────────┤
│ Passing Grade Breakdown                                      │
│ Category | Score | Minimum | Status                          │
├──────────────────────────────────────────────────────────────┤
│ Category Performance                                         │
│ Category | Correct | Wrong | Empty | Accuracy                │
├──────────────────────────────────────────────────────────────┤
│ AI Recommendation                                            │
│ Summary                                                      │
│ Top Weak Areas                                               │
│ 1. TWK - Tata Negara | Priority High | Accuracy 55%          │
│ Suggested Focus                                              │
│ Next Tryout Strategy                                         │
├──────────────────────────────────────────────────────────────┤
│ Answer Review                                                │
│ Filter: All | Correct | Wrong | Empty | Flagged              │
│ Question list                                                │
└──────────────────────────────────────────────────────────────┘
```

Rules:

| ID | Rule |
|---|---|
| WF-U-RESULT-001 | AI Recommendation muncul setelah exam submitted. |
| WF-U-RESULT-002 | Jika AI processing, tampilkan loading state. |
| WF-U-RESULT-003 | Jika AI gagal, tampilkan fallback recommendation. |
| WF-U-RESULT-004 | Tidak ada chatbot. |
| WF-U-RESULT-005 | Tidak ada AI-generated explanation per question pada MVP. |

---

# 6. Page: Exam History

Route: `/app/riwayat`

```text
Header: Riwayat Tryout
Filter: Tryout | Date Range | Status
Table:
Tryout | Date | TWK | TIU | TKP | Total | Status | Action
Actions:
- Lihat Hasil
- Lihat Rekomendasi
```

---

# 7. Page: Subscription

Route: `/app/langganan`

```text
Header: Langganan
Current Access Status:
Trial aktif | Sisa 2 dari 3 tryout | Berakhir 23 Mei 2026

Pricing Cards:
[Trial] [Monthly] [Premium]

Payment Status:
Invoice pending / paid / failed

Payment History:
Date | Plan | Amount | Status | Action
```

---

# 8. Page: Profile

Route: `/app/profil`

```text
Header: Profil

Profile Form:
- Full Name
- Email readonly
- Phone
- Button Simpan

Change Password:
- Current Password
- New Password
- Confirm New Password
- Button Ubah Password
```

---

# 9. USER Completeness Check

| Page | Status |
|---|---|
| Dashboard | Defined |
| Tryout Tersedia | Defined |
| Exam Room | Defined |
| Exam Result + AI Recommendation | Defined |
| Exam History | Defined |
| Subscription | Defined |
| Profile | Defined |