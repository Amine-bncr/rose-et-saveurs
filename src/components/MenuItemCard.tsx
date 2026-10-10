import type { MenuItem } from '../data/menu';
import { AddControl } from './AddControl';
import { ArchFrame } from './ArchFrame';
import { FlavourDot } from './FlavourDot';
import { Photo } from './Photo';

/** Dense list row on mobile, vertical card from md up. */
export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-hairline/25 bg-card p-3 md:flex-col md:items-stretch md:p-5">
      <ArchFrame className="w-24 shrink-0 md:mx-auto md:w-full md:max-w-[15rem]" variant="thumb">
        <Photo photoKey={item.photo} sizes="(min-width: 768px) 240px, 96px" />
      </ArchFrame>
      <div className="min-w-0 flex-1 space-y-2 md:text-center">
        <h4 className="flex flex-wrap items-center gap-x-2 text-lg md:justify-center md:text-xl">
          <FlavourDot flavour={item.flavour} />
          {item.name}
          {item.badge && <span className="label rounded-full bg-velvet px-2.5 py-0.5 text-[0.62rem] text-gold dark:bg-gold dark:text-velvet">{item.badge}</span>}
        </h4>
        {item.nameAr && (
          <p lang="ar" dir="rtl" className="text-fg-muted">
            {item.nameAr}
          </p>
        )}
        {item.description && <p className="text-sm text-fg-muted">{item.description}</p>}
        <AddControl item={item} />
      </div>
    </article>
  );
}
