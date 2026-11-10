import { BOOK, EMAIL, PHONE_DISPLAY, PHONE_TEL, nav, terms } from '../data/content.js';
import { Button, OwnerNote, TextLink } from './ui.jsx';

export function Footer() {
  return (
    <footer className="on-dark rounded-t-[4rem] bg-[#1A1A1A] px-5 pb-12 pt-16 text-[#F2F0E9] md:px-10 md:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-2xl font-semibold tracking-tight">Two Harbours</p>
          <p className="mt-3 max-w-[36ch] text-base leading-relaxed">
            A Victorian guest house on Scalpay, between the North and South Harbours.
          </p>
          <div className="mt-6">
            <Button href={BOOK}>Book Direct</Button>
          </div>
          <address className="mt-8 text-sm not-italic leading-relaxed">
            Two Harbours Guest House<br />
            The Old Manse<br />
            Eilean Siar<br />
            HS4 3XU
          </address>
          <p className="mt-4 text-sm">
            <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span> · </span>
            <a className="underline underline-offset-4" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          </p>
          <p className="mt-4 text-sm leading-relaxed">Short-term let licence STL ES01347F. EPC: E.</p>
          <OwnerNote>
            <p>Is there a street or croft name beyond “The Old Manse” for maps and deliveries?</p>
          </OwnerNote>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em]">Visit</h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} light>{item.label}</TextLink>
                </li>
              ))}
              <li><TextLink href="#breakfast" light>Breakfast</TextLink></li>
              <li><TextLink href="#enquire" light>Enquire</TextLink></li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em]">Legal drafts</h2>
            <ul className="mt-4 space-y-2">
              <li><TextLink href="#privacy" light>Privacy</TextLink></li>
              <li><TextLink href="#terms" light>Terms</TextLink></li>
              <li><TextLink href="#accessibility" light>Accessibility</TextLink></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl space-y-12 border-t border-[#F2F0E9]/20 pt-12">
        <section id="privacy" aria-labelledby="privacy-heading">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em]">Legal · draft</p>
          <h2 id="privacy-heading" className="mt-3 font-sans text-3xl font-bold">Privacy.</h2>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed">
            A plain notice belongs here before launch. This is a draft, not a finished legal statement. The existing Two Harbours site says guest information is used to process bookings, carry out contractual obligations, seek views, notify changes and send requested communications. It says information is not sold or rented, or shared for third-party marketing.
          </p>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed">
            This site’s enquiry form only prepares an email in the guest’s own mail app. It does not submit to a server or store entries. The external booking page has its own handling. Questions: {EMAIL}.
          </p>
          <OwnerNote>
            <p>Data controller name, lawful bases, retention periods, processor details, guest rights, and whether any non-essential cookies or analytics are used on the new site.</p>
          </OwnerNote>
        </section>

        <section id="terms" aria-labelledby="terms-heading">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em]">Legal · draft</p>
          <h2 id="terms-heading" className="mt-3 font-sans text-3xl font-bold">Terms.</h2>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed">
            The owner’s approved website terms are still to come. This is a draft label, not a finished legal document. Reservation, payment and confirmation happen on the existing booking page, not on this marketing site. These are summaries of the published property terms. The existing booking page and the owner’s confirmation govern the reservation.
          </p>
          <dl className="mt-6 space-y-4">
            {terms.map(([topic, summary]) => (
              <div key={topic} className="rounded-[2rem] border border-[#F2F0E9]/20 px-5 py-4">
                <dt className="font-semibold">{topic}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{summary}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm">Contact: {EMAIL}</p>
          <OwnerNote>
            <p>Approved website terms of use for this marketing site.</p>
          </OwnerNote>
        </section>

        <section id="accessibility" aria-labelledby="access-heading">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em]">Accessibility · draft</p>
          <h2 id="access-heading" className="mt-3 font-sans text-3xl font-bold">Everyone should find the door.</h2>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed">
            The site is built to be readable, keyboard-navigable and comfortable with reduced motion. A full accessibility statement still needs the owner’s approval.
          </p>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed">
            Pages use semantic landmarks, a skip link, visible focus styles, labelled form fields and text alternatives for photographs. The design targets WCAG AA text contrast and does not require animation. The property states that all guest rooms are up one flight of stairs. It does not yet publish a full physical-access description.
          </p>
          <p className="mt-3 text-sm">
            For access questions now:{' '}
            <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            {' · '}
            <a className="underline underline-offset-4" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          </p>
          <OwnerNote>
            <ul className="list-disc space-y-2 pl-5">
              <li>Accessibility statement wording and a feedback route to publish.</li>
              <li>Step-free access details for the entrance, dining room, garden, parking or public spaces.</li>
            </ul>
          </OwnerNote>
        </section>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-[#F2F0E9]/20 pt-6 text-xs leading-relaxed text-[#F2F0E9]">
        Concept redesign by Coco Pixel (creative direction & copy) and Ferro (build), with Gabriel Paiva.
      </p>
    </footer>
  );
}
