-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('TWK', 'TIU', 'TKP');

-- CreateEnum
CREATE TYPE "QuestionDifficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('draft', 'pending_review', 'active', 'archived');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('manual', 'pdf_import');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('multiple_choice');

-- CreateEnum
CREATE TYPE "TryoutType" AS ENUM ('generated', 'manual', 'hybrid', 'adaptive');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('trial_only', 'paid_only', 'trial_and_paid', 'premium_only');

-- CreateEnum
CREATE TYPE "TryoutStatus" AS ENUM ('draft', 'review', 'published', 'archived');

-- CreateEnum
CREATE TYPE "RandomizationMode" AS ENUM ('random_by_category', 'random_by_category_and_difficulty', 'random_by_topic_distribution', 'manual_question_set', 'hybrid_manual_and_random', 'adaptive_weak_area');

-- CreateEnum
CREATE TYPE "QuestionOrderMode" AS ENUM ('category_order', 'mixed_random', 'manual_order');

-- CreateEnum
CREATE TYPE "ManualQuestionSetStatus" AS ENUM ('draft', 'review', 'approved', 'archived');

-- CreateEnum
CREATE TYPE "ExamSessionStatus" AS ENUM ('in_progress', 'submitted', 'auto_submitted', 'expired', 'cancelled');

-- CreateEnum
CREATE TYPE "ExamIntegrityEventType" AS ENUM ('tab_switch', 'fullscreen_exit', 'reconnect', 'warning_shown');

-- CreateEnum
CREATE TYPE "AIRecommendationStatus" AS ENUM ('processing', 'completed', 'failed', 'fallback');

-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "ReasonCode" AS ENUM ('LOW_ACCURACY', 'LOW_ACCURACY_AND_CATEGORY_NOT_PASSED', 'REPEATED_WEAKNESS', 'DECLINING_TREND', 'EASY_MEDIUM_FAILURE', 'HIGH_SCORE_IMPACT', 'NEW_WEAK_AREA', 'NO_SIGNIFICANT_WEAKNESS');

-- CreateEnum
CREATE TYPE "TrendType" AS ENUM ('improving', 'declining', 'stagnant', 'new_weak_area', 'no_history');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('pending', 'active', 'expired', 'cancelled');

-- CreateEnum
CREATE TYPE "ActivationSource" AS ENUM ('payment', 'trial', 'manual');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'success', 'failed', 'expired', 'cancelled', 'refunded');

-- CreateEnum
CREATE TYPE "ImportBatchStatus" AS ENUM ('processing', 'completed', 'partial_failed', 'failed');

