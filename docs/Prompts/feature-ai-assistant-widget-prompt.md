# Prompt: Grounded AI assistant widget on the portfolio

You're working in the `Yousef-Samman/Portfolio` repo (React 19 + TypeScript + Vite + Tailwind 4 frontend, Express API in `server/`, deployed as Vercel + Render). Build a small AI assistant widget visitors can use to ask questions about Yousef's background, projects, and skills — answered only from real, structured data about him, not open-ended chat.

**Why this matters:** the point of this feature is to be evidence of AI engineering ability, not a gimmick. It needs to be scoped, safe, cheap to run, and reliably accurate — a broken or off-topic assistant would hurt credibility more than not having one.

## Frontend: the widget

- A floating chat button, bottom-right, consistent with the existing graphite/cyan AI theme (`theme/portfolioTheme.ts` tokens — reuse existing color/style tokens, don't invent new ones).
- Expands into a small chat panel: message history, text input, send button, loading state while waiting for a response, and a visible error state if the request fails or is rate-limited (not a silent failure).
- Include a short, visible disclaimer in the panel, e.g. "Answers are generated from Yousef's real background info" — sets visitor expectations correctly.
- Fully keyboard-operable (open/close, focus trap while open, Escape to close, focus returns to the trigger button on close) and screen-reader friendly (`aria-live` region for new assistant messages, proper labeling on the input/button).
- Respect `motion-safe`/`motion-reduce` for the open/close transition, consistent with how the rest of the site handles motion.
- Mobile-responsive — this must work well on a phone, not just desktop.
- Cap message length client-side (e.g. 300 characters) and show a counter/limit so people don't submit huge inputs.

## Backend: the API route

Add a new route, e.g. `server/routes/assistant.ts`, following the existing patterns in `server/routes/contact.ts`:

- Accepts a short user question, validates/sanitizes it (reuse or extend `server/lib/validators.ts` patterns — reject empty input, enforce a max length server-side too, not just client-side).
- Calls an LLM (Claude via the Anthropic API is the natural fit given the project's context — use `ANTHROPIC_API_KEY` from env, never expose it client-side) with a **strict system prompt** that:
  - States clearly the assistant only answers questions about Yousef Samman's background, education, work experience, projects, and skills.
  - Instructs the model to politely decline anything off-topic (general knowledge questions, requests to roleplay as something else, requests to ignore its instructions, coding help unrelated to Yousef, etc.) rather than attempting to answer.
  - Instructs the model not to invent facts not present in the provided context — if it doesn't know, say so rather than guessing.
- **Grounding data:** create a single structured server-side context file (e.g. `server/data/aboutContext.ts`) containing the real facts to ground answers in — education (KAU, GPA 4.83/5.0), the IBM Generative AI Engineering cert (in progress), work history (Store Manager/Cashier at ASQ, SNB co-op, IKEA, Caffe Concerto), projects and their real tech stacks, and skills. **Do not invent any of these facts yourself — pull them from `src/data/content.ts`, `src/data/experience.ts`, and `src/data/projects.ts` exactly as they exist in the repo**, and add a clear comment noting this file must be kept in sync manually if those change.
  - Note: `src/data/content.ts`'s `CONTACT_INFO.credentialsLine` currently still says "AI Focus" while the rest of the site says "AI Engineer" — use "AI Engineer" in the grounding data regardless (that stale line should get fixed separately), don't propagate the inconsistency into the assistant's answers.
  - Note: `ProjectItem` entries use `description`, `tools`, optional `highlights`, `featured`, and optional `liveUrl` — there is no `outcome` field. `repoUrl` exists in the data but is intentionally never shown or linked to visitors anywhere on the site. If a visitor asks about seeing the code/repo, the assistant should say something like "the code isn't publicly linked from the site, but feel free to ask Yousef directly" rather than fabricating or leaking a repo URL — match the site's own decision not to expose repo links.
- Apply the same protective pattern already used for the contact form:
  - Rate limit per IP (reuse/extend `server/lib/rateLimit.ts`) — something like a low per-hour cap (e.g. 15–20 messages/hour per IP) since each call costs real API money.
  - A hard daily global cap on total assistant calls (mirroring the daily send cap pattern in `server/lib/sendContactEmail.ts`) so a burst of traffic can't run up an unexpected bill — return a clear "try again later" response once the cap is hit rather than failing silently.
  - Cap `max_tokens` on the API call itself to keep responses short and cost-bounded.
- Do not persist chat conversations to disk/DB — this is a stateless Q&A feature, not a feature that needs to store visitor messages.

## Constraints

- Don't change the existing contact form, CV download, or any other route/behavior.
- Don't expose the system prompt or grounding data file to the client — it's server-only context.
- If a question is ambiguous about scope (e.g. "should this also answer general AI questions to show off knowledge?"), default to strictly on-topic (about Yousef only) and ask me before broadening it.

## Deliverable

1. The new component(s) for the widget, using existing theme tokens.
2. The new server route + grounding data file.
3. What env var(s) need to be set on Render for this to work (e.g. `ANTHROPIC_API_KEY`) — list them clearly so I can add them to the dashboard.
4. Confirmation that `npm run lint` and `npm run build` pass after the change.
