/**
 * Every WhatsApp message the site can generate lives in this file.
 * To switch the message language, change MESSAGE_LANG ('fr' or 'en').
 */
import { SITE } from '../data/site';
import { formatDateEn, formatDateFr, formatPrice } from './format';
import type { ResolvedLine } from './basket';

export const MESSAGE_LANG: 'fr' | 'en' = 'fr';

const COPY = {
  fr: {
    greeting: 'Bonjour Rose & Saveurs,',
    intro: 'Je souhaite passer commande :',
    total: 'Total',
    totalPending: 'Total : à confirmer',
    name: 'Nom',
    date: 'Date souhaitée',
    mode: 'Mode',
    pickup: `Retrait à ${SITE.address.area}`,
    delivery: 'Livraison',
    address: 'Adresse',
    cake: 'Message sur le gâteau',
    notes: 'Remarques',
    payment: 'Paiement : carte ou espèces au retrait / à la livraison.',
    deliveryFee: 'Frais de livraison : à confirmer.',
    deposit: 'Commande événementielle ou grande quantité : un acompte est demandé.',
    thanks: 'Merci beaucoup !',
    customIntro: 'Je souhaite une commande sur mesure :',
    occasion: 'Occasion',
    eventDate: "Date de l'événement",
    guests: "Nombre d'invités",
    customNote: `Je sais qu'il faut commander au moins ${SITE.eventLeadDays} jours à l'avance et qu'un acompte est demandé.`,
    salty: 'Bonjour Rose & Saveurs, je voudrais en savoir plus sur vos créations salées (mini pizza, mini-croissants, mini-burgers...). Merci !',
    general: 'Bonjour Rose & Saveurs, je voudrais passer commande.',
    formatDate: formatDateFr,
  },
  en: {
    greeting: 'Hello Rose & Saveurs,',
    intro: 'I would like to place an order:',
    total: 'Total',
    totalPending: 'Total: to be confirmed',
    name: 'Name',
    date: 'Preferred date',
    mode: 'Mode',
    pickup: `Pickup at ${SITE.address.area}`,
    delivery: 'Delivery',
    address: 'Address',
    cake: 'Message on the cake',
    notes: 'Notes',
    payment: 'Payment: card or cash at pickup / delivery.',
    deliveryFee: 'Delivery fee: to be confirmed.',
    deposit: 'Event or large order: a deposit is required.',
    thanks: 'Thank you!',
    customIntro: 'I would like a custom order:',
    occasion: 'Occasion',
    eventDate: 'Event date',
    guests: 'Number of guests',
    customNote: `I understand orders need at least ${SITE.eventLeadDays} days notice and a deposit is required.`,
    salty: 'Hello Rose & Saveurs, I would like to know more about your salty creations (mini pizza, mini-croissants, mini-burgers...). Thank you!',
    general: 'Hello Rose & Saveurs, I would like to place an order.',
    formatDate: formatDateEn,
  },
} as const;

const t = COPY[MESSAGE_LANG];

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export interface OrderDetails {
  name: string;
  date: string;
  mode: 'pickup' | 'delivery';
  wilaya: string;
  address: string;
  cakeMessage: string;
  notes: string;
  isEvent: boolean;
}

function lineText(line: ResolvedLine): string {
  const price = line.lineTotal === null ? '' : ` (${formatPrice(line.lineTotal)})`;
  return `• ${line.qty} × ${line.name}${price}`;
}

export function buildOrderMessage(order: OrderDetails, lines: ResolvedLine[], total: number | null): string {
  const out: string[] = [t.greeting, '', t.intro, ...lines.map(lineText), ''];
  out.push(total === null ? t.totalPending : `${t.total} : ${formatPrice(total)}`, '');
  out.push(`${t.name} : ${order.name.trim()}`);
  out.push(`${t.date} : ${t.formatDate(order.date)}`);
  if (order.mode === 'delivery') {
    out.push(`${t.mode} : ${t.delivery} (${order.wilaya})`);
    out.push(`${t.address} : ${order.address.trim()}`);
  } else {
    out.push(`${t.mode} : ${t.pickup}`);
  }
  if (order.cakeMessage.trim()) out.push(`${t.cake} : ${order.cakeMessage.trim()}`);
  if (order.notes.trim()) out.push(`${t.notes} : ${order.notes.trim()}`);
  out.push('', t.payment);
  if (order.mode === 'delivery') out.push(t.deliveryFee);
  if (order.isEvent) out.push(t.deposit);
  out.push('', t.thanks);
  return out.join('\n');
}

export interface CustomBrief {
  occasion: string;
  eventDate: string;
  guests: string;
  cakeMessage: string;
  notes: string;
}

export function buildCustomMessage(brief: CustomBrief): string {
  const out: string[] = [t.greeting, '', t.customIntro];
  out.push(`${t.occasion} : ${brief.occasion}`);
  out.push(`${t.eventDate} : ${t.formatDate(brief.eventDate)}`);
  if (brief.guests.trim()) out.push(`${t.guests} : ${brief.guests.trim()}`);
  if (brief.cakeMessage.trim()) out.push(`${t.cake} : ${brief.cakeMessage.trim()}`);
  if (brief.notes.trim()) out.push(`${t.notes} : ${brief.notes.trim()}`);
  out.push('', t.customNote, '', t.thanks);
  return out.join('\n');
}

export const saltyUrl = (): string => whatsappUrl(t.salty);
export const generalOrderUrl = (): string => whatsappUrl(t.general);
