import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const shots = process.env.SHOTS === '1';
const outDir = process.env.SHOT_DIR || 'test-results';
mkdirSync(outDir, { recursive: true });

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const failures = [];
const report = { base, pages: [], contrast: null, checks: [] };
const check = (name, ok, detail = '') => {
  report.checks.push({ name, ok, detail });
  if (!ok) failures.push(`${name}: ${detail}`);
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
};

const lum = (r, g, b) => {
  const c = [r, g, b].map((value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const cream = lum(242, 240, 233);

async function prepare(page) {
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const images = [...document.images].filter((img) => img.getClientRects().length);
    for (const img of images) img.scrollIntoView({ block: 'center' });
    await new Promise((resolve) => setTimeout(resolve, 400));
    await Promise.all(images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise((resolve) => {
        const timer = setTimeout(resolve, 2500);
        img.addEventListener('load', () => { clearTimeout(timer); resolve(); }, { once: true });
        img.addEventListener('error', () => { clearTimeout(timer); resolve(); }, { once: true });
      });
    }));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
}

async function audit(page, label) {
  const axe = await new AxeBuilder({ page }).withTags(tags).analyze();
  report.pages.push({
    label,
    violations: axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 6).map((n) => ({ target: n.target, summary: n.failureSummary })),
    })),
  });
  check(`Axe ${label}`, axe.violations.length === 0, axe.violations.map((v) => `${v.id}(${v.nodes.length})`).join(', ') || '0');
}

const browser = await chromium.launch({ headless: true });

