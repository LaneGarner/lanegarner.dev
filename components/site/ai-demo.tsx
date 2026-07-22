"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AgentWorkflow,
  Button,
  CardContent,
  StreamingText,
  type WorkflowStep,
} from "@/components/tutti";
import { SurfaceCard } from "./surface-card";
import { useReducedMotion } from "./use-reduced-motion";

const USER_MESSAGE =
  "Build me a three-day dumbbell plan for a basement gym with no signal.";

const REPLY =
  "Three days, dumbbells only. Monday is push: floor press 4x8, overhead " +
  "press 3x10. Wednesday is pull: one-arm rows 4x10, curls 3x12. Friday is " +
  "legs: goblet squats 4x10, Romanian deadlifts 3x8. The plan is cached on " +
  "your phone, so it loads even when the basement has no bars.";

/**
 * The scripted timeline. Stage 0 is idle (nothing has played), stages 1-3
 * walk the workflow steps, stage 4 is done. Reduced motion skips straight
 * to 4 so nothing on screen ever animates.
 */
type Stage = 0 | 1 | 2 | 3 | 4;

const TOOL_CALL_AT_MS = 900;
const STREAM_AT_MS = 2000;

const buildSteps = (stage: Stage): WorkflowStep[] => [
  {
    id: "parse",
    label: "Parse the request",
    description: "goal, days per week, equipment",
    state: stage < 1 ? "pending" : stage > 1 ? "completed" : "running",
  },
  {
    id: "tool",
    label: "Call generate_plan",
    description: "arguments validated against a JSON schema",
    state: stage < 2 ? "pending" : stage > 2 ? "completed" : "running",
  },
  {
    id: "reply",
    label: "Stream the reply",
    description: "NDJSON chunks rendered as they arrive",
    state: stage < 3 ? "pending" : stage > 3 ? "completed" : "streaming",
  },
];

/**
 * Canned tutti-ui AI demo for the home page. Plays a scripted exchange
 * once the card scrolls into view: the user message is already there, an
 * AgentWorkflow steps through parse / tool call / stream, then
 * StreamingText types out the reply. No network anywhere.
 *
 * Accessibility: StreamingText handles prefers-reduced-motion itself
 * (full text, instantly), and we also skip the workflow timeline. The
 * animated text is aria-hidden; a single sr-only live region gets the
 * complete reply once, when streaming begins, so screen readers hear one
 * clean announcement instead of a character stutter. An invisible copy of
 * the full reply reserves its exact height, so nothing shifts while it
 * streams.
 */
export const AIDemo = () => {
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const rootRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startedRef = useRef(false);
  const [stage, setStage] = useState<Stage>(0);
  // Remounts StreamingText on replay so it types from the start again.
  const [runId, setRunId] = useState(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const start = useCallback(() => {
    clearTimers();
    startedRef.current = true;
    if (reducedRef.current) {
      setStage(4);
      return;
    }
    setStage(1);
    timersRef.current.push(setTimeout(() => setStage(2), TOOL_CALL_AT_MS));
    timersRef.current.push(setTimeout(() => setStage(3), STREAM_AT_MS));
  }, [clearTimers]);

  // Nothing runs until the card is actually on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !startedRef.current) {
          start();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [start]);

  useEffect(() => clearTimers, [clearTimers]);

  const handleReplay = () => {
    setRunId((n) => n + 1);
    start();
  };

  return (
    <div ref={rootRef} className="mx-auto max-w-2xl">
      <SurfaceCard>
        <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex justify-end">
            <p className="max-w-[85%] rounded-md rounded-br-none bg-chrome px-4 py-3 text-sm leading-relaxed text-chrome-ink">
              {USER_MESSAGE}
            </p>
          </div>

          <AgentWorkflow
            steps={buildSteps(stage)}
            className="text-ink [&_p]:text-ink-muted dark:[&_[data-testid=connector-line]]:border-[#3a3a3a]"
          />

          <div className="rounded-md rounded-bl-none bg-surface px-4 py-3 text-sm leading-relaxed dark:bg-chrome dark:text-chrome-ink">
            <div className="grid">
              {/* Invisible full reply reserves the final height up front. */}
              <p
                className="invisible col-start-1 row-start-1"
                aria-hidden="true"
              >
                {REPLY}
              </p>
              <p className="col-start-1 row-start-1" aria-hidden="true">
                {stage >= 3 && (
                  <StreamingText
                    key={runId}
                    text={REPLY}
                    isStreaming={stage === 3}
                    speed="fast"
                    onComplete={() => setStage(4)}
                  />
                )}
              </p>
            </div>
            {/* Screen readers get the whole reply once, as one announcement. */}
            <p className="sr-only" aria-live="polite">
              {stage >= 3 ? REPLY : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              type="button"
              size="sm"
              onClick={handleReplay}
              className="bg-chrome text-accent hover:bg-black focus-visible:ring-accent dark:bg-chrome dark:text-accent"
            >
              Replay
            </Button>
            <p className="text-xs text-ink-muted">
              Canned data, zero API calls.
            </p>
          </div>
        </CardContent>
      </SurfaceCard>
    </div>
  );
};
