# Prompt: Fix credentials line + reduce scroll in Experience section

You're working in the `Yousef-Samman/Portfolio` repo (React 19 + TypeScript + Vite + Tailwind 4). Two tasks, do them in order.

## 1. One-line fix: `credentialsLine` in `src/data/content.ts`

`CONTACT_INFO.credentialsLine` currently reads:

```ts
credentialsLine: 'Fresh Graduate | AI Focus | CCST | KAU',
```

Every other surface (the About paragraph in this same file, the CV, LinkedIn) already says "AI Engineer," not "AI Focus." Update it to:

```ts
credentialsLine: 'Fresh Graduate | AI Engineer | CCST | KAU',
```

Search the rest of the codebase for any other lingering instance of "AI Focus" and update it to "AI Engineer" too, so nothing's left inconsistent.

## 2. Make the Experience section scannable (`src/components/ExperienceSection.tsx`)

Currently all 5 job entries render fully expanded at once — large cards (`p-10` padding on desktop, `space-y-12` between cards), each showing date range, tenure label, tenure bar, company + logo, role, full summary paragraph, and skill chips, all simultaneously visible. Combined with the section's own `mb-24 md:mb-48` margins, this makes the page require a lot of scrolling before reaching Projects.

**Goal: make this section scannable without losing information — reduce vertical scroll length, don't reduce content quality.**

### Preferred approach: collapsed-by-default, expandable entries

Convert each timeline entry into a **compact row by default**, with full detail available on interaction:

- **Always visible (collapsed state):** company logo, company name, role, date range, tenure label, and the tenure bar. This should read as a single compact row/line, not a tall card.
- **Hidden until expanded:** the summary paragraph and the skill chips.
- **Interaction:** clicking/tapping the row (or a clear expand affordance — chevron icon, "+", etc.) reveals the summary + chips inline, pushing content below it down (standard accordion behavior). Clicking again collapses it.
- **Default state:** the most recent 1–2 roles (Store Manager, and optionally Cashier) can default to **expanded** since they're most relevant; everything older defaults to **collapsed**. Use your judgment on the exact cutoff, but don't default all 5 to expanded — that defeats the purpose.
- Multiple entries can be open at once (don't force single-open accordion behavior) — the person may want to compare two roles.

### Constraints

- **Keep all existing data and copy** — every summary, bullet/chip, tenure calculation, and logo stays; you're changing presentation/interaction, not trimming content.
- **Keep the "Total experience (all roles)" summary card at the top** as-is — that's a separate element and already compact.
- **Keep the tenure bar visualization** visible even in the collapsed state — it's useful at-a-glance context.
- **Accessibility:** collapsed/expanded rows must be keyboard-operable (not just onClick with no keyboard handler), use proper `aria-expanded` on the trigger, and respect existing `motion-safe`/`motion-reduce` conventions used elsewhere in the codebase for any expand/collapse animation.
- **Mobile behavior matters most** — this is where the scroll problem is worst (single-column stacking of date range above content). Make sure the collapsed row is genuinely compact on small screens, not just desktop.
- Don't change the section's `id="experience"` (nav scroll-spy depends on it) or remove/reorder any entries.
- Tighten the excess whitespace even in the collapsed state: reduce the `p-10`/`space-y-12`-style padding and inter-card spacing to something tighter, since even collapsed rows shouldn't carry the old card's generous padding.

## After implementing

Run `npm run lint` and `npm run build` to confirm nothing broke. Do a quick self-check: with all 5 entries collapsed, does the Experience section fit in noticeably less vertical space than before? That's the actual success criterion — eyeball it, don't just trust that the code compiles.

## Deliverable

1. Confirmation the `credentialsLine` fix is in and no other "AI Focus" strings remain.
2. Updated `ExperienceSection.tsx` (and any new small subcomponent you extract for the row/accordion item, if that's cleaner than one large file).
3. A one-line summary of the interaction pattern you implemented and the default expanded/collapsed split you chose.
