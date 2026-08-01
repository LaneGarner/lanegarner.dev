"use client";

import Image from "next/image";
import { useTheme } from "@tutti-ui/shared";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type AppTheme = "light" | "dark";

const SCREENSHOT_FRAME_CLASS = "flex flex-col gap-2 pt-6";

type ScreenshotFrameProps = {
  id: string;
  alt: string;
  caption: string;
  theme: AppTheme;
  className?: string;
};

const ScreenshotFrame = ({
  id,
  alt,
  caption,
  theme,
  className = "",
}: ScreenshotFrameProps) => (
  <figure className={`${SCREENSHOT_FRAME_CLASS} ${className}`}>
    <Image
      src={`/case-studies/rhythm-${id}-${theme}.png`}
      alt={`${alt} in ${theme} mode`}
      width={1242}
      height={2688}
      className="w-full rounded-card border border-ink-subtle/30 shadow-lift"
      sizes="(min-width: 768px) 352px, 100vw"
    />
    <figcaption className="text-sm leading-relaxed text-ink-muted">
      {caption}
    </figcaption>
  </figure>
);

const RhythmThemeContext = createContext<{
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
} | null>(null);

const useRhythmTheme = () => {
  const value = useContext(RhythmThemeContext);

  if (!value) {
    throw new Error("Rhythm screenshots must be inside RhythmThemeProvider");
  }

  return value;
};

export const RhythmThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme: siteTheme } = useTheme();
  const [localSelection, setLocalSelection] = useState<{
    theme: AppTheme;
    siteTheme: AppTheme;
  } | null>(null);
  const previousSiteTheme = useRef(siteTheme);
  const theme: AppTheme =
    localSelection?.siteTheme === siteTheme
      ? localSelection.theme
      : siteTheme;

  useEffect(() => {
    if (previousSiteTheme.current !== siteTheme) {
      previousSiteTheme.current = siteTheme;
      setLocalSelection(null);
    }
  }, [siteTheme]);

  const setTheme = (nextTheme: AppTheme) =>
    setLocalSelection({ theme: nextTheme, siteTheme });

  return (
    <RhythmThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </RhythmThemeContext.Provider>
  );
};

export const RhythmScreenshot = ({
  id,
  alt,
  caption,
}: {
  id: string;
  alt: string;
  caption: string;
}) => {
  const { theme } = useRhythmTheme();

  return (
    <ScreenshotFrame
      id={id}
      alt={alt}
      caption={caption}
      theme={theme}
      className="mx-auto max-w-sm"
    />
  );
};

const screens = [
  {
    id: "coach-dashboard",
    alt: "Rhythm Fit AI Coach dashboard showing this week's generated plan",
    caption:
      "The AI Coach keeps the weekly plan, progress, and training signals in one place.",
  },
  {
    id: "calendar",
    alt: "Rhythm Fit weekly calendar populated with an AI-generated workout",
    caption:
      "Generated exercises and supersets land directly on the weekly calendar.",
  },
  {
    id: "execution",
    alt: "Rhythm Fit bench press execution screen with AI-programmed sets, reps, and weight",
    caption:
      "Each set, the workout timer, and plate calculator stay within reach.",
  },
  {
    id: "chat",
    alt: "Rhythm Fit AI Coach explaining how to progress a bench press workout",
    caption:
      "Plan-aware coaching uses the programmed weight and reps to answer progression questions.",
  },
] as const;

export const RhythmFeatureGallery = () => {
  const { theme, setTheme } = useRhythmTheme();

  return (
    <section aria-labelledby="rhythm-gallery-title">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="rhythm-gallery-title" className="text-2xl font-extrabold">
            From goals to the gym floor
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Rhythm can follow the device appearance or stay in Light or Dark
            mode.
          </p>
        </div>

        <div
          className="inline-flex rounded-full border border-ink-subtle/40 bg-surface p-1"
          role="group"
          aria-label="Screenshot theme"
        >
          {(["light", "dark"] as const).map((option) => {
            const selected = option === theme;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setTheme(option)}
                className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "bg-ink text-paper"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {screens.map((screen) => (
          <ScreenshotFrame key={screen.id} {...screen} theme={theme} />
        ))}
      </div>
    </section>
  );
};
