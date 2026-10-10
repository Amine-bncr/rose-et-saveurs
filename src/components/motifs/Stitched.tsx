import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../lib/useInView';

interface StitchedSvgProps {
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  /** Draw duration, e.g. "2.4s". */
  duration?: string;
  children: ReactNode;
}

/** An inline SVG whose <Stroke> children draw themselves when it scrolls into view. */
export function StitchedSvg({ viewBox, className = '', strokeWidth = 1.5, duration = '2.2s', children }: StitchedSvgProps) {
  const [ref, visible] = useInView<SVGSVGElement>({ threshold: 0.2 });
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={`thread ${className}`}
      data-visible={visible}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ '--draw': duration } as CSSProperties}
    >
      {children}
    </svg>
  );
}

export function Stroke({ d, delay = '0s' }: { d: string; delay?: string }) {
  return <path d={d} pathLength={1} style={{ '--thread-delay': delay } as CSSProperties} />;
}
