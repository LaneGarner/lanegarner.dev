"use client";

import { useEffect, useRef } from "react";

interface WaveEdgeProps {
  edge: "top" | "bottom";
}

/**
 * The band's wave edges, rolling gently as the page scrolls. The crest
 * heights follow a sine of scrollY (each control point phase-offset from
 * its neighbor), so the wave undulates while the overall rise toward the
 * top right stays put. The path is written straight to the DOM inside
 * requestAnimationFrame; no React re-renders. Under prefers-reduced-motion
 * the static base wave renders and no listener is attached.
 */

// Wobble helper: sine of the scroll phase, offset per control point.
const wob = (phase: number, i: number, amp: number) =>
  Math.sin(phase + i * 1.1) * amp;

const buildTop = (p: number) =>
  `M0,${66 + wob(p, 0, 5)} ` +
  `C240,${86 + wob(p, 1, 8)} 480,${80 + wob(p, 2, 8)} 720,${52 + wob(p, 3, 7)} ` +
  `C960,${24 + wob(p, 4, 7)} 1200,${20 + wob(p, 5, 6)} 1440,${5 + wob(p, 6, 3)} ` +
  `L1440,90 L0,90 Z`;

const buildBottom = (p: number) =>
  `M0,0 L1440,0 ` +
  `L1440,${22 + wob(-p, 0, 4)} ` +
  `C1160,${52 + wob(-p, 1, 7)} 480,${38 + wob(-p, 2, 7)} 0,${66 + wob(-p, 3, 5)} Z`;

const EDGES = {
  top: {
    viewBox: "0 0 1440 90",
    className: "block h-14 w-full fill-chrome sm:h-20",
    build: buildTop,
  },
  bottom: {
    viewBox: "0 0 1440 70",
    className: "block h-10 w-full fill-chrome sm:h-14",
    build: buildBottom,
  },
} as const;

export const WaveEdge = ({ edge }: WaveEdgeProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const { viewBox, className, build } = EDGES[edge];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        pathRef.current?.setAttribute("d", build(window.scrollY * 0.006));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [build]);

  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={className}
    >
      <path ref={pathRef} d={build(0)} />
    </svg>
  );
};
