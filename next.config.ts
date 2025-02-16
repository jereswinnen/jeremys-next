import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images-na.ssl-images-amazon.com",
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
