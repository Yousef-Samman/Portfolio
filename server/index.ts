/**
 * Portfolio API — contact form, CV download, grounded assistant, health check.
 */
import { config as loadEnv } from 'dotenv';

loadEnv();
loadEnv({ path: '.env.local', override: true });
import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { securityHeaders } from './middleware/securityHeaders.js';
import { assistantRouter } from './routes/assistant.js';
import { contactRouter } from './routes/contact.js';
import { cvRouter } from './routes/cv.js';
import { contactCooldownMinutes } from './lib/contactCooldown.js';
import { isEmailConfigured } from './lib/sendContactEmail.js';
import { isAssistantConfigured } from './services/assistantService.js';
import { isTurnstileConfigured } from './lib/verifyTurnstile.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

// Needed on Render / reverse proxies so rate limits see the real client IP
app.set('trust proxy', 1);

app.use(express.json({ limit: '32kb' }));
app.use(securityHeaders);
app.use(corsMiddleware);

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'yousef-samman-portfolio-api',
    time: new Date().toISOString(),
    turnstile: isTurnstileConfigured(),
    email: isEmailConfigured(),
    assistant: isAssistantConfigured(),
  });
});

app.use('/api', cvRouter());
app.use('/api', contactRouter());
app.use('/api', assistantRouter());

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

  const assistantHourly = process.env.ASSISTANT_RATE_LIMIT_PER_HOUR ?? '20';
  const assistantDaily = process.env.ASSISTANT_DAILY_GLOBAL_CAP ?? '100';
  if (isAssistantConfigured()) {
    console.log(
      `[assistant] Enabled — ${assistantHourly}/hour per IP, ${assistantDaily}/day global`,
    );
  } else {
    console.warn(
      '[assistant] Disabled — set ANTHROPIC_API_KEY in .env.local (or Render env) to enable',
    );
  }
});
