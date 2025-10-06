import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack for production builds due to Cloudflare Workers compatibility issues
  turbopack: process.env.NODE_ENV === 'development' ? {} : undefined,

  // OpenNext handles Cloudflare Pages deployment - no static export needed
  // This allows dynamic rendering for Clerk authentication in both dev and prod

  // Server external packages for better compatibility
  serverExternalPackages: [],
};

export default nextConfig;
