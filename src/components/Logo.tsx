import brandJson from '../data/brand-manifest.json';
import { SITE } from '../data/site';
import { HeartLoop } from './motifs/HeartLoop';

interface LogoAsset {
  hash: string;
  width: number;
  height: number;
}

const brand: { logo: LogoAsset | null } = brandJson;

interface LogoProps {
  /** "lockup" is the compact header mark; "full" is the supplied logo for velvet surfaces. */
  variant: 'lockup' | 'full';
  className?: string;
}

/**
 * The only place the logo is rendered. To switch to a transparent SVG later, replace the
 * `<picture>` below with an inline SVG or an <img src="/brand/logo.svg">.
 * The supplied JPG has a solid aubergine background, so "full" must only sit on velvet.
 */
export function Logo({ variant, className = '' }: LogoProps) {
  if (variant === 'lockup') {
    return (
      <span className={`inline-flex items-center gap-2.5 text-gold ${className}`}>
        <HeartLoop className="h-7 w-7" />
        <span className="font-body text-[0.8rem] font-medium uppercase text-cream" style={{ letterSpacing: '0.26em' }}>
          Rose &amp; Saveurs
        </span>
      </span>
    );
  }

  const alt = `${SITE.name}, Pâtisserie. ${SITE.tagline}`;
  const logo = brand.logo;
  if (!logo) {
    return (
      <div role="img" aria-label={alt} className={`flex flex-col items-center gap-2 text-gold ${className}`}>
        <HeartLoop className="h-14 w-14" />
        <span className="font-display text-3xl italic text-gold">Rose &amp; Saveurs</span>
        <span className="label text-cream">Pâtisserie</span>
      </div>
    );
  }
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`/brand/logo-${logo.hash}-400.webp 400w, /brand/logo-${logo.hash}-800.webp 800w`} sizes="(min-width: 768px) 224px, 176px" />
      <img src={`/brand/logo-${logo.hash}-800.jpg`} width={logo.width} height={logo.height} alt={alt} decoding="async" className="h-auto w-full" />
    </picture>
  );
}
