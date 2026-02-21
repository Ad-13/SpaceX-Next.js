import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "*.imgbox.com",
      },
    ],
  },
};

export default nextConfig;
