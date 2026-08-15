# Yousef Samman — Portfolio

A grounded Claude assistant on a React + Express portfolio — context-anchored answers about background, projects, and skills, with prompt-injection guards and cost controls.

**Live:** [https://portfolio-peach-kappa-zftmxyoyax.vercel.app/](https://portfolio-peach-kappa-zftmxyoyax.vercel.app/)

![Portfolio home](docs/img/hero.png)

## The grounded AI assistant

![Assistant answering a portfolio question](docs/img/assistant.png)

Visitors ask about education, experience, projects, and skills. Answers come only from a server-side structured context file (`server/data/aboutContext.ts`) injected into a strict system prompt — not from open web search or a general chat personality.

**Model:** `claude-haiku-4-5-20251001` via the Anthropic SDK, with `max_tokens` capped at 500. Haiku is the right fit here: short factual answers over a small fixed corpus, where latency and cost matter more than long-form generation.

**Grounding:** This is **context-injection grounding, not RAG**. The corpus is small, fixed, and fully known (identity, education, roles, projects, skills). Retrieving chunks would add complexity without improving accuracy for this shape of data. The model is instructed to refuse inventing facts and to decline off-topic, roleplay, jailbreaks, and instruction-override attempts.

**Containment backstops:** Prompt rules alone are probabilistic. A deterministic `stripAssistantMarkdown` pass removes bold/italics/links/headings so the chat UI stays plain text even if the model drifts.

**Cost and abuse control:**
- Per-IP hourly limit (`ASSISTANT_RATE_LIMIT_PER_HOUR`, default **20**) — stops one visitor from burning the quota.
- Global daily cap (`ASSISTANT_DAILY_GLOBAL_CAP`, default **100**) — stops a burst of traffic (or many IPs) from running up an unexpected Anthropic bill.

**Without `ANTHROPIC_API_KEY`:** the API returns **503** (`not_configured`) and the UI shows the assistant as unavailable — the rest of the site still works.

Endpoint: `POST /api/assistant` (validated body + optional multi-turn `history`).

### ChatBot workflow (Mermaid)

Paste either diagram into [mermaid.live](https://mermaid.live) to present or export.

**1 — Request path (end-to-end)**

```mermaid
sequenceDiagram
  autonumber
  actor Visitor
  participant UI as AssistantSection (React)
  participant API as POST /api/assistant
  participant Val as parseAssistantBody
  participant RL as rateLimit (per-IP hourly)
  participant Svc as assistantService
  participant Cap as rateLimit (global daily)
  participant LLM as Claude Haiku
  participant Strip as stripAssistantMarkdown

  Visitor->>UI: Ask portfolio question
  UI->>API: question + optional history
  API->>API: ANTHROPIC_API_KEY set?
  alt not configured
    API-->>UI: 503 not_configured
  end
  API->>Val: Validate length + history
  alt invalid
    API-->>UI: 400
  end
  API->>RL: Check IP hourly cap (default 20)
  alt over hourly
    API-->>UI: 429 hourly
  end
  API->>Svc: answerAssistantQuestion
  Svc->>Cap: Check global daily cap (default 100)
  alt over daily
    Svc-->>API: 429 daily_cap
    API-->>UI: 429
  end
  Svc->>LLM: system prompt + aboutContext + messages
  LLM-->>Svc: Model text
  Svc->>Strip: Remove markdown drift
  Strip-->>Svc: Plain-text answer
  Svc-->>API: ok + answer
  API-->>UI: 200
  UI-->>Visitor: Grounded reply
```

**2 — Grounding and containment layers**

```mermaid
flowchart TB
  Q[Visitor question] --> Gate{Configured + valid + under limits?}
  Gate -->|No| Err[429 / 400 / 503]
  Gate -->|Yes| Prompt[System prompt: portfolio-only first person]
  Prompt --> Ctx[aboutContext.ts facts injected]
  Ctx --> Model["claude-haiku-4-5-20251001 max_tokens 500"]
  Model --> Rules{On-topic and in grounding?}
  Rules -->|No| Decline[Decline / say unknown / Get In Touch]
  Rules -->|Yes| Raw[Model text]
  Raw --> Strip[Deterministic markdown strip]
  Strip --> Out[Plain-text answer to UI]

  subgraph Grounding choice
    RAG[RAG over chunks]
    Inj[Context injection]
  end
  Inj -.->|chosen: small fixed corpus| Ctx
  RAG -.->|not used| Ctx
```

## Architecture

```
routes/  →  services/  →  lib/
```

Handlers stay thin. Business logic lives in services. Pure helpers (validation, rate limits, cooldown, email transport) live in `lib/`.

Assistant results use a discriminated union:

| `reason` | HTTP |
|----------|------|
| `hourly` / `daily_cap` | **429** |
| `not_configured` | **503** |
| `upstream` | **502** |

Contact form defense is layered on purpose:

1. **Honeypot** (`website`) — catches naive bots before any expensive work  
2. **Cooldown** (IP + email) — spaces out repeat humans  
3. **Per-IP hourly rate limit** — caps sustained abuse  
4. **Turnstile** — challenges automated clients when configured  

Four mechanisms because each fails differently; none is enough alone.

**Known boundary:** rate-limit and cooldown state are in-process `Map`s — correct for a single API instance; a multi-instance deploy would need a shared store. Not fixed here by design.

Folder detail: [docs/CODEBASE_STRUCTURE.md](docs/CODEBASE_STRUCTURE.md).

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS 4, React Router |
| Backend | Node.js, Express 4, tsx |
| AI / LLM | Anthropic SDK — `claude-haiku-4-5-20251001` |
| Email | Resend (HTTPS; required on Render) or Nodemailer SMTP (local) |
| CAPTCHA | Cloudflare Turnstile (optional) |
| Tests | Vitest |

## Features

| Feature | How it works |
|---------|----------------|
| **Grounded ChatBot** | `POST /api/assistant` — Haiku + system prompt + `aboutContext`; 20/hour per IP; 100/day global; 503 without API key |
| **Contact form** | `POST /api/contact` — validation, honeypot, Turnstile (when set), 15 min cooldown (IP + email), 8/hour per IP, JSONL save + email |
| **CV download** | `GET /api/cv` / `GET /api/cv/status` |
| **Health** | `GET /api/health` |
| **Portfolio UI** | Home sections, projects routes, contact page, dark AI theme |
| **SEO** | Meta, Open Graph, Twitter card, `robots.txt`, `sitemap.xml` |

Full checklist and privacy notes: [docs/FEATURES.md](docs/FEATURES.md).

## Run locally

```bash
git clone https://github.com/Yousef-Samman/Portfolio.git
cd Portfolio
npm install
cp .env.example .env.local
npm run dev:all
```

- Site: http://localhost:3000  
- API: http://localhost:3001 (`/api/health`)

**Required for full assistant:** `ANTHROPIC_API_KEY`  
**Required for contact email on Render:** `RESEND_API_KEY` + `CONTACT_NOTIFY_EMAIL`  
**Optional:** Turnstile keys, SMTP (local), `VITE_PLAUSIBLE_DOMAIN`, production `VITE_API_URL` / `CORS_ORIGIN`

Without those keys, the site still runs; assistant and/or email degrade gracefully (503 / skip notify).

```bash
npm test
npm run lint
npm run build
```

## Built with an AI-assisted workflow

Features were specified before implementation. Specs live in [docs/Prompts/](docs/Prompts/) — see [docs/Prompts/README.md](docs/Prompts/README.md) for the workflow and which prompts shipped vs stayed unbuilt (case-study template and learning tracker are **specced, not on the live site**).

Mine: the route / service / lib split, discriminated-union API results, the two-tier assistant rate limits (per-IP + global daily), the cooldown-resolver bug found by tests and fixed so enforcement and reported wait agree, plus integration and review of generated code.

## Tests

Vitest covers pure boundary logic:

- `validators` — contact + assistant body limits, honeypot, history caps  
- `rateLimit` — exact max, retry-after, window reset, key isolation  
- `contactCooldown` — IP/email expiry, unified minutes resolver  
- `tenure` — formatting and ongoing-role edge cases  

```bash
npm test
```

Example: the suite caught `contactCooldownMinutes()` disagreeing with enforcement when `CONTACT_COOLDOWN_MINUTES` was `0`; both now share one clamped resolver.

## Deployment

Step-by-step: [docs/GOING-LIVE.md](docs/GOING-LIVE.md) (Vercel frontend + Render API).

Render blocks outbound Gmail SMTP. The email layer detects Render hosts and prefers **Resend over HTTPS**; local dev can still use SMTP when Resend is unset.

## License

[MIT](LICENSE) © Yousef Samman
