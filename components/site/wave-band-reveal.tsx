"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface WaveBandRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fades its children in as the wave band scrolls into view and back out as
 * it leaves. Content starts visible so no-JS users always see it; the
 * global reduced-motion CSS collapses the transition to an instant swap.
 */
export const WaveBandReveal = ({
  children,
  className,
}: WaveBandRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
};
