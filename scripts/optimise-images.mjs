import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const files = {
  aerial: 'aerial-two-harbours.jpg',
  front: 'front2.jpg',
  patio: 'patio.jpg',
  view: 'view.jpg',
  sunset: 'sunset-gallery.jpg',
  sound: 'tarbert-scalpay.jpg',
  stone: 'scalpay-1.jpg',
  bridge: 'scalpay-harris-bridge.jpg',
  dining: 'diningnew.jpg',
  breakfast: 'breakfast3.jpg',
  luskentyre: 'luskentyrenew1.jpg',
  'luskentyre-light': 'luskentyrenew2.jpg',
  scarista: 'scaristanew2.jpg',
  'scarista-bed': 'scaristanew4.jpg',
  borve: 'borve1.jpg',
  'borve-alt': 'borve6.jpg',
};

const sourceDir = path.resolve('photos/originals');
const outDir = path.resolve('public/images');
await mkdir(outDir, { recursive: true });

const manifest = {};

for (const [id, filename] of Object.entries(files)) {
  const input = path.join(sourceDir, filename);
  const base = sharp(input).rotate();
  const meta = await base.metadata();
  const widths = [480, 768, 1100, 1440, 1920].filter((width) => width < meta.width);
  const full = Math.min(meta.width, 1920);
  if (!widths.includes(full)) widths.push(full);
  manifest[id] = { width: meta.width, height: meta.height, widths };

  for (const width of widths) {
    const resized = sharp(input).rotate().resize({ width, withoutEnlargement: true });
    await resized.clone().avif({ quality: 50, effort: 4 }).toFile(path.join(outDir, `${id}-${width}.avif`));
    await resized.clone().webp({ quality: 76 }).toFile(path.join(outDir, `${id}-${width}.webp`));
  }
  console.log(`${id}: ${meta.width}x${meta.height} → ${widths.join(', ')}`);
}

await writeFile(path.resolve('src/data/images.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${Object.keys(manifest).length} images`);
