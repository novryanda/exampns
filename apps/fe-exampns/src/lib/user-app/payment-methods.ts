export const checkoutPaymentMethods = [
  { value: "QRIS", label: "QRIS" },
  { value: "VA_BCA", label: "Virtual Account BCA" },
  { value: "VA_BNI", label: "Virtual Account BNI" },
  { value: "VA_BRI", label: "Virtual Account BRI" },
  { value: "VA_MANDIRI", label: "Virtual Account Mandiri" },
  { value: "GOPAY", label: "GoPay" },
  { value: "SHOPEEPAY", label: "ShopeePay" },
] as const;

export type CheckoutPaymentMethod = (typeof checkoutPaymentMethods)[number]["value"];
