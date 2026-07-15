import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Message received. Thanks for reaching out.",
  robots: { index: false },
};

/** Post-submit landing page for the contact form. */
const ThankYouPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-16 text-center sm:px-6">
      <h1 className="mb-6 text-4xl font-extrabold sm:text-5xl">
        <span className="marker-highlight px-1">Thank you!</span>
      </h1>
      <p className="mb-8 text-lg font-light text-ink-soft">
        Your message is on its way. I&apos;ll get back to you soon.
      </p>
      <p>
        <Link
          href="/"
          className="font-bold text-ink-soft underline decoration-accent decoration-4 underline-offset-4 transition-colors hover:text-accent-quiet dark:text-ink"
        >
          Back home
        </Link>
      </p>
    </div>
  );
};

export default ThankYouPage;
