import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.literal.club",
      },
    ],
  },
  serverExternalPackages: ["gray-matter"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.node = {
        ...config.node,
        __dirname: true,
      };
    }
    return config;
  },
};

export default nextConfig;
