/**
 * Portfolio API — contact form, CV download, health check.
 */
import { config as loadEnv } from 'dotenv';

loadEnv();
loadEnv({ path: '.env.local', override: true });
import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { contactRouter } from './routes/contact.js';
import { cvRouter } from './routes/cv.js';
import { contactCooldownMinutes } from './lib/contactCooldown.js';
import { isEmailConfigured } from './lib/sendContactEmail.js';
import { isTurnstileConfigured } from './lib/verifyTurnstile.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(express.json({ limit: '32kb' }));
app.use(corsMiddleware);

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'yousef-samman-portfolio-api',
    time: new Date().toISOString(),
    turnstile: isTurnstileConfigured(),
  });
});

app.use('/api', cvRouter());
app.use('/api', contactRouter());

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio API: http://localhost:${PORT}/api/health`);
  if (isEmailConfigured()) {
    console.log('[contact] Email notifications: enabled');
  } else {
    console.warn(
      '[contact] Email notifications: disabled — set CONTACT_NOTIFY_EMAIL + SMTP or Resend in .env.local',
    );
  }

  const maxPerHour = process.env.CONTACT_RATE_LIMIT_PER_HOUR ?? '8';
  console.log(
    `[contact] Rate limits: ${contactCooldownMinutes()} min cooldown (IP + email), ${maxPerHour}/hour per IP`,
  );

  if (isTurnstileConfigured()) {
    console.log('[contact] Turnstile CAPTCHA: enabled');
  } else {
    console.warn(
      '[contact] Turnstile CAPTCHA: disabled — set TURNSTILE_SECRET_KEY + VITE_TURNSTILE_SITE_KEY before go-live',
    );
  }
});
