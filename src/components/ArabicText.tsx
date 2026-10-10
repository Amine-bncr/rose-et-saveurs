import { useEffect, type ReactNode } from 'react';

let fontRequested = false;

/** Loads the Arabic font lazily, only once Arabic text is actually on the page. */
function useArabicFont(): void {
  useEffect(() => {
    if (fontRequested) return;
    fontRequested = true;
    void import('@fontsource/aref-ruqaa/arabic-400.css');
  }, []);
}

export function ArabicText({ children, className = '' }: { children: ReactNode; className?: string }) {
  useArabicFont();
  return (
    <span lang="ar" dir="rtl" className={className}>
      {children}
    </span>
  );
}

/** Darija written in Latin letters ("Bessaha w raha"). */
export function Darija({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span lang="ar-Latn" className={className}>
      {children}
    </span>
  );
}
