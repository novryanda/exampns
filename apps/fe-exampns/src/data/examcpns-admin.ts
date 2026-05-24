export type TrendDirection = "up" | "down" | "neutral";

export interface DashboardMetric {
  title: string;
  value: string;
  delta: string;
  deltaLabel: string;
  direction: TrendDirection;
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Total Users",
    value: "12.480",
    delta: "8,4%",
    deltaLabel: "dari bulan lalu",
    direction: "up",
  },
  {
    title: "Active Subscribers",
    value: "3.842",
    delta: "6,7%",
    deltaLabel: "dari bulan lalu",
    direction: "up",
  },
  {
    title: "Monthly Revenue",
    value: "Rp 128.500.000",
    delta: "12,3%",
    deltaLabel: "dari bulan lalu",
    direction: "up",
  },
  {
    title: "Published Tryouts",
    value: "18",
    delta: "5",
    deltaLabel: "dari bulan lalu",
    direction: "up",
  },
  {
    title: "Pending Tryout Reviews",
    value: "6",
    delta: "2",
    deltaLabel: "dari bulan lalu",
    direction: "down",
  },
  {
    title: "AI Job Failures",
    value: "2",
    delta: "1",
    deltaLabel: "dari bulan lalu",
    direction: "down",
  },
];

export const subscriptionGrowth = [
  { label: "Des '24", subscribers: 2950 },
  { label: "Jan '25", subscribers: 3120 },
  { label: "Feb '25", subscribers: 3280 },
  { label: "Mar '25", subscribers: 3410 },
  { label: "Apr '25", subscribers: 3620 },
  { label: "Mei '25", subscribers: 3842 },
];

export const revenueTrend = [
  { label: "Des '24", revenue: 78600000 },
  { label: "Jan '25", revenue: 92300000 },
  { label: "Feb '25", revenue: 105400000 },
  { label: "Mar '25", revenue: 119800000 },
  { label: "Apr '25", revenue: 119200000 },
  { label: "Mei '25", revenue: 128500000 },
];

export const tryoutCompletion = [
  { name: "Selesai", value: 68.7, fill: "#23b26d" },
  { name: "Tidak Selesai", value: 25.1, fill: "#2563eb" },
  { name: "Belum Dimulai", value: 6.2, fill: "#cbd5e1" },
];

export const conversionFunnel = [
  { label: "Visitors", value: "125.430", share: null },
  { label: "Registrasi", value: "18.762", share: "15,0%" },
  { label: "Trial Users", value: "8.462", share: "45,1%" },
  { label: "Subscribers", value: "3.842", share: "45,4%" },
];

export const pendingTryoutReviews = [
  {
    tryout: "TWK - Tes Wawasan Kebangsaan #12",
    uploader: "Budi Santoso",
    submittedAt: "23 Mei 2025 10:15",
    status: "Menunggu Review",
  },
  {
    tryout: "TIU - Penalaran Verbal #18",
    uploader: "Siti Aminah",
    submittedAt: "22 Mei 2025 16:40",
    status: "Menunggu Review",
  },
  {
    tryout: "TKP - Pelayanan Publik #07",
    uploader: "Ahmad Fauzi",
    submittedAt: "22 Mei 2025 09:22",
    status: "Menunggu Review",
  },
];

export const recentTransactions = [
  {
    invoiceId: "TRX-250523-0012",
    user: "Andri Pratama",
    plan: "Premium 1 Bulan",
    amount: "Rp 89.000",
    status: "Sukses",
  },
  {
    invoiceId: "TRX-250523-0011",
    user: "Dewi Lestari",
    plan: "Premium 3 Bulan",
    amount: "Rp 229.000",
    status: "Sukses",
  },
  {
    invoiceId: "TRX-250523-0010",
    user: "Rizky Maulana",
    plan: "Premium 6 Bulan",
    amount: "Rp 429.000",
    status: "Sukses",
  },
];

