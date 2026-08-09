# Prompt: "Currently learning" progress tracker

You're working in the `Yousef-Samman/Portfolio` repo (React 19 + TypeScript + Vite + Tailwind 4). Add a small, honest, easy-to-update element showing real, current progress in Yousef's IBM Generative AI Engineering Professional Certificate (Coursera) — concrete and specific, not a static "in progress" label.

**Why this matters:** with limited formal AI experience, showing active, current, verifiable effort is more credible than a single finished project or a vague "currently learning AI" claim. This only has value if the content is true and kept up to date — it is not a decorative feature.

## Before writing any code: ask me for the current, real state

**Do not guess or invent this.** Before building anything, ask me for:
- The current course name/number within the IBM Generative AI Engineering track (e.g. "Course 3 of 16 — Introduction to RAG").
- Roughly what percentage/fraction complete, if known.
- Whether there's a public credential/progress URL worth linking (e.g. a Coursera certificate-in-progress page), or whether to skip the link.

Do not proceed to implementation until you have this from me — placeholder/fabricated progress would defeat the entire purpose of the feature.

## Component design

- A small component (e.g. `src/components/CurrentlyLearning.tsx`). For placement: `HeroSection.tsx` was recently simplified — the old "Graduation project" block inside the hero card was removed (Projects section now handles featuring that project itself), leaving the hero card as just the About paragraph + CV download button. That freed-up space in the hero card is a strong candidate for this element, or alternatively just below the hero section, before Experience. Use your judgment on whichever reads cleaner once you see it in place, but the hero card's newly open structure is worth trying first.
- Content driven by a single small data file (e.g. `src/data/learning.ts`) with a typed shape like: program name, provider, current course/module, optional progress fraction or percentage, optional link, and a last-updated date.
- Display should be compact — a label like "Currently learning" or "In progress," the specific course/topic, and (if provided) a simple progress indicator (a thin progress bar or "3 of 16" style text — keep it simple, don't over-design this).
- Include the **last-updated date** somewhere in the data/rendering (even if small/muted text) so it's clear this is a maintained, current signal rather than a stale one-time claim.
- Style consistent with existing theme tokens (`theme/portfolioTheme.ts`) — same palette, same type scale as the rest of the site.
- Keep it accessible (proper semantic markup, sufficient contrast) and responsive.

## Constraints

- Don't fabricate any progress numbers, course names, or dates — everything in `src/data/learning.ts` must come from what I tell you.
- Don't overbuild this — it's meant to be a small, low-maintenance element that's easy to update by editing one data file whenever progress changes, not a complex tracking system.
- Don't change existing page structure/section order beyond inserting this one new element.

## Deliverable

1. The new component and data file, populated with the real values I give you.
2. A one-line note on exactly which file I need to edit (and which fields) the next time progress updates, so updating this in the future is trivial.
3. Confirmation that `npm run lint` and `npm run build` pass.
