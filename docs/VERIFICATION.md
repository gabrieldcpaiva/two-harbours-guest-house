# Verification report

Date: 2026-11-07. Environment: Astro 7.4.7, Node 22.23.4, Chromium 153 via Playwright.

## Build and static checks

- `npm run build`: **pass** — 9 static pages generated.
- `npm run check`: **pass** — 0 errors, 0 warnings, 0 hints.
- `npm run test:site`: **pass** — 9 HTML pages; required screens present; local assets/links resolve; images have alt text and dimensions; no review/award/rating copy on the home page.
- `npm audit`: **0 vulnerabilities**.

## Responsive and accessibility checks

Browser matrix: **320, 390, 768 and 1440 px** across Home, Rooms, The house, Getting here, Enquire, Privacy, Terms and Accessibility.

- **191 browser checks, 0 failures** on the development server and again on the built static production preview (`dist/` served on port 4321).
- No horizontal page overflow at any tested width.
- All photographs loaded after scrolling; every image has non-empty alt text.
- Axe (WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags): **0 violations across 32 page/viewport audits**.
- Keyboard: skip link is first tab stop and moves focus to main; mobile menu opens, closes with Escape and restores focus to its button; navigation works from the mobile menu.
- Internal links and room fragment targets resolve.
- No JavaScript page errors.

## Contrast

`npm run contrast` checks the declared design-system pairs. All pass AA for normal text (minimum **5.27:1**). The photographic hero uses a dark gradient; the lightest-photo/70%-scrim case is checked at **5.55:1** for hero body text. Axe also checks rendered pages. Automated checks are not a substitute for a manual screen-reader audit before launch.

## Form behaviour

- Empty required fields are blocked, marked invalid and announced; focus moves to the first invalid field.
- Invalid email is blocked.
- A valid enquiry prepares a correctly encoded `mailto:` containing name, email, arrival, nights, room, guests and message.
- The success state explicitly says **nothing has been sent yet** and offers the direct email/phone fallback.
- No POST request, server storage, availability claim or payment is made by this static form.
- With JavaScript disabled, the form is hidden and a plain email/telephone fallback is shown; navigation remains available.

## Known limits before public launch

- Square-bracket placeholders remain visible by design; see `PLACEHOLDERS.md`.
- Legal pages are drafts, not approved legal advice.
- Some source photographs are low resolution; see `IMAGE-SOURCES.md`.
- The external booking link was checked as a link destination in the brief, but no reservation or payment was made.
- Ferry routes/times, full directions, airport/bus options and general response time are not supplied by the brief and are not invented.
