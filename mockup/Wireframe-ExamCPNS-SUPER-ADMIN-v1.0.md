# Wireframe Specification — ExamCPNS SUPER_ADMIN

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
| 1.0 | 16 Mei 2026 | System Analyst Pro | Initial SUPER_ADMIN wireframe specification |

---

# 1. SUPER_ADMIN Navigation

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

# 2. Page: Dashboard

Route: `/super-admin/dashboard`

```text
KPI Cards:
[Total Users] [Active Subscribers] [Monthly Revenue]
[Published Tryouts] [Pending Tryout Reviews] [AI Job Failures]

Charts:
- Subscription Growth
- Revenue Trend
- Tryout Completion
- Conversion

Tables:
- Pending Tryout Reviews
- Recent Transactions
- System Alerts
```

---

# 3. Page: Tryout Catalog

Route: `/super-admin/tryout-catalog`

```text
Header: Tryout Catalog
Subtitle: Kelola tryout untuk pengguna

Toolbar:
Search | Type | Access | Status | [Buat Tryout Baru]

Table:
Name | Type | Access | Generation Mode | Questions | Duration | Status | Featured | Published At | Actions

Actions:
Detail | Edit | Duplicate | Publish | Archive | Check Availability
```

Example rows:

| Name | Type | Access | Generation Mode | Questions | Duration | Status |
|---|---|---|---|---:|---:|---|
| Tryout SKD CPNS Nasional | Generated | Trial & Paid | Random by Topic Distribution | 110 | 100 min | Published |
| Tryout TWK Intensif | Generated | Paid Only | Random by Topic Distribution | 50 | 45 min | Draft |
| Tryout Nasional Minggu 1 | Manual | Premium Only | Manual Question Set | 110 | 100 min | Review |

---

# 4. Page: Create/Edit Tryout

Route:

```text
/super-admin/tryout-catalog/new
/super-admin/tryout-catalog/{tryoutId}/edit
```

Use stepper or multi-section form:

```text
1 Basic Info
2 Access & Visibility
3 Exam Settings
4 Generation Rules
5 Composition
6 Manual Question Set
7 Availability Check
8 Publish Control
```

## Section 1: Basic Info

```text
Name
Description
Tryout Type: generated / manual / hybrid
Status: draft / review / published / archived
```

## Section 2: Access & Visibility

```text
Access Type: trial_only / paid_only / trial_and_paid / premium_only
Is Public toggle
Is Featured toggle
Sort Order
```

## Section 3: Exam Settings

```text
Duration Minutes
Total Questions
Question Order Mode: category_order / mixed_random / manual_order
Passing Grade Config
Show Result Immediately toggle
Show Answer Review toggle
```

## Section 4: Generation Rules

```text
Randomization Mode:
- random_by_category
- random_by_category_and_difficulty
- random_by_topic_distribution
- manual_question_set
- hybrid_manual_and_random

Avoid Recent Questions toggle
Avoid Recent Exam Count
```

## Section 5: Composition

```text
TWK Card:
- Question Count
- Difficulty Distribution
- Topic Distribution Table

TIU Card:
- Question Count
- Difficulty Distribution
- Topic Distribution Table

TKP Card:
- Question Count
- Difficulty Distribution
- Topic Distribution Table
```

Topic table:

```text
TopicTag | Question Count | Actions
```

## Section 6: Manual Question Set

Visible if `tryoutType = manual`.

```text
Left: Question Search & Filter
- Search
- Category
- TopicTag
- Difficulty
- Add Question

Right: Selected Questions
- Ordered list
- Drag handle
- Question preview
- Remove
- Total selected / required
```

## Section 7: Availability Check

```text
Readiness Summary:
TWK Active Questions: 300 / required 30 — Ready
TIU Active Questions: 250 / required 35 — Ready
TKP Active Questions: 200 / required 45 — Ready

Topic Readiness:
Category | TopicTag | Required | Available | Status
```

## Section 8: Publish Control

```text
Save Draft | Submit Review | Publish | Archive | Cancel
```

Rules:

| ID | Rule |
|---|---|
| WF-SA-TC-001 | Publish disabled if availability not ready. |
| WF-SA-TC-002 | Generated tryout requires generation rules. |
| WF-SA-TC-003 | Manual tryout requires complete manual question set. |
| WF-SA-TC-004 | Published tryout visible to eligible users. |

---

# 5. Page: Availability Check

Route: `/super-admin/tryout-catalog/{tryoutId}/availability`

```text
Header: Availability Check

Tryout Summary:
Name | Type | Mode | Total Questions

Category Readiness:
Category | Required | Available | Status

Topic Readiness:
Category | TopicTag | Required | Available | Status

Difficulty Readiness:
Category | Difficulty | Required | Available | Status

Actions:
Refresh Check | Back to Tryout
```

---

# 6. Page: Bank Soal

Route: `/super-admin/bank-soal`

Same as Admin Bank Soal, plus:

```text
View all questions
Override archive
View created_by
View updated_by
View audit history
```

