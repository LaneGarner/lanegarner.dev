"use client";

import { useEffect, useState } from "react";

/** True when the user prefers reduced motion (defaults true pre-mount so we
 * never animate before we know). */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
};
