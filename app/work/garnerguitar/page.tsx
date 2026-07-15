import type { Metadata } from "next";
import { CaseStudyLayout, CaseSection } from "@/components/site/case-study";
import { CaseScreenshot } from "@/components/site/case-screenshot";
import { ScreenshotPlaceholder } from "@/components/site/screenshot-placeholder";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "GarnerGuitar.com: Stripe course platform",
  description:
    "Case study: a real payments-to-content pipeline for a guitar course business, with Stripe Checkout, gated lessons, and signed video URLs.",
};

const GarnerGuitarCaseStudy = () => {
  const study = getCaseStudy("garnerguitar");

  return (
    <CaseStudyLayout study={study}>
      <CaseSection title="Overview">
        <p>
          GarnerGuitar.com sells my guitar courses: structured video lessons
          with Stripe payments and gated content. Real students pay for it,
          which means it has to handle the messy cases a demo storefront
          never meets.
        </p>
      </CaseSection>

      <CaseScreenshot
        src="/garner-guitar-screenshot.png"
        alt="GarnerGuitar.com homepage"
        caption="The GarnerGuitar.com homepage."
        width={2880}
        height={1800}
      />

      <CaseSection title="The pipeline">
        <p>
          A free course (Guitar Basics) works with no account at all. Paid
          courses are gated server-side: <code>getServerSideProps</code>{" "}
          checks a <code>user_purchases</code> table before a lesson ever
          renders. Purchases flow through Stripe Checkout with
          signature-verified webhooks writing the purchase record, and
          duplicate-purchase guards on both ends.
        </p>
        <p>
          Videos are served through Cloudflare Stream with short-lived,
          RS256-signed playback URLs, so paid content can&apos;t be hotlinked
          even if a page is shared.
        </p>
      </CaseSection>

      <CaseSection title="The messy real-world case: guest checkout">
        <p>
          People buy before they sign up. Stripe collects the email at
          checkout; when an account with that email is created later, the
          purchase is linked to it automatically. Getting this flow right,
          without leaking access or stranding a paid customer, was the
          trickiest part of the build.
        </p>
      </CaseSection>

      <ScreenshotPlaceholder label="A gated video lesson playing, with the course sidebar menu" />

      <CaseSection title="What running it teaches">
        <p>
          Running the platform end to end (design, engineering, content, and
          support) is a constant lesson in what actually breaks: auth
          sessions across SSR, webhook retries, content migrations (the
          platform moved from static TSX lessons to Supabase-backed Markdown),
          and the difference between what users say and what the purchase
          funnel shows.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
};

export default GarnerGuitarCaseStudy;
