import { useBasket } from '../lib/basketContext';
import { generalOrderUrl } from '../lib/whatsapp';
import { WhatsAppIcon } from './Icons';

/** Mobile bottom bar: opens the basket when it has items, otherwise opens a WhatsApp chat. */
export function StickyBar() {
  const { count, openDrawer } = useBasket();
  return (
    <div className="on-velvet fixed inset-x-0 bottom-0 z-30 border-t border-gold/30 bg-velvet px-4 pt-3 md:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      {count > 0 ? (
        <button type="button" className="btn-gold w-full" onClick={openDrawer}>
          View basket · {count} {count === 1 ? 'item' : 'items'}
        </button>
      ) : (
        <a href={generalOrderUrl()} target="_blank" rel="noopener" className="btn-gold w-full">
          <WhatsAppIcon className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      )}
    </div>
  );
}
