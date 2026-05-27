-- DropIndex
DROP INDEX IF EXISTS "idx_questions_topic";

-- DropIndex
DROP INDEX IF EXISTS "idx_questions_sub_category";

-- CreateTable
CREATE TABLE "question_sub_categories" (
    "id" TEXT NOT NULL,
    "category" "QuestionCategory" NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_topic_tags" (
    "id" TEXT NOT NULL,
    "sub_category_id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(170) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_topic_tags_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "questions"
ADD COLUMN "sub_category_id" TEXT,
ADD COLUMN "topic_tag_id" TEXT;

-- AlterTable
ALTER TABLE "parsed_question_reviews"
ADD COLUMN "resolved_sub_category_id" TEXT,
ADD COLUMN "resolved_topic_tag_id" TEXT;

WITH normalized_sub_categories AS (
    SELECT
        q."category" AS category,
        regexp_replace(lower(btrim(q."sub_category")), '\s+', ' ', 'g') AS normalized_name,
        MIN(btrim(q."sub_category")) AS display_name
    FROM "questions" q
    GROUP BY
        q."category",
        regexp_replace(lower(btrim(q."sub_category")), '\s+', ' ', 'g')
),
normalized_parsed_sub_categories AS (
    SELECT
        p."category" AS category,
        regexp_replace(lower(btrim(p."sub_category")), '\s+', ' ', 'g') AS normalized_name,
        MIN(btrim(p."sub_category")) AS display_name
    FROM "parsed_question_reviews" p
    WHERE p."category" IS NOT NULL
      AND p."sub_category" IS NOT NULL
      AND btrim(p."sub_category") <> ''
    GROUP BY
        p."category",
        regexp_replace(lower(btrim(p."sub_category")), '\s+', ' ', 'g')
),
all_sub_categories AS (
    SELECT * FROM normalized_sub_categories
    UNION
    SELECT * FROM normalized_parsed_sub_categories
),
ranked_sub_categories AS (
    SELECT
        category,
        normalized_name,
        MIN(display_name) AS display_name
    FROM all_sub_categories
    GROUP BY category, normalized_name
)
INSERT INTO "question_sub_categories" (
    "id",
    "category",
    "name",
    "slug",
    "is_active",
    "sort_order",
    "created_at",
    "updated_at"
)
SELECT
    md5('qsc:' || category::text || ':' || normalized_name),
    category,
    display_name,
    regexp_replace(normalized_name, '[^a-z0-9]+', '_', 'g'),
    true,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM ranked_sub_categories;

WITH normalized_question_topics AS (
    SELECT
        q."category" AS category,
        regexp_replace(lower(btrim(q."sub_category")), '\s+', ' ', 'g') AS normalized_sub_category,
        regexp_replace(lower(btrim(q."topic_tag")), '\s+', ' ', 'g') AS normalized_topic_tag,
        MIN(btrim(q."topic_tag")) AS display_name
    FROM "questions" q
    GROUP BY
        q."category",
        regexp_replace(lower(btrim(q."sub_category")), '\s+', ' ', 'g'),
        regexp_replace(lower(btrim(q."topic_tag")), '\s+', ' ', 'g')
),
normalized_parsed_topics AS (
    SELECT
        p."category" AS category,
        regexp_replace(lower(btrim(p."sub_category")), '\s+', ' ', 'g') AS normalized_sub_category,
        regexp_replace(lower(btrim(p."topic_tag")), '\s+', ' ', 'g') AS normalized_topic_tag,
        MIN(btrim(p."topic_tag")) AS display_name
    FROM "parsed_question_reviews" p
    WHERE p."category" IS NOT NULL
      AND p."sub_category" IS NOT NULL
      AND p."topic_tag" IS NOT NULL
      AND btrim(p."sub_category") <> ''
      AND btrim(p."topic_tag") <> ''
    GROUP BY
        p."category",
        regexp_replace(lower(btrim(p."sub_category")), '\s+', ' ', 'g'),
        regexp_replace(lower(btrim(p."topic_tag")), '\s+', ' ', 'g')
),
all_topics AS (
    SELECT * FROM normalized_question_topics
    UNION
    SELECT * FROM normalized_parsed_topics
),
ranked_topics AS (
    SELECT
        category,
        normalized_sub_category,
        normalized_topic_tag,
        MIN(display_name) AS display_name
    FROM all_topics
    GROUP BY category, normalized_sub_category, normalized_topic_tag
)
INSERT INTO "question_topic_tags" (
    "id",
    "sub_category_id",
    "name",
    "slug",
    "is_active",
    "sort_order",
    "created_at",
    "updated_at"
)
SELECT
    md5(
        'qtt:' ||
        qsc."id" ||
        ':' ||
        ranked_topics.normalized_topic_tag
    ),
    qsc."id",
    ranked_topics.display_name,
    regexp_replace(ranked_topics.normalized_topic_tag, '[^a-z0-9]+', '_', 'g'),
    true,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM ranked_topics
JOIN "question_sub_categories" qsc
    ON qsc."category" = ranked_topics.category
   AND qsc."slug" = regexp_replace(ranked_topics.normalized_sub_category, '[^a-z0-9]+', '_', 'g');

UPDATE "questions" q
SET
    "sub_category_id" = qsc."id",
    "topic_tag_id" = qtt."id"
FROM "question_sub_categories" qsc
JOIN "question_topic_tags" qtt
    ON qtt."sub_category_id" = qsc."id"
WHERE qsc."category" = q."category"
  AND qsc."slug" = regexp_replace(
        regexp_replace(lower(btrim(q."sub_category")), '\s+', ' ', 'g'),
        '[^a-z0-9]+',
        '_',
        'g'
      )
  AND qtt."slug" = regexp_replace(
        regexp_replace(lower(btrim(q."topic_tag")), '\s+', ' ', 'g'),
        '[^a-z0-9]+',
        '_',
        'g'
      );

UPDATE "parsed_question_reviews" p
SET
    "resolved_sub_category_id" = qsc."id",
    "resolved_topic_tag_id" = qtt."id"
FROM "question_sub_categories" qsc
JOIN "question_topic_tags" qtt
    ON qtt."sub_category_id" = qsc."id"
WHERE p."category" IS NOT NULL
  AND p."sub_category" IS NOT NULL
  AND p."topic_tag" IS NOT NULL
  AND qsc."category" = p."category"
  AND qsc."slug" = regexp_replace(
        regexp_replace(lower(btrim(p."sub_category")), '\s+', ' ', 'g'),
        '[^a-z0-9]+',
        '_',
        'g'
      )
  AND qtt."slug" = regexp_replace(
        regexp_replace(lower(btrim(p."topic_tag")), '\s+', ' ', 'g'),
        '[^a-z0-9]+',
        '_',
        'g'
      );

-- AlterTable
ALTER TABLE "questions"
ALTER COLUMN "sub_category_id" SET NOT NULL,
ALTER COLUMN "topic_tag_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "uq_question_sub_categories_category_slug"
ON "question_sub_categories"("category", "slug");

-- CreateIndex
CREATE INDEX "idx_question_sub_categories_category_active"
ON "question_sub_categories"("category", "is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_question_topic_tags_sub_category_slug"
ON "question_topic_tags"("sub_category_id", "slug");

-- CreateIndex
CREATE INDEX "idx_question_topic_tags_sub_category_active"
ON "question_topic_tags"("sub_category_id", "is_active", "sort_order");

-- CreateIndex
CREATE INDEX "idx_questions_sub_category"
ON "questions"("sub_category_id");

-- CreateIndex
CREATE INDEX "idx_questions_topic"
ON "questions"("topic_tag_id");

-- CreateIndex
CREATE INDEX "parsed_question_reviews_resolved_sub_category_id_idx"
ON "parsed_question_reviews"("resolved_sub_category_id");

-- CreateIndex
CREATE INDEX "parsed_question_reviews_resolved_topic_tag_id_idx"
ON "parsed_question_reviews"("resolved_topic_tag_id");

-- AddForeignKey
ALTER TABLE "question_topic_tags"
ADD CONSTRAINT "question_topic_tags_sub_category_id_fkey"
FOREIGN KEY ("sub_category_id") REFERENCES "question_sub_categories"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions"
ADD CONSTRAINT "questions_sub_category_id_fkey"
FOREIGN KEY ("sub_category_id") REFERENCES "question_sub_categories"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions"
ADD CONSTRAINT "questions_topic_tag_id_fkey"
FOREIGN KEY ("topic_tag_id") REFERENCES "question_topic_tags"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parsed_question_reviews"
ADD CONSTRAINT "parsed_question_reviews_resolved_sub_category_id_fkey"
FOREIGN KEY ("resolved_sub_category_id") REFERENCES "question_sub_categories"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parsed_question_reviews"
ADD CONSTRAINT "parsed_question_reviews_resolved_topic_tag_id_fkey"
FOREIGN KEY ("resolved_topic_tag_id") REFERENCES "question_topic_tags"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "questions"
DROP COLUMN "sub_category",
DROP COLUMN "topic_tag";
