import "server-only";

import { type ApiPaginatedResponse, type ApiSuccessResponse, serverApiFetch, toQueryString } from "@/server/api-client";

export type PartnerStatus = "active" | "inactive" | "suspended";
export type ReferralValueType = "percentage" | "fixed";
export type WithdrawalStatus = "pending" | "approved" | "rejected";

export interface PartnerBalance {
  totalEarned: number;
  totalReversed: number;
  paidOut: number;
  pendingWithdrawal: number;
  withdrawableBalance: number;
  availableBalance: number;
}

export interface PartnerReferralCode {
  id: string;
  code: string;
  isActive: boolean;
  discountType: ReferralValueType;
  discountValue: number;
  commissionType: ReferralValueType;
  commissionValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerTransactionItem {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  buyerEmail: string;
  planName: string;
  referralCode: string | null;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  commissionAmount: number;
  status: string;
  paidAt: string | null;
  createdAt: string;
}

export interface PartnerWithdrawalItem {
  id: string;
  amount: number;
  status: WithdrawalStatus;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  requestedNote: string | null;
  reviewedAt: string | null;
  reviewNote: string | null;
  transferProofUrl: string | null;
  createdAt: string;
}

export interface SuperAdminPartnerWithdrawalItem extends PartnerWithdrawalItem {
  partnerProfileId: string;
  partnerDisplayName: string;
  partnerUserName: string;
  partnerEmail: string;
}

export interface PartnerBankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface PartnerSummary {
  partnerProfileId: string;
  displayName: string;
  status: PartnerStatus;
  activeCodes: number;
  totalTransactions: number;
  pendingWithdrawals: number;
  balance: PartnerBalance;
  referralCodes: PartnerReferralCode[];
}

export interface SuperAdminPartnerItem {
  id: string;
  userId: string;
  displayName: string;
  status: PartnerStatus;
  userName: string;
  email: string;
  phone: string | null;
  userStatus: "active" | "inactive" | "suspended";
  activeCodes: number;
  totalCodes: number;
  balance: PartnerBalance;
  createdAt: string;
}

export interface SuperAdminPartnerDetail {
  id: string;
  displayName: string;
  status: PartnerStatus;
  notes: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    status: "active" | "inactive" | "suspended";
  };
  referralCodes: PartnerReferralCode[];
  bankAccounts: PartnerBankAccount[];
  balance: PartnerBalance;
  recentTransactions: PartnerTransactionItem[];
  withdrawals: PartnerWithdrawalItem[];
  createdAt: string;
}

export async function getPartnerSummary() {
  const response = await serverApiFetch<ApiSuccessResponse<PartnerSummary>>("/api/v1/partner/summary");
  return response.data;
}

export async function getPartnerTransactions(params?: {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}) {
  return serverApiFetch<ApiPaginatedResponse<PartnerTransactionItem[]>>(
    `/api/v1/partner/transactions${toQueryString({
      search: params?.search,
      fromDate: params?.fromDate,
      toDate: params?.toDate,
      page: params?.page ?? 1,
      limit: params?.limit ?? 20,
    })}`,
  );
}

export async function getPartnerBankAccount() {
  const response = await serverApiFetch<ApiSuccessResponse<PartnerBankAccount | null>>("/api/v1/partner/bank-account");
  return response.data;
}

export async function getPartnerWithdrawals(params?: { status?: string; page?: number; limit?: number }) {
  return serverApiFetch<ApiPaginatedResponse<PartnerWithdrawalItem[]>>(
    `/api/v1/partner/withdrawals${toQueryString({
      status: params?.status,
      page: params?.page ?? 1,
      limit: params?.limit ?? 20,
    })}`,
  );
}

export async function getSuperAdminPartners(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return serverApiFetch<ApiPaginatedResponse<SuperAdminPartnerItem[]>>(
    `/api/v1/super-admin/partners${toQueryString({
      search: params?.search,
      status: params?.status,
      page: params?.page ?? 1,
      limit: params?.limit ?? 20,
    })}`,
  );
}

export async function getSuperAdminPartnerDetail(partnerProfileId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<SuperAdminPartnerDetail>>(
    `/api/v1/super-admin/partners/${partnerProfileId}`,
  );
  return response.data;
}

export async function getSuperAdminPartnerWithdrawals(params?: {
  search?: string;
  status?: WithdrawalStatus;
  page?: number;
  limit?: number;
}) {
  return serverApiFetch<ApiPaginatedResponse<SuperAdminPartnerWithdrawalItem[]>>(
    `/api/v1/super-admin/partners/withdrawals${toQueryString({
      search: params?.search,
      status: params?.status,
      page: params?.page ?? 1,
      limit: params?.limit ?? 20,
    })}`,
  );
}
