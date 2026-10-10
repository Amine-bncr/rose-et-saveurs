import { BUCHETTES } from '../data/menu';
import { AddControl } from './AddControl';
import { CutReveal } from './CutReveal';
import { FlavourDot } from './FlavourDot';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Signature() {
  return (
    <section id="buchette" aria-labelledby="buchette-title" className="bg-surface-alt py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="buchette-title" kicker="Our signature" title={<>La <span className="italic">Bûchette</span></>}>
          <p>Four flavours, each one cut open so you can see what you are getting. Tap a card to slice it.</p>
        </SectionHeading>
      </div>
      <ul
        role="list"
        aria-label="Bûchette flavours"
        className="no-scrollbar mx-auto flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible"
      >
        {BUCHETTES.map((item, index) => (
          <li key={item.id} className="w-[72%] shrink-0 snap-center sm:w-[42%] lg:w-auto">
            <Reveal delay={index * 70}>
              <article className="rounded-3xl border border-hairline/25 bg-card p-4">
                <CutReveal exterior={item.photo} cut={item.photoCut ?? null} name={item.name} />
                <h3 className="mt-4 flex items-center justify-center gap-2 text-center text-xl">
                  <FlavourDot flavour={item.flavour} />
                  {item.name}
                </h3>
                <div className="mt-3">
                  <AddControl item={item} />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
