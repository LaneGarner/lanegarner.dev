"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ThemeProvider, useTheme } from "@tutti-ui/shared";

const STORAGE_KEY = "theme";

type StoredPreference = "light" | "dark" | "system";

/**
 * Read the saved preference after hydration. The blocking script in
 * app/layout.tsx applies the resolved class before paint, while keeping the
 * provider's server and first client render deterministic avoids hydration
 * mismatches for components that consume the theme context.
 */
const getStoredPreference = (): StoredPreference => {
  if (typeof window === "undefined") return "system";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  } catch {
    // storage unavailable; fall back to system
  }
  return "system";
};

interface ThemeChildrenProps {
  children: ReactNode;
}

/**
 * Site theme = tutti-ui's ThemeProvider (system-following, light/dark) plus:
 * - persistence to localStorage (read synchronously above, written on change)
 * - syncing the `.dark` class on <html> for Tailwind's class strategy
 * A blocking script in app/layout.tsx sets the initial class pre-paint.
 */
export const SiteThemeProvider = ({ children }: ThemeChildrenProps) => {
  return (
    <ThemeProvider
      initialPreference="light"
      onPreferenceChange={(preference) => {
        try {
          window.localStorage.setItem(STORAGE_KEY, preference);
        } catch {
          // storage unavailable; theme still works for the session
        }
      }}
    >
      <ThemeSync>{children}</ThemeSync>
    </ThemeProvider>
  );
};

const ThemeSync = ({ children }: ThemeChildrenProps) => {
  const { theme, setPreference } = useTheme();
  const hasRestoredPreference = useRef(false);

  useEffect(() => {
    if (hasRestoredPreference.current) return;
    hasRestoredPreference.current = true;
    setPreference(getStoredPreference());
  }, [setPreference]);

  // Keep Tailwind's `.dark` class in step with the resolved theme. On first
  // run this matches what the layout's pre-paint script already set, so it
  // only does real work when the user toggles the theme (or the OS does).
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <>{children}</>;
};
