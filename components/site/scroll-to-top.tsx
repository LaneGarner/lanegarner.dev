"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to the top whenever the route changes. Next.js does this for most
 * Link navigations already; this covers the cases it misses so every new
 * page starts at the top. Skips when a hash is present so in-page anchors
 * still work.
 */
export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
