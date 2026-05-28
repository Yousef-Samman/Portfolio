# Contact email notifications & admin inbox

Separate spec for **two related features** that work together:

1. **Email notifications** — when someone submits the contact form, you get an email at your private Gmail (server-side only; never shown on the site).
2. **Admin page** — a password-protected page where you can read all stored messages in the browser (backup if email fails, or to review history).

Both use the **same message store**: `data/contact-messages.jsonl` (gitignored).

---

## Current state (already built)

| Piece | Status |
|-------|--------|
| Public contact form (`Get in Touch`) | ✅ Live |
| `POST /api/contact` — validate, honeypot, rate limit | ✅ Live |
| Messages saved to `data/contact-messages.jsonl` | ✅ Live |
| Email actually sent to Gmail | ❌ Not built yet |
| Admin page to list messages | ❌ Not built yet |
| CAPTCHA on form | ❌ Planned |
| Daily email send cap | ❌ Planned (with email feature) |

---

## How the two features work together

```
Visitor submits form
        │
        ▼
POST /api/contact  ──►  Save to data/contact-messages.jsonl  (always)
        │
        ├──►  Send notification email to CONTACT_NOTIFY_EMAIL  (Feature 1)
        │
        └──►  Message visible on /admin after login            (Feature 2)
```

- **Email** = instant alert on your phone/desktop.
- **Admin** = full history, search later, works even if email provider is down.
- Your **Gmail address is never** in React code or HTML — only in `.env.local` on the server.

---

## Feature 1 — Email notifications (Gmail)

### Goal

When a valid contact form is submitted, the API sends **one email** to your private inbox with:

- Visitor name  
- Visitor email (so you can reply manually from Gmail)  
- Subject (if provided)  
- Message body  
- Timestamp + message ID  

### Recommended provider: Resend

Use **Resend** (or similar transactional API), not your Gmail password in code.

| Why Resend | Notes |
|------------|--------|
| Free tier for low volume | Fine for a portfolio |
| API key in `.env` only | Never commit keys |
| Can send **to** your Gmail | `CONTACT_NOTIFY_EMAIL=yousef.m.samman@gmail.com` |
| From address | Use a verified domain, or Resend’s sandbox for testing |

**Alternative:** SMTP (Gmail App Password) — works but less ideal for apps; prefer Resend for production.

### Planned server flow

1. Form passes validation + rate limit + honeypot.  
2. Message saved to JSONL (existing).  
3. If `RESEND_API_KEY` and `CONTACT_NOTIFY_EMAIL` are set → call Resend API.  
4. If email fails → still return success to visitor if save succeeded; log error server-side; message remains in admin/file.

### Planned environment variables

```env
# Your private Gmail — receives notifications only (never public)
CONTACT_NOTIFY_EMAIL=your-private-email@gmail.com

# Resend (get from resend.com → API Keys)
RESEND_API_KEY=re_xxxxxxxx

# "From" address (must be verified in Resend for production)
CONTACT_EMAIL_FROM=portfolio@yourdomain.com

# Safety cap: max notification emails per 24h (prevents inbox flood)
CONTACT_EMAIL_DAILY_CAP=30
```

### Security measures (email feature)

| Threat | Mitigation |
|--------|------------|
| Inbox email bombing | Rate limit (8/hour/IP) + **daily email cap** + CAPTCHA (planned) |
| API quota / cost abuse | Daily cap; only send after successful validation |
| Leaked API key | Keys only in `.env.local`; rotate if exposed |
| Gmail password in repo | **Never** — use Resend API key only |
| Visitor sees your email | **Never** — notify address is server-only |

---

## Feature 2 — Admin page (read messages)

### Goal

A **private** route (e.g. `/admin`) where **you** log in and see all contact submissions: newest first, with name, email, subject, message, date.

### Planned UX

- **Not linked** from the public portfolio (no nav/footer link).  
- You bookmark `https://yourdomain.com/admin` (or `http://localhost:3000/admin` locally).  
- Login screen: password (or username + password).  
- After login: list of messages from `data/contact-messages.jsonl`.  
- Optional later: mark as read, delete, export.

### Planned auth (simple & secure enough for portfolio)

| Method | Detail |
|--------|--------|
| Password | Long random string in `.env`: `ADMIN_PASSWORD` |
| Session | HTTP-only cookie after `POST /api/admin/login` |
| Session secret | `ADMIN_SESSION_SECRET` in `.env` |
| Logout | `POST /api/admin/logout` |

**Optional hardening (production):**

- Cloudflare in front of site  
- Rate limit on login (prevent password guessing)  
- IP allowlist (`ADMIN_ALLOWED_IPS`) if you always check from home  

### Planned API routes

| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| `POST` | `/api/admin/login` | No | Verify password, set session cookie |
| `POST` | `/api/admin/logout` | Session | Clear session |
| `GET` | `/api/admin/messages` | Session | List messages (newest first) |
| `GET` | `/api/admin/session` | Session | Check if still logged in |

Frontend: `src/pages/AdminPage.tsx` (or `src/admin/`) mounted at `/admin` via React Router **or** a minimal separate HTML page served by Express — to be decided at implementation.

### Security measures (admin feature)

