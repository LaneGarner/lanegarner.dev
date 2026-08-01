import type { Metadata } from "next";
import { CaseStudyLayout, CaseSection } from "@/components/site/case-study";
import { CaseScreenshot } from "@/components/site/case-screenshot";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Tribe Tracker: social habit challenges with grounded AI coaching",
  description:
    "Case study: offline-first habit competition with real-time chat and an AI coaching pipeline grounded in real check-in data.",
};

const TribeTrackerCaseStudy = () => {
  const study = getCaseStudy("tribe-tracker");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          Tribe Tracker is a React Native app where you create habit
          challenges, invite your people, and compete on points, streaks, and
          leaderboards, with an AI coach that reads your actual check-in data
          and tells you what to fix this week. Habit apps are easy; habit apps
          that work offline, sync a group leaderboard, run real-time chat, and
          coach you honestly are not.
        </p>
      </CaseSection>

      <div className="grid items-start gap-6 sm:grid-cols-2">
        <CaseScreenshot
          src="/case-studies/tribe-discover-iphone.png"
          alt="Tribe Tracker Discover screen showing public habit challenges on iPhone"
          caption="Discover and join public challenges on iPhone"
          width={1206}
          height={2622}
        />
        <CaseScreenshot
          src="/case-studies/tribe-discover-ipad.png"
          alt="Tribe Tracker Discover screen showing public habit challenges on iPad"
          caption="The Discover experience scales naturally to iPad"
          width={2064}
          height={2752}
        />
      </div>

      <CaseSection title="Coaching that reads the numbers">
        <p>
          The coaching pipeline is the part I&apos;m proudest of. The backend
          assembles each user&apos;s last 14 days of per-habit check-ins,
          streak math, and leaderboard position into a structured prompt;
          GPT-4o-mini returns a JSON synopsis that is schema-validated against
          the input (IDs must match; malformed items are dropped). The result
          is specific: which habit is slipping, whether the leaderboard gap is
          mathematically closable in the days remaining, and one concrete ask
          for the week.
        </p>
        <p>
          If the model is unavailable, a deterministic stats-based fallback
          produces the same shape from the raw numbers, so coaching never
          silently fails. A Vercel Cron job posts an AI-written Monday recap
          into each active challenge&apos;s group chat.
        </p>
        <p>
          None of it is a chat interface: the survey-based challenge
          matchmaker, the weekly digest, and the coach synopsis all render
          as ordinary product UI. The model does its work behind the
          scenes.
        </p>
      </CaseSection>

      <CaseSection title="Offline-first with a social layer">
        <p>
          Every action applies optimistically through Redux and persists to
          AsyncStorage immediately; a custom sync middleware pushes changes in
          the background, queues failures, and retries with exponential
          backoff. On top of that: real-time group chat per challenge
          (Supabase <code>postgres_changes</code> with a polling fallback),
          DMs with a request/accept flow, typing indicators, read receipts,
          and deep-link invites.
        </p>
      </CaseSection>

      <CaseSection title="Design details">
        <ul className="list-disc space-y-2 pl-6">
          <li>Light/dark/system theming with an animated tab-bar indicator</li>
          <li>Badges and level progression tuned to reward consistency</li>
          <li>
            Onboarding wizard that ranks public challenges against stated
            goals
          </li>
          <li>
            Local push for reminders and streak warnings; email via Supabase
            Edge Functions
          </li>
        </ul>
      </CaseSection>
    </CaseStudyLayout>
  );
};

export default TribeTrackerCaseStudy;
