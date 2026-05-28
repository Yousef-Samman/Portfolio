const lastSubmitAt = new Map<string, number>();

function cooldownMs(): number {
  const minutes = Number(process.env.CONTACT_COOLDOWN_MINUTES ?? 15);
  return Math.max(1, minutes) * 60 * 1000;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function recordContactSubmit(clientIp: string, email: string): void {
  const now = Date.now();
  lastSubmitAt.set(`ip:${clientIp}`, now);
  lastSubmitAt.set(`email:${normalizeEmail(email)}`, now);
}

export function checkContactCooldown(
  clientIp: string,
  email: string,
): { allowed: boolean; retryAfterSec?: number; blockedBy?: 'ip' | 'email' } {
  const windowMs = cooldownMs();
  const now = Date.now();

  const keys: Array<{ key: string; blockedBy: 'ip' | 'email' }> = [
    { key: `ip:${clientIp}`, blockedBy: 'ip' },
    { key: `email:${normalizeEmail(email)}`, blockedBy: 'email' },
  ];

  let maxWaitSec = 0;
  let blockedBy: 'ip' | 'email' | undefined;

  for (const { key, blockedBy: kind } of keys) {
    const last = lastSubmitAt.get(key);
    if (!last) continue;
    const remaining = last + windowMs - now;
    if (remaining > 0) {
      const waitSec = Math.ceil(remaining / 1000);
      if (waitSec > maxWaitSec) {
        maxWaitSec = waitSec;
        blockedBy = kind;
      }
    }
  }

  if (maxWaitSec > 0) {
    return { allowed: false, retryAfterSec: maxWaitSec, blockedBy };
  }

  return { allowed: true };
}

export function contactCooldownMinutes(): number {
  return Number(process.env.CONTACT_COOLDOWN_MINUTES ?? 15);
}
