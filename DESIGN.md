# DESIGN.md: Design language extracted from lanegarner.dev (Gatsby, ~2022)

This document records everything extracted from the current live site
(https://lanegarner.dev/; source: github.com/LaneGarner/new-portfolio) and how
each piece maps into this rebuild. **Lane is the designer; this rebuild evolves
his existing language, it does not replace it.** Anything the old site did not
answer is listed in OPEN-QUESTIONS.md rather than invented.

## Source material

- Live pages fetched: `/`, `/portfolio`, `/blog`, `/contact`
- Full source inspected: `src/styles/index.scss`, `Hero.jsx`, `IBuild.jsx`,
  `Transition.jsx`, `Header.jsx`, `footer.jsx`, `ThemeContext.jsx`, etc.

## 1. Color (verbatim from `src/styles/index.scss`)

CSS custom properties on `:root`:

| Old token            | Value     | Usage on old site                                  |
| -------------------- | --------- | -------------------------------------------------- |
| `--black`            | `#000000` | headings, sub-footer bar background                 |
| `--white`            | `#ffffff` | page background (light)                             |
| `--darkest-grey`     | `#222`    | dark chrome: nav (dark mode), hero CTA chip bg      |
| `--darker-grey`      | `#272727` | footer background                                   |
| `--dark-grey`        | `#333`    | body links, active nav item                         |
| `--light-grey`       | `#666`    | nav hover                                           |
| `--lighter-grey`     | `#999`    | idle nav items                                      |
| `--lightest-grey`    | `#f4f4f4` | dark-mode text, light surfaces                      |
| `--lightest-grey-alt`| `#fafafa` | alt surface                                         |
| `--js-yellow`        | `#fcdc00` | **the signature accent**: `::selection` highlight, skewed highlight bar behind the header title, footer link hover, CTA link color, bulb/brush icons |
| `--react-blue`       | `#60dbfb` | hero CTA chip text, link `text-decoration-color`    |

SCSS variables (used sparingly):

| Old token    | Value     | Usage                        |
| ------------ | --------- | ---------------------------- |
| `$turquoise` | `#7a9c91` | link `:hover`/`:active` color |
| `$lightgrey` | `#e2e8df` | (declared, barely used)      |
| `$darkgrey`  | `#1f1e24` | (declared, barely used)      |
| `$brown`     | `#7f6d58` | (declared, barely used)      |
| `$red`       | `#bb2b11` | (declared, barely used)      |

Also a set of tech-brand icon colors (`--node-green`, `--sass-pink`, etc.) used
for playful per-icon footer hovers, carried over conceptually as "accent on
hover," not as literal tokens.

**Verdict: the palette is monochrome (white/black/greys) + electric yellow
`#fcdc00` as the single loud accent, with `#60dbfb` (react-blue) and `#7a9c91`
(muted turquoise) as quiet supporting colors. No indigo, no gradients.**

### Mapping in this rebuild (see `app/globals.css` + `tailwind.config.ts`)

Semantic CSS variables, exposed to Tailwind as `paper`, `ink`, `ink-soft`,
`ink-muted`, `ink-subtle`, `surface`, `surface-alt`, `chrome`, `chrome-deep`,
`accent`, `accent-cool`, `accent-quiet`. Retheming = edit the variables in
`globals.css`; nothing is hardcoded in components.

Dark mode: the old site *had* a dark theme (system-following + manual toggle,
persisted to localStorage) that flipped white↔darkest-grey and used
`--lightest-grey` text. This rebuild keeps exactly that: `.dark` sets
`--paper: #222`, `--ink: #f4f4f4`, same accents. Two dark-mode greys had no
old-site answer and were chosen conservatively; both are flagged in
OPEN-QUESTIONS.md.

## 2. Typography

- **Monospace everywhere it counts**: `Courier, "Courier New", monospace` on
  headers, hero, nav, footer, section titles. This is the site's voice.
- Base html font was Gatsby's default `georgia, serif` at 112.5%/1.45, but all
  visible personality came from the Courier stack.
- Hero "Hello.": 5rem, weight 800, line-height 1.1.
- Intro line: 1.62671rem, weight 100 ("thin body large type").
- "I build …" section: 5em, centered, the rotating word *italic*.
- Header title 2rem; nav items 1.06em grey (`#999` idle → `#666` hover →
  `#333`/light-grey active).

Rebuild: `--font-mono: Courier, "Courier New", monospace` wired through
Tailwind `fontFamily.mono` and applied as the body font. Swapping to a nicer
mono (e.g. a variable mono webfont) is a one-line change; see OPEN-QUESTIONS.

## 3. Layout personality / signature moves

Carried over faithfully:

1. **Centered masthead**: logo above a two-line title ("Lane Garner" / role
   subtitle) with a **skewed yellow highlight bar** (`skewY(0.5deg)`,
   `--js-yellow`, sits behind the text like a marker stroke).
2. **Sticky nav** under the masthead: centered row of grey monospace links,
   active item darkened. White bg light / `#222` dark.
3. **Hero**: circular profile photo (375px, `border-radius: 50%`) on the left;
   right side has an animated typing **"Hello."** (react-typing-effect on the
   old site), the "I'm Lane Garner, …based in Austin, Texas" intro, and a
   **dark CTA chip** (`#222` bg, react-blue text, yellow link).
4. **"I build [rotating word] …"**: giant centered type; the adjective rotates
   every 1.6s through `fast / responsive / dynamic / modern / efficient /
   interactive / polished` (react-text-transition, spring "up"), italic.
5. **Yellow `::selection`** across the whole site.
6. **Dark footer**: `#272727` bg, GitHub/LinkedIn/Twitter icon+label links that
   glow yellow (and playful per-link brand colors) on hover; a black sub-bar
   with the copyright + "Built with …" line.
7. Cards with generous radius (`--border-radius: 3rem` on old portfolio cards)
   and a soft shadow (`0 8px 16px rgba(0,0,0,0.2)`).
8. Musician-inspired framing in copy: "my background as a musician inspires
   creativity throughout the development process."

Evolved (positioning only, not aesthetics):

- Role line: "front-end developer" → **design engineer** (Home). Lane is
  targeting senior design engineer roles, not freelance clients.
- "Need a dev? Get in touch" freelance pitch → current-work CTA chip pointing
  at /work (same visual treatment: dark chip, blue text, yellow link).
- "websites and applications" → "interfaces and design systems" in the
  rotating-type section (flagged in OPEN-QUESTIONS for Lane's call).
- Old `/portfolio` → `/work` with real case studies; Blog dropped for now
  (flagged in OPEN-QUESTIONS).

## 4. Motion

- Typing effect on "Hello." (type + erase loop on the old site; rebuilt as a
  type-once effect with a blinking caret).
- Rotating word (1.6s interval, slide-up spring; rebuilt with CSS transitions).
- Footer/link hovers: `transition: all 0.2s ease-in`.
- Old site used `scroll-snap-type: y proximity`, intentionally **not** carried
  over (fights with normal scrolling on long case-study pages); noted in
  OPEN-QUESTIONS.
- **All animation is gated behind `prefers-reduced-motion`** in the rebuild:
  typing renders the full string, the rotating word renders a static word, CSS
  transitions collapse.

## 5. tutti-ui integration

- `tailwind.config.ts` applies `tuttiPreset` from `@tutti-ui/react/tailwind`,
  then layers the site tokens (CSS variables) on top. tutti components keep
  their neutral gray/blue scales; site chrome uses the semantic tokens.
- `darkMode: "class"` per tutti-ui's documented setup; the site ThemeProvider
  (wrapping `@tutti-ui/shared`'s `ThemeProvider`) syncs the `.dark` class,
  follows the system, persists manual choice to localStorage. That is the
  exact behavior of the old Gatsby `ThemeContext`.
