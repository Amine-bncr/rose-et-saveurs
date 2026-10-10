import { TESTIMONIALS } from '../data/testimonials';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/** Renders nothing while src/data/testimonials.ts is empty. */
export function Reviews() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section id="testimonials" aria-labelledby="reviews-title" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="reviews-title" kicker="Kind words" title="What people say" />
        <ul role="list" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <li key={t.id}>
              <Reveal delay={index * 70} className="h-full">
                <figure className="h-full rounded-2xl border border-hairline/30 bg-card p-6">
                  <blockquote className="font-display text-xl italic">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm text-fg-muted">
                    {t.author}
                    {t.context ? `, ${t.context}` : ''}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
