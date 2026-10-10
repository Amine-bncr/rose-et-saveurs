/** The pointed horseshoe (outrepassé) arch of Casbah doorways, in a 0..1 box. */
const SEGMENTS: [string, ...number[]][] = [
  ['M', 0.08, 1],
  ['L', 0.08, 0.66],
  ['C', 0, 0.6, 0, 0.38, 0.14, 0.24],
  ['C', 0.26, 0.12, 0.42, 0.06, 0.5, 0],
  ['C', 0.58, 0.06, 0.74, 0.12, 0.86, 0.24],
  ['C', 1, 0.38, 1, 0.6, 0.92, 0.66],
  ['L', 0.92, 1],
];

/** The arch placed in any box. Open paths are used for drawn threads, closed ones for fills. */
export function archPath(x = 0, y = 0, w = 1, h = 1, closed = true): string {
  const d = SEGMENTS.map(([cmd, ...nums]) => cmd + nums.map((n, i) => (i % 2 === 0 ? x + n * w : y + n * h).toFixed(2)).join(' ')).join(' ');
  return closed ? `${d} Z` : d;
}

export const ARCH_UNIT_PATH = archPath();
