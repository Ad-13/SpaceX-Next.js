import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "farm5.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "images2.imgbox.com",
      },
    ],
  },
};

export default nextConfig;
