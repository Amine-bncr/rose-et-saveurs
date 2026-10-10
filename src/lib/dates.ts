import { SITE } from '../data/site';

/** Today's date (YYYY-MM-DD) in the shop's time zone. */
export function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: SITE.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

export function addDaysISO(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
}

export function minEventDate(): string {
  return addDaysISO(todayISO(), SITE.eventLeadDays);
}

/** Returns an error message, or null when the date is acceptable. */
export function validateDate(value: string, min: string, minMessage: string): string | null {
  if (!value) return 'Please choose a date.';
  if (value < min) return minMessage;
  return null;
}
