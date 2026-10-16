import type { ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
  /** Square instead of portrait (used for small thumbnails). */
  square?: boolean;
  className?: string;
}

/** Rounded photo box. Children fill it (see Photo). */
export function Frame({ children, square = false, className = '' }: FrameProps) {
  return <div className={`relative overflow-hidden rounded-3xl bg-blob ${square ? 'aspect-square' : 'aspect-[4/5]'} ${className}`}>{children}</div>;
}
