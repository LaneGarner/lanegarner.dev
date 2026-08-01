export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  role: string;
  stack: string[];
  links: { label: string; href: string }[];
  /** Availability labels shown on project listing cards. */
  availability?: {
    label: string;
    status: "live" | "coming-soon";
  }[];
  /** Public path of a small 16/10 preview image for the home work cards. */
  previewImage?: string;
  /**
   * Public path of a logo SVG rendered centered on the chrome preview block
   * instead of a screenshot (for projects whose brand is the preview).
   */
  previewLogo?: string;
  /** Public path of a logo shown at the top of the case-study page. */
  logo?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "tutti-ui",
    title: "tutti-ui",
    tagline: "A cross-platform design system for React and React Native",
    summary:
      "32 accessible component families, one set of design tokens, 27 of 32 ported to React Native, with 600+ tests and a live Storybook. This site is built with it.",
    role: "Creator: design, API, web + native implementation, docs",
    previewLogo: "/tuttiui-tile.svg",
    logo: "/tuttiui-tile.svg",
    stack: [
      "TypeScript",
      "React",
      "React Native",
      "Tailwind CSS",
      "NativeWind",
      "Storybook",
      "Jest + Testing Library",
    ],
    links: [
      { label: "Live Storybook", href: "https://lanegarner.github.io/tutti-ui/" },
      { label: "GitHub", href: "https://github.com/LaneGarner/tutti-ui" },
    ],
    availability: [{ label: "Available on npm", status: "live" }],
  },
  {
    slug: "rhythm-fit",
    title: "Rhythm Fit",
    tagline: "A polished workout tracker with a plan-aware AI coach",
    summary:
      "A React Native app designed for real gym conditions: immediate local workout execution, plan-aware coaching, and accessible interactions shaped for one-handed use.",
    availability: [
      { label: "Available on Apple App Store", status: "live" },
    ],
    role: "Solo product design + full-stack engineering",
    previewLogo: "/rhythm-fit-icon.svg",
    logo: "/rhythm-fit-icon.svg",
    stack: [
      "React Native + Expo",
      "TypeScript",
      "Redux Toolkit",
      "NativeWind",
      "Supabase",
      "OpenAI",
    ],
    links: [
      {
        label: "Apple App Store",
        href: "https://apps.apple.com/us/app/rhythm-fitness/id6749348899",
      },
      { label: "GitHub", href: "https://github.com/LaneGarner/rhythm-fit" },
    ],
  },
  {
    slug: "tribe-tracker",
    title: "Tribe Tracker",
    tagline: "Social habit challenges with a grounded AI coach",
    summary:
      "Compete with your people on habits. Offline-first sync, real-time group chat, and an AI coach that reads 14 days of real check-in data and falls back to deterministic stats when the model fails.",
    role: "Solo design + engineering, app and backend",
    previewLogo: "/tribe-tracker-icon.png",
    logo: "/tribe-tracker-icon.png",
    stack: [
      "React Native + Expo",
      "TypeScript",
      "Redux Toolkit",
      "Supabase Realtime",
      "Vercel serverless + Cron",
      "OpenAI GPT-4o-mini",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/LaneGarner/tribe-tracker" },
    ],
    availability: [
      { label: "Apple App Store coming soon", status: "coming-soon" },
      { label: "Google Play Store coming soon", status: "coming-soon" },
    ],
  },
  {
    slug: "garnerguitar",
    title: "GarnerGuitar.com",
    tagline: "A Stripe-powered guitar course platform",
    summary:
      "The payments-to-content pipeline paying guitar students actually use: server-gated lessons, signature-verified Stripe webhooks, signed Cloudflare Stream video URLs, and guest checkout that links purchases to accounts created later.",
    role: "Owner-operator: design, engineering, content, and the business",
    previewLogo: "/garnerguitar-icon.png",
    logo: "/garnerguitar-icon.png",
    stack: [
      "Next.js",
      "TypeScript",
      "Stripe Checkout + webhooks",
      "Supabase (Postgres, Auth, RLS)",
      "Cloudflare Stream",
    ],
    links: [
      { label: "Live site", href: "https://garnerguitar.com" },
      { label: "GitHub", href: "https://github.com/LaneGarner/garnerguitar-next" },
    ],
    availability: [{ label: "Courses coming soon", status: "coming-soon" }],
  },
  {
    slug: "shedr",
    title: "shedr",
    tagline: "A musician's practice toolkit that lives on your music stand",
    summary:
      "Practice log, Web Audio metronome and drone (Tone.js), a chromatic tuner built on ml5.js pitch detection, recordings, and repertoire tracking. An earlier project, still live and still in use.",
    role: "Solo design + engineering",
    previewLogo: "/shedr-icon.png",
    logo: "/shedr-icon.png",
    stack: ["React", "Tone.js", "ml5.js + p5.js", "Firebase", "SCSS"],
    links: [
      { label: "Live site", href: "https://shedr.app" },
      { label: "GitHub", href: "https://github.com/LaneGarner/shedr" },
    ],
    availability: [{ label: "Free web app", status: "live" }],
  },
];

export const getCaseStudy = (slug: string): CaseStudy => {
  const found = caseStudies.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown case study: ${slug}`);
  return found;
};
