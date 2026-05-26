import { getPassingGradeConfig } from "@/server/admin-data";

import { CreateTryoutForm } from "./_components/create-tryout-form";

export default async function SuperAdminNewTryoutPage() {
  const passingGrade = await getPassingGradeConfig();

  return <CreateTryoutForm passingGrade={passingGrade} basePath="/super-admin/tryout-catalog" />;
}
