import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@grouphub/database", "@grouphub/types"],
};

export default nextConfig;
