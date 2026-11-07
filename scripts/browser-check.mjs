import { chromium as playwright } from 'playwright';
import chromium from '@sparticuz/chromium';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

import { join } from 'node:path';
import { tmpdir } from 'node:os';

const base = process.env.BASE_URL || 'http://localhost:3000';
const routes = ['/', '/rooms/', '/the-house/', '/getting-here/', '/enquire/', '/privacy/', '/terms/', '/accessibility/'];
const widths = [320, 390, 768, 1440];
const out = 'test-results';
await mkdir(join(out, 'screenshots'), { recursive: true });
const executablePath = process.env.CHROMIUM_PATH || await chromium.executablePath();
const lib = join(tmpdir(), 'al2023', 'lib');
const args = chromium.args.filter((arg) => arg !== '--single-process');
const browser = await playwright.launch({ executablePath, args, headless: true, env: { ...process.env, LD_LIBRARY_PATH: `${lib}:${tmpdir()}` } });
const report = { base, pages: [], checks: [], failures: [] };
const check = (name, ok, detail = '') => { report.checks.push({ name, ok, detail }); if (!ok) report.failures.push(`${name}: ${detail}`); };

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: width < 500 ? 844 : 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      check(`HTTP ${width} ${route}`, response?.status() === 200, String(response?.status()));
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth, images: [...document.images].map(i => ({ alt: i.alt, complete: i.complete, natural: i.naturalWidth })) }));
      check(`No horizontal overflow ${width} ${route}`, layout.scroll <= layout.client + 1, `${layout.scroll}/${layout.client}`);
      check(`Image alt text ${width} ${route}`, layout.images.every(i => i.alt.trim().length > 0), JSON.stringify(layout.images.filter(i => !i.alt.trim())));
      // Bring lazy photographs into the viewport before screenshots and audit.
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 45));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle');
      await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => {});
      const loaded = await page.evaluate(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
      check(`Images loaded ${width} ${route}`, loaded);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      report.pages.push({ width, route, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
      check(`Axe ${width} ${route}`, axe.violations.length === 0, axe.violations.map(v => `${v.id}(${v.nodes.length})`).join(','));
      if (width === 390 || width === 1440) await page.screenshot({ path: join(out, 'screenshots', `${route.replaceAll('/', '_') || 'home'}-${width}.png`), fullPage: true });
    }
    check(`No page errors ${width}`, errors.length === 0, errors.join('; '));
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  check('Skip link first tab', await page.evaluate(() => document.activeElement?.classList.contains('skip-link')));
  await page.keyboard.press('Enter');
  check('Skip link targets main', await page.evaluate(() => document.activeElement?.id === 'main'));
  const toggle = page.getByRole('button', { name: /Menu|Close/ });
  await toggle.click();
  check('Mobile menu opens', await toggle.getAttribute('aria-expanded') === 'true');
  await page.keyboard.press('Escape');
  check('Escape closes menu and restores focus', await toggle.getAttribute('aria-expanded') === 'false' && await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle')));
  await toggle.click();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Rooms', exact: true }).click();
  await page.waitForURL('**/rooms/');
  check('Mobile navigation works', page.url().endsWith('/rooms/'));

  await page.goto(base + '/enquire/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Prepare email enquiry/ }).click();
  check('Empty form blocked', await page.locator('#name').getAttribute('aria-invalid') === 'true');
  check('Error announced', (await page.locator('[data-form-status]').textContent()).includes('Nothing has been sent'));
  await page.locator('#name').fill('Test Guest');
  await page.locator('#email').fill('not-an-email');
  await page.locator('#arrival').fill('2030-06-10');
  await page.locator('#nights').fill('2');
  await page.getByRole('button', { name: /Prepare email enquiry/ }).click();
  check('Invalid email blocked', await page.locator('#email').getAttribute('aria-invalid') === 'true');
  await page.locator('#email').fill('guest@example.com');
  await page.locator('#room').selectOption('Scarista');
  await page.locator('#message').fill('Vegetarian breakfast, please. Arrival around 5pm.');
  await page.getByRole('button', { name: /Prepare email enquiry/ }).click();
  const mailto = await page.getByRole('link', { name: 'Open email app' }).getAttribute('href');
  check('Valid enquiry prepares mailto', mailto?.startsWith('mailto:enquiries@twoharbours.com?') && decodeURIComponent(mailto).includes('Scarista') && decodeURIComponent(mailto).includes('Vegetarian breakfast'));
  check('Honest success message', (await page.locator('[data-form-status]').textContent()).includes('Nothing has been sent yet'));
  const requests = [];
  page.on('request', r => { if (r.method() === 'POST') requests.push(r.url()); });
  check('No form POST/storage backend', requests.length === 0);
  await page.screenshot({ path: join(out, 'screenshots', 'enquire-form-ready-390.png'), fullPage: true });

  // Internal links and fragment targets across the built/dev site.
  const hrefs = new Set();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    for (const href of await page.locator('a[href]').evaluateAll(as => as.map(a => a.getAttribute('href')))) hrefs.add(href);
  }
  for (const href of hrefs) {
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    const url = new URL(href, base);
    if (url.origin !== new URL(base).origin) continue;
    const res = await page.request.get(url.toString());
    check(`Internal link ${href}`, res.status() === 200, String(res.status()));
    if (url.hash) {
      await page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
      check(`Fragment ${href}`, await page.evaluate((id) => Boolean(document.getElementById(id)), url.hash.slice(1)));
    }
  }
  await context.close();
} finally {
  await browser.close();
}
await writeFile(join(out, 'browser-report.json'), JSON.stringify(report, null, 2));
console.log(`${report.checks.length} checks; ${report.failures.length} failures; ${report.pages.reduce((n, p) => n + p.violations.length, 0)} axe violations.`);
for (const f of report.failures) console.error('FAIL', f);
for (const p of report.pages) for (const v of p.violations) console.error('AXE', p.width, p.route, v.id, v.nodes.map(n => n.target.join(' ')).join(' | '));
if (report.failures.length) process.exitCode = 1;
