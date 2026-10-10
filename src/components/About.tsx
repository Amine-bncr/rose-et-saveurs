import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-surface-alt py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading id="about-title" kicker="About" title="Rose & Saveurs" />
        <Reveal>
          <div className="space-y-5 text-lg text-fg-muted">
            <p>
              Rose &amp; Saveurs is an online-only artisan pâtisserie in Algiers, started by someone trained and certified in pâtisserie (CAP Pâtisserie). It is a young start-up, and everything is made to order.
            </p>
            <p>
              The <span className="font-display italic text-fg">Bûchette</span> is our signature. Around it sits a small carte of tartes, cookies, cheesecake and cake, with salty creations on the way.
            </p>
            <p>Have something specific in mind? We make fully custom creations for birthdays, weddings, Eid and Ramadan.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
