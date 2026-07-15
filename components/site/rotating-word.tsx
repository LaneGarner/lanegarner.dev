"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * The rotating adjective in the "I build [fast] …" section: 1.6s interval,
 * slide-up transition, italic. Renders the static first word under
 * prefers-reduced-motion.
 */
export const ROTATING_WORDS = [
  "fast",
  "responsive",
  "dynamic",
  "modern",
  "accessible",
  "interactive",
  "polished",
  "pixel-perfect"
] as const;

export const RotatingWord = () => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      1600
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <>
      {/* Screen readers get a stable word, not a ticker */}
      <span className="sr-only">fast</span>
      <span
        aria-hidden="true"
        key={reduced ? "static" : index}
        className={
          reduced ? "italic" : "rotating-word-enter inline-block italic"
        }
      >
        {ROTATING_WORDS[index]}
      </span>
    </>
  );
};
