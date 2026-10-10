import type { Flavour } from '../data/menu';

const COLOURS: Record<Flavour, string> = {
  citron: 'var(--color-citron)',
  pistache: 'var(--color-pistache)',
  fraise: 'var(--color-fraise)',
};

/** 8px category marker. Decorative: the item name already says the flavour. */
export function FlavourDot({ flavour }: { flavour?: Flavour }) {
  if (!flavour) return null;
  return <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: COLOURS[flavour] }} />;
}
