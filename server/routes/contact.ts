import type { Request, Response, Router } from 'express';
import express from 'express';
import {
  checkContactCooldown,
  contactCooldownMinutes,
  recordContactSubmit,
} from '../lib/contactCooldown.js';
import { formatHourlyLimitMessage, formatWaitMessage } from '../lib/formatWaitMessage.js';
import { checkRateLimit, clientIp } from '../lib/rateLimit.js';
import { parseContactBody } from '../lib/validators.js';
import { isTurnstileConfigured, verifyTurnstileToken } from '../lib/verifyTurnstile.js';
import { submitContactMessage } from '../services/contactService.js';

const MAX_PER_HOUR = Number(process.env.CONTACT_RATE_LIMIT_PER_HOUR ?? 8);
const HOURLY_WINDOW_MS = 60 * 60 * 1000;

function readTurnstileToken(body: unknown): string {
  if (!body || typeof body !== 'object') return '';
  const token = (body as Record<string, unknown>).turnstileToken;
  return typeof token === 'string' ? token.trim() : '';
}

export function contactRouter(): Router {
  const router = express.Router();

  router.post('/contact', async (req: Request, res: Response) => {
    const ip = clientIp(req);

    const parsed = parseContactBody(req.body);
    if (parsed.ok === false) {
      res.status(400).json({ ok: false, error: parsed.error });
      return;
    }

    if (isTurnstileConfigured()) {
      const captcha = await verifyTurnstileToken(readTurnstileToken(req.body), req);
      if (captcha.ok === false) {
        res.status(400).json({ ok: false, error: captcha.error });
        return;
      }
    }

    const cooldown = checkContactCooldown(ip, parsed.data.email);
    if (!cooldown.allowed) {
      res.status(429).json({
        ok: false,
        error: formatWaitMessage(cooldown.retryAfterSec ?? 60),
        retryAfterSec: cooldown.retryAfterSec,
        reason: 'cooldown',
        cooldownMinutes: contactCooldownMinutes(),
      });
      return;
    }

    const hourly = checkRateLimit(`contact:${ip}`, MAX_PER_HOUR, HOURLY_WINDOW_MS);
    if (!hourly.allowed) {
      res.status(429).json({
        ok: false,
        error: formatHourlyLimitMessage(hourly.retryAfterSec ?? HOURLY_WINDOW_MS / 1000),
        retryAfterSec: hourly.retryAfterSec,
        reason: 'hourly',
        maxPerHour: MAX_PER_HOUR,
      });
      return;
    }

    const result = await submitContactMessage(parsed.data, ip);

    if (result.ok === false) {
      res.status(500).json({ ok: false, error: result.error });
      return;
    }

    recordContactSubmit(ip, parsed.data.email);

    res.status(201).json({
      ok: true,
      message: 'Thank you for the message. I will reply asap.',
      id: result.id,
    });
  });

  return router;
}
