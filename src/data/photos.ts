/**
 * Per-photo metadata. Keys are the file names (without extension) in source-assets/photos.
 * `focus` is the object-position in percent; `zoom` crops in further around that point.
 * Alt text was written from the owner's description of each photo and should be checked
 * against the real pictures. Photos that include the Christmas props in the background
 * (IMG_8924, IMG_8943, IMG_9441, IMG_9477) are zoomed so the props fall outside the frame.
 */
export interface PhotoMeta {
  alt: string;
  focus: { x: number; y: number };
  zoom?: number;
}

const propCrop = { focus: { x: 50, y: 72 }, zoom: 1.3 } as const;
const centre = { x: 50, y: 50 } as const;

export const PHOTOS = {
  IMG_2968: { alt: 'A gold-dusted chocolate bûchette beside its two cut halves on a blush marble surface', focus: centre },
  IMG_9116: { alt: 'A tiramisu bûchette cut open to show its layers', focus: centre },
  IMG_9103: { alt: 'A whole tiramisu bûchette on a blush marble surface', focus: centre },
  IMG_9477: { alt: 'A pistachio bûchette cut open', ...propCrop },
  IMG_9441: { alt: 'A whole pistachio bûchette', ...propCrop },
  IMG_8828: { alt: 'A lemon bûchette cut open', focus: centre },
  IMG_8801: { alt: 'A whole lemon bûchette', focus: centre },
  IMG_8943: { alt: 'A chocolate and hazelnut bûchette cut open', ...propCrop },
  IMG_8924: { alt: 'A whole chocolate and hazelnut bûchette', ...propCrop },
  IMG_9738: { alt: 'A fruit tart on a blush marble surface', focus: centre },
  IMG_9739: { alt: 'A lemon tart on a blush marble surface', focus: centre },
  IMG_9737: { alt: 'A peanut tart on a blush marble surface', focus: centre },
  IMG_3054: { alt: 'A stack of NYC-style cookies', focus: centre },
  IMG_9008: { alt: 'A cheesecake on a blush marble surface', focus: centre },
  IMG_9361: { alt: 'A slice of almond and chocolate cake', focus: centre },
  IMG_3285: { alt: 'Strawberry tartlets with a nut-crusted edge', focus: centre },
  IMG_9011: { alt: 'A cheesecake photographed from a second angle', focus: centre },
  IMG_9352: { alt: 'A slice of cake, photographed at an angle', focus: centre },
  IMG_9117: { alt: 'A tiramisu bûchette cut open, second view', focus: centre },
} as const satisfies Record<string, PhotoMeta>;

export type PhotoKey = keyof typeof PHOTOS;

export const HERO_KEY: PhotoKey = 'IMG_2968';
/** The `sizes` attribute of the hero photo; also used by the HTML preload. */
export const HERO_SIZES = '(min-width: 1024px) 440px, 80vw';

/** Gallery order. IMG_9854 (the collage) is deliberately absent. */
export const GALLERY_KEYS: PhotoKey[] = [
  'IMG_3285',
  'IMG_9011',
  'IMG_9352',
  'IMG_9117',
  'IMG_9738',
  'IMG_3054',
  'IMG_9361',
  'IMG_9739',
  'IMG_8828',
  'IMG_9103',
];
