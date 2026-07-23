"use client";

import { useEffect, useRef } from "react";

interface WaveEdgeProps {
  edge: "top" | "bottom" | "footer";
  fillClassName?: string;
}

/**
 * The band's wave edges, rolling as the page scrolls. The crest heights
 * follow a sine of scrollY (each control point phase-offset from its
 * neighbor), and the interior control points also drift horizontally so
 * the crests slide sideways as the wave undulates. The endpoints stay
 * pinned to both screen edges. The path is written straight to the DOM
 * inside requestAnimationFrame; no React re-renders. Under
 * prefers-reduced-motion the static base wave renders and no listener
 * is attached.
 */

// Wobble helper: sine of the scroll phase, offset per control point.
const wob = (phase: number, i: number, amp: number) =>
  Math.sin(phase + i * 1.1) * amp;

// Horizontal crest drift: zero at p=0 so the SSR path matches the first
// client render exactly (no hydration mismatch).
const drift = (p: number, i: number, amp: number) =>
  (Math.sin(p * 0.7 + i * 2.3) - Math.sin(i * 2.3)) * amp;

const buildTop = (p: number) =>
  `M0,${66 + wob(p, 0, 8)} ` +
  `C${240 + drift(p, 1, 24)},${78 + wob(p, 1, 14)} ${480 + drift(p, 2, 24)},${78 + wob(p, 2, 14)} ${720 + drift(p, 3, 24)},${52 + wob(p, 3, 12)} ` +
  `C${960 + drift(p, 4, 24)},${24 + wob(p, 4, 12)} ${1200 + drift(p, 5, 24)},${20 + wob(p, 5, 10)} 1440,${5 + wob(p, 6, 5)} ` +
  `L1440,90 L0,90 Z`;

const buildBottom = (p: number) =>
  `M0,0 L1440,0 ` +
  `L1440,${22 + wob(-p, 0, 7)} ` +
  `C${1160 + drift(-p, 1, 24)},${52 + wob(-p, 1, 12)} ${480 + drift(-p, 2, 24)},${38 + wob(-p, 2, 12)} 0,${58 + wob(-p, 3, 9)} Z`;

// Shallow static top edge for the footer: an interesting border, not a
// performance. Ignores the scroll phase.
const buildFooter = (_p: number) =>
  `M0,28 C240,40 480,36 720,24 C960,12 1200,16 1440,8 L1440,48 L0,48 Z`;

const EDGES = {
  top: {
    viewBox: "0 0 1440 90",
    className: "block h-14 w-full sm:h-20",
    build: buildTop,
    animated: true,
  },
  bottom: {
    viewBox: "0 0 1440 70",
    className: "block h-10 w-full sm:h-14",
    build: buildBottom,
    animated: true,
  },
  footer: {
    viewBox: "0 0 1440 48",
    className: "block h-7 w-full sm:h-10",
    build: buildFooter,
    animated: false,
  },
} as const;

export const WaveEdge = ({
  edge,
  fillClassName = "fill-chrome",
}: WaveEdgeProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const { viewBox, className, build, animated } = EDGES[edge];

  useEffect(() => {
    if (!animated) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        pathRef.current?.setAttribute("d", build(window.scrollY * 0.014));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [build, animated]);

  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={`${className} ${fillClassName}`}
    >
      <path ref={pathRef} d={build(0)} />
    </svg>
  );
};
