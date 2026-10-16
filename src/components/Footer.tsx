import { I18N } from '../data/i18n';
import { SITE } from '../data/site';
import { generalOrderUrl } from '../lib/whatsapp';
import { ArabicText, Darija } from './ArabicText';
import { InstagramIcon, PinIcon, TikTokIcon, WhatsAppIcon } from './Icons';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="torn-top relative mt-6 bg-blob pb-28 pt-16 text-fg md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[auto_1fr_1fr] md:items-start">
        <div className="on-velvet mx-auto w-40 overflow-hidden rounded-3xl bg-velvet text-cream md:mx-0">
          <Logo variant="full" className="block w-full p-1" />
        </div>
        <div className="space-y-3 text-center md:text-left">
          <h2 className="label text-accent">Find us</h2>
          <p className="flex justify-center gap-2 md:justify-start">
            <PinIcon className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <span>
              {SITE.address.line1}, {SITE.address.area}
              <br />
              Alger · <ArabicText>{I18N.alger.ar}</ArabicText>
            </span>
          </p>
          <p>{SITE.hours.label}. Call or WhatsApp before coming.</p>
        </div>
        <div className="space-y-3 text-center md:text-left">
          <h2 className="label text-accent">Say hello</h2>
          <ul role="list" className="flex flex-col items-center gap-2 md:items-start">
            <li>
              <a href={generalOrderUrl()} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 hover:text-accent">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-hairline/60"><WhatsAppIcon className="h-4 w-4" /></span>
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 hover:text-accent">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-hairline/60"><InstagramIcon className="h-4 w-4" /></span>
                {SITE.handle}
              </a>
            </li>
            <li>
              <a href={SITE.tiktok} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 hover:text-accent">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-hairline/60"><TikTokIcon className="h-4 w-4" /></span>
                {SITE.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-hairline/40 px-5 pt-6 text-center">
        <p className="font-display text-2xl italic text-accent">
          <Darija>{I18N.bessahaRaha.latin}</Darija> · <ArabicText className="not-italic">{I18N.bessahaRaha.ar}</ArabicText>
        </p>
        <p className="mt-2 text-sm text-fg-muted" lang="fr">
          {SITE.tagline} · {SITE.bio}
        </p>
      </div>
    </footer>
  );
}
