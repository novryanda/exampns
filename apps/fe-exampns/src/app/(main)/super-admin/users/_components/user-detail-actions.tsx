import type { AdminUserDetail } from "@/server/admin-data";

import { UserRowActions } from "./user-row-actions";

export function UserDetailActions({ user }: { readonly user: AdminUserDetail }) {
  return (
    <UserRowActions
      user={{
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        image: user.image ?? null,
        status: user.status,
        subscriptionStatus: user.subscription?.status ?? "expired",
        effectiveAccessLevel: user.effectiveAccessLevel,
        effectiveAccessSource: user.effectiveAccessSource,
        totalExams: user.examSummary.totalExams,
        lastActiveAt: user.examSummary.lastExamAt,
      }}
    />
  );
}
