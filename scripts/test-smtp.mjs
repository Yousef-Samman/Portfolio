/**
 * Local SMTP smoke test — prints only OK/FAIL codes, never secrets.
 * Usage: node scripts/test-smtp.mjs
 */
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config({ path: '.env.local', override: true });

const user = process.env.SMTP_USER?.trim();
const pass = process.env.SMTP_PASS?.trim()?.replace(/\s/g, '');
const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT ?? 587);
const to = process.env.CONTACT_NOTIFY_EMAIL?.trim();

if (!user || !pass) {
  console.error('SMTP_MISSING_ENV');
  process.exit(1);
}
if (!to) {
  console.error('NOTIFY_MISSING');
  process.exit(1);
}

const transport = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  requireTLS: port === 587,
  auth: { user, pass },
  connectionTimeout: 20_000,
  greetingTimeout: 20_000,
  socketTimeout: 30_000,
});

function scrub(message) {
  return String(message)
    .replaceAll(user, '[user]')
    .replaceAll(pass, '[pass]');
}

try {
  await transport.verify();
  console.log('SMTP_VERIFY_OK');

  await transport.sendMail({
    from: `"Portfolio Test" <${user}>`,
    to,
    subject: `Portfolio contact email test ${new Date().toISOString()}`,
    text: 'This is an automated SMTP connectivity test from the portfolio API setup.',
  });
  console.log('SMTP_SEND_OK');
} catch (err) {
  const code = err?.code || err?.responseCode || '';
  console.error('SMTP_FAIL');
  console.error(`code=${code}`);
  console.error(`message=${scrub(err?.message || err)}`);
  process.exit(1);
}
