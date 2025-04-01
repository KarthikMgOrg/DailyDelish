import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