export const systemAlerts = [
  {
    title: "AI Job Failure Detected",
    message: "Job ID ai-job-250523-001 gagal pada step parsing.",
    time: "10 menit lalu",
    tone: "warning",
  },
  {
    title: "High Error Rate",
    message: "Terdeteksi peningkatan error rate di endpoint /api/ai/recommend.",
    time: "35 menit lalu",
    tone: "info",
  },
  {
    title: "Backup System Sukses",
    message: "Backup harian berhasil diselesaikan.",
    time: "1 jam lalu",
    tone: "success",
  },
];

export const tryoutCatalogStats = [
  { title: "Total Tryout", value: "24", description: "Semua tryout" },
  { title: "Published", value: "12", description: "Telah dipublikasikan" },
  { title: "Draft", value: "7", description: "Masih dalam draft" },
  { title: "Review", value: "5", description: "Menunggu review" },
];

export const tryoutCatalogRows = [
  {
    name: "Tryout SKD CPNS Nasional",
    id: "TR-2025-001",
    type: "Generated",
    access: "Trial & Paid",
    generationMode: "Random by Topic Distribution",
    totalQuestions: 110,
    duration: "100 menit",
    status: "Published",
    featured: "Ya",
    publishedAt: "20 Mei 2025",
  },
  {
    name: "Tryout TWK Intensif",
    id: "TR-2025-002",
    type: "Generated",
    access: "Paid Only",
    generationMode: "Random by Category",
    totalQuestions: 50,
    duration: "45 menit",
    status: "Draft",
    featured: "Tidak",
    publishedAt: "-",
  },
  {
    name: "Tryout Nasional Minggu 1",
    id: "TR-2025-003",
    type: "Manual",
    access: "Premium Only",
    generationMode: "Manual Question Set",
    totalQuestions: 110,
    duration: "100 menit",
    status: "Review",
    featured: "Ya",
    publishedAt: "-",
  },
  {
    name: "TIU Penalaran Cepat",
    id: "TR-2025-004",
    type: "Hybrid",
    access: "Paid Only",
    generationMode: "Hybrid Manual & Random",
    totalQuestions: 60,
    duration: "50 menit",
    status: "Published",
    featured: "Tidak",
    publishedAt: "18 Mei 2025",
  },
];

export const usersMetrics = [
  { title: "Total Users", value: "12.480", delta: "8,4%", deltaLabel: "dari bulan lalu", direction: "up" as const },
  { title: "Active", value: "9.842", delta: "7,1%", deltaLabel: "dari bulan lalu", direction: "up" as const },
  { title: "Trial Users", value: "1.276", delta: "5,6%", deltaLabel: "dari bulan lalu", direction: "up" as const },
  { title: "Suspended", value: "1.362", delta: "1,2%", deltaLabel: "dari bulan lalu", direction: "down" as const },
];

export const usersGrowth = [
  { label: "Des '24", users: 6200 },
  { label: "Jan '25", users: 8100 },
  { label: "Feb '25", users: 8450 },
  { label: "Mar '25", users: 10240 },
  { label: "Apr '25", users: 11280 },
  { label: "Mei '25", users: 12480 },
];

export const subscriptionComposition = [
  { name: "Premium 3 Bulan", value: 5126, fill: "#2563eb" },
  { name: "Premium 1 Bulan", value: 3842, fill: "#23b26d" },
  { name: "Trial", value: 1276, fill: "#f59e0b" },
  { name: "None", value: 1532, fill: "#94a3b8" },
  { name: "Suspended", value: 704, fill: "#ef4444" },
];

export const topCities = [
  { city: "Jakarta", total: "2.842 (22,8%)" },
  { city: "Bandung", total: "1.672 (13,4%)" },
  { city: "Surabaya", total: "1.238 (9,9%)" },
  { city: "Yogyakarta", total: "942 (7,6%)" },
  { city: "Makassar", total: "731 (5,9%)" },
  { city: "Lainnya", total: "5.055 (40,4%)" },
];

