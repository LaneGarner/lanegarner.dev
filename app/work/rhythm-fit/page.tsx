import type { Metadata } from "next";
import { CaseStudyLayout, CaseSection } from "@/components/site/case-study";
import { ScreenshotPlaceholder } from "@/components/site/screenshot-placeholder";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Rhythm Fit: offline-first AI workout coach",
  description:
    "Case study: an offline-first React Native workout tracker with a streaming AI coach and WCAG 2.2 AA accessibility.",
};

const RhythmFitCaseStudy = () => {
  const study = getCaseStudy("rhythm-fit");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          Rhythm Fit is a workout tracker and AI coach built for real gym
          conditions: basements with no signal, mid-set glances, sweaty
          thumbs. It&apos;s a React Native / Expo app where every mutation
          lands in local storage instantly, a sync middleware queues changes
          and reconciles with the server when a connection returns, and the
          entire app is fully usable with no backend at all.
        </p>
      </CaseSection>

      <div className="flex flex-wrap justify-center gap-4">
        <ScreenshotPlaceholder
          label="Weekly planner (7-day view)"
          aspect="tall"
        />
        <ScreenshotPlaceholder
          label="Workout execution (set-by-set timer)"
          aspect="tall"
        />
        <ScreenshotPlaceholder
          label="AI Coach streaming a multi-week program"
          aspect="tall"
        />
      </div>

      <CaseSection title="Offline-first, for real">
        <p>
          The data flow is: user action → Redux dispatch → local state →
          AsyncStorage save → background API sync. Failed syncs queue and
          retry; app boot hydrates from disk first, then reconciles with the
          server. The backend (Node/Express + Supabase) is genuinely
          optional: local-only mode is a supported configuration.
        </p>
        <p>
          That constraint shaped the UX everywhere: nothing ever spins waiting
          for a network, and sync state is ambient rather than modal.
        </p>
      </CaseSection>

      <CaseSection title="A streaming AI coach">
        <p>
          The AI coach plans workouts, answers training questions, and
          generates multi-week programs. Responses stream as NDJSON so the
          plan renders as it&apos;s written. Streamed text is easy to get
          wrong for screen readers, so the coach announces progress and
          respects reduced motion.
        </p>
      </CaseSection>

      <CaseSection title="Accessibility as a feature">
        <p>
          WCAG 2.2 AA touch targets, labels, and roles across the app&apos;s
          interactive elements, with acceptance criteria of their own. You
          use a gym app with shaky hands and half your attention; accessible
          design is just good design here.
        </p>
        <p>
          The iOS build follows Apple&apos;s Human Interface Guidelines where
          it matters: a home-screen widget and Live Activity built in Swift,
          and reduced motion respected throughout the app.
        </p>
      </CaseSection>

      <CaseSection title="Also in the box">
        <ul className="list-disc space-y-2 pl-6">
          <li>Supersets with back-to-back guided execution</li>
          <li>
            A global workout timer (count up/down) that survives backgrounding
          </li>
          <li>Stats, streaks, per-exercise history, and PRs</li>
          <li>Plate-math and common lift calculators</li>
          <li>
            Onboarding with spotlight overlays (progressive disclosure, not a
            slideshow); light/dark theming
          </li>
        </ul>
      </CaseSection>
    </CaseStudyLayout>
  );
};

export default RhythmFitCaseStudy;
