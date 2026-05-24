const backendApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendApiUrl}/api/auth/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/dashboard/default",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
