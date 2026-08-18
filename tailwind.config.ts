import type { Config } from "tailwindcss";
import { tuttiPreset } from "@tuttiui/react/tailwind";

/**
 * Theming contract:
 * - tuttiPreset supplies the design-system scales (gray/blue/green/amber/red,
 *   spacing, radii, shadows) that @tuttiui/react components consume.
 * - Site-brand colors are semantic tokens backed by CSS variables defined in
 *   app/globals.css (:root and .dark). Retheme there; components never
 *   hardcode hex values.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./node_modules/@tuttiui/react/dist/**/*.{js,mjs}",
  ],
  // ColorScale's mapped type doesn't structurally match Tailwind's
  // RecursiveKeyValuePair, but the values are identical at runtime.
  presets: [tuttiPreset as unknown as Partial<Config>],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Extracted from lanegarner.dev; see DESIGN.md for the mapping.
        paper: "var(--paper)", // page background (old: --white / --darkest-grey)
        ink: "var(--ink)", // primary text (old: --black / --lightest-grey)
        "ink-soft": "var(--ink-soft)", // links, active nav (old: --dark-grey)
        "ink-muted": "var(--ink-muted)", // secondary text (old: --light-grey)
        "ink-subtle": "var(--ink-subtle)", // idle nav (old: --lighter-grey)
        surface: "var(--surface)", // cards/wells (old: --lightest-grey)
        "surface-alt": "var(--surface-alt)", // alt surface (old: --lightest-grey-alt)
        chrome: "var(--chrome)", // dark chip/nav (old: --darkest-grey)
        "chrome-deep": "var(--chrome-deep)", // footer (old: --darker-grey)
        "chrome-ink": "var(--chrome-ink)", // text on chrome (old: --lightest-grey)
        accent: "var(--accent)", // signature yellow (old: --js-yellow)
        "accent-cool": "var(--accent-cool)", // (old: --react-blue)
        "accent-quiet": "var(--accent-quiet)", // link hover (old: $turquoise)
      },
      fontFamily: {
        mono: "var(--font-mono)",
      },
      borderRadius: {
        // Old site's --border-radius: 3rem (portfolio cards)
        card: "var(--radius-card)",
      },
      boxShadow: {
        // Old site's .shadow utility
        lift: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
