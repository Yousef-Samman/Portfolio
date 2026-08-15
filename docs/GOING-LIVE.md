# Going live — Vercel + Render

Guide for deploying this portfolio (or a fork of it):

- **Frontend (React/Vite)** → [Vercel](https://vercel.com)
- **API (Express)** → [Render](https://render.com)

Locally, `npm run dev:all` runs both (Vite proxies `/api` to port 3001). In production the site and API are on **different hosts**, so Vercel needs `VITE_API_URL` pointing at your Render API.

Copy `.env.example` → `.env.local` for local development. Never commit `.env.local` or real secrets.

---

## Architecture

```
Visitor → your-site.vercel.app (static React)
              ↓ fetch (VITE_API_URL)
          your-api.onrender.com/api/...
              ↓
          Resend (HTTPS email) + data/contact-messages.jsonl
          Claude Haiku (grounded assistant, if configured)
```

**Email on Render:** outbound Gmail SMTP is blocked. Production email uses **Resend over HTTPS**. Gmail SMTP remains optional for **local** testing only.

---

## Before you start

- [ ] Repo on **GitHub** (no `.env.local` committed)
- [ ] `public/cv/YousefCv.pdf` (or your CV under the name in `CV_FILENAME`) ready to publish
- [ ] CV reviewed for personal email/phone you do not want downloadable
- [ ] [Resend](https://resend.com) account + API key (required for contact email on Render)
- [ ] Cloudflare **Turnstile** widget (Managed or Interactive)
- [ ] Anthropic API key if you want the grounded ChatBot live
- [ ] Optional: custom domain

**Never commit:** `.env.local`, Resend/Anthropic/Turnstile secrets, SMTP passwords, or `data/`.

---

## Step 1 — Push to GitHub

```bash
git status   # confirm .env.local and data/ are NOT listed
git push origin main
```

---

## Step 2 — Deploy the API on Render

1. [render.com](https://render.com) → **New** → **Web Service**
2. Connect the GitHub repo
3. Settings:

   | Field | Value |
   |-------|--------|
   | **Name** | e.g. `your-portfolio-api` |
   | **Region** | Closest to you |
   | **Branch** | `main` |
   | **Runtime** | Node |
   | **Build command** | `npm install` |
   | **Start command** | `npm start` |
   | **Instance type** | Free (or paid for always-on) |

4. **Environment variables** (Render → Environment):

   ```env
   PORT=3001
   APP_URL=https://YOUR-VERCEL-URL.vercel.app
   CORS_ORIGIN=https://YOUR-VERCEL-URL.vercel.app
   CV_FILENAME=YousefCv.pdf

   CONTACT_NOTIFY_EMAIL=your-private-email@example.com
   CONTACT_EMAIL_DAILY_CAP=30
   CONTACT_COOLDOWN_MINUTES=15
   CONTACT_RATE_LIMIT_PER_HOUR=8

   # Required on Render for contact email (SMTP does not work here)
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_EMAIL_FROM=Portfolio Contact <onboarding@resend.dev>

   TURNSTILE_SECRET_KEY=your-turnstile-secret-key

   # Grounded ChatBot (omit if you do not want the assistant live)
   ANTHROPIC_API_KEY=your-anthropic-api-key
   ASSISTANT_RATE_LIMIT_PER_HOUR=20
   ASSISTANT_DAILY_GLOBAL_CAP=100
   ```

   Notes:
   - Set `APP_URL` / `CORS_ORIGIN` after you have the Vercel URL (Step 3), then **Manual Deploy** the API.
   - On Resend’s free tier, `CONTACT_NOTIFY_EMAIL` should be the email you used to sign up (or verify a domain for custom from-addresses).
   - Do **not** rely on `SMTP_*` on Render — the API detects Render and requires Resend.

5. Create the service and wait for deploy.
6. Copy the API URL, e.g. `https://your-portfolio-api.onrender.com`
7. Smoke test: `https://your-portfolio-api.onrender.com/api/health`  
   Expect `"ok": true`. For a full go-live also expect `"turnstile": true`, `"email": true`, and `"assistant": true` when those features are configured.

**Note:** Free Render services **sleep** when idle. The first request after sleep may take 30–60 seconds.

---

## Step 3 — Deploy the frontend on Vercel

1. [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import the same GitHub repo
3. Framework preset: **Vite**

   | Field | Value |
   |-------|--------|
   | **Build command** | `npm run build` |
   | **Output directory** | `dist` |
   | **Install command** | `npm install` |

4. **Environment variables** (Vercel → Settings → Environment Variables):

   ```env
   VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
   VITE_API_URL=https://your-portfolio-api.onrender.com
   ```

   Use your real Render URL. **No trailing slash.**

   Optional:

   ```env
   VITE_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

5. Deploy → copy the site URL, e.g. `https://your-portfolio.vercel.app`
6. Back on **Render**, set `APP_URL` and `CORS_ORIGIN` to that Vercel URL → **Manual Deploy**.

---

## Step 4 — Cloudflare Turnstile domains

In [Cloudflare Turnstile](https://dash.cloudflare.com/) → your widget → **Domains**, add:

- `localhost` (local testing)
- `your-project.vercel.app`
- Your custom domain when you add one

Save. No code change needed if keys are already in env vars.

---

## Step 5 — Point SEO / OG tags at your public URL

Replace the example production URL in these files with **your** live site URL (Vercel or custom domain):

1. `public/sitemap.xml` — every `<loc>`
2. `index.html` — `canonical`, `og:url`, `og:image`, `twitter:image`
3. `public/robots.txt` — `Sitemap:` line (optional but recommended)

`public/og-image.jpg` is already in the repo; you only need the correct absolute domain in those tags. Then redeploy Vercel.

---

## Step 6 — Production test checklist

Open your live Vercel URL and verify:

- [ ] Home loads on **phone** and desktop
- [ ] Nav links work (in-page sections + Projects / Contact routes)
- [ ] **Download CV** works
- [ ] `https://YOUR-API.onrender.com/api/health` returns `ok: true` (and `email` / `turnstile` / `assistant` as expected)
- [ ] Contact form: security check → submit succeeds
- [ ] Email arrives at `CONTACT_NOTIFY_EMAIL`
- [ ] Second message immediately → cooldown message
- [ ] Home **ChatBot** answers a portfolio question (if `ANTHROPIC_API_KEY` is set)
- [ ] Page source has no personal email/phone
- [ ] `https://YOUR-SITE.vercel.app/api/health` does **not** work (API is on Render only)

---

## Step 7 — Custom domain (optional)

### Vercel (site)

1. Project → **Settings** → **Domains**
2. Add domain → follow DNS instructions
3. Wait for SSL

### Render (API) — optional

1. Service → **Settings** → **Custom Domains**
2. e.g. `api.yourdomain.com`

### After custom domain

- Render: `APP_URL`, `CORS_ORIGIN` → `https://yourdomain.com`
- Turnstile: add `yourdomain.com`
- Update `sitemap.xml`, `index.html`, `robots.txt`
- Redeploy both services

---

## Environment variable reference

### Vercel (frontend only)

| Variable | Required | Notes |
|----------|----------|--------|
| `VITE_TURNSTILE_SITE_KEY` | Yes (for captcha) | Public Turnstile site key |
| `VITE_API_URL` | Yes | Render API origin, no trailing slash |
| `VITE_PLAUSIBLE_DOMAIN` | No | Optional analytics |

### Render (API only)

| Variable | Required | Notes |
|----------|----------|--------|
| `PORT` | Yes | Usually `3001` |
| `APP_URL` | Yes | Public site origin |
| `CORS_ORIGIN` | Yes | Same as `APP_URL` (no trailing slash) |
| `TURNSTILE_SECRET_KEY` | Yes (for captcha) | Server-only |
| `CONTACT_NOTIFY_EMAIL` | Yes (for email) | Private inbox |
| `RESEND_API_KEY` | Yes on Render (for email) | HTTPS email — required in production |
| `CONTACT_EMAIL_FROM` | Recommended with Resend | e.g. `Portfolio Contact <onboarding@resend.dev>` |
| `CONTACT_EMAIL_DAILY_CAP` | No | Default `30` |
| `CONTACT_COOLDOWN_MINUTES` | No | Default `15` |
| `CONTACT_RATE_LIMIT_PER_HOUR` | No | Default `8` |
| `CV_FILENAME` | No | Default `YousefCv.pdf` |
| `ANTHROPIC_API_KEY` | Yes if ChatBot ships | Server-only |
| `ASSISTANT_RATE_LIMIT_PER_HOUR` | No | Default `20` |
| `ASSISTANT_DAILY_GLOBAL_CAP` | No | Default `100` |

### Local only (optional)

| Variable | Notes |
|----------|--------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Gmail SMTP for local email tests. **Do not use these as the production path on Render.** |

**Do not** put `RESEND_API_KEY`, `SMTP_PASS`, `TURNSTILE_SECRET_KEY`, or `ANTHROPIC_API_KEY` on Vercel.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| ChatBot unavailable | Set `ANTHROPIC_API_KEY` on Render; health should show `"assistant": true` |
| Contact fails on live site | Check `VITE_API_URL` on Vercel; redeploy after changing env vars |
| CORS error | `CORS_ORIGIN` on Render must match the site origin exactly (https, no trailing slash) |
| Turnstile fails | Add the live domain in Cloudflare; site key on Vercel, secret on Render |
| API slow first time | Free Render waking from sleep — normal |
| Email not sent on Render | Add `RESEND_API_KEY` (+ `CONTACT_EMAIL_FROM`). Gmail SMTP will time out on Render |
| CV 404 | Ensure the PDF is under `public/cv/` and `CV_FILENAME` matches |
| Works locally, not production | Env vars must be set in Vercel/Render dashboards, not only in `.env.local` |

### Known limitations on Render free tier

- **Message log is ephemeral.** Disk is wiped on redeploy / sleep wake, so `data/contact-messages.jsonl` is a convenience log — **email is the source of truth**.
- **In-memory rate limits reset on restart.** Contact and assistant limits live in process memory; sleep/restart resets counters.

### View Render logs

Render → your service → **Logs** → look for `[contact]` / `[assistant]` lines.

---

## Later (optional)

- [ ] Custom domain + professional email / verified Resend domain
- [ ] Upgrade Render for always-on API
- [ ] Admin inbox — see `docs/CONTACT-EMAIL-AND-ADMIN.md`
- [ ] Flip `PROJECTS_SHOWCASE_LIVE` in `src/config/projectsShowcase.ts` when project pages should be public

---

## Local commands

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev:all              # site + API
npm test
npm run lint
npm run build
npm start                    # API only (same entry as Render)
```

- Site: http://localhost:3000  
- API health: http://localhost:3001/api/health  

---

## Order summary

1. Push to GitHub  
2. Render API + env (Resend + Turnstile + optional Anthropic)  
3. Vercel frontend + `VITE_API_URL` + Turnstile site key  
4. Update Render `CORS_ORIGIN` / `APP_URL`  
5. Turnstile domains  
6. Point sitemap / OG tags at your public URL  
7. Production tests  
8. Custom domain (optional)
