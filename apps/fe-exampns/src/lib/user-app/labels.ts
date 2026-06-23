export function formatRequiredPlanLabel(plan: {
  name: string;
  tier: "trial" | "standard" | "premium";
} | null) {
  if (!plan) {
    return "Plan belum diatur";
  }

  return `${plan.name} (${plan.tier})`;
}

export function formatTryoutTypeLabel(value: string) {
  switch (value) {
    case "generated":
      return "Otomatis";
    case "adaptive":
      return "Adaptive";
    default:
      return value;
  }
}

export function formatSubscriptionStatusLabel(subscription: {
  status: string | null;
  isTrial: boolean;
}) {
  if (subscription.status === "active") {
    return subscription.isTrial ? "Trial Aktif" : "Berbayar Aktif";
  }

  if (subscription.status === "expired") {
    return "Kedaluwarsa";
  }

  return "Belum Aktif";
}

export function formatAccessStatusLabel(type: string) {
  switch (type) {
    case "trial":
      return "Trial Aktif";
    case "standard":
      return "Berbayar Aktif";
    case "premium":
      return "Premium Aktif";
    case "expired":
      return "Belum Aktif";
    default:
      return type;
  }
}

export function scoreByCategoryCode(
  categoryScores: Array<{ categoryCode: string; score: number }>,
  code: string,
) {
  return categoryScores.find((item) => item.categoryCode === code)?.score ?? null;
}

export function formatDateTimeId(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
