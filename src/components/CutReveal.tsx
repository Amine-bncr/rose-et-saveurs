import { useEffect, useRef, useState } from 'react';
import type { PhotoKey } from '../data/photos';
import { useInView, usePrefersReducedMotion } from '../lib/useInView';
import { ArchFrame } from './ArchFrame';
import { Photo } from './Photo';

interface CutRevealProps {
  exterior: PhotoKey | null;
  cut: PhotoKey | null;
  name: string;
}

const SIZES = '(min-width: 1024px) 260px, (min-width: 640px) 40vw, 70vw';

/**
 * Shows the exterior first. A gold knife line wipes across to reveal the cut-open photo on tap,
 * hover, and once automatically when scrolled into view. Reduced motion: a plain tap-to-toggle.
 */
export function CutReveal({ exterior, cut, name }: CutRevealProps) {
  const [ref, inView] = useInView<HTMLButtonElement>({ threshold: 0.6 });
  const [open, setOpen] = useState(false);
  const touched = useRef(false);
  const hovering = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    const show = window.setTimeout(() => {
      if (!touched.current) setOpen(true);
    }, 600);
    const hide = window.setTimeout(() => {
      if (!touched.current) setOpen(false);
    }, 3800);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [inView, reduced]);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={open}
      aria-label={`${name}: ${open ? 'showing the cut-open view, press to show the outside' : 'press to cut it open'}`}
      className={`block w-full text-center ${open ? 'is-cut' : ''}`}
      onClick={() => {
        if (hovering.current) return;
        touched.current = true;
        setOpen((value) => !value);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return;
        hovering.current = true;
        touched.current = true;
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'mouse') return;
        hovering.current = false;
        setOpen(false);
      }}
    >
      <ArchFrame>
        <div className="relative h-full w-full">
          <Photo photoKey={exterior} sizes={SIZES} />
          <div className="cut-layer absolute inset-0">
            <Photo photoKey={cut} sizes={SIZES} />
          </div>
          <span className="knife" aria-hidden="true" />
        </div>
      </ArchFrame>
      <span className="label mt-3 inline-block text-fg-muted" aria-hidden="true">
        {open ? 'Tap to close' : 'Tap to cut'}
      </span>
    </button>
  );
}
