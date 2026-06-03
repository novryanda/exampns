import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getSuperAdminQuestionCategories } from "@/server/admin-content-data";

import { QuestionCategoryManager } from "./_components/question-category-manager";

export default async function SuperAdminQuestionCategoriesPage() {
  const categories = await getSuperAdminQuestionCategories();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Question Categories"
        description="Kelola kategori soal global. Hanya super admin yang bisa membuat, mengubah, mengarsipkan, atau mengaktifkan ulang kategori."
      />

      <QuestionCategoryManager initialCategories={categories} />
    </div>
  );
}
