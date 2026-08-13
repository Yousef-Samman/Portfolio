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

type SmtpAttempt = {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
};

function smtpAttempts(): SmtpAttempt[] {
  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const configuredPort = Number(process.env.SMTP_PORT ?? 587);
  const forceSecure = process.env.SMTP_SECURE === 'true';

  const primary: SmtpAttempt = {
    host,
    port: configuredPort,
    secure: forceSecure || configuredPort === 465,
    requireTLS: !forceSecure && configuredPort === 587,
  };

  // Gmail on some hosts (incl. Render) can block/flake on 587 — fall back to 465.
  const fallback: SmtpAttempt | null =
    host.includes('gmail.com') && configuredPort === 587
      ? { host, port: 465, secure: true, requireTLS: false }
      : null;

  return fallback ? [primary, fallback] : [primary];
}

type NodemailerModule = {
  createTransport: (options: Record<string, unknown>) => {
    sendMail: (mail: Record<string, unknown>) => Promise<unknown>;
    verify: () => Promise<unknown>;
  };
};

function createSmtpTransport(
  nodemailer: NodemailerModule,
  attempt: SmtpAttempt,
  auth: { user: string; pass: string },
  timeouts: {
    connectionTimeout: number;
    greetingTimeout: number;
    socketTimeout: number;
  },
) {
  return nodemailer.createTransport({
    host: attempt.host,
    port: attempt.port,
    secure: attempt.secure,
    requireTLS: attempt.requireTLS,
    auth,
    // Render has no working IPv6 egress — Gmail AAAA records cause ENETUNREACH.
    family: 4,
    connectionTimeout: timeouts.connectionTimeout,
    greetingTimeout: timeouts.greetingTimeout,
    socketTimeout: timeouts.socketTimeout,
    tls: {
      minVersion: 'TLSv1.2',
    },
  });
}

async function sendViaSmtp(
  to: string,
  payload: ContactPayload,
  messageId: string,
): Promise<void> {
  const user = process.env.SMTP_USER?.trim();
  // Gmail app passwords are often pasted with spaces — strip them.
  const pass = process.env.SMTP_PASS?.trim()?.replace(/\s+/g, '');
  if (!user || !pass) throw new Error('SMTP_USER or SMTP_PASS not set');

  const nodemailer = await import('nodemailer');
  const from =
    process.env.CONTACT_EMAIL_FROM?.trim() || `"Portfolio" <${user}>`;
  const { subjectLine, html, text } = buildEmailContent(payload, messageId);
  const attempts = smtpAttempts();

  let lastError: unknown;

  for (const attempt of attempts) {
    try {
      const transport = createSmtpTransport(
        nodemailer,
        attempt,
        { user, pass },
        {
          connectionTimeout: 25_000,
          greetingTimeout: 25_000,
          socketTimeout: 40_000,
        },
      );

      await transport.sendMail({
        from,
        to,
        replyTo: payload.email,
        subject: subjectLine,
        html,
        text,
      });

      if (attempt.port !== Number(process.env.SMTP_PORT ?? 587)) {
        console.warn(
          `[contact-email] SMTP succeeded on fallback port ${attempt.port}`,
        );
      }
      return;
    } catch (err) {
      lastError = err;
      const code =
        err && typeof err === 'object' && 'code' in err
          ? String((err as { code?: string }).code ?? '')
          : '';
      console.error(
        `[contact-email] SMTP failed on ${attempt.host}:${attempt.port} (${code || 'no-code'})`,
      );
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('SMTP send failed on all attempts');
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

/** Non-throwing boot check — logs whether SMTP accepts auth (no email sent). */
export async function verifyEmailTransport(): Promise<{
  ok: boolean;
  provider: 'resend' | 'smtp' | 'none';
  detail?: string;
}> {
  if (!isEmailConfigured()) {
    return { ok: false, provider: 'none', detail: 'not configured' };
  }

  if (process.env.RESEND_API_KEY?.trim()) {
    return { ok: true, provider: 'resend', detail: 'api key present' };
  }

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim()?.replace(/\s+/g, '');
  if (!user || !pass) {
    return { ok: false, provider: 'smtp', detail: 'missing credentials' };
  }

  const nodemailer = await import('nodemailer');
  const attempts = smtpAttempts();

  for (const attempt of attempts) {
    try {
      const transport = createSmtpTransport(
        nodemailer,
        attempt,
        { user, pass },
        {
          connectionTimeout: 15_000,
          greetingTimeout: 15_000,
          socketTimeout: 20_000,
        },
      );
      await transport.verify();
      return {
        ok: true,
        provider: 'smtp',
        detail: `verified ${attempt.host}:${attempt.port} (ipv4)`,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(
        `[contact-email] verify failed ${attempt.host}:${attempt.port}:`,
        message,
      );
    }
  }

  return { ok: false, provider: 'smtp', detail: 'verify failed on all ports' };
}
