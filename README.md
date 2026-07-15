# lanegarner.dev portfolio

Lane Garner's portfolio, rebuilt as a Next.js (App Router) app on the
[tutti-ui](https://github.com/LaneGarner/tutti-ui) design system. The design
language is carried over from the previous Gatsby site; see **DESIGN.md** for
exactly what was extracted and how it maps, and **OPEN-QUESTIONS.md** for the
decisions awaiting Lane.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 3
- `@tutti-ui/react` + `@tutti-ui/tokens` + `@tutti-ui/shared` (this site is
  tutti-ui's production consumer)

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

- `app/`: routes for `/` (work listing at `/#work`), `/work/{tutti-ui,rhythm-fit,tribe-tracker,garnerguitar,shedr}`, `/about`, `/contact` (`/work` redirects to `/#work`)
- `components/site/`: site chrome + signature pieces (typing hero, rotating
  word, marker highlight, theme toggle, screenshot placeholders)
- `lib/case-studies.ts`: case-study metadata (draft copy, edit freely)
- `app/globals.css`: **all brand tokens** (light + dark). Retheme here.
- `tailwind.config.ts`: tutti-ui preset + semantic color wiring
- `public/resume.pdf`: placeholder, replace with the real resume
- Every drafted page renders a `<DraftNotice />`; delete it as copy is approved

## Accessibility

Semantic landmarks, skip link, keyboard-navigable everything, visible focus
states (accent outline), `prefers-reduced-motion` honored (typing/rotating
text render statically), screen-reader-stable text behind animated type.
