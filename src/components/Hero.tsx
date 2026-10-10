import { HERO_KEY, HERO_SIZES } from '../data/photos';
import { I18N } from '../data/i18n';
import { SITE } from '../data/site';
import { ArabicText, Darija } from './ArabicText';
import { ArchFrame } from './ArchFrame';
import { Logo } from './Logo';
import { Photo } from './Photo';
import { CornerEmbroidery } from './motifs/CornerEmbroidery';
import { HeroThread } from './motifs/HeroThread';
import { Lattice } from './motifs/Lattice';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-velvet relative isolate overflow-hidden bg-velvet text-cream">
      <Lattice />
      <CornerEmbroidery className="pointer-events-none absolute left-0 top-0 h-28 w-28 text-gold sm:h-40 sm:w-40" />
      <CornerEmbroidery className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 rotate-180 text-gold sm:h-40 sm:w-40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pb-16 pt-10 md:grid-cols-[1.1fr_0.9fr] md:gap-x-8 md:gap-y-0 md:py-20 lg:py-24">
        <div className="text-center md:col-start-1 md:row-start-1 md:self-end md:text-left">
          <Logo variant="full" className="mx-auto mb-5 block w-24 sm:w-32 md:mx-0 md:mb-6 md:w-44" />
          <p className="label mb-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gold md:justify-start">
            <Darija className="font-display text-base normal-case italic">{I18N.heroEyebrow}</Darija>
            <span aria-hidden="true">·</span>
            <span lang="fr">{I18N.alger.fr}</span>
            <ArabicText className="text-base normal-case tracking-normal">{I18N.alger.ar}</ArabicText>
          </p>
          <h1 id="hero-title" className="text-5xl sm:text-6xl lg:text-7xl">
            Cut one open.
            <span className="block italic text-gold">You&rsquo;re already hungry.</span>
          </h1>
        </div>

        <figure className="hero-parallax relative mx-auto w-full max-w-[18rem] md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-[26rem]" style={{ aspectRatio: '400 / 520' }}>
          <HeroThread />
          <div className="arch-reveal absolute" style={{ left: '6.5%', top: '5%', width: '87%' }}>
            <ArchFrame>
              <Photo photoKey={HERO_KEY} sizes={HERO_SIZES} eager />
            </ArchFrame>
          </div>
          <figcaption className="absolute inset-x-0 bottom-[1.2%] text-center font-display text-lg italic text-gold">La Bûchette</figcaption>
        </figure>

        <div className="text-center md:col-start-1 md:row-start-2 md:self-start md:text-left">
          <p className="mx-auto max-w-md text-lg text-cream/90 md:mx-0 md:mt-5">
            Artisan bûchettes, tartes, cookies and cheesecake, made to order in Algiers. Fill a basket, send it on WhatsApp.
          </p>
          <p className="mt-3 text-xl text-gold">
            <ArabicText>{I18N.taglineAr}</ArabicText>
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a href="#menu" className="btn-gold">
              Build your order
            </a>
            <a href="#sur-mesure" className="btn-outline-gold">
              Custom cake? Tell us
            </a>
          </div>
          <p className="mt-6 text-sm text-cream/75" lang="fr">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
