import { BOOK, TRIPADVISOR, quotes, timesQuote } from '../data/content.js';
import { Button, Eyebrow, TextLink } from './ui.jsx';

export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-heading" className="bg-[#F2F0E9] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Why guests return</Eyebrow>
          <h2 id="proof-heading" className="mt-4 font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
            In their words.
          </h2>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed">
            Tripadvisor Travellers’ Choice Award 2026. Consistently 5-star on Tripadvisor. The house currently shows an overall 5.0 from 190 traveller reviews.
          </p>
          <figure className="mt-10">
            <blockquote>
              <p className="font-drama text-3xl font-medium italic leading-tight text-[#1A1A1A] md:text-5xl">
                “{timesQuote}”
              </p>
            </blockquote>
            <figcaption className="mt-5 text-sm leading-relaxed">
              <cite className="font-display text-base font-semibold not-italic">The Times</cite>
              <span>, as quoted on their site.</span>
            </figcaption>
          </figure>
        </div>
        <div className="space-y-5 lg:col-span-7">
          {quotes.map((quote) => (
            <figure key={quote.name} className="rounded-[2rem] border border-[#2E4036]/15 bg-[#F2F0E9] p-6 md:p-8">
              <blockquote>
                <p className="text-base leading-relaxed md:text-lg">“{quote.text}”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm leading-relaxed text-[#1A1A1A]">
                <cite className="font-semibold not-italic">{quote.name}</cite>
                <span> · {quote.date} · </span>
                <span className="italic">{quote.title}</span>
              </figcaption>
            </figure>
          ))}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-3">
            <Button href={BOOK}>Book Direct</Button>
            <TextLink href={TRIPADVISOR} external>
              Read more guest words
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
