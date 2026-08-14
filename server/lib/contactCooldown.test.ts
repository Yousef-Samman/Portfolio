import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  checkContactCooldown,
  contactCooldownMinutes,
  recordContactSubmit,
} from './contactCooldown.js';

describe('contactCooldown', () => {
  const previousCooldown = process.env.CONTACT_COOLDOWN_MINUTES;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    process.env.CONTACT_COOLDOWN_MINUTES = '15';
  });

  afterEach(() => {
    vi.useRealTimers();
    if (previousCooldown === undefined) {
      delete process.env.CONTACT_COOLDOWN_MINUTES;
    } else {
      process.env.CONTACT_COOLDOWN_MINUTES = previousCooldown;
    }
  });

  it('allows the first submit for a fresh ip/email pair', () => {
    expect(checkContactCooldown('10.0.0.1', 'first@example.com')).toEqual({
      allowed: true,
    });
  });

  it('blocks a repeat submit for the same ip within the cooldown window', () => {
    recordContactSubmit('10.0.0.2', 'ip-block@example.com');

    const blocked = checkContactCooldown('10.0.0.2', 'other@example.com');
    expect(blocked.allowed).toBe(false);
    expect(blocked.blockedBy).toBe('ip');
    expect(blocked.retryAfterSec).toBe(15 * 60);
  });

  it('blocks a repeat submit for the same email within the cooldown window', () => {
    recordContactSubmit('10.0.0.3', 'email-block@example.com');

    const blocked = checkContactCooldown('10.0.0.99', 'Email-Block@example.com');
    expect(blocked.allowed).toBe(false);
    expect(blocked.blockedBy).toBe('email');
    expect(blocked.retryAfterSec).toBe(15 * 60);
  });

  it('returns a decreasing retryAfterSec as time advances', () => {
    recordContactSubmit('10.0.0.4', 'retry@example.com');

    vi.advanceTimersByTime(90_000);
    const blocked = checkContactCooldown('10.0.0.4', 'retry@example.com');
    expect(blocked).toEqual({
      allowed: false,
      retryAfterSec: 15 * 60 - 90,
      blockedBy: 'ip',
    });
  });
  it('allows submit again after the cooldown window expires', () => {
    recordContactSubmit('10.0.0.5', 'expire@example.com');
    expect(checkContactCooldown('10.0.0.5', 'expire@example.com').allowed).toBe(false);

    vi.advanceTimersByTime(15 * 60 * 1000);
    expect(checkContactCooldown('10.0.0.5', 'expire@example.com')).toEqual({
      allowed: true,
    });
  });

  it('uses independent cooldowns for unrelated ips and emails', () => {
    recordContactSubmit('10.0.0.6', 'alice@example.com');

    expect(checkContactCooldown('10.0.0.7', 'bob@example.com')).toEqual({
      allowed: true,
    });
  });

  it('clamps non-positive config to 1 minute for both reporting and enforcement', () => {
    process.env.CONTACT_COOLDOWN_MINUTES = '0';
    expect(contactCooldownMinutes()).toBe(1);

    recordContactSubmit('10.0.0.8', 'clamp@example.com');
    const blocked = checkContactCooldown('10.0.0.8', 'clamp@example.com');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBe(60);
  });

  it('falls back to the default when CONTACT_COOLDOWN_MINUTES is NaN', () => {
    process.env.CONTACT_COOLDOWN_MINUTES = 'not-a-number';
    expect(contactCooldownMinutes()).toBe(15);

    recordContactSubmit('10.0.0.9', 'nan@example.com');
    const blocked = checkContactCooldown('10.0.0.9', 'nan@example.com');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBe(15 * 60);
  });
});
