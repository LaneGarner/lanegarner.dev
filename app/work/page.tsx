import type { Metadata } from "next";
import { WorkGrid } from "@/components/site/work-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects by Lane Garner: tuttiui, Rhythm Fit, Tribe Tracker, garnerguitar.com, and shedr, each with a case study.",
};

const WorkPage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-4 text-center text-4xl font-extrabold sm:text-5xl">
        Side Projects
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-center text-lg font-light text-ink-soft">
        Passion projects, built nights and weekends because I wanted them to
        exist. Each card links to a write-up with the decisions behind the
        build.
      </p>
      <WorkGrid />
    </div>
  );
};

export default WorkPage;
