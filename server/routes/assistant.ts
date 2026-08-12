import type { Request, Response, Router } from 'express';
import express from 'express';
import { formatHourlyLimitMessage } from '../lib/formatWaitMessage.js';
import { checkRateLimit, clientIp } from '../lib/rateLimit.js';
import { parseAssistantBody } from '../lib/validators.js';
import {
  answerAssistantQuestion,
  isAssistantConfigured,
} from '../services/assistantService.js';

const MAX_PER_HOUR = Number(process.env.ASSISTANT_RATE_LIMIT_PER_HOUR ?? 20);
const HOURLY_WINDOW_MS = 60 * 60 * 1000;

export function assistantRouter(): Router {
  const router = express.Router();

  router.post('/assistant', async (req: Request, res: Response) => {
    if (!isAssistantConfigured()) {
      res.status(503).json({
        ok: false,
        error: 'The assistant is temporarily unavailable.',
        reason: 'not_configured',
      });
      return;
    }

    const parsed = parseAssistantBody(req.body);
    if (parsed.ok === false) {
      res.status(400).json({ ok: false, error: parsed.error });
      return;
    }

    const ip = clientIp(req);
    const hourly = checkRateLimit(`assistant:${ip}`, MAX_PER_HOUR, HOURLY_WINDOW_MS);
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

    const result = await answerAssistantQuestion(
      parsed.data.question,
      parsed.data.history,
    );

    if (result.ok === false) {
      const status =
        result.reason === 'daily_cap'
          ? 429
          : result.reason === 'not_configured'
            ? 503
            : 502;
      res.status(status).json({
        ok: false,
        error: result.error,
        reason: result.reason,
      });
      return;
    }

    res.status(200).json({ ok: true, answer: result.answer });
  });

  return router;
}
