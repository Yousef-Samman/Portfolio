# Prompts

Pre-implementation specifications for portfolio features, kept here as a record of how each piece of work was scoped before coding started.

## How they were used

Each prompt defines requirements, constraints, and acceptance criteria up front. Implementation then proceeds against that spec with AI assistance; the result is reviewed, integrated into the existing codebase, and verified (`npm run lint`, `npm run build`, plus any feature-specific checks called out in the prompt).

The prompts are the planning artifact for a pass — not the only input, and not a claim that either the prompt or the shipped code was used unedited. Deliverables in each file usually include the code change, a short confirmation note, and a green lint/build check.

## What they pin down

Across these specs, the same kinds of boundaries show up repeatedly:

- **Accessibility** — e.g. focus trap while the assistant panel is open, Escape to close, `aria-live` for new messages, `aria-expanded` on Experience accordion triggers, and `motion-safe` / `motion-reduce` for open/close or expand animations.
- **Dual validation** — e.g. assistant message length capped client-side (~300 characters with a visible counter) and enforced again server-side in validators, matching the contact-form pattern.
- **Follow existing structure** — e.g. add `server/routes/assistant.ts` by following `server/routes/contact.ts`; check `src/pages/` routing before inventing a case-study route shape; extend `ProjectItem` rather than inventing an incompatible type.
- **Reuse theme tokens** — graphite/cyan palette and type scale from `theme/portfolioTheme.ts`, not a one-off visual system per feature.
- **Rate limits and cost caps** — e.g. per-IP assistant rate limits via `rateLimit.ts`, a hard daily global call cap, and bounded `max_tokens` so traffic cannot silently inflate API cost.

Honesty constraints also recur: do not invent facts for grounding data, learning progress, or case-study placeholder copy; ask for real values when the feature depends on them.

## Index

This folder records how work was scoped — including specs that were written and deliberately not pursued.

| File | Covers | Status |
| --- | --- | --- |
| [feature-ai-assistant-widget-prompt.md](./feature-ai-assistant-widget-prompt.md) | Grounded portfolio Q&A widget: frontend chat UI, Express route, server-only grounding context, rate/cost limits. | Shipped |
| [feature-case-study-template-prompt.md](./feature-case-study-template-prompt.md) | Reusable technical case-study page template with typed placeholder data; not visitor-linked until filled. | Specced (not built) |
| [feature-currently-learning-tracker-prompt.md](./feature-currently-learning-tracker-prompt.md) | Compact “currently learning” progress element driven by a single updatable data file (real values only). | Specced (not built) |
| [fix-credentials-and-experience-section-prompt.md](./fix-credentials-and-experience-section-prompt.md) | Credentials line consistency (“AI Engineer”) plus scannable, expandable Experience timeline rows. | Shipped |
