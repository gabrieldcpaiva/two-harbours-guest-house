import { useLayoutEffect, useRef } from 'react';
import { BOOK } from '../data/content.js';
import { gsap } from '../gsap.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { Button, TextLink, Photo } from './ui.jsx';

export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="hero" ref={ref} className="on-dark relative flex min-h-[100dvh] items-end overflow-hidden">
      <Photo
        id="aerial"
        priority
        alt="Aerial view of Two Harbours Guest House, the white house on Scalpay between the harbours, with the village, rocky shore and Harris beyond."
        className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(26,26,26,0.35) 0%, rgba(46,64,54,0.28) 42%, rgba(26,26,26,0.15) 100%)',
        }}
      />
      <div
        className="relative z-10 w-full px-5 pb-12 pt-20 md:px-16 md:pb-16 md:pt-24"
        style={{
          background:
            'linear-gradient(to top, #1A1A1A 0px, #1A1A1A calc(100% - 3.5rem), rgba(26,26,26,0) 100%)',
        }}
      >
        <div id="hero-text" className="max-w-4xl text-[#F2F0E9]">
          <p data-hero className="font-display text-xs font-semibold uppercase tracking-[0.18em]">
            Tripadvisor Travellers’ Choice 2026
          </p>
          <p data-hero className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.18em]">
            Scalpay · Isle of Harris
          </p>
          <h1 data-hero className="mt-5">
            <span className="block font-sans text-[1.35rem] font-extrabold leading-tight tracking-[-0.04em] sm:text-[2rem] md:text-[2.75rem]">
              Between two harbours,
            </span>
            <span className="mt-1 block font-drama text-[4.15rem] font-medium italic leading-[0.84] tracking-[-0.03em] sm:text-[5.6rem] md:text-[8.25rem]">
              the world can wait.
            </span>
          </h1>
          <p data-hero className="mt-6 max-w-[42ch] text-base leading-relaxed md:text-lg">
            A granite Victorian house with three en-suite rooms and a Hebridean welcome. Harris and Lewis are close; Scalpay is where you stay.
          </p>
          <p data-hero className="mt-4 text-sm">
            The Old Manse, between Scalpay’s North and South Harbours.
          </p>
        </div>
        <div data-hero className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href={BOOK}>Book Direct</Button>
          <TextLink href="#rooms" light>
            See the rooms
          </TextLink>
        </div>
      </div>
    </section>
  );
}