try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(String(error)));
    await prepare(page);
    const layout = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      h1Text: document.querySelector('h1')?.innerText || '',
      alts: [...document.images].filter((img) => img.getClientRects().length && !img.alt.trim() && img.getAttribute('aria-hidden') !== 'true').length,
      loaded: [...document.images].filter((img) => img.getClientRects().length).every((img) => img.complete && img.naturalWidth > 0),
      heroSource: document.querySelector('#hero img')?.naturalWidth || 0,
      books: [...document.querySelectorAll('a')].filter((a) => /Book Direct/.test(a.textContent)).map((a) => a.href),
      body: document.body.innerText,
      mono: [...document.querySelectorAll('*')].filter((el) => getComputedStyle(el).fontFamily.includes('IBM Plex Mono')).map((el) => el.textContent.trim().slice(0, 40)),
    }));
    check(`No overflow ${width}`, layout.scroll <= layout.client + 1, `${layout.scroll}/${layout.client}`);
    check(`One h1 ${width}`, layout.h1 === 1, layout.h1Text.replace(/\n/g, ' | '));
    check(`Images ${width}`, layout.loaded && layout.alts === 0, `missing alt ${layout.alts}`);
    check(`Hero source ${width}`, layout.heroSource >= 1100, `${layout.heroSource}px`);
    check(`Book links ${width}`, layout.books.length > 0 && layout.books.every((href) => href.includes('availability.php')), String(layout.books.length));
    check(`No tech chrome ${width}`, !/System Operational|Live feed|telemetry|New York Times|unsplash/i.test(layout.body));
    check(`Times attribution ${width}`, layout.body.includes('The Times') && !layout.body.includes('New York'));
    await audit(page, `${width}`);
    check(`No page errors ${width}`, errors.length === 0, errors.join('; '));

    const regions = ['#hero-text', '#hero a[href="#rooms"]'];
    let worst = 99;
    for (const selector of regions) {
      const box = await page.locator(selector).boundingBox();
      if (!box) continue;
      await page.locator(selector).evaluate((node) => {
        node.style.setProperty('color', 'transparent', 'important');
        node.querySelectorAll('*').forEach((child) => child.style.setProperty('color', 'transparent', 'important'));
      });
      const buffer = await page.screenshot({
        clip: { x: box.x, y: box.y, width: Math.max(1, box.width), height: Math.max(1, box.height) },
        type: 'png',
      });
      const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      for (let i = 0; i < data.length; i += info.channels * 8) {
        const L = lum(data[i], data[i + 1], data[i + 2]);
        const value = (Math.max(cream, L) + 0.05) / (Math.min(cream, L) + 0.05);
        if (value < worst) worst = value;
      }
      await page.locator(selector).evaluate((node) => {
        node.style.removeProperty('color');
        node.querySelectorAll('*').forEach((child) => child.style.removeProperty('color'));
      });
    }
    const buttonRatio = await page.evaluate(() => {
      const link = [...document.querySelectorAll('a')].find((node) => node.textContent.includes('Book Direct'));
      const chip = link?.querySelector('span');
      const label = chip?.querySelector('span.relative');
      const parse = (value) => value.match(/\d+/g).slice(0, 3).map(Number);
      return { bg: parse(getComputedStyle(chip).backgroundColor), fg: parse(getComputedStyle(label).color), size: getComputedStyle(label).fontSize };
    });
    const buttonContrast = (Math.max(lum(...buttonRatio.fg), lum(...buttonRatio.bg)) + 0.05) / (Math.min(lum(...buttonRatio.fg), lum(...buttonRatio.bg)) + 0.05);
    report.contrast = report.contrast || {};
    report.contrast[width] = { hero: Number(worst.toFixed(2)), button: Number(buttonContrast.toFixed(2)), buttonSize: buttonRatio.size };
    check(`Hero text contrast ${width}`, worst >= 4.5, `${worst.toFixed(2)}:1`);
    check(`Book Direct contrast ${width}`, buttonContrast >= 4.5, `${buttonContrast.toFixed(2)}:1 at ${buttonRatio.size}`);

    if (shots && (width === 1440 || width === 390)) {
      const name = width === 1440 ? 'desktop_1440' : 'mobile_390';
      await page.locator('#hero').screenshot({
        path: path.join(outDir, `hero_${name}.jpg`),
        type: 'jpeg',
        quality: 75,
      });
      const fullPath = path.join(outDir, `fullpage_${name}.jpg`);
      await page.screenshot({ path: fullPath, fullPage: true, type: 'jpeg', quality: 75 });
      const meta = await sharp(fullPath).metadata();
      if (meta.height > 12000) {
        const chunk = 10000;
        let part = 1;
        for (let top = 0; top < meta.height; top += chunk) {
          const height = Math.min(chunk, meta.height - top);
          await sharp(fullPath).extract({ left: 0, top, width: meta.width, height }).jpeg({ quality: 75 }).toFile(path.join(outDir, `fullpage_${name}_part${part}.jpg`));
          part += 1;
        }
      }
    }
    await context.close();
  }

  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await prepare(page);
    const state = await page.evaluate(() => ({
      pins: document.querySelectorAll('.pin-spacer').length,
      quote: document.body.innerText.includes('dangerously good'),
      heading: document.body.innerText.includes('In their words'),
      removed: /The reasons to cross the bridge|Not a booking calendar/.test(document.body.innerText),
    }));
    check(`Reduced motion still ${width}`, state.pins === 0 && state.quote && state.heading && !state.removed, JSON.stringify(state));
    await audit(page, `${width} reduced-motion`);
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  check('Skip link first', await page.evaluate(() => document.activeElement?.classList.contains('skip-link')));
  await page.keyboard.press('Enter');
  check('Skip target', await page.evaluate(() => document.activeElement?.id === 'main'));
  const menu = page.getByRole('button', { name: /Menu|Close/ });
  await menu.click();
  check('Menu opens', (await menu.getAttribute('aria-expanded')) === 'true');
  await page.keyboard.press('Escape');
  check('Menu closes', (await menu.getAttribute('aria-expanded')) === 'false');
  await context.close();
} finally {
  await browser.close();
}

await mkdir(path.dirname(path.join(outDir, 'verify.json')), { recursive: true });
await writeFile(path.join(outDir, 'verify.json'), JSON.stringify(report, null, 2));
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((item) => console.log(`- ${item}`));
  process.exitCode = 1;
} else {
  console.log('\nAll checks passed.');
}
