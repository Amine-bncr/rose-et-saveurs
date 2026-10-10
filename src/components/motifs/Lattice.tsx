import { useId } from 'react';

/** Eight-point-star lattice (chebbak), as a background pattern for velvet sections. */
function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let i = 0; i < 16; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(' ');
}

const STAR = starPoints(32, 32, 22, 13);

export function Lattice({ drift = true, className = '' }: { drift?: boolean; className?: string }) {
  const id = `lattice-${useId().replace(/:/g, '')}`;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className={`absolute -inset-16 ${drift ? 'lattice-drift' : ''}`}>
        <svg className="h-full w-full text-gold" style={{ opacity: 0.055 }} focusable="false">
          <defs>
            <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
                <polygon points={STAR} />
                <path d="M0 32H10M54 32H64M32 0V10M32 54V64" />
                <path d="M0 12L12 0M52 0L64 12M64 52L52 64M12 64L0 52" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      </div>
    </div>
  );
}
