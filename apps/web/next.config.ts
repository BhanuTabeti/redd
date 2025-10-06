import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack for production builds due to Cloudflare Workers compatibility issues
  turbopack: process.env.NODE_ENV === 'development' ? {} : undefined,

  // Optimize for Cloudflare Workers
  output: 'standalone',
  trailingSlash: true,

  // Server external packages for better compatibility
  serverExternalPackages: [],
};

export default nextConfig;
