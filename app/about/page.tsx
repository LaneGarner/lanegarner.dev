import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "@/components/tutti";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jazz musician turned software engineer: Lane Garner's story, from UNT jazz performance degrees to building products at Indeed and on his own.",
};

const AboutPage = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold sm:text-5xl">
        About
      </h1>
      <div className="mb-8 flex justify-center">
        <div className="relative h-56 w-56 overflow-hidden rounded-full">
          <Image
            src="/profilePic.jpg"
            alt="Photo of Lane Garner"
            fill
            sizes="224px"
            className="object-cover"
          />
        </div>
      </div>

      <section aria-label="Quick facts" className="mb-10">
        <h2 className="mb-4 text-2xl font-extrabold">Quick facts</h2>
        <ul className="list-disc space-y-2 pl-6 text-ink-soft">
          <li>Austin, Texas</li>
          <li>
            Software Engineer II at Indeed, previously UX Developer,
            employer-side products
          </li>
          <li>Jazz performance degrees, University of North Texas</li>
          <li>Austin Coding Academy graduate</li>
          <li>
            Builder of{" "}
            <Link
              href="/work/tutti-ui"
              className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
            >
              tutti-ui
            </Link>
            ,{" "}
            <Link
              href="/work/rhythm-fit"
              className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
            >
              Rhythm Fit
            </Link>
            ,{" "}
            <Link
              href="/work/tribe-tracker"
              className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
            >
              Tribe Tracker
            </Link>
            ,{" "}
            <Link
              href="/work/garnerguitar"
              className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
            >
              garnerguitar.com
            </Link>
            , and{" "}
            <Link
              href="/work/shedr"
              className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
            >
              shedr
            </Link>
          </li>
        </ul>
      </section>

      <Divider className="mb-10" />

      <div className="mb-10 space-y-6 text-lg font-light leading-relaxed text-ink-soft">
        <p>
          I&apos;m a design-focused frontend software engineer in Austin, Texas. Before
          I wrote software I was a working musician and guitar instructor. My training was in jazz
          (performance degrees from the University of North Texas), and these
          days I make guitar courses at garnerguitar.com.
        </p>

        <p>
          The practice room turned out to be excellent training for this job.
          Jazz is a discipline of{" "}
          <span className="font-semibold underline decoration-accent decoration-4 underline-offset-4">
            structured improvisation
          </span>
          : you internalize the fundamentals so deeply that you can respond to
          whatever the moment throws at you, and you develop an ear for nuance. That&apos;s the
          same muscle that catches a two-pixel misalignment or an interaction
          that&apos;s technically correct but feels wrong.
        </p>

        <p>
          Since 2021 I&apos;ve been at Indeed, working on employer-facing
          products, the tools businesses use to find and hire people. Along
          the way I&apos;ve gravitated to the seam between design and
          engineering: pixel-perfection, design systems, accessibility, and the details
          that don&apos;t survive a handoff unless someone owns them on both
          sides. I care about the Don Norman fundamentals of human-centered
          design: clear affordances, immediate feedback, and interfaces that
          match the user&apos;s mental model instead of the database schema.
          I also like forgiving interfaces; an undo beats a confirmation
          dialog.
        </p>

        <p>
          Outside of work hours I build and ship my own products end-to-end:{" "}
          <Link
            href="/work/tutti-ui"
            className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
          >
            tutti-ui
          </Link>
          , a cross-platform design system (which this site is built with);
          mobile apps with AI coaching (
          <Link
            href="/work/rhythm-fit"
            className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
          >
            Rhythm Fit
          </Link>
          ,{" "}
          <Link
            href="/work/tribe-tracker"
            className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
          >
            Tribe Tracker
          </Link>
          ); and{" "}
          <Link
            href="/work/garnerguitar"
            className="font-semibold underline decoration-accent-cool decoration-2 underline-offset-4 hover:text-accent-quiet"
          >
            garnerguitar.com
          </Link>
          , a guitar course website.
        </p>

        <p>
          I believe in approaching everything with a growth mindset: always
          learning, always pushing forward. It&apos;s how you survive as a
          musician, and it&apos;s how you stay good at the quick-paced always changing world of software.
        </p>
      </div>

      <p>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm bg-chrome px-4 py-3 text-lg text-accent-cool no-underline"
        >
          <span className="font-bold text-accent underline underline-offset-2">
            Download my resume
          </span>{" "}
          (PDF)
        </a>
      </p>
    </div>
  );
};

export default AboutPage;
