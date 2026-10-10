/** Heart ligature: a single looping line, echoing the heart in the logo's script. */
export const HEART_LOOP_PATH =
  'M32 52C14 40 8 27 13 19C19 11 29 14 32 22C35 14 45 11 51 19C56 27 50 40 32 52ZM32 52C28 58 21 58 21 53C21 49 27 49 32 52Z';

export function HeartLoop({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={HEART_LOOP_PATH} />
    </svg>
  );
}
