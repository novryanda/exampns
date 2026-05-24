import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "ExamCPNS",
  version: packageJson.version,
  copyright: `© ${currentYear}, ExamCPNS.`,
  meta: {
    title: "ExamCPNS Admin Workspace",
    description:
      "ExamCPNS admin workspace untuk mengelola katalog tryout, pengguna, pembayaran, parsing PDF, dan konfigurasi AI recommendation.",
  },
};
