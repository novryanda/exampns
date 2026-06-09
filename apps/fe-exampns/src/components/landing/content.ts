import { LANDING_ASSETS } from "./landing-asset-kit";

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fitur", href: "#fitur" },
  { label: "Paket", href: "#paket" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO_TRUST_ITEMS = [
  { icon: LANDING_ASSETS.badges[0], label: "Soal sesuai standar BKN" },
  { icon: LANDING_ASSETS.badges[1], label: "Update rutin" },
  { icon: LANDING_ASSETS.badges[2], label: "Aman & Terpercaya" },
] as const;

export const STATS = [
  { value: "250K+", label: "Pengguna Aktif" },
  { value: "10.000+", label: "Soal Berkualitas" },
  { value: "98%", label: "Tingkat Kepuasan" },
  { value: "85%", label: "Berhasil Meningkatkan Skor" },
] as const;

export const FEATURES = [
  {
    icon: LANDING_ASSETS.icons[0],
    title: "Simulasi CAT Sesungguhnya",
    description:
      "Interface mirip CAT BKN, membiasakan Anda dengan suasana ujian sebenarnya.",
  },
  {
    icon: LANDING_ASSETS.icons[1],
    title: "AI Rekomendasi Belajar",
    description:
      "Sistem cerdas yang merekomendasikan materi berdasarkan kelemahan Anda.",
  },
  {
    icon: LANDING_ASSETS.icons[2],
    title: "Analisis & Prediksi Skor",
    description:
      "Analisis mendalam dan prediksi peluang lolos berdasarkan performa Anda.",
  },
  {
    icon: LANDING_ASSETS.icons[3],
    title: "Ribuan Soal Berkualitas",
    description:
      "Soal HOTS, terbaru, dan sesuai kisi-kisi resmi BKN untuk semua formasi.",
  },
  {
    icon: LANDING_ASSETS.icons[4],
    title: "Leaderboard Nasional",
    description: "Bersaing sehat dengan peserta lain dan pantau peringkat Anda.",
  },
  {
    icon: LANDING_ASSETS.icons[5],
    title: "Akses Fleksibel",
    description: "Belajar kapan saja, di mana saja melalui web dan mobile.",
  },
] as const;

export const STEPS = [
  {
    step: 1,
    image: LANDING_ASSETS.steps[0],
    title: "Daftar & Pilih Paket",
    description: "Buat akun gratis dan pilih paket tryout yang sesuai kebutuhan persiapan Anda.",
  },
  {
    step: 2,
    image: LANDING_ASSETS.steps[1],
    title: "Kerjakan Simulasi",
    description: "Ikuti simulasi CAT dengan kondisi ujian sesungguhnya, lengkap dengan timer dan navigasi soal.",
  },
  {
    step: 3,
    image: LANDING_ASSETS.steps[2],
    title: "Lihat Analisis Skor",
    description: "Dapatkan laporan detail per kategori TWK, TIU, TKP beserta grafik perkembangan skor.",
  },
  {
    step: 4,
    image: LANDING_ASSETS.steps[3],
    title: "Tingkatkan & Ulangi",
    description: "Ikuti rekomendasi AI, fokus pada materi lemah, dan ulangi simulasi hingga siap ujian.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Setelah 3 bulan rutin tryout di ExamCPNS, skor TIU saya naik 25 poin. Akhirnya lolos CPNS 2023 di Kemenkeu!",
    name: "Rina Wulandari",
    role: "Lolos CPNS 2023 — Kemenkeu",
    avatar: LANDING_ASSETS.avatars[0],
  },
  {
    quote:
      "Simulasi CAT-nya sangat mirip aslinya. Saya jadi tidak kaget saat ujian SKD dan bisa mengatur waktu dengan baik.",
    name: "Ahmad Fauzi",
    role: "Lolos CPNS 2024 — Kemendagri",
    avatar: LANDING_ASSETS.avatars[1],
  },
  {
    quote:
      "Fitur analisis skornya luar biasa. Saya tahu persis materi mana yang harus diperbaiki. Sangat worth it!",
    name: "Dewi Kartika",
    role: "Lolos CPNS 2023 — BKN",
    avatar: LANDING_ASSETS.avatars[0],
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Apakah simulasi CAT di ExamCPNS mirip ujian BKN asli?",
    answer:
      "Ya. Antarmuka, timer, dan alur navigasi soal kami dirancang mengikuti standar CAT BKN agar Anda terbiasa sebelum hari H.",
  },
  {
    question: "Apakah ada paket gratis untuk mencoba?",
    answer:
      "Ada. Anda bisa mendaftar gratis dan mengakses simulasi percobaan untuk merasakan platform sebelum memilih paket berlangganan.",
  },
  {
    question: "Bagaimana cara kerja rekomendasi AI?",
    answer:
      "Setelah setiap tryout, sistem menganalisis pola jawaban salah Anda dan merekomendasikan topik materi yang perlu dipelajari ulang.",
  },
  {
    question: "Bisakah diakses dari HP?",
    answer:
      "Bisa. ExamCPNS responsif di semua perangkat — HP, tablet, maupun laptop — dengan progress yang tersinkronisasi.",
  },
] as const;

export const FOOTER_LINKS = {
  produk: [
    { label: "Simulasi CAT", href: "#fitur" },
    { label: "Paket Tryout", href: "#paket" },
    { label: "Leaderboard", href: "#fitur" },
    { label: "Analisis Skor", href: "#fitur" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#beranda" },
    { label: "Blog", href: "#" },
    { label: "Karir", href: "#" },
    { label: "Kontak", href: "#" },
  ],
  bantuan: [
    { label: "Pusat Bantuan", href: "#faq" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;
