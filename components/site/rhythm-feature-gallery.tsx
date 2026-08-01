"use client";

import Image from "next/image";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
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
  const [theme, setTheme] = useState<AppTheme>("light");

  useEffect(() => {
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
  }, []);

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
      "The coach dashboard puts the active plan beside useful signals such as a new PR or a stalled lift.",
  },
  {
    id: "calendar",
    alt: "Rhythm Fit weekly calendar populated with an AI-generated workout",
    caption:
      "A generated plan becomes dated exercises, supersets, and trackable progress.",
  },
  {
    id: "execution",
    alt: "Rhythm Fit bench press execution screen with AI-programmed sets, reps, and weight",
    caption:
      "Each workout moves into a focused set-by-set view with a timer and plate calculator nearby.",
  },
  {
    id: "chat",
    alt: "Rhythm Fit AI Coach explaining how to progress a bench press workout",
    caption:
      "The coach answers progression questions using the weight and reps already in the plan.",
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
                className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition-colors ${
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
