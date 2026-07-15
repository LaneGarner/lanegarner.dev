import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev-tools indicator (the "N" button, bottom-left).
  // Dev-only UI that never ships to production, but unwanted in dev too.
  devIndicators: false,
};

export default nextConfig;
