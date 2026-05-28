import type { ContactPayload } from './validators.js';
import { checkRateLimit } from './rateLimit.js';

const DAILY_CAP = Number(process.env.CONTACT_EMAIL_DAILY_CAP ?? 30);
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailContent(payload: ContactPayload, messageId: string) {
  const subjectLine =
    payload.subject?.trim() ||
    `Portfolio contact from ${payload.name}`;

  const html = `
    <h2>New portfolio message</h2>
    <p><strong>From:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Reply-to:</strong> ${escapeHtml(payload.email)}</p>
    ${payload.subject ? `<p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>` : ''}
    <p><strong>Message ID:</strong> ${escapeHtml(messageId)}</p>
    <hr />
    <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
  `.trim();

  const text = [
    'New portfolio message',
    `From: ${payload.name}`,
    `Reply-to: ${payload.email}`,
    payload.subject ? `Subject: ${payload.subject}` : '',
    `Message ID: ${messageId}`,
    '',
    payload.message,
  ]
    .filter(Boolean)
    .join('\n');

  return { subjectLine, html, text };
}

async function sendViaResend(
  to: string,
  payload: ContactPayload,
  messageId: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY not set');

  const from =
    process.env.CONTACT_EMAIL_FROM?.trim() || 'Portfolio <onboarding@resend.dev>';
  const { subjectLine, html, text } = buildEmailContent(payload, messageId);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: subjectLine,
      html,
      text,
      reply_to: payload.email,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend API ${res.status}: ${body}`);
  }
}

async function sendViaSmtp(
  to: string,
  payload: ContactPayload,
  messageId: string,
): Promise<void> {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!user || !pass) throw new Error('SMTP_USER or SMTP_PASS not set');

  const nodemailer = await import('nodemailer');
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });

  const from =
    process.env.CONTACT_EMAIL_FROM?.trim() || `"Portfolio" <${user}>`;
  const { subjectLine, html, text } = buildEmailContent(payload, messageId);

  await transport.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: subjectLine,
    html,
    text,
  });
}

/** Sends notification to CONTACT_NOTIFY_EMAIL. Throws on provider errors. */
export async function sendContactNotification(
  payload: ContactPayload,
  messageId: string,
): Promise<{ sent: boolean; skippedReason?: string }> {
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim();
  if (!to) {
    return { sent: false, skippedReason: 'CONTACT_NOTIFY_EMAIL not set' };
  }

  const daily = checkRateLimit('email:daily:global', DAILY_CAP, DAILY_WINDOW_MS);
  if (!daily.allowed) {
    return { sent: false, skippedReason: 'daily email cap reached' };
  }

  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  const hasSmtp = Boolean(
    process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim(),
  );

  if (!hasResend && !hasSmtp) {
    return {
      sent: false,
      skippedReason: 'Configure RESEND_API_KEY or SMTP_USER + SMTP_PASS',
    };
  }

  if (hasResend) {
    await sendViaResend(to, payload, messageId);
  } else {
    await sendViaSmtp(to, payload, messageId);
  }

  return { sent: true };
}

export function isEmailConfigured(): boolean {
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim();
  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  const hasSmtp = Boolean(
    process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim(),
  );
  return Boolean(to && (hasResend || hasSmtp));
}