export const userRows = [
  {
    initials: "AS",
    name: "Andi Saputra",
    email: "andi.saputra@gmail.com",
    status: "Active",
    subscription: "Premium 3 Bulan",
    lastExam: "20 Mei 2025",
    lastExamLabel: "Simulasi CAT TWK",
    registeredAt: "15 Apr 2025 14:32",
  },
  {
    initials: "DR",
    name: "Dewi Rahmawati",
    email: "dewi.rahma@gmail.com",
    status: "Active",
    subscription: "Premium 1 Bulan",
    lastExam: "18 Mei 2025",
    lastExamLabel: "Simulasi CAT TIU",
    registeredAt: "03 Apr 2025 09:11",
  },
  {
    initials: "BS",
    name: "Budi Santoso",
    email: "budi.santoso@gmail.com",
    status: "Trial",
    subscription: "Trial",
    lastExam: "16 Mei 2025",
    lastExamLabel: "Simulasi CAT TKP",
    registeredAt: "12 Mei 2025 16:45",
  },
  {
    initials: "NF",
    name: "Nurul Fitriani",
    email: "nurul.fitriani@gmail.com",
    status: "Active",
    subscription: "Premium 3 Bulan",
    lastExam: "19 Mei 2025",
    lastExamLabel: "Simulasi CAT TWK",
    registeredAt: "28 Mar 2025 11:20",
  },
  {
    initials: "AH",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@gmail.com",
    status: "Active",
    subscription: "None",
    lastExam: "-",
    lastExamLabel: "",
    registeredAt: "10 Apr 2025 08:05",
  },
  {
    initials: "RS",
    name: "Rina Sari",
    email: "rina.sari@gmail.com",
    status: "Suspended",
    subscription: "Premium 1 Bulan",
    lastExam: "10 Mei 2025",
    lastExamLabel: "Simulasi CAT TIU",
    registeredAt: "05 Feb 2025 10:33",
  },
  {
    initials: "MG",
    name: "M. Gibran",
    email: "gibran.m@gmail.com",
    status: "Active",
    subscription: "Premium 3 Bulan",
    lastExam: "21 Mei 2025",
    lastExamLabel: "Simulasi CAT TKP",
    registeredAt: "19 Mar 2025 13:11",
  },
  {
    initials: "YS",
    name: "Yusuf Setiawan",
    email: "yusuf.setiawan@gmail.com",
    status: "Trial",
    subscription: "Trial",
    lastExam: "15 Mei 2025",
    lastExamLabel: "Simulasi CAT TWK",
    registeredAt: "13 Mei 2025 07:50",
  },
  {
    initials: "LM",
    name: "Laila Maghfiroh",
    email: "laila.maghfiroh@gmail.com",
    status: "Active",
    subscription: "Premium 1 Bulan",
    lastExam: "17 Mei 2025",
    lastExamLabel: "Simulasi CAT TIU",
    registeredAt: "22 Apr 2025 09:41",
  },
  {
    initials: "RK",
    name: "Rizky Kurniawan",
    email: "rizky.kurniawan@gmail.com",
    status: "Suspended",
    subscription: "None",
    lastExam: "-",
    lastExamLabel: "",
    registeredAt: "07 Feb 2025 15:29",
  },
];

export const transactionMetrics = [
  { title: "Total Transactions", value: "12.648", delta: "8,6%", deltaLabel: "dari kemarin", direction: "up" as const },
  { title: "Paid", value: "10.271", delta: "8,1%", deltaLabel: "dari kemarin", direction: "up" as const },
  { title: "Pending", value: "1.742", delta: "3,2%", deltaLabel: "dari kemarin", direction: "up" as const },
  { title: "Failed", value: "435", delta: "2,4%", deltaLabel: "dari kemarin", direction: "down" as const },
  { title: "Revenue Today", value: "Rp 45.820.000", delta: "12,4%", deltaLabel: "dari kemarin", direction: "up" as const },
];

