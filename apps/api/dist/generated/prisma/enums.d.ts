export declare const UserRole: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly active: "active";
    readonly inactive: "inactive";
    readonly suspended: "suspended";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const QuestionCategory: {
    readonly TWK: "TWK";
    readonly TIU: "TIU";
    readonly TKP: "TKP";
};
export type QuestionCategory = (typeof QuestionCategory)[keyof typeof QuestionCategory];
export declare const QuestionDifficulty: {
    readonly easy: "easy";
    readonly medium: "medium";
    readonly hard: "hard";
};
export type QuestionDifficulty = (typeof QuestionDifficulty)[keyof typeof QuestionDifficulty];
export declare const QuestionStatus: {
    readonly draft: "draft";
    readonly pending_review: "pending_review";
    readonly active: "active";
    readonly archived: "archived";
};
export type QuestionStatus = (typeof QuestionStatus)[keyof typeof QuestionStatus];
export declare const SourceType: {
    readonly manual: "manual";
    readonly pdf_import: "pdf_import";
};
export type SourceType = (typeof SourceType)[keyof typeof SourceType];
export declare const QuestionType: {
    readonly multiple_choice: "multiple_choice";
};
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];
export declare const TryoutType: {
    readonly generated: "generated";
    readonly manual: "manual";
    readonly hybrid: "hybrid";
    readonly adaptive: "adaptive";
};
export type TryoutType = (typeof TryoutType)[keyof typeof TryoutType];
export declare const AccessType: {
    readonly trial_only: "trial_only";
    readonly paid_only: "paid_only";
    readonly trial_and_paid: "trial_and_paid";
    readonly premium_only: "premium_only";
};
export type AccessType = (typeof AccessType)[keyof typeof AccessType];
export declare const TryoutStatus: {
    readonly draft: "draft";
    readonly review: "review";
    readonly published: "published";
    readonly archived: "archived";
};
export type TryoutStatus = (typeof TryoutStatus)[keyof typeof TryoutStatus];
export declare const RandomizationMode: {
    readonly random_by_category: "random_by_category";
    readonly random_by_category_and_difficulty: "random_by_category_and_difficulty";
    readonly random_by_topic_distribution: "random_by_topic_distribution";
    readonly manual_question_set: "manual_question_set";
    readonly hybrid_manual_and_random: "hybrid_manual_and_random";
    readonly adaptive_weak_area: "adaptive_weak_area";
};
export type RandomizationMode = (typeof RandomizationMode)[keyof typeof RandomizationMode];
export declare const QuestionOrderMode: {
    readonly category_order: "category_order";
    readonly mixed_random: "mixed_random";
    readonly manual_order: "manual_order";
};
export type QuestionOrderMode = (typeof QuestionOrderMode)[keyof typeof QuestionOrderMode];
export declare const ManualQuestionSetStatus: {
    readonly draft: "draft";
    readonly review: "review";
    readonly approved: "approved";
    readonly archived: "archived";
};
export type ManualQuestionSetStatus = (typeof ManualQuestionSetStatus)[keyof typeof ManualQuestionSetStatus];
export declare const ExamSessionStatus: {
    readonly in_progress: "in_progress";
    readonly submitted: "submitted";
    readonly auto_submitted: "auto_submitted";
    readonly expired: "expired";
    readonly cancelled: "cancelled";
};
export type ExamSessionStatus = (typeof ExamSessionStatus)[keyof typeof ExamSessionStatus];
export declare const ExamIntegrityEventType: {
    readonly tab_switch: "tab_switch";
    readonly fullscreen_exit: "fullscreen_exit";
    readonly reconnect: "reconnect";
    readonly warning_shown: "warning_shown";
};
export type ExamIntegrityEventType = (typeof ExamIntegrityEventType)[keyof typeof ExamIntegrityEventType];
export declare const AIRecommendationStatus: {
    readonly processing: "processing";
    readonly completed: "completed";
    readonly failed: "failed";
    readonly fallback: "fallback";
};
export type AIRecommendationStatus = (typeof AIRecommendationStatus)[keyof typeof AIRecommendationStatus];
export declare const PriorityLevel: {
    readonly HIGH: "HIGH";
    readonly MEDIUM: "MEDIUM";
    readonly LOW: "LOW";
};
export type PriorityLevel = (typeof PriorityLevel)[keyof typeof PriorityLevel];
export declare const ReasonCode: {
    readonly LOW_ACCURACY: "LOW_ACCURACY";
    readonly LOW_ACCURACY_AND_CATEGORY_NOT_PASSED: "LOW_ACCURACY_AND_CATEGORY_NOT_PASSED";
    readonly REPEATED_WEAKNESS: "REPEATED_WEAKNESS";
    readonly DECLINING_TREND: "DECLINING_TREND";
    readonly EASY_MEDIUM_FAILURE: "EASY_MEDIUM_FAILURE";
    readonly HIGH_SCORE_IMPACT: "HIGH_SCORE_IMPACT";
    readonly NEW_WEAK_AREA: "NEW_WEAK_AREA";
    readonly NO_SIGNIFICANT_WEAKNESS: "NO_SIGNIFICANT_WEAKNESS";
};
export type ReasonCode = (typeof ReasonCode)[keyof typeof ReasonCode];
export declare const TrendType: {
    readonly improving: "improving";
    readonly declining: "declining";
    readonly stagnant: "stagnant";
    readonly new_weak_area: "new_weak_area";
    readonly no_history: "no_history";
};
export type TrendType = (typeof TrendType)[keyof typeof TrendType];
export declare const SubscriptionStatus: {
    readonly pending: "pending";
    readonly active: "active";
    readonly expired: "expired";
    readonly cancelled: "cancelled";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const ActivationSource: {
    readonly payment: "payment";
    readonly trial: "trial";
    readonly manual: "manual";
};
export type ActivationSource = (typeof ActivationSource)[keyof typeof ActivationSource];
export declare const PaymentStatus: {
    readonly pending: "pending";
    readonly success: "success";
    readonly failed: "failed";
    readonly expired: "expired";
    readonly cancelled: "cancelled";
    readonly refunded: "refunded";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const ImportBatchStatus: {
    readonly processing: "processing";
    readonly completed: "completed";
    readonly partial_failed: "partial_failed";
    readonly failed: "failed";
};
export type ImportBatchStatus = (typeof ImportBatchStatus)[keyof typeof ImportBatchStatus];
export declare const ParsedQuestionStatus: {
    readonly pending_review: "pending_review";
    readonly approved: "approved";
    readonly rejected: "rejected";
    readonly draft: "draft";
};
export type ParsedQuestionStatus = (typeof ParsedQuestionStatus)[keyof typeof ParsedQuestionStatus];