| Threat | Mitigation |
|--------|------------|
| Anyone reads messages | Password + session required |
| Brute-force password | Rate limit login attempts (e.g. 5 / 15 min / IP) |
| Session hijacking | HTTPS in production; `httpOnly` + `secure` cookies |
| XSS stealing session | Admin UI minimal; no user HTML rendered as HTML |
| Public discovery | No links to `/admin` on portfolio |
| Leaked messages file | `data/` gitignored; server file permissions restricted on VPS |

---

## Shared security (contact form — already + planned)

### Already in place

- **Rate limit:** 8 submissions per IP per hour (`CONTACT_RATE_LIMIT_PER_HOUR`)  
- **Honeypot:** hidden `website` field — bots rejected  
- **Validation:** name, email format, message length  
- **Body size limit:** 32 KB JSON on Express  
- **No public email/phone** on the website  

### Planned before go-live

- **Cloudflare** (or similar) — DDoS / bad traffic in front of server  
- **Turnstile or hCaptcha** on contact form — blocks most bots  
- **HTTPS** — required for secure admin cookies  
- **Tighter production rate limit** — e.g. 5/hour/IP  

### DDoS vs email abuse (reminder)

- **DDoS** floods your **server** — Cloudflare + hosting help.  
- **Email abuse** floods your **inbox** — only if Feature 1 is on; stopped by rate limit + daily cap + CAPTCHA.  
- **Admin-only** does not connect to Gmail; **email feature** does, but only on the server via API key.

---

## Privacy rules (do not break)

1. **Never** put `CONTACT_NOTIFY_EMAIL` or Gmail password in `App.tsx`, git, or client bundle.  
2. **Never** show your personal email or phone in header, footer, or contact UI.  
3. **Review `public/cv/YousefCv.pdf`** — redact email/phone there if you do not want them downloadable.  
4. Visitor emails in admin are **their** data — protect admin with a strong password; use HTTPS when live.

---

## Implementation order (when building)

| Step | Task |
|------|------|
| 1 | Add Turnstile/CAPTCHA to contact form + verify on server |
| 2 | Implement Resend in `server/lib/sendContactEmail.ts` + daily cap |
| 3 | Wire email send in `POST /api/contact` after save |
| 4 | Add `server/routes/admin.ts` — login, session, list messages |
| 5 | Add `src/pages/AdminPage.tsx` + route `/admin` |
| 6 | Update `.env.example` with all new vars |
| 7 | Test locally: form → file + email + admin list |
| 8 | Production: Cloudflare, HTTPS, strong `ADMIN_PASSWORD` |

---

## Environment variables (full list for both features)

Copy to `.env.local` (never commit):

```env
# --- Existing ---
PORT=3001
APP_URL=http://localhost:3000
CONTACT_RATE_LIMIT_PER_HOUR=8

# --- Feature 1: Email ---
CONTACT_NOTIFY_EMAIL=your-private-email@gmail.com
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL_FROM=onboarding@resend.dev
CONTACT_EMAIL_DAILY_CAP=30

# --- Feature 2: Admin ---
ADMIN_PASSWORD=use-a-long-random-string-here
ADMIN_SESSION_SECRET=another-long-random-string-here
# ADMIN_ALLOWED_IPS=optional.comma,separated.ips

# --- Optional CAPTCHA (when implemented) ---
# TURNSTILE_SECRET_KEY=...
# VITE_TURNSTILE_SITE_KEY=...
```

---

## Testing checklist

### Email (Feature 1)

- [ ] Submit form → email arrives at Gmail  
- [ ] Invalid form → no email sent  
- [ ] Over rate limit → 429, no email  
- [ ] Over daily cap → save still works, email skipped + logged  
- [ ] Missing `RESEND_API_KEY` → save works, no crash  

### Admin (Feature 2)

- [ ] `/admin` without login → login screen only  
- [ ] Wrong password → error, no messages  
- [ ] Correct password → message list loads  
- [ ] Logout → cannot access messages  
- [ ] New form submit → appears in admin after refresh  

---

## Related files (today)

| File | Role |
|------|------|
| `src/components/ContactSection.tsx` | Public form |
| `server/routes/contact.ts` | POST handler |
| `server/lib/contactStore.ts` | Append to JSONL |
| `server/lib/rateLimit.ts` | IP rate limit |
| `server/lib/validators.ts` | Input validation |
| `data/contact-messages.jsonl` | Message store (created at runtime) |

## Related files (to add when implementing)

| File | Role |
|------|------|
| `server/lib/sendContactEmail.ts` | Resend integration |
| `server/lib/adminSession.ts` | Cookie session helpers |
| `server/routes/admin.ts` | Login + list API |
| `src/pages/AdminPage.tsx` | Admin UI |

---

## Summary

| Question | Answer |
|----------|--------|
| Will Gmail appear on the website? | **No** |
| Does the server need your Gmail? | **Only** as `CONTACT_NOTIFY_EMAIL` in `.env` for notifications |
| Can I use admin without email? | Yes — but you want **both** |
| Can I use email without admin? | Yes — but admin is a useful backup |
| Biggest risks | Form spam, email flood, weak admin password |
| Biggest protections | Rate limit, CAPTCHA, daily email cap, strong admin password, Cloudflare, HTTPS |

When ready to build, start with **Step 1** in the implementation order above.
