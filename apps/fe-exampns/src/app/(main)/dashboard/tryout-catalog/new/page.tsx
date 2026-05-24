import { getPassingGradeConfig } from "@/server/admin-data";

import { CreateTryoutForm } from "./tryout-form";

export default async function NewTryoutPage() {
  const passingGrade = await getPassingGradeConfig();

  return <CreateTryoutForm passingGrade={passingGrade} />;
}
