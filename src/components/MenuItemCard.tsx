import type { MenuItem } from '../data/menu';
import { AddControl } from './AddControl';
import { FlavourDot } from './FlavourDot';
import { Photo } from './Photo';

/** Dense list row on mobile, soft blob card from md up. */
export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="blob-md flex items-center gap-4 bg-blob p-3 md:h-full md:flex-col md:items-stretch md:p-6 md:pb-7">
      <div className="relative aspect-square w-24 shrink-0 md:w-full">
        <Photo photoKey={item.photo} sizes="(min-width: 768px) 280px, 96px" cutout fallbackAlt={item.name} />
      </div>
      <div className="min-w-0 flex-1 space-y-2 md:flex md:w-full md:flex-col md:text-center">
        <h4 className="flex flex-wrap items-center gap-x-2 text-lg md:justify-center md:text-xl">
          <FlavourDot flavour={item.flavour} />
          {item.name}
          {item.badge && <span className="label rounded-full bg-plum px-2.5 py-0.5 text-[0.62rem] text-cream dark:bg-gold dark:text-velvet">{item.badge}</span>}
        </h4>
        {item.nameAr && (
          <p lang="ar" dir="rtl" className="text-fg-muted">
            {item.nameAr}
          </p>
        )}
        {item.description && <p className="text-sm text-fg-muted">{item.description}</p>}
        <div className="md:mt-auto md:pt-2">
          <AddControl item={item} />
        </div>
      </div>
    </article>
  );
}
