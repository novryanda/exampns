# Wireframe Specification — ExamCPNS ADMIN

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
| 1.0 | 16 Mei 2026 | System Analyst Pro | Initial ADMIN wireframe specification |

---

# 1. ADMIN Scope

ADMIN adalah content operations role.

ADMIN can:

1. Manage Question Bank.
2. Upload PDF.
3. Review parsed questions.
4. Create/edit Tryout Drafts if permission is enabled.
5. Submit Tryout Drafts for review.
6. View own operational audit activity.

ADMIN cannot:

1. Publish tryout.
2. Manage users.
3. View transactions.
4. Manage subscription plans.
5. Manage payment/webhooks.
6. Manage passing grade/trial rules.
7. Manage admin accounts.

---

# 2. ADMIN Navigation

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

---

# 3. Page: Admin Dashboard

Route: `/admin/dashboard`

```text
┌───────────────┬──────────────────────────────────────────────┐
│ Sidebar       │ Header: Dashboard                            │
├───────────────┼──────────────────────────────────────────────┤
│               │ KPI Cards                                    │
│               │ [Total Soal] [Soal Aktif] [Pending Parsing] │
│               │ [Draft Tryout] [Submitted Review] [PDF Fail]│
├───────────────┼──────────────────────────────────────────────┤
│               │ Question Distribution                        │
│               │ Chart/Table: TWK | TIU | TKP                 │
├───────────────┼──────────────────────────────────────────────┤
│               │ Recent Parsing Batches                       │
│               │ File | Total | Valid | Invalid | Status      │
├───────────────┼──────────────────────────────────────────────┤
│               │ Recent Activity                              │
└───────────────┴──────────────────────────────────────────────┘
```

Do not show revenue, transactions, user growth, or subscription growth.

---

# 4. Page: Bank Soal

Route: `/admin/bank-soal`

```text
Header: Bank Soal
Subtitle: Kelola soal TWK, TIU, TKP

Toolbar:
Search | Category | TopicTag | Difficulty | Status | Source | [Tambah Soal]

Table:
Question Preview | Category | SubCategory | TopicTag | Difficulty | Status | Source | Updated At | Actions

Actions:
View | Edit | Archive
```

---

# 5. Page: Add/Edit Question

Route:

```text
/admin/bank-soal/new
/admin/bank-soal/{questionId}/edit
```

```text
Header: Tambah/Edit Soal

Form:
- Question Text
- Category: TWK/TIU/TKP
- SubCategory
- TopicTag
- Difficulty
- Question Type

Options:
- A
- B
- C
- D
- E

Scoring:
- If TWK/TIU: Correct Answer
- If TKP: Weight per option

Other:
- Explanation optional
- Status: draft/active
- Buttons: Save Draft | Save Active | Cancel
```

Validation:

| ID | Rule |
|---|---|
| WF-A-Q-001 | Active question must have category, subCategory, topicTag, difficulty. |
| WF-A-Q-002 | TWK/TIU must have one correct answer. |
| WF-A-Q-003 | TKP must have weight 1–5 for each option. |

---

# 6. Page: Upload PDF

Route: `/admin/upload-pdf`

```text
Header: Upload PDF

Upload Card:
- Drag & Drop PDF
- File validation note
- Text-based PDF recommended
- Button: Upload dan Proses

Recent Upload Batches:
File | Total | Valid | Invalid | Status | Uploaded At | Actions
```

States:

| State | UI |
|---|---|
| Uploading | Progress bar |
| Processing | Status badge processing |
| Failed | Error card with retry |
| Completed | Link to Review Parsing |

---

# 7. Page: Review Parsing

Route: `/admin/review-parsing`

```text
Header: Review Parsing
Subtitle: Review hasil parsing sebelum aktif

Tabs:
Pending Review | Approved | Rejected

Filter:
Batch | Category | Confidence | Search

Table:
Question Preview | Category | TopicTag | Difficulty | Confidence | Status | Actions

Actions:
Review | Approve | Reject
```

---

# 8. Page: Parsed Question Review Detail

Route: `/admin/review-parsing/{parsedQuestionId}`

```text
Two-column layout:

Left: Raw AI Output
- Original parsed text
- Confidence score
- Raw metadata

Right: Editable Question Form
- Question Text
- Options A-E
- Category
- SubCategory
- TopicTag
- Difficulty
- Detected Answer
- Review Notes

Buttons:
Approve | Edit & Approve | Reject
```

Rules:

| ID | Rule |
|---|---|
| WF-A-PR-001 | Parsed question cannot become active without review. |
| WF-A-PR-002 | Admin must complete required metadata before approve. |
| WF-A-PR-003 | Reject should allow review note. |

---

# 9. Page: Tryout Drafts

Route: `/admin/tryout-drafts`

```text
Header: Tryout Drafts
Subtitle: Buat draft sebelum dipublish Super Admin

Toolbar:
Search | Type | Status | [Buat Draft]

Table:
Name | Type | Access | Generation Mode | Questions | Duration | Status | Updated At | Actions

Actions:
Detail | Edit | Duplicate | Submit for Review
```

No Publish button.

---

# 10. Page: Create/Edit Tryout Draft

Route:

```text
/admin/tryout-drafts/new
/admin/tryout-drafts/{tryoutId}/edit
```

```text
Section 1: Basic Info
- Name
- Description
- Tryout Type

Section 2: Exam Settings
- Duration
- Total Questions
- Question Order Mode

Section 3: Generation Rules
- Randomization Mode
- Avoid Recent Questions

Section 4: Composition
- TWK card
- TIU card
- TKP card

Section 5: Availability Preview
- Ready / Not Ready

Actions:
Save Draft | Submit for Review | Cancel
```

Rules:

| ID | Rule |
|---|---|
| WF-A-TD-001 | Admin cannot publish tryout. |
| WF-A-TD-002 | Admin can submit draft for review. |
| WF-A-TD-003 | Availability preview is read-only for Admin. |

---

# 11. Page: Admin Audit Aktivitas

Route: `/admin/audit-aktivitas`

```text
Header: Audit Aktivitas

Filter:
Date | Entity | Action

Table:
Time | Action | Entity | Entity ID | Detail
```

Allowed logs:

```text
Created question
Updated question
Uploaded PDF
Approved parsed question
Rejected parsed question
Created tryout draft
Submitted tryout draft
```

---

# 12. Page: Admin Profile

Route: `/admin/profil`

```text
Header: Profil Admin

Profile Form:
Name | Email readonly | Phone | Save

Change Password:
Current | New | Confirm | Change Password
```

---

# 13. ADMIN Completeness Check

| Page | Status |
|---|---|
| Dashboard | Defined |
| Bank Soal | Defined |
| Add/Edit Question | Defined |
| Upload PDF | Defined |
| Review Parsing | Defined |
| Parsed Question Review Detail | Defined |
| Tryout Drafts | Defined |
| Create/Edit Tryout Draft | Defined |
| Audit Aktivitas | Defined |
| Profile | Defined |