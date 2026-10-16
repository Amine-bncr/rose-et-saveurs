// After background removal, props can survive as separate foreground objects (a tree, a bell,
// a tin). This keeps the main item(s) and erases small separate pieces.
import sharp from 'sharp';

const WORK_WIDTH = 320; // analysis resolution
const BRIDGE = 4; // px (at work resolution): pieces closer than this count as one item
const MIN_RATIO = 0.22; // keep pieces at least this fraction of the biggest piece

function dilate(mask, w, h, r) {
  const tmp = new Uint8Array(w * h);
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      let hit = 0;
      for (let k = Math.max(0, x - r); k <= Math.min(w - 1, x + r) && !hit; k += 1) hit = mask[y * w + k];
      tmp[y * w + x] = hit;
    }
  }
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < h; y += 1) {
      let hit = 0;
      for (let k = Math.max(0, y - r); k <= Math.min(h - 1, y + r) && !hit; k += 1) hit = tmp[k * w + x];
      out[y * w + x] = hit;
    }
  }
  return out;
}

/** @param {Buffer} png transparent PNG. Returns a PNG with only the main item(s) left. */
export async function keepMainSubject(png) {
  const meta = await sharp(png).metadata();
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .extractChannel(3)
    .resize({ width: WORK_WIDTH })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  const solid = new Uint8Array(w * h);
  for (let i = 0; i < solid.length; i += 1) solid[i] = data[i] > 96 ? 1 : 0;
  const joined = dilate(solid, w, h, BRIDGE);

  // Label connected pieces (4-connectivity) of the joined mask.
  const labels = new Int32Array(w * h);
  const areas = [0];
  const stack = [];
  for (let start = 0; start < labels.length; start += 1) {
    if (!joined[start] || labels[start]) continue;
    const id = areas.length;
    areas.push(0);
    labels[start] = id;
    stack.push(start);
    while (stack.length) {
      const p = stack.pop();
      if (solid[p]) areas[id] += 1;
      const x = p % w;
      const y = (p - x) / w;
      const neighbours = [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1];
      for (const n of neighbours) {
        if (n >= 0 && joined[n] && !labels[n]) {
          labels[n] = id;
          stack.push(n);
        }
      }
    }
  }
  const biggest = Math.max(0, ...areas);
  if (biggest === 0) return png;

  const rgba = Buffer.alloc(w * h * 4, 255);
  for (let i = 0; i < labels.length; i += 1) rgba[i * 4 + 3] = labels[i] && areas[labels[i]] >= biggest * MIN_RATIO ? 255 : 0;
  const mask = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .resize(meta.width, meta.height, { kernel: 'linear' })
    .png()
    .toBuffer();
  return sharp(png).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}
