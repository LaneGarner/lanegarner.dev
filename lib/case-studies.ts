export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  role: string;
  stack: string[];
  links: { label: string; href: string }[];
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
    ],  },
  {
    slug: "rhythm-fit",
    title: "Rhythm Fit",
    tagline: "Offline-first workout tracker with a streaming AI coach",
    summary:
      "A React Native app built for real gym conditions: every mutation lands locally first, syncs when a connection returns, and works with no backend at all. The AI coach streams NDJSON; accessibility is WCAG 2.2 AA.",
    role: "Solo design + engineering, app and backend",
    previewLogo: "/rhythm-fit-icon.svg",
    logo: "/rhythm-fit-icon.svg",
    stack: [
      "React Native + Expo",
      "TypeScript",
      "Redux Toolkit",
      "NativeWind",
      "Node.js + Express",
      "Supabase",
      "OpenAI (streaming)",
    ],
    links: [{ label: "GitHub", href: "https://github.com/LaneGarner/rhythm" }],  },
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
    ],  },
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
    ],  },
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
    ],  },
];

export const getCaseStudy = (slug: string): CaseStudy => {
  const found = caseStudies.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown case study: ${slug}`);
  return found;
};
