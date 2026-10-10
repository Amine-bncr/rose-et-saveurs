/** Single source of truth for contact details, hours, address and links. */
export const SITE = {
  name: 'Rose & Saveurs',
  handle: '@rose_et_saveurs',
  tagline: 'Douceurs qui font plaisir',
  bio: 'Pâtisserie artisanale · Alger · Sur commande',
  /** Digits only, used in wa.me links. */
  whatsapp: '+213793725077',
  phoneDisplay: '+213 79 37 25 077',
  phoneTel: '+213793725077',
  instagram: 'https://www.instagram.com/rose_et_saveurs/',
  tiktok: 'https://www.tiktok.com/@rose_et_saveurs',
  mapsUrl: 'https://maps.app.goo.gl/ZQGDvU9gz5nNzqq17',
  address: {
    line1: 'Les Sources',
    area: 'Bir Mourad Rais',
    city: 'Alger',
    country: 'DZ',
  },
  hours: { open: '09:00', close: '22:00', label: 'Every day, 09:00–22:00' },
  zones: ['Alger', 'Tipaza', 'Boumerdès', 'Blida'],
  deliveryFeeNote: 'Delivery fee confirmed on WhatsApp',
  paymentNote: 'Payment by card or cash at delivery or pickup',
  /** Minimum notice, in days, for custom orders and event or large orders. */
  eventLeadDays: 15,
  /** Time zone used to decide what "today" means for date pickers. */
  timeZone: 'Africa/Algiers',
} as const;

export type Zone = (typeof SITE.zones)[number];
