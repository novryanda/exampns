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
  superAdminOnly?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const adminSidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Content",
    items: [
      {
        title: "Bank Soal",
        url: "/admin/bank-soal",
        icon: Files,
      },
      {
        title: "Unggah PDF",
        url: "/admin/upload-pdf",
        icon: ScrollText,
      },
      {
        title: "Tinjau Parsing",
        url: "/admin/review-parsing",
        icon: FileSearch,
      },
      {
        title: "Metadata Soal",
        url: "/admin/metadata-soal",
        icon: Settings2,
      },
      {
        title: "Draft Tryout",
        url: "/admin/tryout-drafts",
        icon: BookCopy,
      },
      {
        title: "Audit Aktivitas",
        url: "/admin/audit-aktivitas",
        icon: ScrollText,
      },
    ],
  },
];

export const superAdminSidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        title: "Dashboard",
        url: "/super-admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Users & Access",
    items: [
      {
        title: "Users",
        url: "/super-admin/users",
        icon: Users,
      },
      {
        title: "Admin Accounts",
        url: "/super-admin/admin-accounts",
        icon: ShieldUser,
      },
      {
        title: "Transactions",
        url: "/super-admin/transactions",
        icon: ReceiptText,
      },
    ],
  },
  {
    id: 3,
    label: "Content",
    items: [
      {
        title: "Tryout Catalog",
        url: "/super-admin/tryout-catalog",
        icon: BookCopy,
      },
    ],
  },
  {
    id: 4,
    label: "Configuration",
    items: [
      {
        title: "AI Recommendation Settings",
        url: "/super-admin/ai-recommendation-settings",
        icon: Bot,
      },
    ],
  },
  {
    id: 10,
    items: [
      {
        title: "Profil",
        url: "/profil",
        icon: UserRound,
      },
      {
        title: "Logout",
        url: "/super-admin/logout",
        icon: LogOut,
      },
    ],
  },
];

export const sidebarItems = superAdminSidebarItems;
