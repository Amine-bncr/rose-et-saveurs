import { useEffect, useState } from 'react';
import { useBasket } from '../lib/basketContext';
import { useDialog } from '../lib/useDialog';
import { BasketIcon, CloseIcon, MenuIcon } from './Icons';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const NAV = [
  { href: '#menu', label: 'Menu' },
  { href: '#sur-mesure', label: 'Custom' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
];

function NavSheet({ onClose }: { onClose: () => void }) {
  const ref = useDialog(true, onClose);
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Site navigation" tabIndex={-1} className="nav-sheet on-velvet fixed inset-0 z-50 flex flex-col bg-velvet text-cream lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Logo variant="lockup" />
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-plum/60" aria-label="Close menu" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-8 pb-24">
        {NAV.map((link) => (
          <a key={link.href} href={link.href} onClick={onClose} className="border-b border-gold/20 py-4 font-display text-4xl hover:text-gold">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function Header() {
  const { count, pulse, openDrawer } = useBasket();
  const [navOpen, setNavOpen] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (pulse === 0) return;
    setBounce(true);
    const timer = window.setTimeout(() => setBounce(false), 600);
    return () => window.clearTimeout(timer);
  }, [pulse]);

  return (
    <header className="on-velvet sticky top-0 z-40 h-16 border-b border-gold/20 bg-velvet text-cream">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" aria-label="Rose & Saveurs, back to top" className="rounded-md">
          <Logo variant="lockup" />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((link) => (
            <a key={link.href} href={link.href} className="label text-cream/90 hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button type="button" data-basket-target className={`relative grid h-11 w-11 place-items-center rounded-full hover:bg-plum/60 ${bounce ? 'basket-bounce' : ''}`} aria-label={`Open basket, ${count} ${count === 1 ? 'item' : 'items'}`} onClick={openDrawer}>
            <BasketIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.7rem] font-semibold text-velvet" aria-hidden="true">
                {count}
              </span>
            )}
          </button>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-plum/60 lg:hidden" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={navOpen} onClick={() => setNavOpen(true)}>
            <MenuIcon />
          </button>
        </div>
      </div>
      {navOpen && <NavSheet onClose={() => setNavOpen(false)} />}
    </header>
  );
}
