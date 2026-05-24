export const UserRole = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    USER: 'USER'
};
export const UserStatus = {
    active: 'active',
    inactive: 'inactive',
    suspended: 'suspended'
};
export const QuestionCategory = {
    TWK: 'TWK',
    TIU: 'TIU',
    TKP: 'TKP'
};
export const QuestionDifficulty = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard'
};
export const QuestionStatus = {
    draft: 'draft',
    pending_review: 'pending_review',
    active: 'active',
    archived: 'archived'
};
export const SourceType = {
    manual: 'manual',
    pdf_import: 'pdf_import'
};
export const QuestionType = {
    multiple_choice: 'multiple_choice'
};
export const TryoutType = {
    generated: 'generated',
    manual: 'manual',
    hybrid: 'hybrid',
    adaptive: 'adaptive'
};
export const AccessType = {
    trial_only: 'trial_only',
    paid_only: 'paid_only',
    trial_and_paid: 'trial_and_paid',
    premium_only: 'premium_only'
};
export const TryoutStatus = {
    draft: 'draft',
    review: 'review',
    published: 'published',
    archived: 'archived'
};
export const RandomizationMode = {
    random_by_category: 'random_by_category',
    random_by_category_and_difficulty: 'random_by_category_and_difficulty',
    random_by_topic_distribution: 'random_by_topic_distribution',
    manual_question_set: 'manual_question_set',
    hybrid_manual_and_random: 'hybrid_manual_and_random',
    adaptive_weak_area: 'adaptive_weak_area'
};
export const QuestionOrderMode = {
    category_order: 'category_order',
    mixed_random: 'mixed_random',
    manual_order: 'manual_order'
};
export const ManualQuestionSetStatus = {
    draft: 'draft',
    review: 'review',
    approved: 'approved',
    archived: 'archived'
};
export const ExamSessionStatus = {
    in_progress: 'in_progress',
    submitted: 'submitted',
    auto_submitted: 'auto_submitted',
    expired: 'expired',
    cancelled: 'cancelled'
};
export const ExamIntegrityEventType = {
    tab_switch: 'tab_switch',
    fullscreen_exit: 'fullscreen_exit',
    reconnect: 'reconnect',
    warning_shown: 'warning_shown'
};
export const AIRecommendationStatus = {
    processing: 'processing',
    completed: 'completed',
    failed: 'failed',
    fallback: 'fallback'
};
export const PriorityLevel = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
};
export const ReasonCode = {
    LOW_ACCURACY: 'LOW_ACCURACY',
    LOW_ACCURACY_AND_CATEGORY_NOT_PASSED: 'LOW_ACCURACY_AND_CATEGORY_NOT_PASSED',
    REPEATED_WEAKNESS: 'REPEATED_WEAKNESS',
    DECLINING_TREND: 'DECLINING_TREND',
    EASY_MEDIUM_FAILURE: 'EASY_MEDIUM_FAILURE',
    HIGH_SCORE_IMPACT: 'HIGH_SCORE_IMPACT',
    NEW_WEAK_AREA: 'NEW_WEAK_AREA',
    NO_SIGNIFICANT_WEAKNESS: 'NO_SIGNIFICANT_WEAKNESS'
};
export const TrendType = {
    improving: 'improving',
    declining: 'declining',
    stagnant: 'stagnant',
    new_weak_area: 'new_weak_area',
    no_history: 'no_history'
};
export const SubscriptionStatus = {
    pending: 'pending',
    active: 'active',
    expired: 'expired',
    cancelled: 'cancelled'
};
export const ActivationSource = {
    payment: 'payment',
    trial: 'trial',
    manual: 'manual'
};
export const PaymentStatus = {
    pending: 'pending',
    success: 'success',
    failed: 'failed',
    expired: 'expired',
    cancelled: 'cancelled',
    refunded: 'refunded'
};
export const ImportBatchStatus = {
    processing: 'processing',
    completed: 'completed',
    partial_failed: 'partial_failed',
    failed: 'failed'
};
export const ParsedQuestionStatus = {
    pending_review: 'pending_review',
    approved: 'approved',
    rejected: 'rejected',
    draft: 'draft'
};
//# sourceMappingURL=enums.js.map