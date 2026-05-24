# API Specification
# ExamCPNS — Platform Tryout CPNS Berbayar dengan AI Recommendation

---

| Field | Value |
|---|---|
| Document | API Specification |
| Product | ExamCPNS — Platform Tryout CPNS Berbayar |
| Version | 1.2 |
| Date | 14 Mei 2026 |
| Author | System Analyst Pro |
| Status | Draft |
| Based On | BRD/PRD/SRS v1.2, Use Case Specification v1.1, ERD v1.2, System Architecture v1.2 |

## Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | 13 Mei 2026 | System Analyst | Initial product and workflow draft |
| 1.1 | 14 Mei 2026 | System Analyst Pro | REST API Specification aligned with MVP scope, AI Recommendation after exam, PDF Parsing AI, payment, and role-based access |
| 1.2 | 14 Mei 2026 | System Analyst Pro | Integrated detailed AI Recommendation schemas, responses, internal workflow contract, reason codes, and trend. |

---

# 1. Overview

Dokumen ini mendefinisikan spesifikasi API untuk ExamCPNS v1.1. API dirancang menggunakan REST convention dan dapat diimplementasikan menggunakan NestJS.

Scope API mencakup:

1. Authentication dan account management.
2. Role-based access control.
3. User dashboard.
4. Exam engine.
5. Scoring result dan AI Recommendation.
6. Exam history.
7. Subscription dan payment.
8. Admin question bank.
9. Admin PDF import dan parsed question review.
10. Admin monitoring.
11. Super Admin configuration.
12. Payment webhook.
13. AI/N8N internal integration.

---

# 2. API Standards

## 2.1 Base URL

| Environment | Base URL |
|---|---|
| Local | `http://localhost:3000/api/v1` |
| Staging | `https://api-staging.examcpns.com/api/v1` |
| Production | `https://api.examcpns.com/api/v1` |

## 2.2 Protocol

Production API SHALL use HTTPS.

## 2.3 Data Format

| Item | Standard |
|---|---|
| Request body | JSON, except file upload uses multipart/form-data |
| Response body | JSON |
| Date/time | ISO 8601 UTC timestamp |
| ID format | UUID |
| Pagination | page, limit, sort, order |
| Authentication | Bearer JWT access token |

## 2.4 Common Headers

| Header | Required | Description |
|---|---|---|
| Authorization | Conditional | `Bearer <accessToken>` for protected endpoints |
| Content-Type | Yes | `application/json` or `multipart/form-data` |
| X-Request-Id | Recommended | Request tracking ID |
| X-Idempotency-Key | Conditional | Required for checkout/payment creation and submit-sensitive endpoints if needed |

---

# 3. Authentication & Authorization

## 3.1 Auth Scheme

Protected endpoints SHALL use JWT Bearer token.

```http
Authorization: Bearer <accessToken>
```

## 3.2 Role Access

| Role | Access Scope |
|---|---|
| USER | `/me`, `/dashboard`, `/exams`, `/results`, `/subscriptions`, `/payments` |
| ADMIN | `/admin/*`, except super admin configuration |
| SUPER_ADMIN | `/admin/*`, `/super-admin/*`, system-wide configuration |

## 3.3 Token Lifetime Recommendation

| Token | Lifetime |
|---|---|
| Access Token | 15 minutes |
| Refresh Token | 7 days |
| Email Verification Token | 24 hours |
| Password Reset Token | 1 hour |

---

# 4. Common Response Envelope

## 4.1 Success Response

```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {},
  "meta": {}
}
```

## 4.2 Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "requestId": "req_123"
}
```

## 4.3 Pagination Response

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 100,
    "totalPages": 5
  }
}
```

---

# 5. Common Status Codes

| Status Code | Usage |
|---|---|
| 200 | OK |
| 201 | Created |
| 202 | Accepted / async processing started |
| 204 | No content |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Conflict |
| 422 | Validation error |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 502 | External service error |
| 503 | Service unavailable |

---

# 6. Enumerations

```yaml
UserRole:
  - SUPER_ADMIN
  - ADMIN
  - USER

UserStatus:
  - active
  - inactive
  - suspended

QuestionCategory:
  - TWK
  - TIU
  - TKP

QuestionDifficulty:
  - easy
  - medium
  - hard

QuestionStatus:
  - draft
  - pending_review
  - active
  - archived

QuestionSourceType:
  - manual
  - pdf_import

ExamSessionStatus:
  - in_progress
  - submitted
  - auto_submitted
  - expired
  - cancelled

PaymentStatus:
  - pending
  - success
  - failed
  - expired
  - cancelled
  - refunded

SubscriptionStatus:
  - pending
  - active
  - expired
  - cancelled

AIRecommendationStatus:
  - processing
  - completed
  - failed
  - fallback

ParsedQuestionStatus:
  - pending_review
  - approved
  - rejected
  - draft

ReasonCode:
  - LOW_ACCURACY
  - LOW_ACCURACY_AND_CATEGORY_NOT_PASSED
  - REPEATED_WEAKNESS
  - DECLINING_TREND
  - EASY_MEDIUM_FAILURE
  - HIGH_SCORE_IMPACT
  - NEW_WEAK_AREA
  - NO_SIGNIFICANT_WEAKNESS

TrendType:
  - improving
  - declining
  - stagnant
  - new_weak_area
  - no_history
```

---

# 7. Public & Auth API

---

## 7.1 Register User

```http
POST /auth/register
```

### Access

Public

### Request Body

```json
{
  "fullName": "Rina Pratiwi",
  "email": "rina@example.com",
  "phone": "081234567890",
  "password": "Password123!"
}
```

### Response 201

