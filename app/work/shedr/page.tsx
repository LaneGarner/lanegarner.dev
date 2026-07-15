import type { Metadata } from "next";
import { CaseStudyLayout, CaseSection } from "@/components/site/case-study";
import { CaseScreenshot } from "@/components/site/case-screenshot";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "shedr: musician's practice toolkit",
  description:
    "Case study: a web app with a Web Audio metronome and drone, ML pitch-detection tuner, practice log, and recordings.",
};

const ShedrCaseStudy = () => {
  const study = getCaseStudy("shedr");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          shedr is the tool I wished existed when I was practicing hours a
          day as a conservatory jazz student: practice log, metronome, drone,
          chromatic tuner, audio recorder, and repertoire list in one place,
          in a web app that lives on your music stand.
        </p>
        <p>
          It&apos;s one of my earlier projects, kept here deliberately:
          it&apos;s still live, still in use, and it does real-time audio
          work in the browser that most CRUD portfolios never touch.
        </p>
      </CaseSection>

      <CaseScreenshot
        src="/shedr-screenshot.png"
        alt="shedr app screenshot"
        caption="The shedr practice dashboard."
        width={2880}
        height={1800}
      />

      <CaseSection title="Real-time audio in the browser">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Tone.js metronome with time-signature accents, and a sustained
            harmonic drone (PolySynth → filter → reverb → stereo widener) with
            selectable root and chord type for intonation practice
          </li>
          <li>
            A chromatic tuner running ml5.js pitch detection on live
            microphone input, visualized with p5.js
          </li>
          <li>
            In-browser MP3 recording stored to Firebase Storage with playback
          </li>
        </ul>
      </CaseSection>

      <CaseSection title="The conventional half">
        <p>
          Timed practice sessions with topics and notes, streak tracking,
          charts, a repertoire list, and Firebase auth with protected routes:
          the standard product plumbing, circa React 17 and the Context API.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
};

export default ShedrCaseStudy;
