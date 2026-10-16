import type { ReactNode } from 'react';

interface SectionHeadingProps {
  id: string;
  kicker?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  align?: 'center' | 'left';
}

export function SectionHeading({ id, kicker, title, children, align = 'left' }: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <header className={`mb-10 ${center ? 'text-center' : ''}`}>
      {kicker && <p className="label mb-3 text-accent">{kicker}</p>}
      <div className="flex items-end justify-between gap-6">
        <h2 id={id} className="text-4xl sm:text-5xl">
          {title}
        </h2>
        {!center && (
          <span aria-hidden="true" className="mb-3 hidden gap-1.5 sm:flex">
            {[0, 1, 2, 3].map((dot) => (
              <span key={dot} className="h-2 w-2 rounded-full bg-fg/60" />
            ))}
          </span>
        )}
      </div>
      {children && <div className={`mt-4 max-w-2xl text-fg-muted ${center ? 'mx-auto' : ''}`}>{children}</div>}
    </header>
  );
}