-- CreateEnum
CREATE TYPE "ParsedQuestionStatus" AS ENUM ('pending_review', 'approved', 'rejected', 'draft');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(30),
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "refresh_token_hash" VARCHAR(255) NOT NULL,
    "user_agent" TEXT,
    "ip_address" VARCHAR(50),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "category" "QuestionCategory" NOT NULL,
    "sub_category" VARCHAR(100) NOT NULL,
    "topic_tag" VARCHAR(150) NOT NULL,
    "competency_area" VARCHAR(150),
    "difficulty" "QuestionDifficulty" NOT NULL,
    "question_type" "QuestionType" NOT NULL DEFAULT 'multiple_choice',
    "source_type" "SourceType" NOT NULL,
    "status" "QuestionStatus" NOT NULL,
    "explanation" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "label" VARCHAR(1) NOT NULL,
    "option_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "tkp_weight" INTEGER,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_tags" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "tag" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_import_batches" (
    "id" TEXT NOT NULL,
    "uploaded_by" TEXT NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_url" TEXT,
    "file_size_bytes" INTEGER NOT NULL,
    "status" "ImportBatchStatus" NOT NULL,
    "total_detected" INTEGER NOT NULL DEFAULT 0,
    "valid_count" INTEGER NOT NULL DEFAULT 0,
    "invalid_count" INTEGER NOT NULL DEFAULT 0,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "question_import_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parsed_question_reviews" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "question_id" TEXT,
    "raw_ai_output" JSONB,
    "question_text" TEXT NOT NULL,
    "options_json" JSONB NOT NULL,
    "detected_answer" VARCHAR(1),
    "category" "QuestionCategory",
    "sub_category" VARCHAR(100),
    "topic_tag" VARCHAR(150),
    "difficulty" "QuestionDifficulty",
    "confidence_score" DECIMAL(5,2),
    "status" "ParsedQuestionStatus" NOT NULL,
    "review_notes" TEXT,
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parsed_question_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tryout_catalogs" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "tryout_type" "TryoutType" NOT NULL,
    "access_type" "AccessType" NOT NULL,
    "status" "TryoutStatus" NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "duration_minutes" INTEGER NOT NULL,
    "total_questions" INTEGER NOT NULL,
    "passing_grade_config_id" TEXT,
    "show_result_immediately" BOOLEAN NOT NULL DEFAULT true,
    "show_answer_review" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT NOT NULL,
    "approved_by" TEXT,
    "published_at" TIMESTAMP(3),
    "archived_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tryout_catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tryout_generation_rules" (
    "id" TEXT NOT NULL,
    "tryout_catalog_id" TEXT NOT NULL,
    "randomization_mode" "RandomizationMode" NOT NULL,
    "question_order_mode" "QuestionOrderMode" NOT NULL,
    "avoid_recent_questions" BOOLEAN NOT NULL DEFAULT false,
    "avoid_recent_exam_count" INTEGER NOT NULL DEFAULT 0,
    "rules_json" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tryout_generation_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tryout_rule_sections" (
    "id" TEXT NOT NULL,
    "tryout_generation_rule_id" TEXT NOT NULL,
    "category" "QuestionCategory" NOT NULL,
    "question_count" INTEGER NOT NULL,
    "difficulty_distribution_json" JSONB,
    "topic_distribution_json" JSONB,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tryout_rule_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manual_question_sets" (
    "id" TEXT NOT NULL,
    "tryout_catalog_id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "status" "ManualQuestionSetStatus" NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manual_question_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manual_question_set_items" (
    "id" TEXT NOT NULL,
    "manual_question_set_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "question_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manual_question_set_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tryout_catalog_id" TEXT NOT NULL,
    "status" "ExamSessionStatus" NOT NULL,
    "generation_mode_snapshot" "RandomizationMode" NOT NULL,
    "tryout_snapshot" JSONB NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "submitted_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "duration_seconds" INTEGER,
    "tab_switch_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_session_questions" (
    "id" TEXT NOT NULL,
    "exam_session_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "question_order" INTEGER NOT NULL,
    "question_snapshot" JSONB NOT NULL,
    "options_snapshot" JSONB NOT NULL,
    "category_snapshot" "QuestionCategory" NOT NULL,
    "sub_category_snapshot" VARCHAR(100) NOT NULL,
    "topic_tag_snapshot" VARCHAR(150) NOT NULL,
    "difficulty_snapshot" "QuestionDifficulty" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_session_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_answers" (
    "id" TEXT NOT NULL,
    "exam_session_id" TEXT NOT NULL,
    "exam_session_question_id" TEXT NOT NULL,
    "selected_option_id" TEXT,
    "selected_label" VARCHAR(1),
    "is_correct" BOOLEAN,
    "score_awarded" INTEGER NOT NULL DEFAULT 0,
    "is_flagged" BOOLEAN NOT NULL DEFAULT false,
    "answered_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_results" (
    "id" TEXT NOT NULL,
    "exam_session_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "passing_grade_config_id" TEXT NOT NULL,
    "twk_score" INTEGER NOT NULL,
    "tiu_score" INTEGER NOT NULL,
    "tkp_score" INTEGER NOT NULL,
    "total_score" INTEGER NOT NULL,
    "twk_passed" BOOLEAN NOT NULL,
    "tiu_passed" BOOLEAN NOT NULL,
    "tkp_passed" BOOLEAN NOT NULL,
    "total_passed" BOOLEAN NOT NULL,
    "overall_passed" BOOLEAN NOT NULL,
    "breakdown_json" JSONB NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_integrity_logs" (
    "id" TEXT NOT NULL,
    "exam_session_id" TEXT NOT NULL,
    "event_type" "ExamIntegrityEventType" NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_integrity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_recommendations" (
    "id" TEXT NOT NULL,
    "exam_result_id" TEXT NOT NULL,
    "status" "AIRecommendationStatus" NOT NULL,
    "summary" TEXT,
    "overall_assessment" TEXT,
    "next_tryout_strategy" TEXT,
    "raw_request_payload" JSONB,
    "raw_ai_response" JSONB,
    "is_fallback" BOOLEAN NOT NULL DEFAULT false,
    "model_name" VARCHAR(100),
    "error_message" TEXT,
    "generated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_recommendation_items" (
    "id" TEXT NOT NULL,
    "ai_recommendation_id" TEXT NOT NULL,
    "priority_order" INTEGER NOT NULL,
    "priority_level" "PriorityLevel" NOT NULL,
    "priority_score" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "category" "QuestionCategory" NOT NULL,
    "sub_category" VARCHAR(100) NOT NULL,
    "topic_tag" VARCHAR(150) NOT NULL,
    "reason_code" "ReasonCode" NOT NULL,
    "reason_codes" JSONB NOT NULL DEFAULT '[]',
    "trend" "TrendType" NOT NULL DEFAULT 'no_history',
    "reason" TEXT NOT NULL,
    "suggested_focus" JSONB NOT NULL,
    "accuracy" DECIMAL(5,2),
    "wrong_answer_rate" DECIMAL(5,2),
    "total_questions" INTEGER,
    "correct_answers" INTEGER,
    "wrong_answers" INTEGER,
    "empty_answers" INTEGER,
    "dominant_difficulty" "QuestionDifficulty",
    "score_impact" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_recommendation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "duration_days" INTEGER NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'IDR',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_trial" BOOLEAN NOT NULL DEFAULT false,
    "trial_tryout_limit" INTEGER,
    "trial_day_limit" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "subscription_plan_id" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "tryout_limit" INTEGER,
    "tryout_used" INTEGER NOT NULL DEFAULT 0,
    "is_trial" BOOLEAN NOT NULL DEFAULT false,
    "activation_source" "ActivationSource" NOT NULL,
    "activated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "subscription_plan_id" TEXT NOT NULL,
    "user_subscription_id" TEXT,
    "invoice_number" VARCHAR(100) NOT NULL,
    "gateway_provider" VARCHAR(50) NOT NULL,
    "gateway_transaction_id" VARCHAR(150),
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'IDR',
    "payment_method" VARCHAR(50),
    "status" "PaymentStatus" NOT NULL,
    "payment_url" TEXT,
    "paid_at" TIMESTAMP(3),
    "expired_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_webhook_events" (
    "id" TEXT NOT NULL,
    "payment_transaction_id" TEXT,
    "gateway_event_id" VARCHAR(150) NOT NULL,
    "event_type" VARCHAR(100) NOT NULL,
    "payload" JSONB NOT NULL,
    "signature_valid" BOOLEAN NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "processed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passing_grade_configs" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "twk_min_score" INTEGER NOT NULL,
    "tiu_min_score" INTEGER NOT NULL,
    "tkp_min_score" INTEGER NOT NULL,
    "total_min_score" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passing_grade_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trial_configs" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "free_tryout_count" INTEGER NOT NULL,
    "trial_duration_days" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trial_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_user_id" TEXT,
    "actor_role" VARCHAR(50) NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "module" VARCHAR(100) NOT NULL,
    "target_type" VARCHAR(100),
    "target_id" TEXT,
    "metadata" JSONB,
    "ip_address" VARCHAR(50),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_role" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_deleted_at_idx" ON "users"("deleted_at");

-- CreateIndex
CREATE INDEX "user_sessions_user_id_created_at_idx" ON "user_sessions"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_hash_key" ON "email_verification_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "email_verification_tokens_user_id_expires_at_idx" ON "email_verification_tokens"("user_id", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_hash_key" ON "password_reset_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "password_reset_tokens_user_id_expires_at_idx" ON "password_reset_tokens"("user_id", "expires_at");

-- CreateIndex
CREATE INDEX "idx_questions_active_category" ON "questions"("status", "category");

-- CreateIndex
CREATE INDEX "idx_questions_topic" ON "questions"("topic_tag");

-- CreateIndex
CREATE INDEX "idx_questions_sub_category" ON "questions"("sub_category");

-- CreateIndex
CREATE INDEX "idx_questions_difficulty" ON "questions"("difficulty");

-- CreateIndex
CREATE INDEX "questions_deleted_at_idx" ON "questions"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_question_option_label" ON "question_options"("question_id", "label");

-- CreateIndex
CREATE UNIQUE INDEX "uq_question_option_order" ON "question_options"("question_id", "display_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_question_tag" ON "question_tags"("question_id", "tag");

-- CreateIndex
CREATE INDEX "question_import_batches_uploaded_by_created_at_idx" ON "question_import_batches"("uploaded_by", "created_at");

-- CreateIndex
CREATE INDEX "parsed_question_reviews_batch_id_status_idx" ON "parsed_question_reviews"("batch_id", "status");

-- CreateIndex
CREATE INDEX "parsed_question_reviews_reviewed_by_idx" ON "parsed_question_reviews"("reviewed_by");

-- CreateIndex
CREATE INDEX "tryout_catalogs_status_is_public_access_type_idx" ON "tryout_catalogs"("status", "is_public", "access_type");

-- CreateIndex
CREATE INDEX "tryout_catalogs_sort_order_idx" ON "tryout_catalogs"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "tryout_generation_rules_tryout_catalog_id_key" ON "tryout_generation_rules"("tryout_catalog_id");

-- CreateIndex
CREATE INDEX "tryout_rule_sections_tryout_generation_rule_id_sort_order_idx" ON "tryout_rule_sections"("tryout_generation_rule_id", "sort_order");

-- CreateIndex
CREATE INDEX "manual_question_sets_tryout_catalog_id_status_idx" ON "manual_question_sets"("tryout_catalog_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "uq_manual_question_set_item_order" ON "manual_question_set_items"("manual_question_set_id", "question_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_manual_question_set_item_question" ON "manual_question_set_items"("manual_question_set_id", "question_id");

-- CreateIndex
CREATE INDEX "idx_exam_sessions_user" ON "exam_sessions"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "exam_sessions_status_expires_at_idx" ON "exam_sessions"("status", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_exam_question_order" ON "exam_session_questions"("exam_session_id", "question_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_exam_question_original" ON "exam_session_questions"("exam_session_id", "question_id");

-- CreateIndex
CREATE INDEX "idx_exam_answers_session" ON "exam_answers"("exam_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_exam_answer_question" ON "exam_answers"("exam_session_id", "exam_session_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "exam_results_exam_session_id_key" ON "exam_results"("exam_session_id");

-- CreateIndex
CREATE INDEX "idx_exam_results_user" ON "exam_results"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "exam_integrity_logs_exam_session_id_created_at_idx" ON "exam_integrity_logs"("exam_session_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_ai_exam_result" ON "ai_recommendations"("exam_result_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_ai_recommendation_item_order" ON "ai_recommendation_items"("ai_recommendation_id", "priority_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_ai_recommendation_item_topic" ON "ai_recommendation_items"("ai_recommendation_id", "category", "sub_category", "topic_tag");

-- CreateIndex
CREATE INDEX "subscription_plans_is_active_is_trial_idx" ON "subscription_plans"("is_active", "is_trial");

-- CreateIndex
CREATE INDEX "idx_subscription_user_status" ON "user_subscriptions"("user_id", "status");

-- CreateIndex
CREATE INDEX "user_subscriptions_end_date_idx" ON "user_subscriptions"("end_date");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactions_invoice_number_key" ON "payment_transactions"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactions_gateway_transaction_id_key" ON "payment_transactions"("gateway_transaction_id");

-- CreateIndex
CREATE INDEX "idx_payment_user" ON "payment_transactions"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_payment_gateway_transaction" ON "payment_transactions"("gateway_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_webhook_events_gateway_event_id_key" ON "payment_webhook_events"("gateway_event_id");

-- CreateIndex
CREATE INDEX "idx_webhook_event_unique" ON "payment_webhook_events"("gateway_event_id");

-- CreateIndex
CREATE INDEX "payment_webhook_events_payment_transaction_id_created_at_idx" ON "payment_webhook_events"("payment_transaction_id", "created_at");

-- CreateIndex
CREATE INDEX "passing_grade_configs_is_active_effective_from_idx" ON "passing_grade_configs"("is_active", "effective_from");

-- CreateIndex
CREATE INDEX "trial_configs_is_active_idx" ON "trial_configs"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_key_key" ON "system_settings"("key");

-- CreateIndex
CREATE INDEX "idx_audit_actor_date" ON "audit_logs"("actor_user_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_module_action_created_at_idx" ON "audit_logs"("module", "action", "created_at");

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_import_batches" ADD CONSTRAINT "question_import_batches_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parsed_question_reviews" ADD CONSTRAINT "parsed_question_reviews_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "question_import_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parsed_question_reviews" ADD CONSTRAINT "parsed_question_reviews_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parsed_question_reviews" ADD CONSTRAINT "parsed_question_reviews_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tryout_catalogs" ADD CONSTRAINT "tryout_catalogs_passing_grade_config_id_fkey" FOREIGN KEY ("passing_grade_config_id") REFERENCES "passing_grade_configs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tryout_catalogs" ADD CONSTRAINT "tryout_catalogs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tryout_catalogs" ADD CONSTRAINT "tryout_catalogs_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tryout_generation_rules" ADD CONSTRAINT "tryout_generation_rules_tryout_catalog_id_fkey" FOREIGN KEY ("tryout_catalog_id") REFERENCES "tryout_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tryout_rule_sections" ADD CONSTRAINT "tryout_rule_sections_tryout_generation_rule_id_fkey" FOREIGN KEY ("tryout_generation_rule_id") REFERENCES "tryout_generation_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_question_sets" ADD CONSTRAINT "manual_question_sets_tryout_catalog_id_fkey" FOREIGN KEY ("tryout_catalog_id") REFERENCES "tryout_catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_question_sets" ADD CONSTRAINT "manual_question_sets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_question_set_items" ADD CONSTRAINT "manual_question_set_items_manual_question_set_id_fkey" FOREIGN KEY ("manual_question_set_id") REFERENCES "manual_question_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_question_set_items" ADD CONSTRAINT "manual_question_set_items_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_sessions" ADD CONSTRAINT "exam_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_sessions" ADD CONSTRAINT "exam_sessions_tryout_catalog_id_fkey" FOREIGN KEY ("tryout_catalog_id") REFERENCES "tryout_catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_session_questions" ADD CONSTRAINT "exam_session_questions_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_session_questions" ADD CONSTRAINT "exam_session_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_answers" ADD CONSTRAINT "exam_answers_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_answers" ADD CONSTRAINT "exam_answers_exam_session_question_id_fkey" FOREIGN KEY ("exam_session_question_id") REFERENCES "exam_session_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_answers" ADD CONSTRAINT "exam_answers_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "question_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_results" ADD CONSTRAINT "exam_results_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_results" ADD CONSTRAINT "exam_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_results" ADD CONSTRAINT "exam_results_passing_grade_config_id_fkey" FOREIGN KEY ("passing_grade_config_id") REFERENCES "passing_grade_configs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_integrity_logs" ADD CONSTRAINT "exam_integrity_logs_exam_session_id_fkey" FOREIGN KEY ("exam_session_id") REFERENCES "exam_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_recommendations" ADD CONSTRAINT "ai_recommendations_exam_result_id_fkey" FOREIGN KEY ("exam_result_id") REFERENCES "exam_results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_recommendation_items" ADD CONSTRAINT "ai_recommendation_items_ai_recommendation_id_fkey" FOREIGN KEY ("ai_recommendation_id") REFERENCES "ai_recommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_subscription_plan_id_fkey" FOREIGN KEY ("subscription_plan_id") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_activated_by_fkey" FOREIGN KEY ("activated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_subscription_plan_id_fkey" FOREIGN KEY ("subscription_plan_id") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_user_subscription_id_fkey" FOREIGN KEY ("user_subscription_id") REFERENCES "user_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_webhook_events" ADD CONSTRAINT "payment_webhook_events_payment_transaction_id_fkey" FOREIGN KEY ("payment_transaction_id") REFERENCES "payment_transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
