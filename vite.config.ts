import { readFileSync } from 'node:fs';
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { HERO_KEY, HERO_SIZES } from './src/data/photos.ts';

interface ManifestEntry {
  hash: string;
  widths: number[];
}

/** Preloads the hero photo (if the asset pipeline has produced it). */
function preloadHero(): Plugin {
  return {
    name: 'preload-hero-photo',
    transformIndexHtml(): HtmlTagDescriptor[] {
      let manifest: Record<string, ManifestEntry>;
      try {
        manifest = JSON.parse(readFileSync('src/data/photo-manifest.json', 'utf8')) as Record<string, ManifestEntry>;
      } catch {
        return [];
      }
      const entry = manifest[HERO_KEY];
      if (!entry) return [];
      const imagesrcset = entry.widths.map((w) => `/photos/${HERO_KEY}.${entry.hash}-${w}.avif ${w}w`).join(', ');
      return [
        {
          tag: 'link',
          attrs: { rel: 'preload', as: 'image', type: 'image/avif', imagesrcset, imagesizes: HERO_SIZES, fetchpriority: 'high' },
          injectTo: 'head',
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadHero()],
  build: { target: 'es2022', assetsInlineLimit: 0 },
});
