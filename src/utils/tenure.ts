export function formatTenureFromMonths(monthsRounded: number): string {
  const months = Math.max(1, monthsRounded);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years > 0 && remainingMonths > 0) return `${years} yr ${remainingMonths} mo`;
  if (years > 0) return `${years} yr`;
  return `${remainingMonths} mo`;
}

export function tenureRoundedMonths(
  startISO: string,
  endISO: string | null,
): number {
  const start = new Date(`${startISO}T12:00:00`);
  const end = endISO ? new Date(`${endISO}T12:00:00`) : new Date();
  const days = Math.max(0, (end.getTime() - start.getTime()) / 86400000);
  return Math.max(1, Math.round(days / (365.25 / 12)));
}

export function formatMonthYear(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
