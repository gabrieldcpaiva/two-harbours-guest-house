// Source photographs are already compressed. Astro generates responsive AVIF/WebP
// variants at build time. This script reports source dimensions and sizes so the
// owner can see which photographs need a higher-resolution replacement.
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
const dir = 'src/assets/images';
for (const file of await readdir(dir)) {
  const path = `${dir}/${file}`;
  const meta = await sharp(path).metadata();
  const size = await stat(path);
  console.log(`${file}: ${meta.width}×${meta.height}, ${(size.size / 1024).toFixed(0)} kB`);
}
console.log('Run npm run build to regenerate responsive AVIF/WebP assets in dist/.');
