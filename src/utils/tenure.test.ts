import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  formatMonthYear,
  formatTenureFromMonths,
  tenureRoundedMonths,
} from './tenure.js';

describe('formatTenureFromMonths', () => {
  it('formats months-only tenure', () => {
    expect(formatTenureFromMonths(1)).toBe('1 mo');
    expect(formatTenureFromMonths(11)).toBe('11 mo');
  });

  it('formats whole years', () => {
    expect(formatTenureFromMonths(12)).toBe('1 yr');
    expect(formatTenureFromMonths(24)).toBe('2 yr');
  });

  it('formats years with remaining months', () => {
    expect(formatTenureFromMonths(13)).toBe('1 yr 1 mo');
    expect(formatTenureFromMonths(26)).toBe('2 yr 2 mo');
  });

  it('clamps non-positive input up to 1 month', () => {
    expect(formatTenureFromMonths(0)).toBe('1 mo');
    expect(formatTenureFromMonths(-3)).toBe('1 mo');
  });
});

describe('tenureRoundedMonths', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-14T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 1 for a same-month / same-day range', () => {
    expect(tenureRoundedMonths('2024-06-15', '2024-06-15')).toBe(1);
  });

  it('rounds a multi-month closed range', () => {
    // ~6 calendar months ≈ 183 days → rounds near 6
    expect(tenureRoundedMonths('2024-01-01', '2024-07-01')).toBe(6);
  });

  it('handles a year-boundary closed range', () => {
    // Dec 15 2023 → Jan 15 2024 ≈ 31 days → ~1 month
    expect(tenureRoundedMonths('2023-12-15', '2024-01-15')).toBe(1);
  });

  it('uses "now" for an ongoing role (null end)', () => {
    // Jan 14 2025 → Aug 14 2026 ≈ 19 months
    expect(tenureRoundedMonths('2025-01-14', null)).toBe(19);
  });
});

describe('formatMonthYear', () => {
  it('formats ISO month starts as short month + year', () => {
    expect(formatMonthYear('2024-01-01')).toBe('Jan 2024');
    expect(formatMonthYear('2023-12-01')).toBe('Dec 2023');
  });
});
