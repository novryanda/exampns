import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BookCopy,
  BookOpen,
  ChartNoAxesCombined,
  FileSearch,
  Files,
  FileText,
  Handshake,
  History,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  ScrollText,
  Settings2,
  ShieldUser,
  Users,
  WalletCards,
} from "lucide-react";

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
        title: "Materi Pembelajaran",
        url: "/admin/materi",
        icon: BookOpen,
        isNew: true,
      },
      {
        title: "Audit Aktivitas",
        url: "/admin/audit-aktivitas",
        icon: ScrollText,
      },
    ],
  },
];

export const userSidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        title: "Dashboard",
        url: "/app/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Belajar",
    items: [
      {
        title: "Materi",
        url: "/app/materi",
        icon: BookOpen,
        isNew: true,
      },
      {
        title: "Tryout",
        url: "/app/tryout",
        icon: BookCopy,
      },
      {
        title: "Hasil Ujian",
        url: "/app/hasil",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Riwayat",
        url: "/app/riwayat",
        icon: History,
      },
    ],
  },
  {
    id: 3,
    label: "Akun",
    items: [
      {
        title: "Langganan",
        url: "/app/langganan",
        icon: WalletCards,
      },
    ],
  },
];

export const partnerSidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        title: "Dashboard",
        url: "/mitra/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Referral",
    items: [
      {
        title: "Transaksi Referral",
        url: "/mitra/transaksi",
        icon: ReceiptText,
      },
      {
        title: "Pencairan",
        url: "/mitra/pencairan",
        icon: WalletCards,
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
      {
        title: "Mitra",
        url: "/super-admin/partners",
        icon: Handshake,
        isNew: true,
      },
      {
        title: "Pencairan Mitra",
        url: "/super-admin/withdrawals",
        icon: Landmark,
      },
      {
        title: "Subscription Plans",
        url: "/super-admin/subscription-plans",
        icon: WalletCards,
      },
    ],
  },
  {
    id: 3,
    label: "Content",
    items: [
      {
        title: "Bank Soal",
        url: "/super-admin/bank-soal",
        icon: FileText,
      },
      {
        title: "Tryout Catalog",
        url: "/super-admin/tryout-catalog",
        icon: BookCopy,
      },
      {
        title: "Materi Pembelajaran",
        url: "/super-admin/materi",
        icon: BookOpen,
      },
      {
        title: "Question Categories",
        url: "/super-admin/question-categories",
        icon: Settings2,
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
];

export const sidebarItems = superAdminSidebarItems;

export function getSidebarItemsForRole(role: string): NavGroup[] {
  if (role === "ADMIN") {
    return adminSidebarItems;
  }

  if (role === "USER") {
    return userSidebarItems;
  }

  if (role === "PARTNER") {
    return partnerSidebarItems;
  }

  return superAdminSidebarItems;
}
