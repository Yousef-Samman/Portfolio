# Going live — Option A (Vercel + Render)

Step-by-step checklist to deploy this portfolio:

- **Frontend (React/Vite)** → [Vercel](https://vercel.com)
- **API (Express)** → [Render](https://render.com)

Local dev uses `npm run dev:all` (Vite proxies `/api` to port 3001). In production the site and API are on **different hosts**, so you set `VITE_API_URL` on Vercel to point at Render.

---

## Architecture

```
Visitor → your-site.vercel.app (static React)
              ↓ fetch
          your-api.onrender.com/api/contact
              ↓
          Gmail notification + data/contact-messages.jsonl
```

---

## Before you start

- [ ] Code pushed to **GitHub** (no `.env.local` in the repo)
- [ ] `public/cv/YousefCv.pdf` is the version you want public
- [ ] CV reviewed for personal email/phone you do not want downloadable
- [ ] Gmail **App Password** ready (not your normal Gmail password)
- [ ] Cloudflare **Turnstile** widget created (Managed or Interactive)
- [ ] Optional: custom domain purchased

**Never commit:** `.env.local`, SMTP password, Turnstile secret, or `data/`.

---

## Step 1 — Push to GitHub

```powershell
cd "C:\Users\youse\OneDrive\Desktop\AlienBat\Personal\My-Portfolio\yousef-samman---it-portfolio"

git status
# Confirm .env.local and data/ are NOT listed

git add .
git reset -- "src/assets/Logos/CursorUserSetup-x64-3.5.33.exe"
git commit -m "Prepare for production deployment"
git push origin main
```

Use your actual branch name if not `main`.

---

## Step 2 — Deploy the API on Render

1. Sign in at [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo
3. Settings:

   | Field | Value |
   |-------|--------|
   | **Name** | e.g. `yousef-portfolio-api` |
   | **Region** | Closest to you (e.g. Frankfurt) |
   | **Branch** | `main` |
   | **Runtime** | Node |
   | **Build command** | `npm install` |
   | **Start command** | `npx tsx server/index.ts` |
   | **Instance type** | Free (or paid for always-on) |

4. **Environment variables** (Render dashboard → Environment):

   ```env
   PORT=3001
   APP_URL=https://YOUR-VERCEL-URL.vercel.app
   CORS_ORIGIN=https://YOUR-VERCEL-URL.vercel.app
   CV_FILENAME=YousefCv.pdf

   CONTACT_NOTIFY_EMAIL=your-private-email@gmail.com
   CONTACT_EMAIL_DAILY_CAP=30
   CONTACT_COOLDOWN_MINUTES=15
   CONTACT_RATE_LIMIT_PER_HOUR=8

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-private-email@gmail.com
   SMTP_PASS=your-16-char-app-password

   TURNSTILE_SECRET_KEY=your-turnstile-secret-key
   ```

   Replace `YOUR-VERCEL-URL` after Step 3, then **redeploy** the API (or set a placeholder and update later).

5. Click **Create Web Service** and wait for deploy.

6. Copy your API URL, e.g. `https://yousef-portfolio-api.onrender.com`

7. **Smoke test:**

   ```text
   https://yousef-portfolio-api.onrender.com/api/health
   ```

   Expect JSON with `"ok": true` and `"turnstile": true`.

**Note:** Free Render services **sleep** when idle. The first request after sleep may take 30–60 seconds.

---

## Step 3 — Deploy the frontend on Vercel

1. Sign in at [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import the same GitHub repo
3. Framework preset: **Vite** (auto-detected)

   | Field | Value |
   |-------|--------|
   | **Build command** | `npm run build` |
   | **Output directory** | `dist` |
   | **Install command** | `npm install` |

4. **Environment variables** (Vercel → Settings → Environment Variables):

   ```env
   VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
   VITE_API_URL=https://yousef-portfolio-api.onrender.com
   ```

   Use your real Render URL from Step 2. **No trailing slash.**

   Optional later:

   ```env
   VITE_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

5. Deploy → copy your site URL, e.g. `https://yousef-portfolio.vercel.app`

6. Go back to **Render** → update `APP_URL` and `CORS_ORIGIN` to your Vercel URL → **Manual Deploy** (redeploy API).

---

## Step 4 — Cloudflare Turnstile domains

In [Cloudflare Turnstile](https://dash.cloudflare.com/) → your widget → **Domains**, add:

- `localhost` (for local testing)
- `your-project.vercel.app`
- Your custom domain when you add one (e.g. `yousefsamman.com`)

Save. No code change needed if keys are already in env vars.

---

## Step 5 — Update site files for production URL

After you know your final public URL (Vercel or custom domain), replace **every** `YOUR_DOMAIN_HERE` in:

1. **`public/sitemap.xml`** — `<loc>https://YOUR_DOMAIN_HERE/</loc>`
2. **`index.html`** — `og:url`, `og:image`, `twitter:image`
3. **`public/robots.txt`** (optional) — absolute `Sitemap:` line

`public/og-image.png` is already in the repo; you only need the correct absolute domain in those meta tags.

Then redeploy Vercel (push to GitHub or **Redeploy** in dashboard).

---

## Step 6 — Production test checklist

Open your **live Vercel URL** and verify:

- [ ] Home page loads on **phone** and desktop (no overlapping layout)
- [ ] Nav links scroll to each section
- [ ] **Download CV** works
- [ ] `https://YOUR-API.onrender.com/api/health` returns `ok: true`
- [ ] Contact form: click **Send message** → security check appears → submit succeeds
- [ ] Email arrives at `CONTACT_NOTIFY_EMAIL`
- [ ] Second message immediately → **15-minute cooldown** message
- [ ] View page source → no personal email/phone in HTML
- [ ] `https://YOUR-SITE.vercel.app/api/health` — should **not** work (API is on Render only); form uses `VITE_API_URL` instead

---

## Step 7 — Custom domain (optional)

### Vercel (portfolio)

1. Vercel project → **Settings** → **Domains**
2. Add your domain → follow DNS instructions (CNAME or A record)
3. Wait for SSL (automatic)

### Render (API) — optional

1. Render service → **Settings** → **Custom Domains**
2. e.g. `api.yourdomain.com`

### After custom domain

Update everywhere:

- Vercel: `VITE_API_URL` unchanged if API URL unchanged
- Render: `APP_URL`, `CORS_ORIGIN` → `https://yourdomain.com`
- Turnstile: add `yourdomain.com`
- `public/sitemap.xml`
- `index.html` `og:url` when added

Redeploy both services.

---

## Environment variable reference

### Vercel (frontend only)

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_TURNSTILE_SITE_KEY` | Yes | From Cloudflare Turnstile |
| `VITE_API_URL` | Yes | `https://yousef-portfolio-api.onrender.com` |
| `VITE_PLAUSIBLE_DOMAIN` | No | `yourdomain.com` |

### Render (API only)

| Variable | Required | Example |
|----------|----------|---------|
| `PORT` | Yes | `3001` |
| `APP_URL` | Yes | `https://your-site.vercel.app` |
| `CORS_ORIGIN` | Yes | Same as `APP_URL` |
| `TURNSTILE_SECRET_KEY` | Yes | From Cloudflare |
| `CONTACT_NOTIFY_EMAIL` | Yes | Your private Gmail |
| `SMTP_*` | Yes (Gmail) | See `.env.example` |
| `CONTACT_COOLDOWN_MINUTES` | No | `15` (default) |
| `CONTACT_RATE_LIMIT_PER_HOUR` | No | `8` (default) |
| `CV_FILENAME` | No | `YousefCv.pdf` |

**Do not** put `SMTP_PASS` or `TURNSTILE_SECRET_KEY` on Vercel.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Contact form fails on live site | Check `VITE_API_URL` on Vercel; redeploy after changing env vars |
| CORS error in browser console | Set `CORS_ORIGIN` on Render to exact Vercel URL (https, no trailing slash) |
| Turnstile fails | Add live domain in Cloudflare widget; check site key on Vercel + secret on Render |
| API very slow first time | Free Render woke from sleep — normal |
| Email not sent | Check Render logs; verify SMTP App Password on Render env |
| CV 404 | Ensure `public/cv/YousefCv.pdf` is in the repo and deployed on Render |
| Works locally, not production | Restart not enough — env vars must be set in host dashboards |

### View Render logs

Render dashboard → your service → **Logs** → look for `[contact]` lines.

---

## Later (not required for first go-live)

- [ ] Refine **OG share image** if you want a custom photo/brand treatment
- [ ] **Admin inbox** — `docs/CONTACT-EMAIL-AND-ADMIN.md`
- [ ] Upgrade Render to paid for always-on API
- [ ] Custom domain + professional email

---

## Quick command reference (local)

```bash
npm run dev:all          # local site + API
npm run build            # production frontend build
npm run lint             # TypeScript check
```

Local: http://localhost:3000  
API: http://localhost:3001/api/health  

Local uses `.env.local` (gitignored). Production uses Vercel + Render environment dashboards.

---

## Order summary

1. GitHub push  
2. Render API + env vars  
3. Vercel frontend + `VITE_API_URL` + Turnstile site key  
4. Update Render `CORS_ORIGIN` / `APP_URL` with Vercel URL  
5. Turnstile domains  
6. `sitemap.xml` (+ OG image when ready)  
7. Production tests  
8. Custom domain (optional)
