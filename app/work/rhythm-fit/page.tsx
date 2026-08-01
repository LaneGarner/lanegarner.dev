import type { Metadata } from "next";
import { CaseStudyLayout, CaseSection } from "@/components/site/case-study";
import {
  RhythmFeatureGallery,
  RhythmScreenshot,
  RhythmThemeProvider,
} from "@/components/site/rhythm-feature-gallery";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Rhythm Fit: AI workout planning from goals to execution",
  description:
    "A React Native workout tracker with AI planning, accessible controls, and reliable workout execution.",
};

const RhythmFitCaseStudy = () => {
  const study = getCaseStudy("rhythm-fit");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          Rhythm Fit is the workout app I wanted in the gym. It plans training
          blocks, logs sets quickly, and stays out of the way during a workout.
          The coach, schedule, and workout log live in one app.
        </p>
        <p>
          I designed and built the React Native app, interaction system, and
          Node/Supabase backend. Real gym use shaped the UI: clear hierarchy,
          large targets, immediate feedback, and reliable one-handed actions.
        </p>
      </CaseSection>

      {/* Latest build note intentionally disabled. Re-enable only after the
          security audit is complete and repository checks have a clean,
          green status.
          <GitHubLatestCommit />
      */}

      <RhythmThemeProvider>
        <RhythmFeatureGallery />

        <CaseSection title="AI that becomes product UI">
          <p>
            Plan creation starts with a focused intake for goals, experience,
            equipment, schedule, and limitations. Users review every answer
            before generating a plan.
          </p>
          <p>
            The model returns a scheduling tool call. Typed code validates it,
            expands recurring weeks, creates sets and supersets, then saves
            editable data through the same Redux model as manual workouts.
          </p>
          <RhythmScreenshot
            id="intake"
            alt="Rhythm Fit review screen for an AI-generated workout plan"
            caption="Every planning input is reviewable before generation, so changes never require starting over."
          />
        </CaseSection>

        <CaseSection title="A coach grounded in real training">
          <p>
            The coach uses recent workouts, records, stalled lifts, and the
            active plan. “How should I progress?” gets an answer based on the
            weight and reps already on screen.
          </p>
          <p>
            The UI handles partial answers, errors, and retries without jumping
            the scroll position. Screen readers announce the final answer once.
          </p>
          <p>
            The prompt system combines versioned instructions with a bounded
            context snapshot. User data stays isolated as untrusted input.
            Conversations are summarized, token budgets scale by task, and
            scheduling output is validated before reaching the calendar.
          </p>
          <RhythmScreenshot
            id="chat"
            alt="Rhythm Fit AI Coach giving plan-aware progression advice"
            caption="Answers arrive without moving the scroll position. Reduced motion and one final screen-reader announcement keep chat calm."
          />
        </CaseSection>

        <CaseSection title="Local-first where it matters">
          <p>
            The AI coach needs a connection. A saved workout does not. Redux
            updates immediately, AsyncStorage persists the change, and account
            sync runs in the background with a retry queue.
          </p>
          <p>
            Planning can show a network state. Checking off a set should never
            stall because reception is bad.
          </p>
          <RhythmScreenshot
            id="execution"
            alt="Rhythm Fit workout execution screen"
            caption="Set completion updates Redux and AsyncStorage immediately. Account sync follows."
          />
        </CaseSection>

        <CaseSection title="Progress becomes useful feedback">
          <p>
            Completed workouts feed records, volume, consistency, muscle
            balance, and exercise history across several time ranges.
          </p>
          <p>
            The coach uses the same data to celebrate a PR or suggest a change
            when a lift stalls. Logging, analysis, and planning stay connected.
          </p>
          <RhythmScreenshot
            id="stats"
            alt="Rhythm Fit workout analytics with records, volume, and consistency"
            caption="PRs, volume trends, muscle balance, and top exercises come directly from workout records."
          />
        </CaseSection>

        <CaseSection title="Accessibility is interaction design">
          <p>
            Accessibility had acceptance criteria from the start: WCAG 2.2 AA
            targets and contrast, labels, roles, focus order, visible state,
            and reduced motion. I tested every flow in both themes.
          </p>
          <p>
            Large controls and clear states also help in a busy gym. Rhythm can
            follow the system appearance or stay in Light or Dark mode. Its
            patterns follow Apple&apos;s Human Interface Guidelines.
          </p>
          <RhythmScreenshot
            id="coach-dashboard"
            alt="Rhythm Fit coach dashboard with large labeled controls"
            caption="Large targets, clear state, AA contrast, and reduced motion support one-handed use."
          />
        </CaseSection>

        <CaseSection title="Also in the box">
          <ul className="list-disc space-y-2 pl-6">
            <li>Supersets with back-to-back guided execution</li>
            <li>Count-up, countdown, and EMOM workout timers</li>
            <li>Plate math and lift calculators</li>
            <li>Guided onboarding for goals, schedule, and equipment</li>
          </ul>
          <div className="grid gap-6 sm:grid-cols-2">
            <RhythmScreenshot
              id="calculator"
              alt="Rhythm Fit plate calculator showing a 185-pound barbell setup"
              caption="Configured barbells and available plates produce a per-side loading plan."
            />
            <RhythmScreenshot
              id="superset"
              alt="Rhythm Fit superset execution screen for lateral raises and tricep pushdowns"
              caption="Superset pairs stay together through weight, reps, and set completion."
            />
            <RhythmScreenshot
              id="timer"
              alt="Rhythm Fit workout timer with count-up, countdown, and EMOM modes"
              caption="Count-up, countdown, and EMOM modes stay within the active workout."
            />
            <RhythmScreenshot
              id="onboarding"
              alt="Rhythm Fit guided onboarding asking about training goals"
              caption="Guided questions turn goals, schedule, and equipment into planning context."
            />
          </div>
        </CaseSection>
      </RhythmThemeProvider>
    </CaseStudyLayout>
  );
};

export default RhythmFitCaseStudy;
