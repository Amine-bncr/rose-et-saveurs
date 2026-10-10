import { SITE } from './site';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: FaqEntry[] = [
  {
    id: 'how-to-order',
    question: 'How do I order?',
    answer:
      'Pick what you want from La Carte, add it to your basket, check the details and send it to us on WhatsApp. We confirm with you there. If you would rather write your order yourself, chat with us directly.',
  },
  {
    id: 'payment',
    question: 'How do I pay?',
    answer: 'By card or cash, when you collect your order or when it is delivered.',
  },
  {
    id: 'delivery',
    question: 'Where do you deliver, and what does it cost?',
    answer: `We deliver to ${SITE.zones.join(', ')}. The delivery fee is not fixed yet: we confirm it with you on WhatsApp before anything is final.`,
  },
  {
    id: 'pickup',
    question: 'Where and when can I collect?',
    answer: `Pickup is at ${SITE.address.line1}, ${SITE.address.area}, Algiers, every day from ${SITE.hours.open} to ${SITE.hours.close}. Please call or WhatsApp us before you come.`,
  },
  {
    id: 'custom',
    question: 'Can I order a custom cake?',
    answer: `Yes. We make fully custom creations for birthdays, weddings, Eid and Ramadan. Order at least ${SITE.eventLeadDays} days before your event. The Sur mesure form builds your brief into a WhatsApp message.`,
  },
  {
    id: 'deposit',
    question: 'Do I need to pay a deposit?',
    answer: 'A deposit is required for events and large quantities. We will explain how it works when we confirm your order.',
  },
  {
    id: 'prices',
    question: 'Why are there no prices yet?',
    answer: 'Prices are not published yet. Your basket still works, and we confirm the total with you on WhatsApp.',
  },
  {
    id: 'menu',
    question: 'Will the menu change?',
    answer:
      'Yes, new creations will be added. Salty creations such as mini pizza, mini-croissants and mini-burgers are coming soon: ask us on WhatsApp if you are curious.',
  },
];
