import { useState, type FormEvent } from 'react';
import { I18N } from '../data/i18n';
import { SITE } from '../data/site';
import { addDaysISO, minEventDate, todayISO, validateDate } from '../lib/dates';
import { formatPrice } from '../lib/format';
import { useBasket } from '../lib/basketContext';
import { useDialog } from '../lib/useDialog';
import { buildOrderMessage, whatsappUrl, type OrderDetails } from '../lib/whatsapp';
import { ArabicText, Darija } from './ArabicText';
import { Frame } from './Frame';
import { Field, describedBy } from './Field';
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from './Icons';
import { Photo } from './Photo';
import { Price } from './Price';

type Errors = Partial<Record<'name' | 'date' | 'address', string>>;

const INITIAL: OrderDetails = {
  name: '',
  date: '',
  mode: 'pickup',
  wilaya: SITE.zones[0],
  address: '',
  cakeMessage: '',
  notes: '',
  isEvent: false,
};

/** Basket drawer: bottom sheet on mobile, side panel from md up. Loaded lazily. */
export default function BasketDrawer() {
  const { lines, total, setQty, remove, clear, drawerOpen, closeDrawer } = useBasket();
  const ref = useDialog(drawerOpen, closeDrawer);
  const [order, setOrder] = useState<OrderDetails>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  if (!drawerOpen) return null;

  const update = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => setOrder((current) => ({ ...current, [key]: value }));
  const minDate = order.isEvent ? minEventDate() : todayISO();
  const dateHint = order.isEvent ? `Event and large orders: ${minDate} or later.` : undefined;

  function submit(event: FormEvent) {
    event.preventDefault();
    const minMessage = order.isEvent ? `Event and large orders need at least ${SITE.eventLeadDays} days notice. Pick ${minDate} or later.` : 'That date has already passed. Please pick today or later.';
    const next: Errors = {
      name: order.name.trim() ? undefined : 'Please tell us your name.',
      date: validateDate(order.date, minDate, minMessage) ?? undefined,
      address: order.mode === 'delivery' && !order.address.trim() ? 'Please add a delivery address.' : undefined,
    };
    setErrors(next);
    if (next.name || next.date || next.address) return;
    const url = whatsappUrl(buildOrderMessage(order, lines, total));
    window.open(url, '_blank', 'noopener');
    setSentUrl(url);
  }

  const empty = lines.length === 0;

  return (
    <div className="fixed inset-0 z-50">
      <div className="sheet-backdrop absolute inset-0 bg-ink/60" onClick={closeDrawer} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="basket-title"
        tabIndex={-1}
        className="sheet-panel absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-3xl bg-surface text-fg shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[28rem] md:rounded-l-3xl md:rounded-tr-none"
      >
        <div className="flex items-center justify-between border-b border-hairline/30 px-5 py-4">
          <h2 id="basket-title" className="text-2xl">
            Your basket
          </h2>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-alt" aria-label="Close basket" onClick={closeDrawer}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {sentUrl ? (
            <div className="space-y-5 py-6 text-center">
              <p className="font-display text-3xl italic text-accent">
                <Darija>{I18N.bessahaRaha.latin}</Darija>
              </p>
              <p>
                <ArabicText className="text-xl">{I18N.bessahaRaha.ar}</ArabicText>
              </p>
              <p>Your order is written and waiting in WhatsApp. Press send there and we will confirm with you.</p>
              <a href={sentUrl} target="_blank" rel="noopener" className="btn-solid">
                <WhatsAppIcon className="h-4 w-4" />
                Open WhatsApp again
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <button type="button" className="btn-outline" onClick={() => setSentUrl(null)}>
                  Edit my order
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    clear();
                    setOrder(INITIAL);
                    setSentUrl(null);
                    closeDrawer();
                  }}
                >
                  Start a new basket
                </button>
              </div>
            </div>
          ) : empty ? (
            <div className="space-y-4 py-10 text-center">
              <p className="font-display text-2xl">Your basket is empty</p>
              <p className="text-fg-muted">Pick something from La Carte, or write your order to us yourself.</p>
              <div className="flex flex-col gap-2 pt-2">
                <a href="#menu" className="btn-solid" onClick={closeDrawer}>
                  Browse the menu
                </a>
                <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn-outline">
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <>
              <ul role="list" className="divide-y divide-hairline/25">
                {lines.map((line) => (
                  <li key={line.key} className="flex items-center gap-3 py-3">
                    <Frame square className="w-14 shrink-0 !rounded-2xl">
                      <Photo photoKey={line.item.photo} sizes="56px" cutout fallbackAlt={line.name} />
                    </Frame>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg leading-tight">{line.name}</p>
                      <div className="mt-1 text-sm text-fg-muted">{line.lineTotal === null ? <Price price={null} /> : formatPrice(line.lineTotal)}</div>
                    </div>
                    <div className="flex items-center">
                      <button type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-alt" aria-label={`Remove one ${line.name}`} onClick={() => setQty(line.key, line.qty - 1)}>
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="min-w-6 text-center tabular-nums" aria-live="polite">
                        {line.qty}
                      </span>
                      <button type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-alt" aria-label={`Add one more ${line.name}`} onClick={() => setQty(line.key, line.qty + 1)}>
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-fg-muted hover:bg-surface-alt" aria-label={`Remove ${line.name} from basket`} onClick={() => remove(line.key)}>
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <form id="order-form" onSubmit={submit} noValidate className="mt-6 space-y-5 border-t border-hairline/30 pt-6">
                <Field id="order-name" label="Your name" error={errors.name}>
                  <input id="order-name" className="input" autoComplete="name" value={order.name} onChange={(e) => update('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('order-name', errors.name)} />
                </Field>

                <label className="flex min-h-11 items-center gap-3">
                  <input type="checkbox" className="h-5 w-5 accent-plum" checked={order.isEvent} onChange={(e) => update('isEvent', e.target.checked)} />
                  <span>This is an event or large order</span>
                </label>
                {order.isEvent && (
                  <p className="rounded-xl bg-surface-alt p-3 text-sm">
                    A deposit is required for events and large quantities. Please order at least {SITE.eventLeadDays} days ahead.
                  </p>
                )}

                <Field id="order-date" label="Preferred date" error={errors.date} hint={dateHint}>
                  <input id="order-date" type="date" className="input" min={minDate} max={order.isEvent ? undefined : addDaysISO(todayISO(), 365)} value={order.date} onChange={(e) => update('date', e.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={describedBy('order-date', errors.date, dateHint)} />
                </Field>

                <fieldset className="space-y-2">
                  <legend className="mb-1.5 text-sm font-medium">Pickup or delivery</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(['pickup', 'delivery'] as const).map((mode) => (
                      <label key={mode} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium ${order.mode === mode ? 'border-plum bg-plum text-cream dark:border-gold dark:bg-gold dark:text-velvet' : 'border-hairline/60'}`}>
                        <input type="radio" name="mode" value={mode} className="sr-only" checked={order.mode === mode} onChange={() => update('mode', mode)} />
                        {mode === 'pickup' ? 'Pickup' : 'Delivery'}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {order.mode === 'pickup' ? (
                  <p className="text-sm text-fg-muted">
                    Pickup at {SITE.address.line1}, {SITE.address.area}. {SITE.hours.label}. Call or WhatsApp before coming.
                  </p>
                ) : (
                  <>
                    <Field id="order-wilaya" label="Wilaya">
                      <select id="order-wilaya" className="input" value={order.wilaya} onChange={(e) => update('wilaya', e.target.value)}>
                        {SITE.zones.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="order-address" label="Delivery address" error={errors.address}>
                      <textarea id="order-address" rows={2} className="input" autoComplete="street-address" value={order.address} onChange={(e) => update('address', e.target.value)} aria-invalid={Boolean(errors.address)} aria-describedby={describedBy('order-address', errors.address)} />
                    </Field>
                    <p className="text-sm font-medium">{SITE.deliveryFeeNote}.</p>
                  </>
                )}

                <Field id="order-cake" label="Message on the cake" optional>
                  <input id="order-cake" className="input" value={order.cakeMessage} onChange={(e) => update('cakeMessage', e.target.value)} />
                </Field>
                <Field id="order-notes" label="Notes" optional>
                  <textarea id="order-notes" rows={2} className="input" value={order.notes} onChange={(e) => update('notes', e.target.value)} />
                </Field>
                <p className="text-sm text-fg-muted">{SITE.paymentNote}.</p>
              </form>
            </>
          )}
        </div>

        {!sentUrl && !empty && (
          <div className="border-t border-hairline/30 bg-surface px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            <p className="mb-3 flex items-baseline justify-between">
              <span className="label text-fg-muted">Total</span>
              <span className={total === null ? 'text-sm font-medium' : 'font-display text-2xl'}>{total === null ? 'Total confirmed on WhatsApp' : formatPrice(total)}</span>
            </p>
            <button type="submit" form="order-form" className="btn-solid w-full">
              <WhatsAppIcon className="h-4 w-4" />
              Send on WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
