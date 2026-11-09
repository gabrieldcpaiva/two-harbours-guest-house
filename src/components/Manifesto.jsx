import { useLayoutEffect, useRef } from 'react';
import { campbell, history, historyAfter, plaque } from '../data/content.js';
import { gsap } from '../gsap.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { Eyebrow, OwnerNote, Photo } from './ui.jsx';

const line = ['We', 'offer:', 'an', 'open', 'house,', 'older', 'than', 'these', 'walls.'];

export function Manifesto() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('[data-word]', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-manifesto]', start: 'top 75%' },
      });
      gsap.to('[data-parallax]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="the-house" ref={ref} aria-labelledby="house-heading" className="on-dark relative overflow-hidden bg-[#1A1A1A] text-[#F2F0E9]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div data-parallax className="absolute -top-[10%] left-0 h-[120%] w-full opacity-[0.18]">
          <Photo id="view" alt="" className="h-full w-full object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[#1A1A1A]/85" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-16 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow light>A house with a long memory</Eyebrow>
          <p data-manifesto className="mt-8 max-w-[28ch] text-xl leading-snug md:text-2xl">
            Most guest houses offer: a bed for the night.
          </p>
          <h2 id="house-heading" data-manifesto className="mt-6 font-drama text-5xl font-medium italic leading-[0.95] md:text-7xl">
            {line.map((word) => (
              <span key={word} data-word className="mr-[0.28em] inline-block">
                {word}
              </span>
            ))}
          </h2>
          <div className="mt-10 max-w-[46ch] space-y-5 text-base leading-relaxed">
            {history.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote className="rounded-[2rem] bg-[#1A1A1A] px-6 py-5">
              <p className="font-drama text-3xl font-medium italic leading-snug md:text-4xl">“{campbell}”</p>
            </blockquote>
            {historyAfter.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <figure>
              <figcaption className="text-sm">Plaque on the wall</figcaption>
              <blockquote className="mt-2">
                <p className="font-drama text-2xl font-medium italic leading-snug">“{plaque}”</p>
              </blockquote>
            </figure>
          </div>
          <OwnerNote>
            <ul className="list-disc space-y-2 pl-5">
              <li>Which original interior features survive, fireplaces, joinery, floors, and may they be named on the page?</li>
              <li>A higher-resolution master of the earlier exterior, if it should appear alongside these photographs.</li>
            </ul>
          </OwnerNote>
        </div>
        <div className="lg:col-span-5">
          <figure className="overflow-hidden rounded-[2rem]">
            <Photo
              id="front"
              alt="Two Harbours Guest House beside its mature garden, with the North Harbour and Harris hills beyond."
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover"
            />
            <figcaption className="bg-[#1A1A1A] pt-4 text-sm leading-relaxed">
              The Old Manse, between Scalpay’s North and South Harbours.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
