import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dailydelish.s3.amazonaws.com",
        pathname: "/products/images/**",
      },
    ],
  },
};

export default nextConfig;
