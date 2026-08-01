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
    "How I designed and built a React Native workout tracker with AI planning, accessible controls, and reliable workout execution.",
};

const RhythmFitCaseStudy = () => {
  const study = getCaseStudy("rhythm-fit");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          Rhythm Fit is the workout app I wanted in the gym. It is quick
          between sets, can plan a full training block, and stays out of the
          way during a workout. You can ask the coach, schedule a plan, log
          each set, and decide what comes next without switching apps.
        </p>
        <p>
          I designed and built the React Native app, interaction system, and
          Node/Supabase backend. Gyms shaped the frontend decisions. Signal
          drops, attention is limited, and most actions happen one-handed. The
          UI uses clear hierarchy, large targets, and immediate feedback.
        </p>
      </CaseSection>

      {/* Saved for later: restore GitHubLatestCommit after the security audit
          is complete and the repository's checks/status are green. */}

      <RhythmThemeProvider>
        <RhythmFeatureGallery />

        <CaseSection title="AI that becomes product UI">
          <p>
            Plan creation starts with a focused intake instead of an empty chat
            box. It collects goals, experience, equipment, schedule, and
            limitations. Users review every answer before generating a plan.
          </p>
          <p>
            The model returns a scheduling tool call. Typed application code
            validates the result, expands recurring weeks, creates sets and
            supersets, then saves it through the same Redux model used for
            manual workouts. The result is normal, editable app data.
          </p>
          <RhythmScreenshot
            id="intake"
            alt="Rhythm Fit review screen for an AI-generated workout plan"
            caption="The review step shows every planning input before generation. Users can fix a goal, schedule, equipment choice, or constraint without starting over."
          />
        </CaseSection>

        <CaseSection title="A coach grounded in real training">
          <p>
            The coach uses recent workouts, records, stalled lifts, and the
            active plan as context. A question like “How should I progress?”
            gets an answer based on the weight and reps already on screen.
          </p>
          <p>
            Guidance appears as it arrives. The UI handles loading, partial
            answers, errors, and retries without jumping the scroll position.
            Screen readers announce the completed answer once.
          </p>
          <p>
            The prompt system has a stable, versioned instruction layer and a
            bounded snapshot of user context. User data stays isolated as
            untrusted input. Long conversations are summarized, token budgets
            scale by task, and scheduling output is validated before it reaches
            the calendar.
          </p>
          <RhythmScreenshot
            id="chat"
            alt="Rhythm Fit AI Coach giving plan-aware progression advice"
            caption="Answers render as they arrive while the scroll position stays put. Reduced motion and one final screen-reader announcement keep the chat calm."
          />
        </CaseSection>

        <CaseSection title="Local-first where it matters">
          <p>
            The AI coach needs a connection. A saved workout does not. Redux
            updates the screen immediately, AsyncStorage saves the change, and
            account sync runs in the background. Failed writes wait in a retry
            queue.
          </p>
          <p>
            This boundary is intentional. Planning can show a network state.
            Checking off a set should never stall because reception is bad.
          </p>
          <RhythmScreenshot
            id="execution"
            alt="Rhythm Fit workout execution screen"
            caption="Set completion updates Redux and AsyncStorage immediately. Account sync follows in the background."
          />
        </CaseSection>

        <CaseSection title="Progress becomes useful feedback">
          <p>
            Completed workouts feed the stats dashboard. It tracks records,
            volume, consistency, muscle balance, and exercise history across
            several time ranges.
          </p>
          <p>
            The coach uses the same data for timely tips. It can celebrate a
            new PR or suggest a change when a lift stalls. Logging, analysis,
            and planning stay in one loop.
          </p>
          <RhythmScreenshot
            id="stats"
            alt="Rhythm Fit workout analytics with records, volume, and consistency"
            caption="PRs, volume trends, muscle balance, and top exercises all come from the activity records created during a workout."
          />
        </CaseSection>

        <CaseSection title="Accessibility is interaction design">
          <p>
            Accessibility had its own acceptance criteria from the start. That
            covered WCAG 2.2 AA targets and contrast, labels, roles, focus
            order, visible state, and reduced motion. I tested each flow in
            both themes and with dynamic coach output.
          </p>
          <p>
            Large controls and clear completion states also help in a busy gym.
            Rhythm can follow the system appearance or stay in Light or Dark
            mode. Its interaction patterns follow Apple&apos;s Human Interface
            Guidelines.
          </p>
          <RhythmScreenshot
            id="coach-dashboard"
            alt="Rhythm Fit coach dashboard with large labeled controls"
            caption="Large labeled targets, clear state, AA contrast, and reduced motion support one-handed use between sets."
          />
        </CaseSection>

        <CaseSection title="Also in the box">
          <ul className="list-disc space-y-2 pl-6">
            <li>Supersets with back-to-back guided execution</li>
            <li>A workout timer that survives backgrounding</li>
            <li>Streaks, exercise history, and PRs</li>
            <li>Plate math and lift calculators</li>
            <li>
              Guided onboarding, app themes, and iPhone/iPad layouts
            </li>
          </ul>
          <RhythmScreenshot
            id="calculator"
            alt="Rhythm Fit plate calculator showing a 185-pound barbell setup"
            caption="The plate calculator uses configured barbells and available plates to build a per-side loading plan."
          />
        </CaseSection>
      </RhythmThemeProvider>
    </CaseStudyLayout>
  );
};

export default RhythmFitCaseStudy;
