"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface TypingTextProps {
  text: string;
}

type Phase = "typing" | "erasing";

const INITIAL_DELAY_MS = 600; // beat before the first keystroke
const TYPE_MS = 150; // per character while typing
const ERASE_MS = 90; // per character while erasing (slightly faster)
const PAUSE_MS = 1000; // fully-typed hold, cursor blinking
const RESTART_MS = 500; // empty hold before retyping

/**
 * The hero "Hello." typing effect: type character-by-character, pause with
 * a blinking cursor, erase character-by-character, repeat forever. With
 * prefers-reduced-motion the full string renders immediately with a
 * static-friendly cursor and no loop. Screen readers always get the full
 * static text (sr-only) so the animation never garbles AT output.
 */
export const TypingText = ({ text }: TypingTextProps) => {
  const reduced = useReducedMotion();
  const [visibleChars, setVisibleChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduced) return;
    setStarted(true);

    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      timeout =
        visibleChars < text.length
          ? setTimeout(
              () => setVisibleChars((n) => n + 1),
              visibleChars === 0 ? INITIAL_DELAY_MS : TYPE_MS
            )
          : setTimeout(() => setPhase("erasing"), PAUSE_MS);
    } else {
      timeout =
        visibleChars > 0
          ? setTimeout(() => setVisibleChars((n) => n - 1), ERASE_MS)
          : setTimeout(() => setPhase("typing"), RESTART_MS);
    }
    return () => clearTimeout(timeout);
  }, [reduced, phase, visibleChars, text.length]);

  const display = reduced || !started ? text : text.slice(0, visibleChars);

  return (
    <span>
      {/* Screen readers get the full text immediately */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
      {/* Cursor always renders; its blink animation collapses under the
          global prefers-reduced-motion rule in globals.css */}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
};
