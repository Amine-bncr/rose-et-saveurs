import type { CSSProperties } from 'react';

const PETAL = 'M0 0 C-5.5 -3 -6.5 -9 0 -11 C6.5 -9 5.5 -3 0 0 Z';
const SPIRAL = 'M0 0 C1.2 -1.8 3.6 -.8 2.8 1.4 C1.8 4 -3 3 -3.2 -.6 C-3.4 -4.2 1.4 -5.4 3.6 -3.4';

/** A simple spiral five-petal embroidered rose, centred on (x, y). */
export function Rose({ x, y, scale = 1, delay = '0s' }: { x: number; y: number; scale?: number; delay?: string }) {
  const style = { '--thread-delay': delay } as CSSProperties;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path key={angle} d={PETAL} pathLength={1} transform={`rotate(${angle})`} style={style} />
      ))}
      <path d={SPIRAL} pathLength={1} style={style} />
    </g>
  );
}
