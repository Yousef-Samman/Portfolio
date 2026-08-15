# Portfolio features

## Implemented

| Feature | How it works |
|---------|----------------|
| **Grounded ChatBot** | `POST /api/assistant` — Claude Haiku (`claude-haiku-4-5-20251001`), system prompt + `server/data/aboutContext.ts`, **20/hour per IP**, **100/day global**, **503** without `ANTHROPIC_API_KEY`. |
| **Contact form** | `POST /api/contact` — validation, honeypot, Turnstile CAPTCHA (when configured), **15 min cooldown** (IP + email), **8/hour per IP**, save + email. |
| **CV download** | `GET /api/cv` — serves `public/cv/YousefCv.pdf` when present. |
| **CV status** | `GET /api/cv/status` — UI checks before showing the download button. |
| **Health** | `GET /api/health` — uptime checks when you deploy. |
| **SEO** | Meta description, Open Graph (`og:url` / `og:image`), Twitter card, `robots.txt`, `sitemap.xml`. |
| **Social preview** | `public/og-image.jpg` — wired in `index.html`. |
| **Favicon** | `public/favicon.svg` |
| **Theme** | Dark AI portfolio theme (`AiBackdrop`, `ModelBootOverlay`, `portfolio-ai`). |

## Before go-live checklist

**Full deployment guide:** [GOING-LIVE.md](./GOING-LIVE.md) (Vercel frontend + Render API)

### Privacy & contact (do not skip)

1. **No personal email or phone on the public site** — they should not appear in React components. Visitors reach you via the **contact form** and **GitHub / LinkedIn** only.
2. **Private inbox stays server-side** — put your real email in **`.env.local` only** (never in React code or git):
   ```env
   CONTACT_NOTIFY_EMAIL=your-private-email@example.com
   ```
   This file is gitignored. Use it when email notifications are enabled.
3. **Review your public CV PDF** — open `public/cv/YousefCv.pdf` and remove or redact personal email/phone if you do not want those downloadable publicly.

### Site & deploy

4. Ensure **`public/cv/YousefCv.pdf`** is present and is the version you want public
5. Confirm production URLs in `public/sitemap.xml`, `index.html` (`og:url` / `og:image` / `twitter:image`), and optionally `public/robots.txt`
6. Set **`.env.local`**: `APP_URL`, `CONTACT_NOTIFY_EMAIL`, Turnstile + Resend/SMTP as needed
7. On Vercel set `VITE_API_URL` + `VITE_TURNSTILE_SITE_KEY`; on Render set API secrets + `CORS_ORIGIN`
8. Optional analytics: set `VITE_PLAUSIBLE_DOMAIN` in `.env.local` / Vercel

## Planned features (detailed specs)

Full design for contact **email notifications** + **admin inbox** (security, env vars, implementation order):

→ **[CONTACT-EMAIL-AND-ADMIN.md](./CONTACT-EMAIL-AND-ADMIN.md)**

## Optional next features (not planned)

- Project case-study pages (specced under `docs/Prompts/`, not built)
- Arabic / English toggle

## Run locally

```bash
npm run dev:all
```

Or two terminals: `npm run server` and `npm run dev`.
