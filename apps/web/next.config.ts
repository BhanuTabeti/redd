import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack for production builds due to Cloudflare Workers compatibility issues
  turbopack: process.env.NODE_ENV === 'development' ? {} : undefined,

  // Static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },

  // Server external packages for better compatibility
  serverExternalPackages: [],
};

export default nextConfig;