```json
{
  "success": true,
  "message": "Registrasi berhasil. Silakan cek email untuk verifikasi akun.",
  "data": {
    "userId": "0d6d8d95-9d77-4dc2-bb85-9dd34033b4c1",
    "email": "rina@example.com",
    "emailVerified": false
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| EMAIL_ALREADY_REGISTERED | Email sudah digunakan |
| WEAK_PASSWORD | Password tidak memenuhi ketentuan |
| VALIDATION_ERROR | Input tidak valid |

---

## 7.2 Verify Email

```http
GET /auth/verify-email?token={token}
```

### Access

Public

### Response 200

```json
{
  "success": true,
  "message": "Email berhasil diverifikasi. Trial Anda sudah aktif.",
  "data": {
    "emailVerified": true,
    "trialActivated": true
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| TOKEN_INVALID | Token tidak valid |
| TOKEN_EXPIRED | Token kedaluwarsa |
| TOKEN_ALREADY_USED | Token sudah digunakan |

---

## 7.3 Resend Verification Email

```http
POST /auth/resend-verification
```

### Access

Public

### Request Body

```json
{
  "email": "rina@example.com"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Jika email terdaftar, link verifikasi akan dikirim ulang."
}
```

---

## 7.4 Login

```http
POST /auth/login
```

### Access

Public

### Request Body

```json
{
  "email": "rina@example.com",
  "password": "Password123!"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "user": {
      "id": "0d6d8d95-9d77-4dc2-bb85-9dd34033b4c1",
      "fullName": "Rina Pratiwi",
      "email": "rina@example.com",
      "role": "USER",
      "emailVerified": true
    }
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| INVALID_CREDENTIALS | Email/password salah |
| EMAIL_NOT_VERIFIED | Email belum diverifikasi |
| ACCOUNT_SUSPENDED | Akun ditangguhkan |

---

## 7.5 Refresh Token

```http
POST /auth/refresh
```

### Access

Public with refresh token

### Request Body

```json
{
  "refreshToken": "jwt_refresh_token"
}
```

### Response 200

```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token",
    "refreshToken": "new_refresh_token"
  }
}
```

---

## 7.6 Logout

```http
POST /auth/logout
```

### Access

Authenticated

### Request Body

```json
{
  "refreshToken": "jwt_refresh_token"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

## 7.7 Forgot Password

```http
POST /auth/forgot-password
```

### Access

Public

### Request Body

```json
{
  "email": "rina@example.com"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Jika email terdaftar, link reset password akan dikirim."
}
```

---

## 7.8 Reset Password

```http
POST /auth/reset-password
```

### Access

Public

### Request Body

```json
{
  "token": "reset_token",
  "newPassword": "NewPassword123!"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Password berhasil diperbarui"
}
```

---

# 8. Current User API

---

## 8.1 Get Current User Profile

```http
GET /me
```

### Access

Authenticated

### Response 200

```json
{
  "success": true,
  "data": {
    "id": "0d6d8d95-9d77-4dc2-bb85-9dd34033b4c1",
    "fullName": "Rina Pratiwi",
    "email": "rina@example.com",
    "phone": "081234567890",
    "role": "USER",
    "status": "active",
    "emailVerified": true,
    "lastLoginAt": "2026-05-14T10:00:00Z"
  }
}
```

---

## 8.2 Update Current User Profile

```http
PATCH /me
```

### Access

Authenticated

### Request Body

```json
{
  "fullName": "Rina Pratiwi",
  "phone": "081234567890"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Profil berhasil diperbarui",
  "data": {
    "fullName": "Rina Pratiwi",
    "phone": "081234567890"
  }
}
```

---

## 8.3 Change Password

```http
PATCH /me/password
```

### Access

Authenticated

### Request Body

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Password berhasil diubah"
}
```

---

# 9. User Dashboard API

---

## 9.1 Get User Dashboard Summary

```http
GET /dashboard/summary
```

### Access

USER

### Response 200

```json
{
  "success": true,
  "data": {
    "greetingName": "Rina",
    "accessStatus": {
      "type": "trial",
      "status": "active",
      "tryoutRemaining": 2,
      "daysRemaining": 5,
      "endDate": "2026-05-20T23:59:59Z"
    },
    "lastResult": {
      "examResultId": "result-001",
      "examDate": "2026-05-14T09:00:00Z",
      "twkScore": 60,
      "tiuScore": 95,
      "tkpScore": 170,
      "totalScore": 325,
      "overallPassed": true
    },
    "latestRecommendation": {
      "summary": "Fokus utama Anda adalah TWK - Tata Negara, terutama Hak dan Kewajiban Warga Negara.",
      "priorityTopic": "Hak dan Kewajiban Warga Negara"
    },
    "weakAreas": [
      {
        "category": "TWK",
        "subCategory": "Tata Negara",
        "topicTag": "Hak dan Kewajiban Warga Negara",
        "accuracy": 25
      }
    ],
    "recentExams": []
  }
}
```

---

# 10. Exam API

---

## 10.1 Start Exam

```http
POST /exams/start
```

### Access

USER

### Request Body

```json
{
  "examConfigId": "default-skd-config"
}
```

### Response 201

```json
{
  "success": true,
  "message": "Sesi ujian berhasil dibuat",
  "data": {
    "examSessionId": "exam-001",
    "status": "in_progress",
    "startedAt": "2026-05-14T10:00:00Z",
    "expiresAt": "2026-05-14T11:40:00Z",
    "durationMinutes": 100,
    "totalQuestions": 110
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| ACCESS_EXPIRED | Trial/subscription tidak aktif |
| ACTIVE_SESSION_EXISTS | User masih memiliki sesi aktif |
| INSUFFICIENT_QUESTIONS | Soal aktif tidak cukup |

---

## 10.2 Resume Active Exam

```http
GET /exams/active
```

### Access

USER

### Response 200

```json
{
  "success": true,
  "data": {
    "hasActiveExam": true,
    "examSessionId": "exam-001",
    "expiresAt": "2026-05-14T11:40:00Z",
    "answeredCount": 25,
    "totalQuestions": 110
  }
}
```

---

## 10.3 Get Exam Session Detail

```http
GET /exams/{examSessionId}
```

### Access

USER, owner only

### Response 200

```json
{
  "success": true,
  "data": {
    "examSessionId": "exam-001",
    "status": "in_progress",
    "startedAt": "2026-05-14T10:00:00Z",
    "expiresAt": "2026-05-14T11:40:00Z",
    "timerRemainingSeconds": 5400,
    "questions": [
      {
        "examSessionQuestionId": "esq-001",
        "number": 1,
        "category": "TWK",
        "subCategory": "Tata Negara",
        "topicTag": "Hak dan Kewajiban Warga Negara",
        "difficulty": "medium",
        "questionText": "Contoh teks soal...",
        "options": [
          { "label": "A", "text": "Pilihan A" },
          { "label": "B", "text": "Pilihan B" },
          { "label": "C", "text": "Pilihan C" },
          { "label": "D", "text": "Pilihan D" },
          { "label": "E", "text": "Pilihan E" }
        ],
        "selectedLabel": "C",
        "isFlagged": false
      }
    ],
    "summary": {
      "answeredCount": 25,
      "unansweredCount": 85,
      "flaggedCount": 3
    }
  }
}
```

### Security Note

Endpoint ini SHALL NOT return correct answer or TKP option weights during active exam.

---

## 10.4 Autosave Answer

```http
PUT /exams/{examSessionId}/answers/{examSessionQuestionId}
```

### Access

USER, owner only

### Request Body

```json
{
  "selectedLabel": "C",
  "isFlagged": false
}
```

### Response 200

```json
{
  "success": true,
  "message": "Jawaban tersimpan otomatis",
  "data": {
    "examSessionQuestionId": "esq-001",
    "selectedLabel": "C",
    "isFlagged": false,
    "savedAt": "2026-05-14T10:15:00Z"
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| EXAM_NOT_IN_PROGRESS | Sesi ujian tidak aktif |
| EXAM_TIME_EXPIRED | Waktu ujian sudah habis |
| INVALID_OPTION | Label opsi tidak valid |

---

## 10.5 Flag Question

```http
PATCH /exams/{examSessionId}/questions/{examSessionQuestionId}/flag
```

### Access

USER, owner only

### Request Body

```json
{
  "isFlagged": true
}
```

### Response 200

```json
{
  "success": true,
  "message": "Status ragu-ragu diperbarui"
}
```

---

## 10.6 Submit Exam

```http
POST /exams/{examSessionId}/submit
```

### Access

USER, owner only

### Request Body

```json
{
  "submitType": "manual"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Ujian berhasil dikumpulkan",
  "data": {
    "examSessionId": "exam-001",
    "examResultId": "result-001",
    "status": "submitted",
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
      "totalPassed": true,
      "overallPassed": false
    },
    "aiRecommendationStatus": "processing"
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| EXAM_ALREADY_SUBMITTED | Exam sudah pernah disubmit |
| EXAM_NOT_FOUND | Exam tidak ditemukan |
| EXAM_NOT_OWNED | Exam bukan milik user |

---

## 10.7 Log Exam Integrity Event

```http
POST /exams/{examSessionId}/integrity-events
```

### Access

USER, owner only

### Request Body

```json
{
  "eventType": "tab_switch",
  "metadata": {
    "visibilityState": "hidden",
    "timestamp": "2026-05-14T10:20:00Z"
  }
}
```

### Response 201

```json
{
  "success": true,
  "message": "Integrity event recorded"
}
```

---

# 11. Result & AI Recommendation API

---

## 11.1 Get Exam Result Detail

```http
GET /results/{examResultId}
```

### Access

USER owner, ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "examResultId": "result-001",
    "examSessionId": "exam-001",
    "examDate": "2026-05-14T10:00:00Z",
    "score": {
      "twk": 60,
      "tiu": 95,
      "tkp": 170,
      "total": 325
    },
    "passingGrade": {
      "twkMinScore": 65,
      "tiuMinScore": 80,
      "tkpMinScore": 166,
      "totalMinScore": 311
    },
    "passingStatus": {
      "twkPassed": false,
      "tiuPassed": true,
      "tkpPassed": true,
      "totalPassed": true,
      "overallPassed": false
    },
    "breakdown": [
      {
        "category": "TWK",
        "subCategory": "Tata Negara",
        "topicTag": "Hak dan Kewajiban Warga Negara",
        "difficulty": "medium",
        "totalQuestions": 8,
        "correctAnswers": 2,
        "wrongAnswers": 6,
        "accuracy": 25
      }
    ],
    "aiRecommendationStatus": "completed"
  }
}
```

---

## 11.2 Get Result Answer Review

```http
GET /results/{examResultId}/answers
```

### Access

USER owner, ADMIN, SUPER_ADMIN

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| category | string | No | TWK/TIU/TKP |
| correctness | string | No | correct/wrong/empty |
| page | number | No | Default 1 |
| limit | number | No | Default 20 |

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "number": 1,
      "category": "TWK",
      "subCategory": "Tata Negara",
      "topicTag": "Hak dan Kewajiban Warga Negara",
      "difficulty": "medium",
      "questionText": "Contoh teks soal...",
      "options": [
        { "label": "A", "text": "Pilihan A" },
        { "label": "B", "text": "Pilihan B" }
      ],
      "selectedLabel": "C",
      "correctLabel": "A",
      "isCorrect": false,
      "scoreAwarded": 0,
      "explanation": "Penjelasan opsional jika tersedia."
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 110,
    "totalPages": 6
  }
}
```

---

## 11.3 Get AI Recommendation

```http
GET /results/{examResultId}/ai-recommendation
```

### Access

USER owner, ADMIN, SUPER_ADMIN

### Response 200 — Completed

```json
{
  "success": true,
  "data": {
    "id": "rec-001",
    "status": "completed",
    "isFallback": false,
    "summary": "Area terlemah Anda berada pada TWK - Tata Negara.",
    "overallAssessment": "Skor total sudah cukup baik, tetapi TWK perlu diperkuat.",
    "nextTryoutStrategy": "Targetkan akurasi TWK Tata Negara minimal 70%.",
    "items": [
      {
        "priorityOrder": 1,
        "priorityLevel": "HIGH",
        "priorityScore": 91,
        "category": "TWK",
        "subCategory": "Tata Negara",
        "topicTag": "Hak dan Kewajiban Warga Negara",
        "reasonCode": "LOW_ACCURACY_AND_CATEGORY_NOT_PASSED",
        "reasonCodes": [
          "LOW_ACCURACY",
          "LOW_ACCURACY_AND_CATEGORY_NOT_PASSED",
          "DECLINING_TREND"
        ],
        "trend": "declining",
        "reason": "Anda salah 6 dari 8 soal pada topik ini.",
        "suggestedFocus": [
          "Pelajari konsep hak dan kewajiban warga negara.",
          "Perkuat pemahaman pasal UUD 1945 terkait warga negara."
        ],
        "accuracy": 25,
        "wrongAnswerRate": 75,
        "totalQuestions": 8,
        "correctAnswers": 2,
        "wrongAnswers": 6,
        "emptyAnswers": 0
      }
    ],
    "generatedAt": "2026-05-14T10:05:00Z"
  }
}
```

### Response 202 — Processing

```json
{
  "success": true,
  "message": "AI Recommendation sedang diproses",
  "data": {
    "status": "processing"
  }
}
```

### Response 200 — Fallback

```json
{
  "success": true,
  "data": {
    "status": "fallback",
    "isFallback": true,
    "summary": "Rekomendasi dibuat berdasarkan statistik hasil ujian.",
    "overallAssessment": "AI tidak tersedia, tetapi sistem tetap membuat rekomendasi berdasarkan area terlemah.",
    "nextTryoutStrategy": "Prioritaskan area dengan akurasi terendah sebelum tryout berikutnya.",
    "items": [
      {
        "priorityOrder": 1,
        "priorityLevel": "HIGH",
        "priorityScore": 91,
        "category": "TWK",
        "subCategory": "Tata Negara",
        "topicTag": "Hak dan Kewajiban Warga Negara",
        "reasonCode": "LOW_ACCURACY_AND_CATEGORY_NOT_PASSED",
        "reason": "Anda paling banyak salah pada TWK - Tata Negara, terutama Hak dan Kewajiban Warga Negara.",
        "suggestedFocus": [
          "Prioritaskan topik ini sebelum mengikuti tryout berikutnya."
        ],
        "accuracy": 25,
        "wrongAnswerRate": 75,
        "totalQuestions": 8,
        "wrongAnswers": 6
      }
    ]
  }
}
```

### Business Rules

| Rule ID | Rule |
|---|---|
| AIR-API-001 | Endpoint SHALL return `processing` if recommendation generation is not finished. |
| AIR-API-002 | Endpoint SHALL return fallback data if AI fails. |
| AIR-API-003 | User can only access own recommendation unless role is ADMIN or SUPER_ADMIN. |
| AIR-API-004 | Recommendation items SHALL include priorityScore, reasonCode, reasonCodes, and trend if available. |

## 11.4 Regenerate AI Recommendation

```http
POST /results/{examResultId}/ai-recommendation/regenerate
```

### Access

ADMIN, SUPER_ADMIN

### Request Body

```json
{
  "reason": "Regenerate karena output sebelumnya tidak valid"
}
```

### Response 202

```json
{
  "success": true,
  "message": "Regenerasi rekomendasi AI dimulai",
  "data": {
    "status": "processing"
  }
}
```

---

# 12. Exam History API

---

## 12.1 Get My Exam History

```http
GET /exams/history
```

### Access

USER

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| page | number | No | Default 1 |
| limit | number | No | Default 10 |
| status | string | No | passed/not_passed |
| dateFrom | string | No | ISO date |
| dateTo | string | No | ISO date |

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "examResultId": "result-001",
      "examSessionId": "exam-001",
      "examDate": "2026-05-14T10:00:00Z",
      "twkScore": 60,
      "tiuScore": 95,
      "tkpScore": 170,
      "totalScore": 325,
      "overallPassed": false,
      "weakestTopic": "Hak dan Kewajiban Warga Negara"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

---

# 13. Subscription & Payment API

---

## 13.1 Get Active Subscription Plans

```http
GET /subscription-plans
```

### Access

Public / Authenticated

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "plan-monthly",
      "name": "Paket Bulanan",
      "description": "Akses tryout CPNS selama 30 hari",
      "durationDays": 30,
      "price": 49000,
      "currency": "IDR",
      "isTrial": false,
      "isActive": true
    },
    {
      "id": "plan-3-months",
      "name": "Paket 3 Bulan",
      "description": "Akses tryout CPNS selama 90 hari",
      "durationDays": 90,
      "price": 119000,
      "currency": "IDR",
      "isTrial": false,
      "isActive": true
    }
  ]
}
```

---

## 13.2 Get My Subscription

```http
GET /subscriptions/me
```

### Access

USER

### Response 200

```json
{
  "success": true,
  "data": {
    "status": "active",
    "isTrial": true,
    "planName": "Trial Gratis",
    "startDate": "2026-05-14T00:00:00Z",
    "endDate": "2026-05-21T00:00:00Z",
    "tryoutLimit": 3,
    "tryoutUsed": 1,
    "tryoutRemaining": 2,
    "daysRemaining": 6
  }
}
```

---

## 13.3 Create Checkout

```http
POST /payments/checkout
```

### Access

USER

### Headers

```http
X-Idempotency-Key: checkout-unique-key-123
```

### Request Body

```json
{
  "subscriptionPlanId": "plan-monthly",
  "paymentMethod": "QRIS"
}
```

### Response 201

```json
{
  "success": true,
  "message": "Checkout berhasil dibuat",
  "data": {
    "paymentTransactionId": "pay-001",
    "invoiceNumber": "INV-20260514-0001",
    "amount": 49000,
    "currency": "IDR",
    "status": "pending",
    "paymentMethod": "QRIS",
    "paymentUrl": "https://payment-gateway.example/pay/123",
    "expiredAt": "2026-05-14T12:00:00Z"
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| PLAN_NOT_FOUND | Plan tidak ditemukan |
| PLAN_INACTIVE | Plan tidak aktif |
| PAYMENT_GATEWAY_ERROR | Gagal membuat pembayaran |

---

## 13.4 Get Payment Status

```http
GET /payments/{paymentTransactionId}
```

### Access

USER owner, ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "id": "pay-001",
    "invoiceNumber": "INV-20260514-0001",
    "planName": "Paket Bulanan",
    "amount": 49000,
    "currency": "IDR",
    "paymentMethod": "QRIS",
    "status": "success",
    "paidAt": "2026-05-14T10:30:00Z",
    "subscriptionActivated": true
  }
}
```

---

## 13.5 Get My Payment History

```http
GET /payments/me
```

### Access

USER

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "pay-001",
      "invoiceNumber": "INV-20260514-0001",
      "planName": "Paket Bulanan",
      "amount": 49000,
      "paymentMethod": "QRIS",
      "status": "success",
      "createdAt": "2026-05-14T10:00:00Z"
    }
  ]
}
```

