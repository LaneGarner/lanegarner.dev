import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ScrollToTop } from "@/components/site/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL("https://lanegarner.dev"),
  title: {
    default: "Lane Garner | Design-Focused Software Engineer",
    template: "%s | Lane Garner",
  },
  description:
    "Lane Garner is a design-focused software engineer in Austin, Texas. He builds design systems and accessible product UI.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Lane Garner | Design-Focused Software Engineer",
    description:
      "Lane Garner is a design-focused software engineer in Austin, Texas. He builds design systems and accessible product UI.",
    url: "https://lanegarner.dev",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 3330,
        height: 1857,
        alt: "Lane Garner, design-focused software engineer",
      },
    ],
  },
};

// Sets the .dark class before first paint (no theme flash): follows the
// system preference unless a choice is saved in localStorage.
const themeInitScript = `
try {
  var p = localStorage.getItem("theme");
  var dark = p === "dark" || ((p === "system" || !p) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) document.documentElement.classList.add("dark");
} catch (e) {}
`;

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-mono">
        <SiteThemeProvider>
          <ScrollToTop />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-chrome focus:px-4 focus:py-2 focus:text-accent"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SiteThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
