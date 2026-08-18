import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev-tools indicator (the "N" button, bottom-left).
  // Dev-only UI that never ships to production, but unwanted in dev too.
  devIndicators: false,
  async rewrites() {
    // Serve the Grocery Run app under /groceryrun — proxied from its own
    // Vercel project so the URL stays on lanegarner.dev. The app is built
    // with base "/groceryrun/", so its asset URLs carry the prefix and the
    // proxy strips it before forwarding.
    return [
      {
        source: "/groceryrun",
        destination: "https://grocery-run-nine.vercel.app/groceryrun",
      },
      {
        source: "/groceryrun/:path*",
        destination: "https://grocery-run-nine.vercel.app/groceryrun/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/skills/playground",
        destination:
          "https://github.com/LaneGarner/skills/tree/main/skills/pedalplayground",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
