import type { AdminUserDetail } from "@/server/admin-data";

import { UserRowActions } from "./user-row-actions";

export function UserDetailActions({ user }: { readonly user: AdminUserDetail }) {
  return (
    <UserRowActions
      user={{
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        subscriptionStatus: user.subscription?.status ?? "expired",
        totalExams: user.examSummary.totalExams,
        lastActiveAt: user.examSummary.lastExamAt,
      }}
    />
  );
}