---

# 7. Page: PDF Uploads

Route: `/super-admin/pdf-uploads`

```text
Header: PDF Uploads

Filter:
Status | Uploaded By | Date

Table:
File | Uploaded By | Total | Valid | Invalid | Status | Created At | Actions
```

---

# 8. Page: Review Parsing

Route: `/super-admin/review-parsing`

Same as Admin Review Parsing, but includes all admin uploads.

---

# 9. Page: Users

Route: `/super-admin/users`

```text
Header: Users

Filter:
Search | Status | Subscription

Table:
Name | Email | Status | Subscription | Last Exam | Registered At | Actions

Actions:
View Detail | Suspend | Activate | View Exam History | View Subscription
```

---

# 10. Page: Admin Accounts

Route: `/super-admin/admin-accounts`

```text
Header: Admin Accounts
Button: Create Admin

Table:
Name | Email | Role | Status | Last Login | Actions

Actions:
Create | Edit | Deactivate | Reset Password
```

---

# 11. Page: Manual Activation

Route: `/super-admin/manual-activation`

```text
Header: Manual Activation

Form:
Search User
User Select
Subscription Plan
Duration
Reason
Button: Activate Subscription

Recent Manual Activations Table
```

---

# 12. Page: Subscription Plans

Route: `/super-admin/subscription-plans`

```text
Header: Subscription Plans
Button: Create Plan

Table:
Name | Price | Duration | Access Level | Status | Actions

Plan Form:
Plan Name
Description
Price
Duration Days
Access Level
Status
Features
Save
```

---

# 13. Page: Transactions

Route: `/super-admin/transactions`

```text
Header: Transactions

Filter:
Status | Gateway | Date | Search

Table:
Invoice ID | User | Plan | Amount | Status | Gateway | Created At | Actions
```

---

# 14. Page: Payment Webhooks

Route: `/super-admin/payment-webhooks`

```text
Header: Payment Webhooks

Table:
Gateway Event ID | Transaction ID | Status | Idempotency | Received At | Retry Status | Actions
```

---

# 15. Page: Passing Grade

Route: `/super-admin/passing-grade`

```text
Header: Passing Grade

Active Config Card:
TWK min | TIU min | TKP min | Total min

Edit Form:
TWK Minimum Score
TIU Minimum Score
TKP Minimum Score
Total Minimum Score
Effective Date
Button: Save as New Version

Version History Table
```

---

# 16. Page: Trial Rules

Route: `/super-admin/trial-rules`

```text
Header: Trial Rules

Form:
Trial Tryout Limit
Trial Duration Days
Rule: whichever comes first
Active Toggle
Save

Rule History
```

---

# 17. Page: AI Recommendation Settings

Route: `/super-admin/ai-recommendation-settings`

```text
Header: AI Recommendation Settings

Form:
Enable AI Recommendation toggle
Fallback Enabled toggle
Weak Area Accuracy Threshold
Minimum Questions per Topic
Max Weak Areas
AI Processing Timeout
Model/Provider Name
Save
```

---

# 18. Page: System Settings

Route: `/super-admin/system-settings`

```text
Header: System Settings

Form:
Maintenance Mode toggle
Platform Name
Support Email
Email Sender Name
Save
```

---

# 19. Page: Audit Logs

Route: `/super-admin/audit-logs`

```text
Header: Audit Logs

Filter:
Actor | Role | Action | Date

Table:
Actor | Role | Action | Entity | Entity ID | Timestamp | Metadata
```

---

# 20. Page: Error Logs

Route: `/super-admin/error-logs`

```text
Header: Error Logs

Filter:
Severity | Endpoint | Date

Table:
Error Type | Message | Endpoint | Status Code | Timestamp | Detail
```

---

# 21. Page: AI Job Logs

Route: `/super-admin/ai-job-logs`

```text
Header: AI Job Logs

Filter:
Job Type | Status | Date

Table:
Job ID | Type | Status | Duration | Error Message | Created At | Actions

Job Types:
PDF Parsing
AI Recommendation
```

---

# 22. Page: Profile

Route: `/super-admin/profile`

```text
Header: Profile

Profile Form:
Name | Email readonly | Phone | Save

Change Password:
Current | New | Confirm | Change Password
```

---

# 23. SUPER_ADMIN Completeness Check

| Page | Status |
|---|---|
| Dashboard | Defined |
| Tryout Catalog | Defined |
| Create/Edit Tryout | Defined |
| Availability Check | Defined |
| Bank Soal | Defined |
| PDF Uploads | Defined |
| Review Parsing | Defined |
| Users | Defined |
| Admin Accounts | Defined |
| Manual Activation | Defined |
| Subscription Plans | Defined |
| Transactions | Defined |
| Payment Webhooks | Defined |
| Passing Grade | Defined |
| Trial Rules | Defined |
| AI Recommendation Settings | Defined |
| System Settings | Defined |
| Audit Logs | Defined |
| Error Logs | Defined |
| AI Job Logs | Defined |
| Profile | Defined |