---

# 14. Payment Webhook API

---

## 14.1 Payment Gateway Webhook

```http
POST /webhooks/payment/{provider}
```

### Access

External Payment Gateway

### Headers

| Header | Required | Description |
|---|---|---|
| X-Signature | Yes | Signature from payment gateway |
| X-Gateway-Event-Id | Recommended | Unique event ID if provided |

### Request Body Example

```json
{
  "eventId": "evt-001",
  "transactionId": "gateway-tx-001",
  "invoiceNumber": "INV-20260514-0001",
  "status": "success",
  "paymentMethod": "QRIS",
  "amount": 49000,
  "paidAt": "2026-05-14T10:30:00Z"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Webhook processed"
}
```

### Business Rules

| Rule ID | Rule |
|---|---|
| WH-BR-001 | Signature wajib diverifikasi sebelum memproses payload. |
| WH-BR-002 | gateway_event_id harus idempotent. |
| WH-BR-003 | Webhook duplikat harus return success tanpa double activation. |
| WH-BR-004 | Invalid signature tidak boleh mengubah payment transaction. |

---

# 15. Admin Question Bank API

---

## 15.1 Get Questions

```http
GET /admin/questions
```

### Access

ADMIN, SUPER_ADMIN

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| search | string | No | Search question text/topic |
| category | string | No | TWK/TIU/TKP |
| subCategory | string | No | Sub-category |
| topicTag | string | No | Topic tag |
| difficulty | string | No | easy/medium/hard |
| status | string | No | draft/active/archived |
| sourceType | string | No | manual/pdf_import |
| page | number | No | Default 1 |
| limit | number | No | Default 20 |

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "q-001",
      "questionPreview": "Hak dan kewajiban warga negara diatur dalam...",
      "category": "TWK",
      "subCategory": "Tata Negara",
      "topicTag": "Hak dan Kewajiban Warga Negara",
      "difficulty": "medium",
      "status": "active",
      "sourceType": "manual",
      "updatedAt": "2026-05-14T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 100,
    "totalPages": 5
  }
}
```

---

## 15.2 Create Question

```http
POST /admin/questions
```

### Access

ADMIN, SUPER_ADMIN

### Request Body for TWK/TIU

```json
{
  "questionText": "Hak dan kewajiban warga negara diatur dalam...",
  "category": "TWK",
  "subCategory": "Tata Negara",
  "topicTag": "Hak dan Kewajiban Warga Negara",
  "competencyArea": "Pemahaman Konstitusi",
  "difficulty": "medium",
  "status": "active",
  "explanation": "Pembahasan opsional.",
  "options": [
    { "label": "A", "text": "Pasal 27 sampai 34 UUD 1945", "isCorrect": true },
    { "label": "B", "text": "Pasal 1 sampai 3 UUD 1945", "isCorrect": false },
    { "label": "C", "text": "Pasal 5 sampai 10 UUD 1945", "isCorrect": false },
    { "label": "D", "text": "Pasal 20 sampai 22 UUD 1945", "isCorrect": false },
    { "label": "E", "text": "Pasal 35 sampai 37 UUD 1945", "isCorrect": false }
  ]
}
```

### Request Body for TKP

```json
{
  "questionText": "Anda diminta melayani masyarakat yang sedang marah. Sikap terbaik adalah...",
  "category": "TKP",
  "subCategory": "Pelayanan Publik",
  "topicTag": "Orientasi Pelayanan",
  "difficulty": "medium",
  "status": "active",
  "options": [
    { "label": "A", "text": "Mendengarkan keluhan dengan tenang", "tkpWeight": 5 },
    { "label": "B", "text": "Meminta orang tersebut menunggu tanpa penjelasan", "tkpWeight": 2 },
    { "label": "C", "text": "Menghindari percakapan", "tkpWeight": 1 },
    { "label": "D", "text": "Mengarahkan ke petugas lain tanpa membantu", "tkpWeight": 3 },
    { "label": "E", "text": "Menjawab dengan nada tinggi", "tkpWeight": 1 }
  ]
}
```

### Response 201

```json
{
  "success": true,
  "message": "Soal berhasil dibuat",
  "data": {
    "id": "q-001",
    "status": "active"
  }
}
```

### Validation Rules

| Rule | Description |
|---|---|
| VQ-001 | Must have exactly 5 options. |
| VQ-002 | Active question must have category, subCategory, topicTag, difficulty. |
| VQ-003 | TWK/TIU must have exactly one correct option. |
| VQ-004 | TKP must have tkpWeight 1-5 for each option. |

---

## 15.3 Get Question Detail

```http
GET /admin/questions/{questionId}
```

### Access

ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "id": "q-001",
    "questionText": "Hak dan kewajiban warga negara diatur dalam...",
    "category": "TWK",
    "subCategory": "Tata Negara",
    "topicTag": "Hak dan Kewajiban Warga Negara",
    "competencyArea": "Pemahaman Konstitusi",
    "difficulty": "medium",
    "sourceType": "manual",
    "status": "active",
    "explanation": "Pembahasan opsional.",
    "options": [
      { "id": "opt-001", "label": "A", "text": "Pasal 27 sampai 34 UUD 1945", "isCorrect": true }
    ],
    "createdAt": "2026-05-14T10:00:00Z",
    "updatedAt": "2026-05-14T10:00:00Z"
  }
}
```

