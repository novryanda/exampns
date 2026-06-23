UPDATE "tryout_catalogs"
SET "status" = 'draft'
WHERE "status" = 'review';

UPDATE "manual_question_sets"
SET "status" = 'draft'
WHERE "status" IN ('review', 'approved');

CREATE TYPE "TryoutStatus_new" AS ENUM ('draft', 'published', 'archived');

ALTER TABLE "tryout_catalogs"
ALTER COLUMN "status" TYPE "TryoutStatus_new"
USING ("status"::text::"TryoutStatus_new");

DROP TYPE "TryoutStatus";
ALTER TYPE "TryoutStatus_new" RENAME TO "TryoutStatus";

CREATE TYPE "ManualQuestionSetStatus_new" AS ENUM ('draft', 'archived');

ALTER TABLE "manual_question_sets"
ALTER COLUMN "status" TYPE "ManualQuestionSetStatus_new"
USING ("status"::text::"ManualQuestionSetStatus_new");

DROP TYPE "ManualQuestionSetStatus";
ALTER TYPE "ManualQuestionSetStatus_new" RENAME TO "ManualQuestionSetStatus";
