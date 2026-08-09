# Prompt: Reusable technical case-study page template

You're working in the `Yousef-Samman/Portfolio` repo (React 19 + TypeScript + Vite + Tailwind 4). Build a **reusable case-study page template** for showcasing a flagship AI project in real technical depth — not a project card, a dedicated page.

**Important context:** there is no finished flagship project to write about yet — Yousef is early in building a new project that will eventually fill this template. Your job in this pass is to build the reusable structure/template with clearly marked placeholder content, **not** to invent or fabricate details about a project that doesn't exist yet. Do not publish this page as visitor-reachable content until told to — see "Constraints" below.

## What the page should contain (structure, not final copy)

Design a page (e.g. a new route like `/projects/:slug`, or a static route if simpler given the current router setup — check how routing currently works in `src/pages/` before deciding) with clearly separated sections:

1. **Header:** project title, one-line description, tech stack tags, and (if applicable when filled in later) a live demo link — no repo link, consistent with the rest of the site's "no GitHub links visible to visitors" decision.
2. **Problem/context:** what problem the project solves and why it exists.
3. **Architecture:** space for a diagram (image or embedded SVG) plus explanatory text describing the system's structure/data flow.
4. **Key design decisions:** a small number of specific choices made and the reasoning behind them (this is the section that actually demonstrates engineering judgment — structure it so it's easy to fill with 2–4 concrete decisions, not vague statements).
5. **A real challenge + how it was solved:** one concrete technical problem encountered and the approach taken to solve it. Structure this as its own clearly labeled section since it's the strongest credibility signal on the page.
6. **Outcome/results:** what the finished (or current) state demonstrates.
7. **Tech stack recap:** a clean, labeled list/tag row of the technologies used, similar to how tech tags render elsewhere in the Projects section.

## Data-driven, not hardcoded

- Create a structured data file (e.g. `src/data/caseStudy.ts`) with a typed shape matching the sections above, so filling in a real project later is a matter of editing data, not rebuilding the page.
- For consistency, base the shared fields (title, category, description, tools, `liveUrl`) on the existing `ProjectItem` type in `src/types/portfolio.ts` rather than inventing a parallel/incompatible shape — extend it with the case-study-specific sections (architecture, key decisions, challenge/solution, outcome) rather than duplicating what already exists.
- Populate it with **obviously-marked placeholder content** (e.g. `"[PLACEHOLDER — architecture description goes here]"`) rather than invented specifics about any project — do not write fake technical details, fake challenges, or fake outcomes to make the placeholder "look real." Placeholder text should read as clearly unfinished, not as real content.
- Note for later (not this pass): once a real project fills this template, the natural entry point is a "Read full case study →" link from that project's card in `ProjectsSection.tsx` — likely the `featured` project specifically, since that's the card that already gets extra visual weight. Don't wire this up now; just keep the data shape compatible so it's a small change later, not a rebuild.

## Constraints

- **Do not link to this page from the live Projects grid or navigation yet.** Build the route/component/data file so it exists and can be previewed directly, but don't wire it into anything a visitor would stumble onto — this avoids shipping a visibly unfinished page to real visitors. Ask me before making it publicly linked.
- Keep styling consistent with the existing theme tokens (`theme/portfolioTheme.ts`) — graphite/cyan palette, existing type scale, existing spacing conventions. Don't introduce a new visual style for this one page.
- Keep accessibility parity with the rest of the site (proper heading hierarchy, alt text placeholders for the architecture diagram image, motion-safe/reduce handling for any animation).
- Responsive — this needs to work on mobile as well as desktop.

## Deliverable

1. The new page/route component and the structured data file with placeholder content.
2. A short note confirming the page is built but not yet linked anywhere visitor-reachable.
3. Confirmation that `npm run lint` and `npm run build` pass.
