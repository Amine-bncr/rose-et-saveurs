import { Reveal } from './Reveal';
import { Rose } from './motifs/Rose';
import { SectionHeading } from './SectionHeading';

const STEPS = [
  { title: 'Choose', text: 'Browse La Carte and add your favourites to the basket.' },
  { title: 'Edit your basket', text: 'Change quantities, pick pickup or delivery, add a message for the cake.' },
  { title: 'Send on WhatsApp', text: 'One tap opens WhatsApp with your order already written.' },
  { title: 'Confirm and pay', text: 'We confirm with you, then you pay by card or cash at pickup or delivery.' },
];

export function HowToOrder() {
  return (
    <section id="how-to-order" aria-labelledby="how-title" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="how-title" kicker="Simple" title="How to order" />
        <ol role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 80} className="h-full">
                <div className="h-full rounded-2xl border border-hairline/30 bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <svg viewBox="-14 -14 28 28" className="h-9 w-9 text-hairline" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                      <Rose x={0} y={0} scale={1.2} />
                    </svg>
                    <span className="font-display text-3xl text-accent" aria-hidden="true">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl">{step.title}</h3>
                  <p className="mt-2 text-fg-muted">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