export const transactionStatusBreakdown = [
  { name: "Paid", value: 10271, fill: "#23b26d" },
  { name: "Pending", value: 1742, fill: "#f59e0b" },
  { name: "Failed", value: 435, fill: "#ef4444" },
  { name: "Refunded", value: 200, fill: "#3b82f6" },
];

export const transactionRows = [
  {
    invoiceId: "INV-2025-05-26-001234",
    user: "Ahmad Rizki",
    email: "ahmad.rizki@gmail.com",
    plan: "Premium 1 Bulan",
    amount: "Rp 49.000",
    status: "Paid",
    gateway: "Midtrans",
    createdAt: "26 Mei 2025, 10:24 WIB",
  },
  {
    invoiceId: "INV-2025-05-26-001233",
    user: "Dewi Sartika",
    email: "dewi.sartika@gmail.com",
    plan: "Premium 3 Bulan",
    amount: "Rp 129.000",
    status: "Pending",
    gateway: "Xendit",
    createdAt: "26 Mei 2025, 09:58 WIB",
  },
  {
    invoiceId: "INV-2025-05-26-001232",
    user: "Muhammad Reza",
    email: "reza.muhammad@gmail.com",
    plan: "Premium 12 Bulan",
    amount: "Rp 399.000",
    status: "Paid",
    gateway: "Midtrans",
    createdAt: "26 Mei 2025, 09:41 WIB",
  },
  {
    invoiceId: "INV-2025-05-26-001231",
    user: "Nadia Aulia",
    email: "nadia.aulia@gmail.com",
    plan: "Tryout Pack 10x",
    amount: "Rp 29.000",
    status: "Failed",
    gateway: "Xendit",
    createdAt: "26 Mei 2025, 09:12 WIB",
  },
  {
    invoiceId: "INV-2025-05-26-001230",
    user: "Fauzan Akbar",
    email: "fauzan.akbar@gmail.com",
    plan: "Premium 6 Bulan",
    amount: "Rp 219.000",
    status: "Paid",
    gateway: "Manual Activation",
    createdAt: "26 Mei 2025, 08:55 WIB",
  },
  {
    invoiceId: "INV-2025-05-26-001229",
    user: "Siti Khadijah",
    email: "siti.khadijah@gmail.com",
    plan: "Premium 1 Bulan",
    amount: "Rp 49.000",
    status: "Refunded",
    gateway: "Midtrans",
    createdAt: "26 Mei 2025, 08:33 WIB",
  },
  {
    invoiceId: "INV-2025-05-26-001228",
    user: "Bima Wahyu",
    email: "bima.wahyu@gmail.com",
    plan: "Tryout Pack 5x",
    amount: "Rp 19.000",
    status: "Paid",
    gateway: "Xendit",
    createdAt: "26 Mei 2025, 08:12 WIB",
  },
  {
    invoiceId: "INV-2025-05-26-001227",
    user: "Yuliana Lestari",
    email: "yuliana.lestari@gmail.com",
    plan: "Premium 3 Bulan",
    amount: "Rp 129.000",
    status: "Pending",
    gateway: "Midtrans",
    createdAt: "26 Mei 2025, 07:45 WIB",
  },
];

export const transactionActivity = [
  {
    title: "INV-2025-05-26-001234 berhasil dibayar",
    message: "Midtrans · Ahmad Rizki",
    time: "10:24 WIB",
    tone: "success",
  },
  {
    title: "INV-2025-05-26-001233 menunggu pembayaran",
    message: "Xendit · Dewi Sartika",
    time: "09:58 WIB",
    tone: "warning",
  },
  {
    title: "INV-2025-05-26-001231 pembayaran gagal",
    message: "Xendit · Nadia Aulia",
    time: "09:12 WIB",
    tone: "danger",
  },
];

export const quickActions = [
  {
    title: "Retry Webhook Gagal",
    description: "Kirim ulang webhook yang gagal",
  },
  {
    title: "Download Laporan",
    description: "Unduh laporan transaksi",
  },
  {
    title: "Pengaturan Notifikasi",
    description: "Atur notifikasi transaksi",
  },
];
