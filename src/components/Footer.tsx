import { I18N } from '../data/i18n';
import { SITE } from '../data/site';
import { generalOrderUrl } from '../lib/whatsapp';
import { ArabicText, Darija } from './ArabicText';
import { InstagramIcon, PinIcon, TikTokIcon, WhatsAppIcon } from './Icons';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="on-velvet bg-velvet pb-28 pt-14 text-cream md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[auto_1fr_1fr] md:items-start">
        <Logo variant="full" className="mx-auto block w-40 md:mx-0" />
        <div className="space-y-3 text-center md:text-left">
          <h2 className="label text-gold">Find us</h2>
          <p className="flex justify-center gap-2 md:justify-start">
            <PinIcon className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <span>
              {SITE.address.line1}, {SITE.address.area}
              <br />
              Alger · <ArabicText>{I18N.alger.ar}</ArabicText>
            </span>
          </p>
          <p>{SITE.hours.label}. Call or WhatsApp before coming.</p>
        </div>
        <div className="space-y-3 text-center md:text-left">
          <h2 className="label text-gold">Say hello</h2>
          <ul role="list" className="flex flex-col items-center gap-2 md:items-start">
            <li>
              <a href={generalOrderUrl()} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-gold">
                <WhatsAppIcon className="h-5 w-5" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-gold">
                <InstagramIcon className="h-5 w-5" />
                {SITE.handle}
              </a>
            </li>
            <li>
              <a href={SITE.tiktok} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-gold">
                <TikTokIcon className="h-5 w-5" />
                {SITE.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-gold/25 px-5 pt-6 text-center">
        <p className="font-display text-2xl italic text-gold">
          <Darija>{I18N.bessahaRaha.latin}</Darija> · <ArabicText className="not-italic">{I18N.bessahaRaha.ar}</ArabicText>
        </p>
        <p className="mt-2 text-sm text-cream/75" lang="fr">
          {SITE.tagline} · {SITE.bio}
        </p>
      </div>
    </footer>
  );
}
