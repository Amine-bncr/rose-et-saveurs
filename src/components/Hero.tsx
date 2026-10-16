import { HERO_KEY, HERO_SIZES } from '../data/photos';
import { I18N } from '../data/i18n';
import { ArabicText, Darija } from './ArabicText';
import { Photo } from './Photo';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-blob text-fg md:min-h-[40rem]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-zoom absolute inset-0">
          <Photo photoKey={HERO_KEY} sizes={HERO_SIZES} eager optional />
        </div>
        {/* Soft light wash so the headline stays readable over the photo. */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/5 md:via-surface/60" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-16 md:pb-28">
        <div className="rise-in max-w-xl">
          <p className="label mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-accent">
            <Darija className="font-display text-base normal-case italic">{I18N.heroEyebrow}</Darija>
            <span aria-hidden="true">·</span>
            <span lang="fr">{I18N.alger.fr}</span>
            <ArabicText className="text-base normal-case tracking-normal">{I18N.alger.ar}</ArabicText>
          </p>
          <h1 id="hero-title" className="text-5xl sm:text-6xl lg:text-7xl">
            Cut one open.
            <span className="block italic text-accent">You&rsquo;re already hungry.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-fg/85">Artisan bûchettes, tartes, cookies and cheesecake, made to order in Algiers. Fill a basket, send it on WhatsApp.</p>
          <p className="mt-3 text-xl text-accent">
            <ArabicText>{I18N.taglineAr}</ArabicText>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#menu" className="btn-solid">
              Build your order
            </a>
            <a href="#sur-mesure" className="btn-outline">
              Custom cake? Tell us
            </a>
          </div>
        </div>
      </div>
      <p className="absolute bottom-8 right-6 hidden font-display text-lg italic text-accent md:block">La Bûchette</p>
    </section>
  );
}
