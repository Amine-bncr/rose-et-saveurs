import { useState } from 'react';
import { FAQ } from '../data/faq';
import { ChevronIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading id="faq-title" kicker="Good to know" title="Questions, answered" />
        <div className="divide-y divide-hairline/30 rounded-3xl border border-hairline/30 bg-card">
          {FAQ.map((entry) => {
            const open = openId === entry.id;
            return (
              <div key={entry.id}>
                <h3>
                  <button type="button" id={`faq-btn-${entry.id}`} aria-expanded={open} aria-controls={`faq-panel-${entry.id}`} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg sm:px-7" onClick={() => setOpenId(open ? null : entry.id)}>
                    {entry.question}
                    <ChevronIcon className={`h-5 w-5 shrink-0 text-accent transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div id={`faq-panel-${entry.id}`} role="region" aria-labelledby={`faq-btn-${entry.id}`} data-open={open} inert={!open} className="acc-panel">
                  <div>
                    <p className="px-5 pb-5 text-fg-muted sm:px-7">{entry.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
