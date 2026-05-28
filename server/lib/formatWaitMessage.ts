export function formatWaitMessage(retryAfterSec: number): string {
  const seconds = Math.max(1, retryAfterSec);
  if (seconds < 90) {
    return 'Please wait about a minute before sending another message.';
  }
  const minutes = Math.ceil(seconds / 60);
  if (minutes === 1) {
    return 'Please wait 1 minute before sending another message.';
  }
  return `Please wait ${minutes} minutes before sending another message.`;
}

export function formatHourlyLimitMessage(retryAfterSec: number): string {
  const minutes = Math.max(1, Math.ceil(retryAfterSec / 60));
  if (minutes < 60) {
    return `Too many messages this hour. Please try again in about ${minutes} minute${minutes === 1 ? '' : 's'}.`;
  }
  const hours = Math.ceil(minutes / 60);
  return `Too many messages this hour. Please try again in about ${hours} hour${hours === 1 ? '' : 's'}.`;
}
