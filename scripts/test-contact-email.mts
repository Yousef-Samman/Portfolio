/**
 * Full contact-notification path test (no HTTP / no Turnstile).
 * Usage: node --import tsx scripts/test-contact-email.mts
 * Or compile via the server's runtime.
 */
import { config } from 'dotenv';

config({ path: '.env.local', override: true });

const { sendContactNotification, verifyEmailTransport } = await import(
  '../server/lib/sendContactEmail.ts'
);

const verify = await verifyEmailTransport();
console.log('VERIFY', verify.ok ? 'OK' : 'FAIL', verify.provider, verify.detail ?? '');

if (!verify.ok) process.exit(1);

const result = await sendContactNotification(
  {
    name: 'Local Path Test',
    email: 'sender@example.com',
    subject: 'Contact email path test',
    message:
      'Automated test of sendContactNotification after SMTP hardening. Safe to ignore.',
  },
  `local-test-${Date.now()}`,
);

console.log(result.sent ? 'NOTIFY_SEND_OK' : `NOTIFY_SKIPPED:${result.skippedReason ?? 'unknown'}`);
if (!result.sent) process.exit(1);
