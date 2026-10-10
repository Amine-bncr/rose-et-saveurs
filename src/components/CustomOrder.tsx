import { useState, type FormEvent } from 'react';
import { I18N } from '../data/i18n';
import { SITE } from '../data/site';
import { minEventDate, validateDate } from '../lib/dates';
import { buildCustomMessage, whatsappUrl } from '../lib/whatsapp';
import { ArabicText } from './ArabicText';
import { Field, describedBy } from './Field';
import { WhatsAppIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

const OCCASIONS = ['Birthdays', 'Weddings', 'Eid', 'Ramadan'];

export function CustomOrder() {
  const [occasion, setOccasion] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guests, setGuests] = useState('');
  const [cakeMessage, setCakeMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ occasion?: string; eventDate?: string }>({});
  const min = minEventDate();
  const dateHint = `Earliest: ${min}`;

  function submit(event: FormEvent) {
    event.preventDefault();
    const next = {
      occasion: occasion ? undefined : 'Choose an occasion, or type your own.',
      eventDate: validateDate(eventDate, min, `Custom orders need at least ${SITE.eventLeadDays} days notice. Pick ${min} or later.`) ?? undefined,
    };
    setErrors(next);
    if (next.occasion || next.eventDate) return;
    const url = whatsappUrl(buildCustomMessage({ occasion, eventDate, guests, cakeMessage, notes }));
    window.open(url, '_blank', 'noopener');
  }

  return (
    <section id="sur-mesure" aria-labelledby="custom-title" className="bg-surface-alt py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="custom-title"
            align="left"
            kicker={
              <>
                <span lang="fr">{I18N.surMesure.fr}</span> · <ArabicText className="text-base normal-case tracking-normal">{I18N.surMesure.ar}</ArabicText>
              </>
            }
            title="Your occasion, your cake"
          >
            <p>Birthdays, weddings, Eid, Ramadan: tell us what you have in mind and we build it with you, sweet or salty.</p>
          </SectionHeading>
          <ul role="list" className="mb-8 flex flex-wrap gap-2">
            {OCCASIONS.map((name) => (
              <li key={name}>
                <button type="button" className="chip" aria-pressed={occasion === name} onClick={() => setOccasion(name)}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
          <ul role="list" className="space-y-3 rounded-2xl border border-hairline/30 bg-card p-5">
            <li>
              <strong className="font-medium">At least {SITE.eventLeadDays} days before your event.</strong> Earlier is better for big dates.
            </li>
            <li>
              <strong className="font-medium">A deposit is required</strong> for events and large quantities.
            </li>
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-hairline/30 bg-card p-6 sm:p-8">
          <h3 className="text-2xl">Send us your brief</h3>
          <Field id="custom-occasion" label="Occasion" error={errors.occasion}>
            <input id="custom-occasion" className="input" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="Birthday, wedding, Eid…" list="occasion-list" aria-invalid={Boolean(errors.occasion)} aria-describedby={describedBy('custom-occasion', errors.occasion)} />
            <datalist id="occasion-list">
              {OCCASIONS.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="custom-date" label="Event date" error={errors.eventDate} hint={dateHint}>
              <input id="custom-date" type="date" className="input" min={min} value={eventDate} onChange={(e) => setEventDate(e.target.value)} aria-invalid={Boolean(errors.eventDate)} aria-describedby={describedBy('custom-date', errors.eventDate, dateHint)} />
            </Field>
            <Field id="custom-guests" label="Number of guests" optional>
              <input id="custom-guests" type="number" inputMode="numeric" min={1} className="input" value={guests} onChange={(e) => setGuests(e.target.value)} />
            </Field>
          </div>
          <Field id="custom-cake" label="Message on the cake" optional>
            <input id="custom-cake" className="input" value={cakeMessage} onChange={(e) => setCakeMessage(e.target.value)} />
          </Field>
          <Field id="custom-notes" label="Notes" optional>
            <textarea id="custom-notes" rows={3} className="input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Flavours, colours, sweet or salty…" />
          </Field>
          <button type="submit" className="btn-solid w-full sm:w-auto">
            <WhatsAppIcon className="h-4 w-4" />
            Send brief on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
