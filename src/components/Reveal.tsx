import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../lib/useInView';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Light stagger, in milliseconds. */
  delay?: number;
}

/** Fades and rises its content when it enters the viewport. */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const [ref, visible] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} data-visible={visible} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
