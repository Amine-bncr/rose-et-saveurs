import { formatPrice } from '../lib/format';

/** A price in DA, or a small "Price soon" tag while it is null. */
export function Price({ price, className = '' }: { price: number | null; className?: string }) {
  if (price === null) {
    return <span className={`label inline-flex items-center whitespace-nowrap rounded-full border border-hairline/60 px-3 py-1 text-fg-muted ${className}`}>Price soon</span>;
  }
  return <span className={`font-display text-lg ${className}`}>{formatPrice(price)}</span>;
}
