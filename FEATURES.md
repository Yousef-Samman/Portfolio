# Portfolio features

## Implemented

| Feature | How it works |
|---------|----------------|
| **Contact form** | `POST /api/contact` — validation, honeypot, Turnstile CAPTCHA (when configured), **15 min cooldown** (IP + email), **8/hour per IP**, save + email. |
| **CV download** | `GET /api/cv` — serves `public/cv/YousefCv.pdf` when present. |
| **CV status** | `GET /api/cv/status` — UI checks before showing the download button. |
| **Health** | `GET /api/health` — uptime checks when you deploy. |
| **SEO** | Meta description, Open Graph, Twitter card, `robots.txt`, `sitemap.xml` (add `og-image` + domain before go-live). |
| **Favicon** | `public/favicon.svg` |

## Before go-live checklist

**Full deployment guide:** [docs/GOING-LIVE.md](docs/GOING-LIVE.md) (Vercel frontend + Render API)

### Privacy & contact (do not skip)

1. **No personal email or phone on the public site** — they should not appear in `App.tsx`, the header, or the Contact section. Visitors reach you via the **contact form** and **GitHub / LinkedIn** only.
2. **Private inbox stays server-side** — put your real email in **`.env.local` only** (never in React code or git):
   ```env
   CONTACT_NOTIFY_EMAIL=your-private-email@example.com
   ```
   This file is gitignored. Use it when email notifications are enabled.
3. **Review your public CV PDF** — open `public/cv/YousefCv.pdf` and remove or redact personal email/phone if you do not want those downloadable publicly.

### Site & deploy

4. Ensure **`public/cv/YousefCv.pdf`** is present and is the version you want public
5. Replace **`https://YOUR_DOMAIN_HERE/`** in `public/sitemap.xml`
6. Set **`.env.local`**: `APP_URL`, `CONTACT_NOTIFY_EMAIL`, and `CORS_ORIGIN` (production domain) as needed
7. Add **`public/og-image.png`** (1200×630) and `og:image` in `index.html` — do when ready (use your own design or photo)
8. Optional analytics: set `VITE_PLAUSIBLE_DOMAIN` in `.env.local`

## Planned features (detailed specs)

Full design for contact **email notifications** + **admin inbox** (security, env vars, implementation order):

→ **[docs/CONTACT-EMAIL-AND-ADMIN.md](docs/CONTACT-EMAIL-AND-ADMIN.md)**

## Optional next features (not planned)

- Project case-study pages
- Arabic / English toggle

## Run locally

```bash
npm run dev:all
```

Or two terminals: `npm run server` and `npm run dev`.
