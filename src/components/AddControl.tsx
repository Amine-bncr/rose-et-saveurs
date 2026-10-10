import { useRef, useState } from 'react';
import type { MenuItem } from '../data/menu';
import { lineKey } from '../lib/basket';
import { useBasket } from '../lib/basketContext';
import { flyToBasket } from '../lib/fly';
import { MinusIcon, PlusIcon } from './Icons';
import { Price } from './Price';

/** Price (or "Price soon"), optional variant chips, and an Add button that turns into a stepper. */
export function AddControl({ item, align = 'between' }: { item: MenuItem; align?: 'between' | 'center' }) {
  const { qtyFor, add, setQty } = useBasket();
  const variants = item.variants ?? [];
  const [variantId, setVariantId] = useState<string | undefined>(variants[0]?.id);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variant = variants.find((v) => v.id === variantId);
  const price = variant ? variant.price : item.price;
  const key = lineKey(item.id, variant?.id);
  const qty = qtyFor(key);

  if (!item.available) {
    return <span className="label text-fg-muted">Unavailable</span>;
  }

  return (
    <div className="space-y-2">
      {variants.length > 0 && (
        <div role="group" aria-label={`${item.name} options`} className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button key={v.id} type="button" className="chip" aria-pressed={v.id === variantId} onClick={() => setVariantId(v.id)}>
              {v.label}
            </button>
          ))}
        </div>
      )}
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : 'justify-between'}`}>
        <Price price={price} />
        {qty === 0 ? (
          <button
            ref={buttonRef}
            type="button"
            className="btn-solid min-w-[6.5rem]"
            aria-label={`Add ${item.name} to basket`}
            onClick={() => {
              if (buttonRef.current) flyToBasket(buttonRef.current);
              add(item.id, variant?.id);
            }}
          >
            Add
          </button>
        ) : (
          <div className="inline-flex items-center rounded-full border border-hairline/70" role="group" aria-label={`${item.name} quantity`}>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-alt" aria-label={`Remove one ${item.name}`} onClick={() => setQty(key, qty - 1)}>
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center font-medium tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-alt"
              aria-label={`Add one more ${item.name}`}
              onClick={(event) => {
                flyToBasket(event.currentTarget);
                add(item.id, variant?.id);
              }}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
