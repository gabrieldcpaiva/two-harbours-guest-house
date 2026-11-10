import { useState } from 'react';
import { BOOK, EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../data/content.js';
import { Button, Eyebrow, OwnerNote, QuietButton, TextLink } from './ui.jsx';

const empty = { name: '', email: '', arrival: '', nights: '', room: '', guests: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(values.arrival.trim())) {
    errors.arrival = 'Enter the arrival date as DD/MM/YYYY.';
  }
  if (!values.nights || Number(values.nights) < 1) errors.nights = 'Enter the number of nights.';
  if (!values.room) errors.room = 'Choose a room.';
  if (!values.guests) errors.guests = 'Choose the number of guests.';
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Enquire() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [mailto, setMailto] = useState('');

  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const described = (id) => (errors[id] ? `${id}-error` : undefined);

  const onSubmit = (event) => {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus('Nothing has been sent. Check the fields below.');
      setMailto('');
      const first = Object.keys(next)[0];
      document.getElementById(first)?.focus();
      return;
    }
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Preferred arrival: ${values.arrival}`,
      `Nights: ${values.nights}`,
      `Room: ${values.room}`,
      `Guests: ${values.guests}`,
      `Anything we should know: ${values.message.trim() || 'None'}`,
    ].join('\n');
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent('Enquiry for Two Harbours Guest House')}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    setStatus('Nothing has been sent from this page. A draft should open in your email app, addressed to enquiries@twoharbours.com. If it does not, use the email beside the form, or Book Direct.');
    window.location.href = href;
  };

  return (
    <section id="enquire" aria-labelledby="enquire-heading" className="bg-[#F2F0E9] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Book direct</Eyebrow>
          <h2 id="enquire-heading" className="mt-4 font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
            Make one good decision.
          </h2>
          <p className="mt-6 max-w-[40ch] text-base leading-relaxed">
            Choose your dates and book directly with the house. Breakfast is included. The harbours are already there.
          </p>
          <div className="mt-8">
            <Button href={BOOK}>Book Direct</Button>
          </div>
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed">
            The booking page opens on the existing Two Harbours website. This site does not take payment.
          </p>
          <div className="mt-10 rounded-[2rem] border border-[#2E4036]/15 p-6">
            <h3 className="font-sans text-xl font-bold">Prefer a person?</h3>
            <p className="mt-3 text-base">
              <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className="mt-2 text-base">
              <a className="underline underline-offset-4" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              The published terms promise a prompt response to single-night reservation requests, to confirm or decline.
            </p>
            <OwnerNote>
              <p>Typical response time for general enquiries, for example within one working day?</p>
            </OwnerNote>
          </div>
        </div>
        <div className="lg:col-span-7">
          <h3 className="font-sans text-3xl font-bold tracking-tight">An enquiry, without the ceremony.</h3>
          <p className="mt-4 max-w-[48ch] text-base leading-relaxed">
            For live availability and direct reservation, use the house’s booking page. For a question, a dietary request or a single-night stay, this form prepares an email in your own mail app. It does not send or store the form itself. All fields are required unless marked optional.
          </p>
          <form className="mt-8 space-y-5" lang="en-GB" action={`mailto:${EMAIL}`} method="post" encType="text/plain" noValidate onSubmit={onSubmit}>
            <Field id="name" label="Your name" error={errors.name}>
              <input id="name" name="name" lang="en-GB" autoComplete="name" className="field" value={values.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} aria-describedby={described('name')} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input id="email" name="email" lang="en-GB" type="email" autoComplete="email" className="field" value={values.email} onChange={set('email')} aria-invalid={Boolean(errors.email)} aria-describedby={described('email')} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="arrival" label="Preferred arrival (DD/MM/YYYY)" error={errors.arrival}>
                <input id="arrival" name="arrival" lang="en-GB" type="text" inputMode="numeric" placeholder="DD/MM/YYYY" autoComplete="off" className="field" value={values.arrival} onChange={set('arrival')} aria-invalid={Boolean(errors.arrival)} aria-describedby={described('arrival')} />
              </Field>
              <Field id="nights" label="Nights" error={errors.nights}>
                <input id="nights" name="nights" lang="en-GB" type="number" min="1" inputMode="numeric" className="field" value={values.nights} onChange={set('nights')} aria-invalid={Boolean(errors.nights)} aria-describedby={described('nights')} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="room" label="Room" error={errors.room}>
                <select id="room" name="room" lang="en-GB" className="field" value={values.room} onChange={set('room')} aria-invalid={Boolean(errors.room)} aria-describedby={described('room')}>
                  <option value="">Choose a room</option>
                  <option>Luskentyre</option>
                  <option>Scarista</option>
                  <option>Borve</option>
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field id="guests" label="Guests" error={errors.guests}>
                <select id="guests" name="guests" lang="en-GB" className="field" value={values.guests} onChange={set('guests')} aria-invalid={Boolean(errors.guests)} aria-describedby={described('guests')}>
                  <option value="">Number of adults</option>
                  <option>1 adult</option>
                  <option>2 adults</option>
                </select>
              </Field>
            </div>
            <Field id="message" label="Anything we should know? (optional)" error="">
              <textarea id="message" name="message" lang="en-GB" rows="4" className="field" value={values.message} onChange={set('message')} />
            </Field>
            <QuietButton type="submit">Prepare email enquiry</QuietButton>
            <p role="status" className="text-sm leading-relaxed">{status}</p>
            {mailto ? <TextLink href={mailto}>Open email app</TextLink> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
