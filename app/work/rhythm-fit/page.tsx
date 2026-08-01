import type { Metadata } from "next";
import { CaseStudyLayout, CaseSection } from "@/components/site/case-study";
import { GitHubLatestCommit } from "@/components/site/github-latest-commit";
import {
  RhythmFeatureGallery,
  RhythmScreenshot,
  RhythmThemeProvider,
} from "@/components/site/rhythm-feature-gallery";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Rhythm Fit: AI workout planning from goals to execution",
  description:
    "Case study: designing and engineering a polished React Native workout tracker with personalized AI planning and accessible, local-first execution.",
};

const RhythmFitCaseStudy = () => {
  const study = getCaseStudy("rhythm-fit");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          Rhythm Fit is the workout app I wanted at the gym: fast enough to
          use between sets, thoughtful enough to plan an entire training
          block, and polished enough to disappear into the workout. It covers
          the full loop—from asking an AI coach what to do, to scheduling the
          plan, logging every set, and knowing how to progress next time.
        </p>
        <p>
          I designed and engineered the React Native product, interaction
          system, and Node/Supabase backend as one experience. The interesting
          frontend challenge was the environment itself: weak signal, short
          attention, sweaty hands, and decisions made one-handed. That pushed
          every choice toward clear hierarchy, immediate feedback, generous
          targets, and useful offline behavior.
        </p>
      </CaseSection>

      <GitHubLatestCommit />

      <RhythmThemeProvider>
        <RhythmFeatureGallery />

        <CaseSection title="AI that becomes product UI">
          <p>
            I avoided the usual empty AI chat box. A focused intake collects
            goals, experience, equipment, training days, session length, and
            limitations, then turns those answers into a personalized weekly
            split with enough structure to preview and trust.
          </p>
          <p>
            Underneath that calm UI, the model returns a scheduling tool call.
            Typed application code validates it, expands recurring weeks,
            creates sets and supersets, and writes everything into the same
            Redux model as a manually entered workout. The model proposes;
            deterministic UI turns the proposal into editable product state.
          </p>
          <RhythmScreenshot
            id="calendar"
            alt="Rhythm Fit calendar populated by the AI planner"
            caption="The model returns a structured tool call; validated application code expands it into dated, editable workout records in the same Redux model used by manual scheduling."
          />
        </CaseSection>

        <CaseSection title="A coach grounded in real training">
          <p>
            The coach is useful because it understands the product around it.
            I build a compact context from recent workouts, records, streaks,
            stalled lifts, muscle-group balance, and the active plan. “How
            should I progress?” becomes advice about the weight and reps
            already on screen—not a generic fitness answer.
          </p>
          <p>
            The interface reveals useful guidance progressively instead of
            holding the whole answer behind a spinner. I designed the loading,
            partial, complete, error, and retry states as one continuous flow,
            while preserving scroll position and announcing the final answer
            once so assistive technology is helpful rather than noisy.
          </p>
          <RhythmScreenshot
            id="chat"
            alt="Rhythm Fit AI Coach giving plan-aware progression advice"
            caption="Progressive rendering, stable scroll behavior, clear async state, reduced motion, and a single useful screen-reader announcement make the coach feel responsive without becoming distracting."
          />
        </CaseSection>

        <CaseSection title="Local-first where it matters">
          <p>
            The AI coach needs a connection; the workout it creates should
            not. Once a plan is saved, viewing it and logging sets stay fast in
            a spotty gym. Redux updates the UI immediately, AsyncStorage
            persists locally, and account sync happens in the background.
            Failed writes queue and retry.
          </p>
          <p>
            This is a deliberate product boundary, not a blanket offline
            claim. Networked features can be visibly networked; workout
            execution cannot afford to stall. The architecture protects the
            moment where latency would be most frustrating without obscuring
            what still requires the server.
          </p>
          <RhythmScreenshot
            id="execution"
            alt="Rhythm Fit workout execution screen"
            caption="After a connected coach creates the plan, execution is local-first: set completion updates Redux and AsyncStorage immediately, then syncs in the background."
          />
        </CaseSection>

        <CaseSection title="Accessibility is interaction design">
          <p>
            Accessibility had acceptance criteria, not a cleanup pass: WCAG
            2.2 AA targets and contrast, meaningful labels and roles, visible
            state, sensible focus order, and reduced-motion behavior. I tested
            the same flows in both themes and made dynamic AI output useful to
            assistive technology as content arrives.
          </p>
          <p>
            Those choices also make the app better in context. Large controls
            and unambiguous completion state help anyone operating one-handed
            and half-focused. System, Light, and Dark appearance modes respect
            preference without removing control, while the broader interaction
            system stays aligned with Apple&apos;s Human Interface Guidelines.
          </p>
          <RhythmScreenshot
            id="coach-dashboard"
            alt="Rhythm Fit coach dashboard with large labeled controls"
            caption="Large labeled targets, explicit state, AA contrast, reduced-motion handling, and System/Light/Dark appearance modes support one-handed, low-attention use in the gym."
          />
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
              Spotlight onboarding, light/dark/system themes, and responsive
              iPhone and iPad layouts
            </li>
          </ul>
          <RhythmScreenshot
            id="calculator"
            alt="Rhythm Fit plate calculator showing a 185-pound barbell setup"
            caption="Equipment-aware plate math turns a target weight into a per-side loading plan, using the lifter's configured barbells and available plates."
          />
        </CaseSection>
      </RhythmThemeProvider>
    </CaseStudyLayout>
  );
};

export default RhythmFitCaseStudy;
