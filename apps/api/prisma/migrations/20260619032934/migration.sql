-- CreateEnum
CREATE TYPE "MaterialStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('video', 'text', 'pdf', 'quiz');

-- AlterTable
ALTER TABLE "subscription_plans" ADD COLUMN     "features" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "is_popular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "show_on_landing_page" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "materials" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "cover_image_url" TEXT,
    "category_id" TEXT NOT NULL,
    "required_tier" "SubscriptionTier" NOT NULL DEFAULT 'trial',
    "status" "MaterialStatus" NOT NULL DEFAULT 'draft',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_by" TEXT NOT NULL,
    "published_at" TIMESTAMP(3),
    "archived_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_modules" (
    "id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "module_type" "ModuleType" NOT NULL,
    "content" TEXT,
    "video_url" TEXT,
    "pdf_url" TEXT,
    "duration_minutes" INTEGER,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_module_quizzes" (
    "id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "question_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_module_quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_module_manual_questions" (
    "id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "question_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_module_manual_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_module_manual_options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "label" VARCHAR(1) NOT NULL,
    "option_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "material_module_manual_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_material_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quiz_score" INTEGER,

    CONSTRAINT "user_material_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "materials_status_required_tier_sort_order_idx" ON "materials"("status", "required_tier", "sort_order");

-- CreateIndex
CREATE INDEX "materials_category_id_status_idx" ON "materials"("category_id", "status");

-- CreateIndex
CREATE INDEX "material_modules_material_id_sort_order_idx" ON "material_modules"("material_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_material_module_order" ON "material_modules"("material_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_material_module_quiz_question" ON "material_module_quizzes"("module_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_material_module_quiz_order" ON "material_module_quizzes"("module_id", "question_order");

-- CreateIndex
CREATE INDEX "material_module_manual_questions_module_id_question_order_idx" ON "material_module_manual_questions"("module_id", "question_order");

-- CreateIndex
CREATE INDEX "material_module_manual_options_question_id_display_order_idx" ON "material_module_manual_options"("question_id", "display_order");

-- CreateIndex
CREATE UNIQUE INDEX "uq_material_manual_option_label" ON "material_module_manual_options"("question_id", "label");

-- CreateIndex
CREATE INDEX "user_material_progress_user_id_material_id_idx" ON "user_material_progress"("user_id", "material_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_material_progress" ON "user_material_progress"("user_id", "module_id");

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "question_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_modules" ADD CONSTRAINT "material_modules_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_module_quizzes" ADD CONSTRAINT "material_module_quizzes_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "material_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_module_quizzes" ADD CONSTRAINT "material_module_quizzes_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_module_manual_questions" ADD CONSTRAINT "material_module_manual_questions_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "material_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_module_manual_options" ADD CONSTRAINT "material_module_manual_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "material_module_manual_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_material_progress" ADD CONSTRAINT "user_material_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_material_progress" ADD CONSTRAINT "user_material_progress_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_material_progress" ADD CONSTRAINT "user_material_progress_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "material_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
