# OPEN-QUESTIONS.md: decisions for Lane

Places where the old site gave no answer (or the rebrand forces a call). In
every case the build currently uses the most conservative choice consistent
with the existing design; each is a small, tokenized change.

## Color / theme

1. **Dark-mode secondary greys.** The old dark theme defined bg `#222` and text
   `#f4f4f4` but never specified muted/subtle text or surface greys for dark.
   Current conservative picks (in `app/globals.css` under `.dark`):
   `--ink-soft: #d4d4d4`, `--surface: #2b2b2b`, `--surface-alt: #303030`.
   Adjust to taste.
2. **Accent in dark mode.** `#fcdc00` is kept identical in dark mode (it reads
   fine on `#222`). If you want a softer dark-mode yellow, change `--accent`
   under `.dark` only.
3. **The barely-used SCSS palette** (`$turquoise #7a9c91`, `$brown`, `$red`,
   `$lightgrey #e2e8df`, `$darkgrey #1f1e24`). Only turquoise (link hover) is
   carried over, as `--accent-quiet`. Want any of the others back?

## Typography

4. **Mono stack.** Kept the literal old stack `Courier, "Courier New",
   monospace`. If you want a more refined mono (JetBrains Mono, Commit Mono,
   Berkeley Mono…), change `--font-mono` in `app/globals.css` (and optionally
   add a `next/font` import in `app/layout.tsx`); nothing else needs to move.
5. **Long-form body text.** Case studies are longer than anything on the old
   site; they currently render in the mono stack for consistency. If reading
   comfort wins, define `--font-sans`/serif for case-study prose only.

## Content / IA

6. **Rotating line.** Now reads "I build *[fast]* interfaces and design
   systems" (was "websites and applications"). The adjective list is the old
   one verbatim: fast, responsive, dynamic, modern, efficient, interactive,
   polished. Keep, trim, or reword?
7. ~~**Blog.**~~ **RESOLVED**: the two original posts are migrated verbatim
   to `content/blog/*.md` (images in `public/blog/`), rendered statically at
   `/blog` and `/blog/[slug]` via `marked`; Blog is back in the nav. Note:
   the "Resources" post was unfinished on the old site (empty/malformed
   links preserved as-is), so it is worth an editing pass.
8. **Twitter link.** Old footer had GitHub / LinkedIn / Twitter. Twitter is
   omitted in the rebuild (kept GitHub + LinkedIn). Add back (or Bluesky)?
9. **All case-study copy is a draft** written from the repo READMEs, and every
   page carries a visible "Draft copy" notice component (`<DraftNotice />`).
   Delete the notices as you approve each page.
10. **About-page story details** (why UNT→code, the practice-room analogy) are
    drafted from known facts but the narrative voice is a guess. Edit freely.

## Functionality

11. ~~**Contact form backend.**~~ **RESOLVED**: real submissions via
    Netlify Forms like the old site: hidden form definition in
    `public/__forms.html`, React form POSTs url-encoded data to it
    (Netlify's documented App Router pattern), honeypot instead of
    reCAPTCHA, success routes to `/thank-you`. **Note: the form assumes
    Netlify hosting (like the old site). If deploying to Vercel instead,
    swap to Formspree/Resend (a ~30 min change).**
12. ~~**Resume file.**~~ **RESOLVED**: `public/resume.pdf` is now the real
    resume (nav + home hero link to it).
13. ~~**Profile photo.**~~ **RESOLVED**: `public/profilePic.jpg` (from the
    old site) is on the home hero, circle-cropped via `next/image` like the
    original. Favicon (`public/icon.png`) and the default OpenGraph image
    (`public/og-image.png`) are also wired up in `app/layout.tsx` metadata.
14. **Scroll-snap.** The old site had `scroll-snap-type: y proximity` on the
    homepage. Left out (it fights long pages); easy to re-add to `globals.css`
    scoped to the home sections if you miss it.
15. ~~**Theme toggle affordance.**~~ **RESOLVED**: the logo easter egg is
    implemented exactly like the old site: the laptop logo in the masthead
    toggles dark mode, with a moon cursor in light mode and a sun cursor in
    dark mode. The logo is a real `<button aria-label="Toggle dark mode">`
    with a visible focus ring, so keyboard/screen-reader users get the same
    toggle; the separate nav toggle was removed (old-site behavior).
16. **Screenshots.** garnerguitar and shedr now use the captures carried
    over from the old portfolio (`public/*-screenshot.png`, labeled as
    replaceable); the remaining case studies still have labeled
    `<ScreenshotPlaceholder />` blocks listing exactly which capture goes
    there.
