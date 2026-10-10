import manifestJson from '../data/photo-manifest.json';
import { PHOTOS, type PhotoKey } from '../data/photos';
import { Lattice } from './motifs/Lattice';
import { Rose } from './motifs/Rose';

interface PhotoAsset {
  hash: string;
  width: number;
  height: number;
  widths: number[];
}

const MANIFEST: Record<string, PhotoAsset> = manifestJson;

interface PhotoProps {
  photoKey: PhotoKey | null;
  sizes: string;
  eager?: boolean;
  /** Overrides the alt text from photos.ts. */
  alt?: string;
}

/** Arch-and-pattern placeholder, used when a photo is missing. */
function Placeholder({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="relative h-full w-full bg-velvet">
      <Lattice drift={false} className="opacity-100" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 m-auto h-1/3 w-1/3 text-gold" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <Rose x={50} y={50} scale={3.4} />
      </svg>
    </div>
  );
}

/** Fills its parent. Uses AVIF/WebP from the asset pipeline, with per-photo focal point and crop. */
export function Photo({ photoKey, sizes, eager = false, alt }: PhotoProps) {
  const asset = photoKey ? MANIFEST[photoKey] : undefined;
  if (!photoKey || !asset) return <Placeholder label={alt ?? 'Photo coming soon'} />;

  const meta: { alt: string; focus: { x: number; y: number }; zoom?: number } = PHOTOS[photoKey];
  const srcSet = (format: 'avif' | 'webp') => asset.widths.map((w) => `/photos/${photoKey}.${asset.hash}-${w}.${format} ${w}w`).join(', ');
  const position = `${meta.focus.x}% ${meta.focus.y}%`;

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/photos/${photoKey}.${asset.hash}-${asset.width}.webp`}
        width={asset.width}
        height={asset.height}
        alt={alt ?? meta.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position, transformOrigin: position, transform: meta.zoom ? `scale(${meta.zoom})` : undefined }}
      />
    </picture>
  );
}
