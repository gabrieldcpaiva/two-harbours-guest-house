import { readdir, readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const root = 'dist';
const failures = [];
const htmlFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (extname(path) === '.html') htmlFiles.push(path);
  }
}
await walk(root);
const required = ['index.html', 'rooms/index.html', 'the-house/index.html', 'getting-here/index.html', 'enquire/index.html', 'privacy/index.html', 'terms/index.html', 'accessibility/index.html', '404.html'];
for (const file of required) {
  try { await stat(join(root, file)); } catch { failures.push(`Missing page: ${file}`); }
}
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!/<html lang="en-GB">/.test(html)) failures.push(`${file}: missing language`);
  if (!/<main id="main"/.test(html)) failures.push(`${file}: missing main landmark`);
  if (!/Skip to content/.test(html)) failures.push(`${file}: missing skip link`);
  if (!/<meta name="description"/.test(html)) failures.push(`${file}: missing description`);
  if (!/<link rel="canonical"/.test(html)) failures.push(`${file}: missing canonical`);
  if (!/\[[^\]]+to be (confirmed|approved|published)/i.test(html) && !/placeholder/.test(html)) failures.push(`${file}: expected visible placeholders not found`);
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(match[0])) failures.push(`${file}: image without meaningful alt: ${match[0].slice(0, 100)}`);
    if (!/\bwidth="[^"]+"/.test(match[0]) || !/\bheight="[^"]+"/.test(match[0])) failures.push(`${file}: image without dimensions`);
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const path = match[1];
    if (path.startsWith('/_image') || path.startsWith('/@')) continue;
    const candidates = [join(root, path), join(root, path, 'index.html')];
    let exists = false;
    for (const candidate of candidates) { try { await stat(candidate); exists = true; break; } catch {} }
    if (!exists) failures.push(`${file}: broken local asset/link ${path}`);
  }
}
const index = await readFile(join(root, 'index.html'), 'utf8');
const visibleText = index.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<style\b[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
if (/\b(reviews?|awards?|ratings?|Tripadvisor|Travellers)\b/i.test(visibleText)) failures.push('Home contains review/award/rating language');
console.log(`${htmlFiles.length} HTML pages checked; ${failures.length} failures.`);
for (const failure of failures) console.error('FAIL', failure);
if (failures.length) process.exitCode = 1;
