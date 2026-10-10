import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, COMING_SOON, MENU, type CategoryId } from '../data/menu';
import { I18N } from '../data/i18n';
import { saltyUrl } from '../lib/whatsapp';
import { ArabicText } from './ArabicText';
import { MenuItemCard } from './MenuItemCard';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { WhatsAppIcon } from './Icons';

export function Menu() {
  const [active, setActive] = useState<CategoryId>(CATEGORIES[0].id);
  const stripRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: the category crossing the band just under the sticky bars is active.
  useEffect(() => {
    const sections = CATEGORIES.map((c) => document.getElementById(`cat-${c.id}`)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id.replace('cat-', '') as CategoryId);
        }
      },
      { rootMargin: '-140px 0px -60% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the active tab visible inside the strip without scrolling the page.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !tab) return;
    strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2, behavior: 'auto' });
  }, [active]);

  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-surface pt-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="menu-title"
          kicker={
            <>
              <span lang="fr">{I18N.carte.fr}</span> · <ArabicText className="text-base normal-case tracking-normal">{I18N.carte.ar}</ArabicText>
            </>
          }
          title="Pick your treats"
        >
          <p>Add what you like to your basket. We confirm everything with you on WhatsApp.</p>
        </SectionHeading>
      </div>

      <div className="sticky top-16 z-30 border-y border-hairline/25 bg-surface/95 backdrop-blur">
        <nav aria-label="Menu categories" ref={stripRef} className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
          {CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#cat-${category.id}`}
              aria-current={active === category.id ? 'true' : undefined}
              className="label inline-flex min-h-11 shrink-0 items-center rounded-full border border-transparent px-4 text-fg-muted hover:text-fg aria-[current=true]:border-hairline aria-[current=true]:bg-velvet aria-[current=true]:text-cream dark:aria-[current=true]:bg-gold dark:aria-[current=true]:text-velvet"
            >
              {category.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12">
        {CATEGORIES.map((category) => (
          <section key={category.id} id={`cat-${category.id}`} aria-labelledby={`cat-title-${category.id}`} className="scroll-mt-36">
            <h3 id={`cat-title-${category.id}`} className="mb-5 text-3xl">
              {category.label}
            </h3>
            <ul role="list" className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {MENU.filter((item) => item.category === category.id).map((item, index) => (
                <li key={item.id}>
                  <Reveal delay={(index % 3) * 70}>
                    <MenuItemCard item={item} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Reveal>
          <aside aria-labelledby="soon-title" className="rounded-3xl border border-dashed border-hairline bg-surface-alt p-6 text-center sm:p-10">
            <p className="label text-accent">
              <span lang="fr">{I18N.bientot.fr}</span> · Salé · <ArabicText className="text-base normal-case tracking-normal">{I18N.bientot.ar}</ArabicText>
            </p>
            <h3 id="soon-title" className="mt-2 text-3xl">
              Salty creations are coming
            </h3>
            <ul role="list" className="mt-5 flex flex-wrap justify-center gap-2">
              {COMING_SOON.map((name) => (
                <li key={name} className="rounded-full border border-hairline/60 px-4 py-2 text-sm">
                  {name}
                </li>
              ))}
              <li className="rounded-full border border-hairline/60 px-4 py-2 text-sm text-fg-muted">and more</li>
            </ul>
            <a href={saltyUrl()} target="_blank" rel="noopener" className="btn-solid mt-6">
              <WhatsAppIcon className="h-4 w-4" />
              Ask about salty creations
            </a>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
