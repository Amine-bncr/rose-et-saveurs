// Re-runnable asset pipeline:  npm run assets
//
//  source-assets/photos/*   (HEIC / JPG / PNG / WebP)  ->  public/photos/<key>.<hash>-<width>.(avif|webp)
//  source-assets/brand/logo.jpg                        ->  public/brand/logo.jpg (untouched copy)
//                                                          public/brand/logo-<hash>-(400|800).webp + logo-<hash>-800.jpg
//
// It writes src/data/photo-manifest.json and src/data/brand-manifest.json, which the site reads.
// Stale outputs are removed, unchanged sources are skipped, and missing folders never fail the run.

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import convert from 'heic-convert';

const ROOT = process.cwd();
const PHOTO_SRC = path.join(ROOT, 'source-assets', 'photos');
const BRAND_SRC = path.join(ROOT, 'source-assets', 'brand');
const PHOTO_OUT = path.join(ROOT, 'public', 'photos');
const BRAND_OUT = path.join(ROOT, 'public', 'brand');
const PHOTO_MANIFEST = path.join(ROOT, 'src', 'data', 'photo-manifest.json');
const BRAND_MANIFEST = path.join(ROOT, 'src', 'data', 'brand-manifest.json');

const WIDTHS = [480, 800, 1200];
const IMAGE_EXT = /\.(heic|heif|jpe?g|png|webp)$/i;
// Files that must never reach the site: the pre-made collage and any Instagram screenshot.
const EXCLUDE = [/^IMG_9854/i, /screenshot/i];

const TARGET = { aubergine: '#3B0A33', gold: '#E6B873' };

const hash = (buffer) => createHash('sha1').update(buffer).digest('hex').slice(0, 8);
const hex = ([r, g, b]) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

async function listFiles(dir, filter) {
  if (!existsSync(dir)) return [];
  return (await readdir(dir)).filter(filter).sort();
}

async function readAsJpegOrRaw(file) {
  const buffer = await readFile(file);
  if (/\.(heic|heif)$/i.test(file)) {
    const jpeg = await convert({ buffer, format: 'JPEG', quality: 0.95 });
    return { source: Buffer.from(jpeg), original: buffer };
  }
  return { source: buffer, original: buffer };
}

async function cleanDir(dir, keep) {
  if (!existsSync(dir)) return;
  for (const name of await readdir(dir)) {
    if (!keep.has(name)) await rm(path.join(dir, name), { recursive: true, force: true });
  }
}

async function photos() {
  await mkdir(PHOTO_OUT, { recursive: true });
  const files = await listFiles(PHOTO_SRC, (f) => IMAGE_EXT.test(f) && !EXCLUDE.some((re) => re.test(f)));
  const manifest = {};
  const keep = new Set();

  for (const file of files) {
    const key = path.parse(file).name.replace(/\s+/g, '_');
    const { source, original } = await readAsJpegOrRaw(path.join(PHOTO_SRC, file));
    const id = hash(original);
    const base = sharp(source, { failOn: 'none' }).rotate();
    const meta = await sharp(await base.clone().toBuffer()).metadata();
    const srcWidth = meta.width ?? WIDTHS[WIDTHS.length - 1];
    const srcHeight = meta.height ?? srcWidth;
    const widths = WIDTHS.filter((w) => w <= srcWidth);
    if (widths.length === 0) widths.push(srcWidth);

    for (const w of widths) {
      for (const format of ['avif', 'webp']) {
        const name = `${key}.${id}-${w}.${format}`;
        keep.add(name);
        const out = path.join(PHOTO_OUT, name);
        if (existsSync(out)) continue;
        const pipeline = base.clone().resize({ width: w, withoutEnlargement: true });
        await (format === 'avif' ? pipeline.avif({ quality: 52, effort: 4 }) : pipeline.webp({ quality: 76 })).toFile(out);
      }
    }
    const largest = widths[widths.length - 1];
    manifest[key] = { hash: id, width: largest, height: Math.round((srcHeight / srcWidth) * largest), widths };
    console.log(`photo  ${key}  ${srcWidth}x${srcHeight}  -> ${widths.join('/')}px`);
  }

  await cleanDir(PHOTO_OUT, keep);
  await writeFile(PHOTO_MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`${files.length} photo(s) processed.`);
}

async function sampleColours(buffer) {
  const size = 160;
  const { data, info } = await sharp(buffer).resize(size, size, { fit: 'inside' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (i) => [data[i], data[i + 1], data[i + 2]];
  const at = (x, y) => px((y * info.width + x) * 3);
  // Aubergine: average of the four corners.
  const corners = [at(2, 2), at(info.width - 3, 2), at(2, info.height - 3), at(info.width - 3, info.height - 3)];
  const aubergine = [0, 1, 2].map((c) => corners.reduce((sum, p) => sum + p[c], 0) / corners.length);
  // Gold: average of the brightest warm pixels (the script wordmark).
  const warm = [];
  for (let i = 0; i < data.length; i += 3) {
    const [r, g, b] = px(i);
    if (r > 170 && r > g && g > b && r - b > 50) warm.push([r, g, b]);
  }
  warm.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  const top = warm.slice(Math.floor(warm.length * 0.6));
  const gold = top.length ? [0, 1, 2].map((c) => top.reduce((sum, p) => sum + p[c], 0) / top.length) : null;
  return { aubergine: hex(aubergine), gold: gold ? hex(gold) : null };
}

async function logo() {
  await mkdir(BRAND_OUT, { recursive: true });
  const candidates = await listFiles(BRAND_SRC, (f) => /^logo\.(jpe?g|png)$/i.test(f));
  if (candidates.length === 0) {
    await cleanDir(BRAND_OUT, new Set());
    await writeFile(BRAND_MANIFEST, JSON.stringify({ logo: null }, null, 2) + '\n');
    console.log('logo   none found in source-assets/brand (the site falls back to its inline lockup).');
    return;
  }
  const file = path.join(BRAND_SRC, candidates[0]);
  const original = await readFile(file);
  const id = hash(original);
  const meta = await sharp(original).metadata();
  const width = meta.width ?? 800;
  const height = meta.height ?? width;
  const keep = new Set(['logo.jpg', `logo-${id}-400.webp`, `logo-${id}-800.webp`, `logo-${id}-800.jpg`]);

  await copyFile(file, path.join(BRAND_OUT, 'logo.jpg')); // stable URL for Open Graph tags
  const resized = (w) => sharp(original).resize({ width: w, withoutEnlargement: true });
  await resized(400).webp({ quality: 90 }).toFile(path.join(BRAND_OUT, `logo-${id}-400.webp`));
  await resized(800).webp({ quality: 90 }).toFile(path.join(BRAND_OUT, `logo-${id}-800.webp`));
  await resized(800).jpeg({ quality: 92 }).toFile(path.join(BRAND_OUT, `logo-${id}-800.jpg`));
  await cleanDir(BRAND_OUT, keep);

  const sampled = await sampleColours(original);
  await writeFile(
    BRAND_MANIFEST,
    JSON.stringify({ logo: { hash: id, width: Math.min(width, 800), height: Math.round((height / width) * Math.min(width, 800)) }, sampled }, null, 2) + '\n',
  );
  console.log(`logo   ${width}x${height}`);
  console.log(`colour sampled aubergine ${sampled.aubergine} (target ${TARGET.aubergine}), gold ${sampled.gold ?? 'n/a'} (target ${TARGET.gold})`);
}

await photos();
await logo();
