import type { NextConfig } from "next";

// Static export so the mockups can be served from any folder (staging, an artifact preview, or /mockups/ on the site).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: process.env.ASSET_PREFIX || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
