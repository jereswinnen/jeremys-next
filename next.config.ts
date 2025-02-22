import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      "images-na.ssl-images-amazon.com",
      "images.unsplash.com",
    ].map((hostname) => ({ hostname })),
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