---

## 15.4 Update Question

```http
PATCH /admin/questions/{questionId}
```

### Access

ADMIN, SUPER_ADMIN

### Request Body

Same shape as Create Question. Partial update is allowed.

### Response 200

```json
{
  "success": true,
  "message": "Soal berhasil diperbarui"
}
```

---

## 15.5 Soft Delete Question

```http
DELETE /admin/questions/{questionId}
```

### Access

ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "message": "Soal berhasil diarsipkan"
}
```

### Business Rule

Question SHALL be soft deleted or archived, not hard deleted.

---

# 16. Admin PDF Import API

---

## 16.1 Upload PDF for Parsing

```http
POST /admin/pdf-imports
```

### Access

ADMIN, SUPER_ADMIN

### Content-Type

`multipart/form-data`

### Form Fields

| Field | Type | Required | Description |
|---|---|---|---|
| file | File | Yes | PDF file, max default 20MB |
| categoryHint | string | No | TWK/TIU/TKP/auto |

### Response 202

```json
{
  "success": true,
  "message": "PDF diterima dan sedang diproses",
  "data": {
    "batchId": "batch-001",
    "status": "processing",
    "fileName": "soal-twk.pdf"
  }
}
```

### Error Codes

| Code | Description |
|---|---|
| INVALID_FILE_TYPE | File bukan PDF |
| FILE_TOO_LARGE | File melebihi batas ukuran |
| AI_WORKFLOW_UNAVAILABLE | Workflow AI tidak tersedia |

---

## 16.2 Get PDF Import Batches

```http
GET /admin/pdf-imports
```

### Access

ADMIN, SUPER_ADMIN

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| status | string | No | processing/completed/partial_failed/failed |
| page | number | No | Default 1 |
| limit | number | No | Default 20 |

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "batchId": "batch-001",
      "fileName": "soal-twk.pdf",
      "status": "completed",
      "totalDetected": 50,
      "validCount": 43,
      "invalidCount": 7,
      "uploadedBy": "Admin Content",
      "createdAt": "2026-05-14T10:00:00Z",
      "completedAt": "2026-05-14T10:02:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

---

## 16.3 Get PDF Import Batch Detail

```http
GET /admin/pdf-imports/{batchId}
```

### Access

ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "batchId": "batch-001",
    "fileName": "soal-twk.pdf",
    "status": "completed",
    "totalDetected": 50,
    "validCount": 43,
    "invalidCount": 7,
    "parsedQuestions": [
      {
        "id": "parsed-001",
        "questionPreview": "Hak dan kewajiban warga negara...",
        "category": "TWK",
        "subCategory": "Tata Negara",
        "topicTag": "Hak dan Kewajiban Warga Negara",
        "difficulty": "medium",
        "confidenceScore": 86.5,
        "status": "pending_review"
      }
    ]
  }
}
```

