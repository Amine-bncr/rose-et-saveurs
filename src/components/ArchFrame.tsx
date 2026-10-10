import type { ReactNode } from 'react';
import { ARCH_CLIP_ID } from './motifs/ClipDefs';
import { ARCH_UNIT_PATH } from './motifs/arch';

interface ArchFrameProps {
  children: ReactNode;
  /** "thumb" uses a thinner mat and keyline for small sizes. */
  variant?: 'full' | 'thumb';
  className?: string;
}

/**
 * Portrait horseshoe-arch frame (about 4:5) with a thin Antique Gold keyline and a cream mat.
 * The mat stays cream in dark mode so photo backdrops never glare.
 */
export function ArchFrame({ children, variant = 'full', className = '' }: ArchFrameProps) {
  const thumb = variant === 'thumb';
  return (
    <div className={`relative aspect-[4/5] ${className}`}>
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" focusable="false">
        <path d={ARCH_UNIT_PATH} vectorEffect="non-scaling-stroke" strokeWidth={thumb ? 1 : 1.25} style={{ fill: 'var(--color-cream)', stroke: 'var(--color-gold-antique)' }} />
      </svg>
      <div className="absolute overflow-hidden" style={{ inset: thumb ? '4.5%' : '6%', clipPath: `url(#${ARCH_CLIP_ID})` }}>
        {children}
      </div>
    </div>
  );
}
