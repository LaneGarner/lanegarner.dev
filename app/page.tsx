import Image from "next/image";
import Link from "next/link";
import { CardHeader } from "@/components/tutti";
import { TypingText } from "@/components/site/typing-text";
import { RotatingWord } from "@/components/site/rotating-word";
import {
  SurfaceCard,
  SurfaceCardTitle,
  SurfaceCardDescription,
} from "@/components/site/surface-card";
import { AIDemo } from "@/components/site/ai-demo";
import { EmbeddedAIExamples } from "@/components/site/embedded-ai-examples";
import { WorkGrid } from "@/components/site/work-grid";
import { WaveBandReveal } from "@/components/site/wave-band-reveal";
import { WaveEdge } from "@/components/site/wave-edge";

const HomePage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <section
        aria-label="Introduction"
        className="flex min-h-[70vh] flex-wrap items-center justify-center gap-8 py-12 sm:gap-12"
      >
        <div className="shrink-0">
          <div className="relative h-72 w-72 overflow-hidden rounded-full sm:h-[375px] sm:w-[375px]">
            <Image
              src="/profilePic.jpg"
              alt="Photo of Lane Garner"
              fill
              sizes="(min-width: 640px) 375px, 288px"
              priority
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex max-w-xl flex-col">
          <p className="mb-4 text-6xl font-extrabold leading-tight sm:text-7xl">
            <TypingText text="Hello." />
          </p>
          <div className="mb-6 flex flex-col gap-1 text-xl font-light leading-tight sm:text-3xl">
            <span className="font-extrabold">I&apos;m Lane Garner,</span>
            <span>a design-focused frontend</span>
            <span>software engineer based</span>
            <span>in Austin, Texas.</span>
          </div>
          <div className="w-fit rounded-sm bg-chrome px-4 py-3 text-lg text-accent-cool">
            <div className="flex flex-col gap-2">
              <span>My specialty is the front of the frontend.</span>
              <Link
                href="/work"
                className="font-bold text-accent underline underline-offset-2"
              >
                See my work.
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed dark band, carried over from the old site's "Work with
          me" divider. Wave top edge curving up toward the top right; the
          band stays dark in both themes like the original. */}
      <section
        aria-label="What I build"
        className="relative left-1/2 w-screen -translate-x-1/2"
      >
        <WaveEdge edge="top" />
        <div className="flex flex-col items-center gap-6 bg-chrome px-4 py-16 text-center text-chrome-ink">
          <WaveBandReveal>
            <p className="text-3xl font-bold sm:text-6xl">I build</p>
          </WaveBandReveal>
          <p className="text-4xl font-extrabold sm:text-7xl">
            <RotatingWord />
          </p>
          <WaveBandReveal className="delay-150">
            <div className="text-3xl font-bold leading-tight sm:text-6xl flex flex-col gap-0">
              <span>interfaces</span>
              <span>and</span>
              <span>systems</span>
            </div>
          </WaveBandReveal>
        </div>
        <WaveEdge edge="bottom" />
      </section>

      <section aria-label="What I do" className="py-12">
        <h2 className="mb-8 text-center text-3xl font-extrabold">What I do</h2>
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          <SurfaceCard>
            <CardHeader>
              <SurfaceCardTitle>Design systems</SurfaceCardTitle>
              <SurfaceCardDescription>
                Design tokens and components that survive contact with more
                than one platform. This site runs on{" "}
                <a
                  href="https://github.com/LaneGarner/tutti-ui"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ink underline decoration-accent-cool decoration-2 underline-offset-4 transition-colors hover:text-accent-quiet"
                >
                  tutti-ui
                </a>
                , my React + React Native system.
              </SurfaceCardDescription>
            </CardHeader>
          </SurfaceCard>
          <SurfaceCard>
            <CardHeader>
              <SurfaceCardTitle>Product engineering</SurfaceCardTitle>
              <SurfaceCardDescription>
                I build and ship whole products, backend included.
                GarnerGuitar.com has paying students; Rhythm Fit works in a
                basement gym with no signal.
              </SurfaceCardDescription>
            </CardHeader>
          </SurfaceCard>
          <SurfaceCard>
            <CardHeader>
              <SurfaceCardTitle>AI-native interfaces</SurfaceCardTitle>
              <SurfaceCardDescription>
                Streaming output, tool calls rendered as real UI, honest
                fallbacks. Rhythm Fit&apos;s coach streams NDJSON into
                scheduled workouts; Tribe Tracker drops to deterministic
                stats when the model fails.
              </SurfaceCardDescription>
            </CardHeader>
          </SurfaceCard>
          <SurfaceCard>
            <CardHeader>
              <SurfaceCardTitle>Usability</SurfaceCardTitle>
              <SurfaceCardDescription>
                Don Norman is my north star: signifiers that invite the right
                action, feedback that answers it, mappings and constraints
                that make the wrong action hard. If users need the manual,
                the conceptual model failed.
              </SurfaceCardDescription>
            </CardHeader>
          </SurfaceCard>
          <SurfaceCard>
            <CardHeader>
              <SurfaceCardTitle>Accessible craft</SurfaceCardTitle>
              <SurfaceCardDescription>
                Semantic HTML, keyboard-first interactions, WCAG 2.2 AA.
                Controls should look like what they do and answer every
                action with feedback. If the focus order is wrong, the work
                isn&apos;t done. Accessibility issues are usually usability
                issues in disguise&mdash;fixing them makes the product better
                for everyone.
              </SurfaceCardDescription>
            </CardHeader>
          </SurfaceCard>
        </div>
      </section>

      <section aria-label="AI interface demo" className="py-12">
        <h2 className="mb-4 text-center text-3xl font-extrabold">
          AI is an interface problem
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg font-light text-ink-soft">
          A canned exchange, no model behind it. The rendering is real:
          tutti-ui&apos;s AgentWorkflow and StreamingText, the same components
          documented in the{" "}
          <a
            href="https://lanegarner.github.io/tutti-ui/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ink underline decoration-accent-cool decoration-2 underline-offset-4 transition-colors hover:text-accent-quiet"
          >
            Storybook
          </a>
          .
        </p>
        <AIDemo />
      </section>

      <section aria-label="AI beyond chat" className="py-12">
        <h2 className="mb-4 text-center text-3xl font-extrabold">
          AI without the chat box
        </h2>
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center text-lg font-light text-ink-soft">
          <p>
            AI doesn&apos;t have to be a conversation. The interesting work
            is baking the model into the product itself: onboarding that
            turns a short survey into a ready-to-go plan, coaching that
            reads your actual data and speaks up on its own, digests that
            land where you already are.
          </p>
          <p>
            No blank text box, no prompt engineering left to the user. The
            model works behind interfaces that look like the product&mdash;
            and when it&apos;s unavailable, deterministic fallbacks keep the
            feature honest.
          </p>
        </div>
        <div className="mt-10">
          <EmbeddedAIExamples />
        </div>
      </section>

      <section aria-label="AI tooling" className="py-12">
        <h2 className="mb-4 text-center text-3xl font-extrabold">
          A superpower, not a replacement
        </h2>
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center text-lg font-light text-ink-soft">
          <p>
            I code with Claude daily and have shipped with Copilot and
            Cursor too. The speedup is real&mdash;but the output is only as
            good as the human in the loop. Without someone who knows what
            good looks like, you get slop: code that runs today and
            can&apos;t be maintained tomorrow.
          </p>
          <p>
            UI is where that shows most. AI has historically struggled with
            pixel-perfect interfaces, and while newer tooling keeps getting
            better, a discerning eye and a human leading the way still make
            the difference. Used that way, AI isn&apos;t a replacement for
            the craft&mdash;it&apos;s an enhancement, and a superpower.
          </p>
        </div>
      </section>

      <section aria-label="Side projects" className="py-12">
        <h2 className="mb-4 text-center text-3xl font-extrabold">
          Side Projects
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg font-light text-ink-soft">
          Passion projects, built nights and weekends because I wanted them to
          exist. Some solve my own problems, like a workout app that works in
          a basement gym with no signal. Others are things I wanted to own end
          to end, like a design system that ships to web and native from one
          set of tokens. Each card links to a write-up with the decisions
          behind the build.
        </p>
        <WorkGrid />
      </section>

      <section
        aria-label="Background"
        className="mx-auto max-w-2xl py-16 text-center"
      >
        <p className="mb-6 text-xl font-light leading-relaxed sm:text-2xl">
          My work is design focused, and my background as a{" "}
          <span className="font-semibold underline decoration-accent decoration-4 underline-offset-4">
            musician
          </span>{" "}
          inspires creativity throughout the development process.
        </p>
        <p>
          <Link
            href="/about"
            className="font-bold text-ink-soft underline decoration-accent-cool decoration-2 underline-offset-4 transition-colors hover:text-accent-quiet dark:text-ink"
          >
            Read the story
          </Link>
        </p>
      </section>
    </div>
  );
};

export default HomePage;
