import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://apis.data.go.kr/:path*", 
      },
    ];
  },
  images: {
    remotePatterns: [
    {
        protocol: 'https',
        hostname: 'www.visitbusan.net',
        port: '',
        pathname: '/uploadImgs/files/cntnts/**',
      },
    ],
   },
};

export default nextConfig;
