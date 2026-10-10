import { SITE } from '../data/site';
import { generalOrderUrl } from '../lib/whatsapp';
import { CoastMap } from './motifs/CoastMap';
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

export function Delivery() {
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="bg-surface-alt py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="delivery-title" kicker="Delivery & pickup" title="We come to you, or you come to us" />
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-hairline/30">
              <CoastMap />
            </div>
            <ul role="list" className="flex flex-wrap gap-2" aria-label="Delivery zones">
              {SITE.zones.map((zone) => (
                <li key={zone} className="rounded-full border border-hairline/60 bg-card px-4 py-2 text-sm font-medium">
                  {zone}
                </li>
              ))}
            </ul>
            <p className="text-fg-muted">
              We deliver only to these four wilayas. {SITE.deliveryFeeNote}. {SITE.paymentNote}.
            </p>
          </div>

          <aside aria-labelledby="pickup-title" className="space-y-4 rounded-3xl border border-hairline/30 bg-card p-6 sm:p-8">
            <h3 id="pickup-title" className="text-2xl">
              Pickup
            </h3>
            <p className="flex gap-3">
              <PinIcon className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <span>
                {SITE.address.line1}
                <br />
                {SITE.address.area}, Algiers
              </span>
            </p>
            <p className="flex gap-3">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <span>{SITE.hours.label}</span>
            </p>
            <p className="rounded-xl bg-surface-alt p-3 text-sm font-medium">Call or WhatsApp before coming.</p>
            <div className="flex flex-col gap-3 pt-1">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="btn-solid">
                Open in Google Maps
              </a>
              <a href={generalOrderUrl()} target="_blank" rel="noopener" className="btn-outline">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
              <a href={`tel:${SITE.phoneTel}`} className="btn-outline">
                <PhoneIcon className="h-4 w-4" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
