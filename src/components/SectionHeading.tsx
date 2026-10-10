import type { ReactNode } from 'react';
import { Divider } from './motifs/Divider';

interface SectionHeadingProps {
  id: string;
  kicker?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  align?: 'center' | 'left';
}

export function SectionHeading({ id, kicker, title, children, align = 'center' }: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <header className={`mb-10 ${center ? 'text-center' : ''}`}>
      {center && <Divider className="mx-auto mb-6 h-7 w-72 max-w-full text-hairline" />}
      {kicker && <p className="label mb-3 text-accent">{kicker}</p>}
      <h2 id={id} className="text-4xl sm:text-5xl">
        {title}
      </h2>
      {children && <div className={`mt-4 max-w-2xl text-fg-muted ${center ? 'mx-auto' : ''}`}>{children}</div>}
    </header>
  );
}