---

## 16.4 Get Parsed Question Detail

```http
GET /admin/parsed-questions/{parsedQuestionId}
```

### Access

ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "id": "parsed-001",
    "batchId": "batch-001",
    "questionText": "Hak dan kewajiban warga negara diatur dalam...",
    "options": [
      { "label": "A", "text": "Pasal 27 sampai 34 UUD 1945" },
      { "label": "B", "text": "Pasal 1 sampai 3 UUD 1945" }
    ],
    "detectedAnswer": "A",
    "category": "TWK",
    "subCategory": "Tata Negara",
    "topicTag": "Hak dan Kewajiban Warga Negara",
    "difficulty": "medium",
    "confidenceScore": 86.5,
    "status": "pending_review",
    "rawAiOutput": {}
  }
}
```

---

## 16.5 Update Parsed Question

```http
PATCH /admin/parsed-questions/{parsedQuestionId}
```

### Access

ADMIN, SUPER_ADMIN

### Request Body

```json
{
  "questionText": "Hak dan kewajiban warga negara diatur dalam...",
  "options": [
    { "label": "A", "text": "Pasal 27 sampai 34 UUD 1945" },
    { "label": "B", "text": "Pasal 1 sampai 3 UUD 1945" },
    { "label": "C", "text": "Pasal 5 sampai 10 UUD 1945" },
    { "label": "D", "text": "Pasal 20 sampai 22 UUD 1945" },
    { "label": "E", "text": "Pasal 35 sampai 37 UUD 1945" }
  ],
  "detectedAnswer": "A",
  "category": "TWK",
  "subCategory": "Tata Negara",
  "topicTag": "Hak dan Kewajiban Warga Negara",
  "difficulty": "medium"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Hasil parsing berhasil diperbarui"
}
```

---

## 16.6 Approve Parsed Question

```http
POST /admin/parsed-questions/{parsedQuestionId}/approve
```

### Access

ADMIN, SUPER_ADMIN

### Request Body

```json
{
  "status": "active",
  "reviewNotes": "Soal valid dan siap digunakan."
}
```

### Response 201

```json
{
  "success": true,
  "message": "Parsed question disetujui dan masuk bank soal",
  "data": {
    "questionId": "q-001",
    "parsedQuestionStatus": "approved"
  }
}
```

---

## 16.7 Reject Parsed Question

```http
POST /admin/parsed-questions/{parsedQuestionId}/reject
```

### Access

ADMIN, SUPER_ADMIN

### Request Body

```json
{
  "reviewNotes": "Format soal tidak valid dan kunci jawaban tidak jelas."
}
```

### Response 200

```json
{
  "success": true,
  "message": "Parsed question ditolak"
}
```

---

# 17. Admin Monitoring API

---

## 17.1 Admin Dashboard Summary

```http
GET /admin/dashboard/summary
```

### Access

ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "totalUsers": 1200,
    "activeSubscribers": 320,
    "totalQuestions": 650,
    "pendingReviewQuestions": 43,
    "paymentPending": 12,
    "monthlyRevenue": 15700000,
    "recentImportBatches": [],
    "recentTransactions": []
  }
}
```

