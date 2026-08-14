import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkRateLimit } from './rateLimit.js';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows exactly maxRequests and blocks the next call', () => {
    const key = 'rl:exact-cap';
    const maxRequests = 3;
    const windowMs = 60_000;

    expect(checkRateLimit(key, maxRequests, windowMs)).toEqual({ allowed: true });
    expect(checkRateLimit(key, maxRequests, windowMs)).toEqual({ allowed: true });
    expect(checkRateLimit(key, maxRequests, windowMs)).toEqual({ allowed: true });

    const blocked = checkRateLimit(key, maxRequests, windowMs);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBe(60);
  });

  it('returns a sensible retryAfterSec while blocked', () => {
    const key = 'rl:retry-after';
    const maxRequests = 1;
    const windowMs = 10_000;

    expect(checkRateLimit(key, maxRequests, windowMs).allowed).toBe(true);

    vi.advanceTimersByTime(3_500);
    const blocked = checkRateLimit(key, maxRequests, windowMs);
    expect(blocked).toEqual({ allowed: false, retryAfterSec: 7 });
  });

  it('resets the bucket after the window expires', () => {
    const key = 'rl:window-reset';
    const maxRequests = 1;
    const windowMs = 5_000;

    expect(checkRateLimit(key, maxRequests, windowMs).allowed).toBe(true);
    expect(checkRateLimit(key, maxRequests, windowMs).allowed).toBe(false);

    vi.advanceTimersByTime(windowMs);
    expect(checkRateLimit(key, maxRequests, windowMs)).toEqual({ allowed: true });
  });

  it('keeps independent buckets for separate keys', () => {
    const maxRequests = 1;
    const windowMs = 60_000;

    expect(checkRateLimit('rl:key-a', maxRequests, windowMs).allowed).toBe(true);
    expect(checkRateLimit('rl:key-a', maxRequests, windowMs).allowed).toBe(false);
    expect(checkRateLimit('rl:key-b', maxRequests, windowMs).allowed).toBe(true);
  });
});
