import type { Metadata } from "next";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tutti";
import { CaseStudyLayout, CaseSection } from "@/components/site/case-study";
import { ScreenshotPlaceholder } from "@/components/site/screenshot-placeholder";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "tutti-ui: cross-platform design system",
  description:
    "Case study: a React + React Native design system with shared tokens, 27/32 native parity, and 600+ tests.",
};

const TuttiUiCaseStudy = () => {
  const study = getCaseStudy("tutti-ui");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          tutti-ui is a design system that ships to both React and React
          Native from one set of design tokens: colors, spacing, typography,
          radii, and shadows defined once in{" "}
          <code>@tutti-ui/tokens</code> and consumed by a Tailwind preset on
          web and NativeWind classes on native. The name is a nod to my music
          background: <em>tutti</em> is the score marking for &ldquo;everyone
          plays.&rdquo;
        </p>
        <p>
          It currently spans 32 component families (60+ exports) on web, with
          27 of the 32 ported to React Native; the remaining five are
          web-idiom components (like Tooltip and CommandPalette) that map to
          different mobile patterns by design. The whole system is documented
          in a live Storybook, covered by 600+ Jest + Testing Library tests
          (332 web, 271 native), and written in strict TypeScript.
        </p>
        <p>
          <strong>This portfolio is built with it</strong>: the buttons,
          cards, tabs, form fields, breadcrumbs, and theme provider on every
          page are @tutti-ui/react, themed through its Tailwind preset.
        </p>
      </CaseSection>

      <div className="flex items-center justify-center rounded-card bg-[#ECF6F0] px-8 py-12">
        <Image
          src="/tuttiui-lockup.svg"
          alt="The tutti-ui logo and wordmark"
          width={360}
          height={120}
          unoptimized
          className="h-auto w-full max-w-[360px]"
        />
      </div>

      <CaseSection title="Why cross-platform parity is the hard part">
        <p>
          Most component libraries pick a platform. The interesting problems
          in tutti-ui came from refusing to: every component needed the same
          API, the same variants, and the same accessibility guarantees on
          two very different runtimes. A web <code>Select</code> is a native
          popup; on mobile it becomes a trigger plus bottom-sheet modal (same
          props, different idiom). Focus rings don&apos;t exist on native, so
          they&apos;re approximated with border treatments. ARIA roles map to{" "}
          <code>accessibilityRole</code> / <code>accessibilityState</code>.
        </p>
        <p>
          The parity work is tracked publicly, component by component, in{" "}
          <a
            href="https://github.com/LaneGarner/tutti-ui/blob/main/PARITY.md"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-accent-cool decoration-2 underline-offset-4"
          >
            PARITY.md
          </a>
          , including the honest &ldquo;deferred&rdquo; and &ldquo;web-only by
          design&rdquo; calls.
        </p>
      </CaseSection>

      <CaseSection title="One token source, two renderers">
        <Tabs defaultValue="web">
          <TabsList className="dark:border-[#3a3a3a]">
            <TabsTrigger value="web" className="dark:text-ink">
              React (web)
            </TabsTrigger>
            <TabsTrigger value="native" className="dark:text-ink">
              React Native
            </TabsTrigger>
          </TabsList>
          <TabsContent value="web">
            <pre className="overflow-x-auto rounded-lg bg-chrome p-4 text-sm text-chrome-ink">
              <code>{`// tailwind.config.ts
import { tuttiPreset } from "@tutti-ui/react/tailwind";

export default {
  presets: [tuttiPreset],
  darkMode: "class",
};

// Anywhere in the app
import { Button, Card } from "@tutti-ui/react";`}</code>
            </pre>
          </TabsContent>
          <TabsContent value="native">
            <pre className="overflow-x-auto rounded-lg bg-chrome p-4 text-sm text-chrome-ink">
              <code>{`// Same tokens, NativeWind classNames
import { Button, Card } from "@tutti-ui/react-native";
import { ThemeProvider } from "@tutti-ui/shared";

// accessibilityRole / accessibilityState wired in,
// 27 of 32 families at parity (PARITY.md)`}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CaseSection>

      <CaseSection title="Accessibility as the default">
        <p>
          Every interactive component ships with keyboard navigation, visible
          focus states, and correct semantics on web, plus the equivalent
          accessibility props on native. The AI-native primitives (streaming
          text, chat, agent workflow states) handle screen-reader
          announcements and reduced motion from the start, because streaming
          UI is where accessibility usually falls apart.
        </p>
      </CaseSection>

      <ScreenshotPlaceholder label="Side-by-side: the same Card + Button rendered on web (Storybook) and iOS simulator (react-native)" />

      <CaseSection title="Outcome">
        <p>
          A production design system with a live Storybook, published npm
          packages (<code>@tutti-ui/react</code>,{" "}
          <code>@tutti-ui/react-native</code>, <code>@tutti-ui/tokens</code>,{" "}
          <code>@tutti-ui/shared</code>), and a real consumer:
          this site.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
};

export default TuttiUiCaseStudy;