---

## 17.2 Get Users for Monitoring

```http
GET /admin/users
```

### Access

ADMIN, SUPER_ADMIN

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| search | string | No | Name/email |
| subscriptionStatus | string | No | active/expired/trial |
| status | string | No | active/inactive/suspended |
| page | number | No | Default 1 |
| limit | number | No | Default 20 |

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "user-001",
      "fullName": "Rina Pratiwi",
      "email": "rina@example.com",
      "status": "active",
      "subscriptionStatus": "trial",
      "totalExams": 3,
      "lastActiveAt": "2026-05-14T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

---

## 17.3 Get User Detail for Admin

```http
GET /admin/users/{userId}
```

### Access

ADMIN, SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "id": "user-001",
    "fullName": "Rina Pratiwi",
    "email": "rina@example.com",
    "phone": "081234567890",
    "status": "active",
    "subscription": {
      "status": "trial",
      "endDate": "2026-05-21T00:00:00Z",
      "tryoutUsed": 1,
      "tryoutLimit": 3
    },
    "examSummary": {
      "totalExams": 3,
      "averageScore": 315,
      "lastExamAt": "2026-05-14T10:00:00Z"
    }
  }
}
```

---

## 17.4 Get Transactions for Monitoring

```http
GET /admin/transactions
```

### Access

ADMIN, SUPER_ADMIN

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| status | string | No | pending/success/failed/expired |
| paymentMethod | string | No | QRIS/VA_BCA/etc. |
| dateFrom | string | No | ISO date |
| dateTo | string | No | ISO date |
| search | string | No | invoice/email |
| page | number | No | Default 1 |
| limit | number | No | Default 20 |

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "pay-001",
      "invoiceNumber": "INV-20260514-0001",
      "userName": "Rina Pratiwi",
      "userEmail": "rina@example.com",
      "planName": "Paket Bulanan",
      "amount": 49000,
      "paymentMethod": "QRIS",
      "status": "success",
      "createdAt": "2026-05-14T10:00:00Z",
      "paidAt": "2026-05-14T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

---

# 18. Super Admin API

---

## 18.1 Create Admin Account

```http
POST /super-admin/admins
```

### Access

SUPER_ADMIN

### Request Body

```json
{
  "fullName": "Admin Content",
  "email": "admin@example.com",
  "phone": "081234567891"
}
```

### Response 201

```json
{
  "success": true,
  "message": "Akun admin berhasil dibuat",
  "data": {
    "id": "admin-001",
    "email": "admin@example.com",
    "role": "ADMIN",
    "status": "active"
  }
}
```

---

## 18.2 Get Admin Accounts

```http
GET /super-admin/admins
```

### Access

SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "admin-001",
      "fullName": "Admin Content",
      "email": "admin@example.com",
      "status": "active",
      "lastLoginAt": "2026-05-14T09:00:00Z"
    }
  ]
}
```

---

## 18.3 Deactivate Admin

```http
PATCH /super-admin/admins/{adminId}/deactivate
```

### Access

SUPER_ADMIN

### Request Body

```json
{
  "reason": "Admin sudah tidak aktif dalam operasional."
}
```

### Response 200

```json
{
  "success": true,
  "message": "Admin berhasil dinonaktifkan"
}
```

---

## 18.4 Create Subscription Plan

```http
POST /super-admin/subscription-plans
```

### Access

SUPER_ADMIN

### Request Body

```json
{
  "name": "Paket Bulanan",
  "description": "Akses tryout CPNS selama 30 hari",
  "durationDays": 30,
  "price": 49000,
  "currency": "IDR",
  "isActive": true
}
```

### Response 201

```json
{
  "success": true,
  "message": "Subscription plan berhasil dibuat",
  "data": {
    "id": "plan-monthly"
  }
}
```

