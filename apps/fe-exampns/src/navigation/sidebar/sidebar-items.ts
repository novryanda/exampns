import {
  Bot,
  BookCopy,
  ChartNoAxesCombined,
  FileSearch,
  Files,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  ScrollText,
  Settings2,
  ShieldUser,
  TriangleAlert,
  UserRound,
  Users,
  WalletCards,
  Webhook,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Content",
    items: [
      {
        title: "Tryout Catalog",
        url: "/dashboard/tryout-catalog",
        icon: BookCopy,
      },
      {
        title: "Bank Soal",
        url: "/dashboard/bank-soal",
        icon: Files,
        comingSoon: true,
      },
      {
        title: "PDF Uploads",
        url: "/dashboard/pdf-uploads",
        icon: ScrollText,
        comingSoon: true,
      },
      {
        title: "Review Parsing",
        url: "/dashboard/review-parsing",
        icon: FileSearch,
        comingSoon: true,
      },
    ],
  },
  {
    id: 3,
    label: "Users & Access",
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Admin Accounts",
        url: "/dashboard/admin-accounts",
        icon: ShieldUser,
        comingSoon: true,
      },
      {
        title: "Manual Activation",
        url: "/dashboard/manual-activation",
        icon: WalletCards,
        comingSoon: true,
      },
    ],
  },
  {
    id: 4,
    label: "Business",
    items: [
      {
        title: "Subscription Plans",
        url: "/dashboard/subscription-plans",
        icon: ChartNoAxesCombined,
        comingSoon: true,
      },
      {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: ReceiptText,
      },
      {
        title: "Payment Webhooks",
        url: "/dashboard/payment-webhooks",
        icon: Webhook,
        comingSoon: true,
      },
    ],
  },
  {
    id: 5,
    label: "Configuration",
    items: [
      {
        title: "Passing Grade",
        url: "/dashboard/passing-grade",
        icon: ChartNoAxesCombined,
        comingSoon: true,
      },
      {
        title: "Trial Rules",
        url: "/dashboard/trial-rules",
        icon: Settings2,
        comingSoon: true,
      },
      {
        title: "AI Recommendation Settings",
        url: "/dashboard/ai-recommendation-settings",
        icon: Bot,
      },
      {
        title: "System Settings",
        url: "/dashboard/system-settings",
        icon: Settings2,
        comingSoon: true,
      },
    ],
  },
  {
    id: 6,
    label: "Monitoring",
    items: [
      {
        title: "Audit Logs",
        url: "/dashboard/audit-logs",
        icon: ScrollText,
        comingSoon: true,
      },
      {
        title: "Error Logs",
        url: "/dashboard/error-logs",
        icon: TriangleAlert,
        comingSoon: true,
      },
      {
        title: "AI Job Logs",
        url: "/dashboard/ai-job-logs",
        icon: Bot,
        comingSoon: true,
      },
    ],
  },
  {
    id: 7,
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserRound,
        comingSoon: true,
      },
      {
        title: "Logout",
        url: "/dashboard/logout",
        icon: LogOut,
      },
    ],
  },
];
