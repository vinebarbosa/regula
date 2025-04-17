import { NextConfig } from "next";

import { env } from "@/env";

const locale = env.NEXT_PUBLIC_LOCALE || "mt";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/packages/mt/*": `@/packages/${locale}/*`,
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@/packages/mt/*": `./src/packages/${locale}/*`,
    }
  }
};

export default nextConfig;
