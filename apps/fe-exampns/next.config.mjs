/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/dashboard/default",
        destination: "/app/dashboard",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/app/dashboard",
        permanent: false,
      },
      {
        source: "/dashboard/exams/:examSessionId",
        destination: "/app/exam/:examSessionId",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        destination: "/app/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
