-- CreateEnum
CREATE TYPE "QuestionAnswerMode" AS ENUM ('single_correct', 'weighted_options');

-- CreateTable
CREATE TABLE "question_categories" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "answer_mode" "QuestionAnswerMode" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "question_categories_code_key" ON "question_categories"("code");

-- CreateIndex
CREATE INDEX "idx_question_categories_active" ON "question_categories"("is_active", "sort_order");

-- Seed categories
INSERT INTO "question_categories" (
    "id",
    "code",
    "name",
    "answer_mode",
    "is_active",
    "sort_order",
    "created_at",
    "updated_at"
)
VALUES
    (md5('question-category:TWK'), 'TWK', 'TWK', 'single_correct', true, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (md5('question-category:TIU'), 'TIU', 'TIU', 'single_correct', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (md5('question-category:TKP'), 'TKP', 'TKP', 'weighted_options', true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Rename option score column
ALTER TABLE "question_options"
RENAME COLUMN "tkp_weight" TO "option_weight";

-- Add category references
ALTER TABLE "questions"
ADD COLUMN "category_id" TEXT;

ALTER TABLE "question_sub_categories"
ADD COLUMN "category_id" TEXT;

ALTER TABLE "tryout_rule_sections"
ADD COLUMN "category_id" TEXT;

ALTER TABLE "parsed_question_reviews"
ADD COLUMN "category_code" VARCHAR(50);

ALTER TABLE "exam_session_questions"
ALTER COLUMN "category_snapshot" TYPE VARCHAR(50)
USING "category_snapshot"::text;

ALTER TABLE "exam_session_questions"
ADD COLUMN "category_name_snapshot" VARCHAR(100),
ADD COLUMN "answer_mode_snapshot" "QuestionAnswerMode";

ALTER TABLE "ai_recommendation_items"
ALTER COLUMN "category" TYPE VARCHAR(50)
USING "category"::text;

-- Backfill category references
UPDATE "questions" q
SET "category_id" = qc."id"
FROM "question_categories" qc
WHERE qc."code" = q."category"::text;

UPDATE "question_sub_categories" qsc
SET "category_id" = qc."id"
FROM "question_categories" qc
WHERE qc."code" = qsc."category"::text;

UPDATE "tryout_rule_sections" trs
SET "category_id" = qc."id"
FROM "question_categories" qc
WHERE qc."code" = trs."category"::text;

UPDATE "parsed_question_reviews" p
SET "category_code" = p."category"::text
WHERE p."category" IS NOT NULL;

UPDATE "exam_session_questions" esq
SET
    "category_name_snapshot" = qc."name",
    "answer_mode_snapshot" = qc."answer_mode"
FROM "question_categories" qc
WHERE qc."code" = esq."category_snapshot";

-- Make new category fields required
ALTER TABLE "questions"
ALTER COLUMN "category_id" SET NOT NULL;

ALTER TABLE "question_sub_categories"
ALTER COLUMN "category_id" SET NOT NULL;

ALTER TABLE "tryout_rule_sections"
ALTER COLUMN "category_id" SET NOT NULL;

ALTER TABLE "exam_session_questions"
ALTER COLUMN "category_name_snapshot" SET NOT NULL,
ALTER COLUMN "answer_mode_snapshot" SET NOT NULL;

-- Replace old indexes
DROP INDEX IF EXISTS "idx_questions_active_category";
DROP INDEX IF EXISTS "uq_question_sub_categories_category_slug";
DROP INDEX IF EXISTS "idx_question_sub_categories_category_active";

CREATE INDEX "idx_questions_active_category"
ON "questions"("status", "category_id");

CREATE UNIQUE INDEX "uq_question_sub_categories_category_slug"
ON "question_sub_categories"("category_id", "slug");

CREATE INDEX "idx_question_sub_categories_category_active"
ON "question_sub_categories"("category_id", "is_active", "sort_order");

-- Add category foreign keys
ALTER TABLE "questions"
ADD CONSTRAINT "questions_category_id_fkey"
FOREIGN KEY ("category_id") REFERENCES "question_categories"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "question_sub_categories"
ADD CONSTRAINT "question_sub_categories_category_id_fkey"
FOREIGN KEY ("category_id") REFERENCES "question_categories"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "tryout_rule_sections"
ADD CONSTRAINT "tryout_rule_sections_category_id_fkey"
FOREIGN KEY ("category_id") REFERENCES "question_categories"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Dynamic passing grade items
CREATE TABLE "passing_grade_config_items" (
    "id" TEXT NOT NULL,
    "passing_grade_config_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "min_score" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passing_grade_config_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uq_passing_grade_config_item"
ON "passing_grade_config_items"("passing_grade_config_id", "category_id");

CREATE INDEX "idx_passing_grade_config_items_category"
ON "passing_grade_config_items"("category_id");

ALTER TABLE "passing_grade_config_items"
ADD CONSTRAINT "passing_grade_config_items_passing_grade_config_id_fkey"
FOREIGN KEY ("passing_grade_config_id") REFERENCES "passing_grade_configs"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "passing_grade_config_items"
ADD CONSTRAINT "passing_grade_config_items_category_id_fkey"
FOREIGN KEY ("category_id") REFERENCES "question_categories"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "passing_grade_config_items" (
    "id",
    "passing_grade_config_id",
    "category_id",
    "min_score",
    "created_at",
    "updated_at"
)
SELECT
    md5('passing-grade-item:' || pg."id" || ':' || qc."id"),
    pg."id",
    qc."id",
    CASE qc."code"
        WHEN 'TWK' THEN pg."twk_min_score"
        WHEN 'TIU' THEN pg."tiu_min_score"
        WHEN 'TKP' THEN pg."tkp_min_score"
        ELSE 0
    END,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "passing_grade_configs" pg
JOIN "question_categories" qc
    ON qc."code" IN ('TWK', 'TIU', 'TKP');

-- Dynamic exam result category scores
CREATE TABLE "exam_result_category_scores" (
    "id" TEXT NOT NULL,
    "exam_result_id" TEXT NOT NULL,
    "category_code" VARCHAR(50) NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "score" INTEGER NOT NULL,
    "min_score" INTEGER NOT NULL DEFAULT 0,
    "passed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_result_category_scores_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uq_exam_result_category_score"
ON "exam_result_category_scores"("exam_result_id", "category_code");

CREATE INDEX "idx_exam_result_category_scores_exam_result"
ON "exam_result_category_scores"("exam_result_id");

ALTER TABLE "exam_result_category_scores"
ADD CONSTRAINT "exam_result_category_scores_exam_result_id_fkey"
FOREIGN KEY ("exam_result_id") REFERENCES "exam_results"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "exam_result_category_scores" (
    "id",
    "exam_result_id",
    "category_code",
    "category_name",
    "score",
    "min_score",
    "passed",
    "created_at"
)
SELECT
    md5('exam-result-category-score:' || er."id" || ':' || qc."code"),
    er."id",
    qc."code",
    qc."name",
    CASE qc."code"
        WHEN 'TWK' THEN er."twk_score"
        WHEN 'TIU' THEN er."tiu_score"
        WHEN 'TKP' THEN er."tkp_score"
        ELSE 0
    END,
    COALESCE(pgci."min_score", 0),
    CASE qc."code"
        WHEN 'TWK' THEN er."twk_passed"
        WHEN 'TIU' THEN er."tiu_passed"
        WHEN 'TKP' THEN er."tkp_passed"
        ELSE false
    END,
    CURRENT_TIMESTAMP
FROM "exam_results" er
JOIN "question_categories" qc
    ON qc."code" IN ('TWK', 'TIU', 'TKP')
LEFT JOIN "passing_grade_config_items" pgci
    ON pgci."passing_grade_config_id" = er."passing_grade_config_id"
   AND pgci."category_id" = qc."id";

-- Drop old static category fields
ALTER TABLE "questions"
DROP COLUMN "category";

ALTER TABLE "question_sub_categories"
DROP COLUMN "category";

ALTER TABLE "tryout_rule_sections"
DROP COLUMN "category";

ALTER TABLE "parsed_question_reviews"
DROP COLUMN "category";

ALTER TABLE "passing_grade_configs"
DROP COLUMN "twk_min_score",
DROP COLUMN "tiu_min_score",
DROP COLUMN "tkp_min_score";

ALTER TABLE "exam_results"
DROP COLUMN "twk_score",
DROP COLUMN "tiu_score",
DROP COLUMN "tkp_score",
DROP COLUMN "twk_passed",
DROP COLUMN "tiu_passed",
DROP COLUMN "tkp_passed";

-- Remove old enum type
DROP TYPE "QuestionCategory";