---

## 18.5 Update Subscription Plan

```http
PATCH /super-admin/subscription-plans/{planId}
```

### Access

SUPER_ADMIN

### Request Body

```json
{
  "name": "Paket Bulanan",
  "price": 59000,
  "isActive": true
}
```

### Response 200

```json
{
  "success": true,
  "message": "Subscription plan berhasil diperbarui"
}
```

---

## 18.6 Get Passing Grade Config

```http
GET /super-admin/passing-grade
```

### Access

SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "id": "pg-001",
    "name": "Default Passing Grade",
    "twkMinScore": 65,
    "tiuMinScore": 80,
    "tkpMinScore": 166,
    "totalMinScore": 311,
    "isActive": true,
    "effectiveFrom": "2026-05-14T00:00:00Z"
  }
}
```

---

## 18.7 Update Passing Grade Config

```http
PUT /super-admin/passing-grade
```

### Access

SUPER_ADMIN

### Request Body

```json
{
  "name": "Passing Grade 2026",
  "twkMinScore": 65,
  "tiuMinScore": 80,
  "tkpMinScore": 166,
  "totalMinScore": 311,
  "effectiveFrom": "2026-05-14T00:00:00Z"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Passing grade berhasil diperbarui. Perubahan berlaku untuk ujian baru."
}
```

---

## 18.8 Get Trial Config

```http
GET /super-admin/trial-config
```

### Access

SUPER_ADMIN

### Response 200

```json
{
  "success": true,
  "data": {
    "id": "trial-001",
    "freeTryoutCount": 3,
    "trialDurationDays": 7,
    "isActive": true
  }
}
```

---

## 18.9 Update Trial Config

```http
PUT /super-admin/trial-config
```

### Access

SUPER_ADMIN

### Request Body

```json
{
  "freeTryoutCount": 3,
  "trialDurationDays": 7
}
```

### Response 200

```json
{
  "success": true,
  "message": "Konfigurasi trial berhasil diperbarui"
}
```

---

## 18.10 Manual Subscription Activation

```http
POST /super-admin/subscriptions/manual-activation
```

### Access

SUPER_ADMIN

### Request Body

```json
{
  "userId": "user-001",
  "subscriptionPlanId": "plan-monthly",
  "durationDays": 30,
  "reason": "Aktivasi manual karena pembayaran sudah diverifikasi secara manual."
}
```

### Response 201

```json
{
  "success": true,
  "message": "Subscription berhasil diaktifkan secara manual",
  "data": {
    "userSubscriptionId": "sub-001",
    "status": "active",
    "endDate": "2026-06-14T00:00:00Z"
  }
}
```

---

## 18.11 Get Audit Logs

```http
GET /super-admin/audit-logs
```

### Access

SUPER_ADMIN

### Query Params

| Param | Type | Required | Description |
|---|---|---|---|
| actorUserId | string | No | Filter by actor |
| module | string | No | Filter by module |
| action | string | No | Filter by action |
| dateFrom | string | No | ISO date |
| dateTo | string | No | ISO date |
| page | number | No | Default 1 |
| limit | number | No | Default 20 |

### Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": "audit-001",
      "actorUserId": "super-001",
      "actorName": "Super Admin",
      "actorRole": "SUPER_ADMIN",
      "action": "UPDATE_PASSING_GRADE",
      "module": "configuration",
      "targetType": "passing_grade_config",
      "targetId": "pg-001",
      "metadata": {
        "twkMinScore": 65,
        "tiuMinScore": 80
      },
      "createdAt": "2026-05-14T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

---

# 19. Internal AI/N8N Integration API

These endpoints are internal or protected using a secret header.

---

## 19.1 Trigger AI Recommendation Workflow

This endpoint may be called from backend to N8N. N8N SHALL not determine weak areas independently; it SHALL use weakAreas selected by backend.

```http
POST {N8N_WEBHOOK_URL}/generate-recommendation
```

### Headers

```http
x-api-key: <N8N_WEBHOOK_SECRET>
```

### Request Body

```json
{
  "examResultId": "result-001",
  "examDate": "2026-05-14T10:00:00Z",
  "score": {
    "twk": 60,
    "tiu": 95,
    "tkp": 170,
    "total": 325
  },
  "passingGrade": {
    "twkMinScore": 65,
    "tiuMinScore": 80,
    "tkpMinScore": 166,
    "totalMinScore": 311
  },
  "passingStatus": {
    "twkPassed": false,
    "tiuPassed": true,
    "tkpPassed": true,
    "totalPassed": true,
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
      "dominantDifficulty": "medium",
      "reasonCodes": [
        "LOW_ACCURACY",
        "LOW_ACCURACY_AND_CATEGORY_NOT_PASSED",
        "DECLINING_TREND"
      ],
      "trend": {
        "type": "declining",
        "last3ExamAccuracy": [35, 30, 25]
      }
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

### Response 200

```json
{
  "success": true,
  "recommendation": {
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
}
```

### Validation Rules

| Rule ID | Rule |
|---|---|
| N8N-AI-001 | AI SHALL return JSON only. |
| N8N-AI-002 | AI SHALL NOT invent topicTag outside weakAreas. |
| N8N-AI-003 | AI SHALL NOT act as chatbot. |
| N8N-AI-004 | AI SHALL NOT guarantee passing. |
| N8N-AI-005 | Backend SHALL validate AI output before saving. |

## 19.2 Trigger PDF Parsing Workflow

```http
POST {N8N_WEBHOOK_URL}/parse-pdf
```

### Headers

```http
x-api-key: <N8N_WEBHOOK_SECRET>
```

### Content-Type

`multipart/form-data`

### Form Fields

| Field | Type | Required | Description |
|---|---|---|---|
| file | File | Yes | PDF file |
| categoryHint | string | No | TWK/TIU/TKP/auto |
| batchId | string | Yes | Import batch ID |

### Response 200

```json
{
  "success": true,
  "totalParsed": 15,
  "validCount": 13,
  "invalidCount": 2,
  "questions": [
    {
      "questionText": "Hak dan kewajiban warga negara diatur dalam...",
      "options": [
        { "label": "A", "text": "Pasal 27 sampai 34 UUD 1945" },
        { "label": "B", "text": "Pasal 1 sampai 3 UUD 1945" },
        { "label": "C", "text": "Pasal 5 sampai 10 UUD 1945" },
        { "label": "D", "text": "Pasal 20 sampai 22 UUD 1945" },
        { "label": "E", "text": "Pasal 35 sampai 37 UUD 1945" }
      ],
      "correctAnswer": "A",
      "category": "TWK",
      "subCategory": "Tata Negara",
      "topicTag": "Hak dan Kewajiban Warga Negara",
      "difficulty": "medium",
      "confidenceScore": 86.5,
      "explanation": null
    }
  ],
  "invalidQuestions": []
}
```

---

# 20. Validation Rules Summary

| Area | Rule |
|---|---|
| Register | Email unique, password strong, phone optional but valid if provided. |
| Login | Email verified and account active. |
| Question | Active question requires category, subCategory, topicTag, difficulty, 5 options. |
| TWK/TIU | Exactly one correct answer. |
| TKP | Each option requires tkpWeight 1-5. |
| Exam Start | User must have active trial/subscription and sufficient active questions. |
| Submit Exam | Exam must be in_progress and owned by user. |
| Payment | Plan must be active, webhook signature valid, idempotent event. |
| Manual Activation | Reason is required and actor must be SUPER_ADMIN. |
| AI Recommendation | Output must be valid JSON and topics must match submitted weakAreas. |
| PDF Upload | File must be PDF and max size default 20MB. |

---

# 21. Rate Limiting Recommendation

| Endpoint Group | Limit |
|---|---|
| Login | 5 attempts per 15 minutes per IP/email |
| Register | 5 requests per hour per IP |
| Forgot Password | 3 requests per hour per email |
| Autosave Answer | Reasonable high limit, e.g. 120 requests/minute per user |
| Submit Exam | Idempotent, 5 requests/minute per exam session |
| PDF Upload | 10 uploads/day per admin for MVP configurable |
| Payment Checkout | 10 requests/hour per user |
| AI Regenerate | Admin-only, limited and audited |

---

# 22. Idempotency Requirements

| Operation | Idempotency Key | Behavior |
|---|---|---|
| Create checkout | X-Idempotency-Key | Duplicate request returns existing pending transaction. |
| Submit exam | examSessionId | Duplicate submit returns existing ExamResult. |
| Payment webhook | gateway_event_id | Duplicate webhook returns success without reprocessing. |
| Approve parsed question | parsedQuestionId | Already approved returns existing questionId. |

---

# 23. Security Requirements

| ID | Requirement |
|---|---|
| API-SEC-001 | Protected endpoints SHALL require valid JWT. |
| API-SEC-002 | Admin endpoints SHALL enforce role ADMIN or SUPER_ADMIN. |
| API-SEC-003 | Super Admin endpoints SHALL enforce role SUPER_ADMIN. |
| API-SEC-004 | User-owned resources SHALL validate ownership. |
| API-SEC-005 | Payment webhook SHALL verify signature before processing. |
| API-SEC-006 | Internal N8N webhook SHALL use secret header. |
| API-SEC-007 | Active exam endpoint SHALL NOT expose correct answers. |
| API-SEC-008 | Password and refresh tokens SHALL never be returned in API response. |
| API-SEC-009 | Payment sensitive data SHALL not be stored or returned. |
| API-SEC-010 | File upload SHALL validate MIME type, extension, and size. |

---

# 24. API Traceability Matrix

| Feature | API Endpoints |
|---|---|
| Register/Login | `/auth/register`, `/auth/login`, `/auth/verify-email`, `/auth/refresh` |
| User Dashboard | `/dashboard/summary` |
| Start Exam | `/exams/start`, `/exams/active`, `/exams/{id}` |
| Answer Autosave | `/exams/{id}/answers/{questionId}` |
| Submit & Scoring | `/exams/{id}/submit`, `/results/{id}` |
| AI Recommendation | `/results/{id}/ai-recommendation`, N8N `/generate-recommendation` |
| Exam History | `/exams/history`, `/results/{id}` |
| Subscription | `/subscription-plans`, `/subscriptions/me` |
| Payment | `/payments/checkout`, `/payments/{id}`, `/webhooks/payment/{provider}` |
| Question Bank | `/admin/questions` |
| PDF Parsing | `/admin/pdf-imports`, `/admin/parsed-questions/{id}` |
| Admin Monitoring | `/admin/dashboard/summary`, `/admin/users`, `/admin/transactions` |
| Super Admin | `/super-admin/admins`, `/super-admin/subscription-plans`, `/super-admin/passing-grade`, `/super-admin/trial-config`, `/super-admin/audit-logs` |

---

# 25. OpenAPI 3.0 Skeleton

```yaml
openapi: 3.0.3
info:
  title: ExamCPNS API
  version: 1.1.0
  description: API for ExamCPNS paid CPNS tryout platform with AI Recommendation after exam.
servers:
  - url: https://api.examcpns.com/api/v1
    description: Production
  - url: https://api-staging.examcpns.com/api/v1
    description: Staging
security:
  - bearerAuth: []
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          example: false
        message:
          type: string
        error:
          type: object
        requestId:
          type: string
paths:
  /auth/register:
    post:
      summary: Register user
      tags: [Auth]
  /auth/login:
    post:
      summary: Login
      tags: [Auth]
  /exams/start:
    post:
      summary: Start exam
      tags: [Exam]
  /exams/{examSessionId}/submit:
    post:
      summary: Submit exam
      tags: [Exam]
  /results/{examResultId}:
    get:
      summary: Get exam result
      tags: [Result]
  /admin/questions:
    get:
      summary: List questions
      tags: [Admin Question]
    post:
      summary: Create question
      tags: [Admin Question]
  /webhooks/payment/{provider}:
    post:
      summary: Payment webhook
      tags: [Webhook]
```

---

# 26. Completeness Check

| Check Item | Status | Notes |
|---|---|---|
| Auth APIs covered | Complete | Register, verify, login, refresh, reset password |
| User APIs covered | Complete | Dashboard, profile, subscription, payment |
| Exam APIs covered | Complete | Start, active, detail, autosave, flag, submit, integrity |
| Result APIs covered | Complete | Result detail, answer review, AI recommendation |
| Admin APIs covered | Complete | Question bank, PDF import, parsed review, monitoring |
| Super Admin APIs covered | Complete | Admin accounts, plans, passing grade, trial config, manual activation, audit log |
| Webhook APIs covered | Complete | Payment webhook and internal AI workflow |
| Security covered | Complete | JWT, RBAC, ownership, webhook signature, N8N secret |
| Idempotency covered | Complete | Checkout, submit, webhook, approve parsed question |
| Validation covered | Complete | Question, exam, payment, AI, PDF upload |

---

# 27. Next Recommended Documents

Dokumen berikutnya yang direkomendasikan:

1. Prisma Schema Draft.
2. Product Backlog / User Stories.
3. Test Scenario & Acceptance Test Plan.
4. Deployment Runbook.

---

*Document generated: 14 Mei 2026 | Version 1.1 | Status: Draft*

