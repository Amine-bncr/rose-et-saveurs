import type { PhotoKey } from './photos';

export type CategoryId = 'tartes' | 'cookies' | 'cheesecake' | 'buchettes' | 'gateau';
export type Flavour = 'citron' | 'pistache' | 'fraise';

export interface MenuVariant {
  id: string;
  label: string;
  /** Price in DA, or null while it is not set. */
  price: number | null;
}

export interface MenuItem {
  id: string;
  category: CategoryId;
  name: string;
  nameAr?: string;
  /** Price in DA, or null while it is not set. */
  price: number | null;
  /** Exterior or main photo. Null shows the arch-and-pattern placeholder. */
  photo: PhotoKey | null;
  /** Cut-open photo, used by the Bûchette reveal. */
  photoCut?: PhotoKey;
  description?: string;
  variants?: MenuVariant[];
  badge?: 'Signature';
  flavour?: Flavour;
  available: boolean;
}

export interface MenuCategory {
  id: CategoryId;
  label: string;
}

/** Category order. */
export const CATEGORIES: MenuCategory[] = [
  { id: 'tartes', label: 'Nos Tartes' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'cheesecake', label: 'Cheesecake' },
  { id: 'buchettes', label: 'Bûchettes' },
  { id: 'gateau', label: 'Gâteaux' },
];

/**
 * The menu. To add an item, add an entry here (and its photo to source-assets/photos plus
 * src/data/photos.ts). Prices are null until they are ready.
 */
export const MENU: MenuItem[] = [
  { id: 'tarte-banoffee', category: 'tartes', name: 'Tarte Banoffee', price: null, photo: null, available: true },
  { id: 'tarte-fruits', category: 'tartes', name: 'Tarte aux Fruits', price: null, photo: 'IMG_9738', flavour: 'fraise', available: true },
  { id: 'tarte-citron', category: 'tartes', name: 'Tarte au Citron', price: null, photo: 'IMG_9739', flavour: 'citron', available: true },
  { id: 'tarte-cacahuetes', category: 'tartes', name: 'Tarte aux Cacahuètes', price: null, photo: 'IMG_9737', available: true },
  { id: 'nyc-cookies', category: 'cookies', name: 'NYC Cookies', price: null, photo: 'IMG_3054', available: true },
  { id: 'cheesecake', category: 'cheesecake', name: 'Cheesecake', price: null, photo: 'IMG_9008', available: true },
  {
    id: 'buchette-tiramisu',
    category: 'buchettes',
    name: 'Bûchette Tiramisu',
    price: null,
    photo: 'IMG_9103',
    photoCut: 'IMG_9116',
    badge: 'Signature',
    available: true,
  },
  {
    id: 'buchette-pistache',
    category: 'buchettes',
    name: 'Bûchette Pistache',
    price: null,
    photo: 'IMG_9441',
    photoCut: 'IMG_9477',
    badge: 'Signature',
    flavour: 'pistache',
    available: true,
  },
  {
    id: 'buchette-citron',
    category: 'buchettes',
    name: 'Bûchette Citron',
    price: null,
    photo: 'IMG_8801',
    photoCut: 'IMG_8828',
    badge: 'Signature',
    flavour: 'citron',
    available: true,
  },
  {
    id: 'buchette-chocolat-noisettes',
    category: 'buchettes',
    name: 'Bûchette Chocolat-Noisettes',
    price: null,
    photo: 'IMG_8924',
    photoCut: 'IMG_8943',
    badge: 'Signature',
    available: true,
  },
  { id: 'gateau-amande-chocolat', category: 'gateau', name: 'Gâteau Amande Chocolat', price: null, photo: 'IMG_9361', available: true },
];

export const BUCHETTES = MENU.filter((item) => item.category === 'buchettes');

/** Teaser only: not orderable. "Monchons" is spelled as given; the owner should confirm it. */
export const COMING_SOON = ['Mini Pizza', 'Monchons', 'Mini-Croissants', 'Mini-Burgers'];

export function findItem(id: string): MenuItem | undefined {
  return MENU.find((item) => item.id === id);
}
