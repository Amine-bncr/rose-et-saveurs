import manifestJson from '../data/photo-manifest.json';
import { PHOTOS, type PhotoKey, type PhotoMeta } from '../data/photos';
import { Rose } from './motifs/Rose';

interface SizedAsset {
  width: number;
  height: number;
  widths: number[];
}

interface PhotoAsset extends SizedAsset {
  hash: string;
  /** Background-removed version, when the pipeline could make one. */
  cut?: SizedAsset;
}

const MANIFEST: Record<string, PhotoAsset> = manifestJson;

interface PhotoProps {
  photoKey: PhotoKey | null;
  sizes: string;
  eager?: boolean;
  /** Use the background-removed version (contained, with a soft shadow) when it exists. */
  cutout?: boolean;
  /** Render nothing, instead of the placeholder, when the photo is missing. */
  optional?: boolean;
  /** Overrides the alt text from photos.ts. */
  alt?: string;
  /** Alt text used when the photo has no entry in photos.ts. */
  fallbackAlt?: string;
}

/** Soft placeholder, used when a photo is missing. */
function Placeholder({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="grid h-full w-full place-items-center bg-blob">
      <svg viewBox="-16 -16 32 32" className="h-1/3 w-1/3 text-accent/60" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" aria-hidden="true">
        <Rose x={0} y={0} scale={1.3} />
      </svg>
    </div>
  );
}

/** Fills its parent. AVIF/WebP from the asset pipeline, with per-photo focal point and crop. */
export function Photo({ photoKey, sizes, eager = false, cutout = false, optional = false, alt, fallbackAlt }: PhotoProps) {
  const asset = photoKey ? MANIFEST[photoKey] : undefined;
  if (!photoKey || !asset) return optional ? null : <Placeholder label={alt ?? 'Photo coming soon'} />;

  const known: PhotoMeta | undefined = PHOTOS[photoKey];
  const meta: PhotoMeta = known ?? { alt: fallbackAlt ?? 'Rose & Saveurs pâtisserie', focus: { x: 50, y: 50 } };
  const cut = cutout ? asset.cut : undefined;
  const sized = cut ?? asset;
  const infix = cut ? 'cut-' : '';
  const srcSet = (format: 'avif' | 'webp') => sized.widths.map((w) => `/photos/${photoKey}.${asset.hash}-${infix}${w}.${format} ${w}w`).join(', ');
  const position = `${meta.focus.x}% ${meta.focus.y}%`;

  const picture = (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/photos/${photoKey}.${asset.hash}-${infix}${sized.width}.webp`}
        width={sized.width}
        height={sized.height}
        alt={alt ?? meta.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        className={
          cut
            ? 'absolute inset-0 h-full w-full object-contain p-[7%] drop-shadow-[0_14px_14px_rgba(59,10,51,0.28)]'
            : 'absolute inset-0 h-full w-full object-cover'
        }
        style={cut ? undefined : { objectPosition: position, transformOrigin: position, transform: meta.zoom ? `scale(${meta.zoom})` : undefined }}
      />
    </picture>
  );

  if (cut) return picture;
  // Normal photos are clipped to their box (zoomed crops must never spill into the card).
  return <div className={`absolute inset-0 overflow-hidden ${cutout ? 'rounded-2xl' : ''}`}>{picture}</div>;
}
