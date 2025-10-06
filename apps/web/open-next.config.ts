import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  // OpenNext Cloudflare configuration for REDD web app
  // Minimal config for Cloudflare Pages deployment with Next.js 15 compatibility

  // Disable problematic runtime config that was causing TypeScript errors
  // runtime: {
  //   nodejsCompat: true,
  // },

  // Minimal static assets config
  // staticAssets: {
  //   compress: true,
  // },
});
