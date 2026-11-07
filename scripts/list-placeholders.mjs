import { readFile, writeFile } from 'node:fs/promises';
const site = JSON.parse(await readFile('src/data/site.json', 'utf8'));
const found = new Map();
function visit(value, path = '') {
  if (typeof value === 'string') {
    for (const match of value.matchAll(/\[[^\]]+\]/g)) {
      const text = match[0];
      if (!found.has(text)) found.set(text, []);
      found.get(text).push(path);
    }
  } else if (Array.isArray(value)) value.forEach((v, i) => visit(v, `${path}[${i}]`));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) visit(v, path ? `${path}.${k}` : k);
}
visit(site);
const lines = ['# Placeholders still to fill', '', 'Generated from `src/data/site.json` by `npm run placeholders`. Square brackets are intentional and visible on the site.', '', '| Placeholder | Where it appears in the content model |', '| --- | --- |'];
for (const [text, paths] of [...found.entries()].sort((a, b) => a[0].localeCompare(b[0]))) lines.push(`| ${text} | ${[...new Set(paths)].map((p) => `\`${p}\``).join(', ')} |`);
lines.push('', '## Also visible in page templates', '', '- `[Full postal address / street line to be confirmed]` — footer.', '- `[Original interior features to be confirmed by the owner]` — The house.', '- `[General enquiry response time to be confirmed]` — Enquire.', '', 'Legal pages deliberately remain drafts until the owner supplies approved wording.');
await writeFile('docs/PLACEHOLDERS.md', lines.join('\n') + '\n');
console.log(`${found.size} unique placeholders written to docs/PLACEHOLDERS.md`);
