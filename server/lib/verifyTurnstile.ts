import { clientIp } from './rateLimit.js';
import type { Request } from 'express';

type TurnstileVerifyResponse = {
  success?: boolean;
  'error-codes'?: string[];
};

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyTurnstileToken(
  token: string,
  req: Request,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    console.warn('[turnstile] TURNSTILE_SECRET_KEY missing — contact form is not protected');
    return { ok: true };
  }

  if (!token) {
    return {
      ok: false,
      error: 'Complete the security check before sending your message.',
    };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: clientIp(req),
  });

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    console.error('[turnstile] verify HTTP error', res.status);
    return { ok: false, error: 'Security check failed. Please try again.' };
  }

  const data = (await res.json()) as TurnstileVerifyResponse;
  if (data.success) {
    return { ok: true };
  }

  console.warn('[turnstile] rejected:', data['error-codes']?.join(', ') ?? 'unknown');
  return { ok: false, error: 'Security check failed. Please try again.' };
}
