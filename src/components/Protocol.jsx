import { useLayoutEffect, useRef } from 'react';
import { steps } from '../data/content.js';
import { gsap } from '../gsap.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { Eyebrow, StepNo } from './ui.jsx';

function Ripples({ light }) {
  const stroke = light ? '#F2F0E9' : '#2E4036';
  return (
    <svg data-ripple viewBox="0 0 160 160" className="h-36 w-36" aria-hidden="true">
      <g>
        <circle cx="80" cy="80" r="58" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="80" cy="80" r="38" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="80" cy="80" r="18" fill="none" stroke={stroke} strokeWidth="1" />
      </g>
    </svg>
  );
}

function Tide({ light }) {
  const stroke = light ? '#F2F0E9' : '#2E4036';
  return (
    <svg viewBox="0 0 160 96" className="h-28 w-44" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((row) => (
        <line key={row} x1="8" x2="152" y1={16 + row * 16} y2={16 + row * 16} stroke={stroke} strokeOpacity="0.35" />
      ))}
      <line data-tide x1="0" x2="160" y1="12" y2="12" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

function Wave({ light }) {
  const stroke = light ? '#F2F0E9' : '#2E4036';
  return (
    <svg viewBox="0 0 220 80" className="h-24 w-56" aria-hidden="true">
      <path
        data-wave
        d="M0 40 H30 L40 18 L52 62 L64 40 H220"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const motifs = [Ripples, Tide, Wave];
const surfaces = [
  'bg-[#F2F0E9] text-[#1A1A1A]',
  'on-dark bg-[#2E4036] text-[#F2F0E9]',
  'on-dark bg-[#1A1A1A] text-[#F2F0E9]',
];

export function Protocol() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const root = ref.current;
    const ctx = gsap.context(() => {
      gsap.to('[data-ripple]', {
        rotation: 360,
        duration: 36,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
      gsap.fromTo('[data-tide]', { y: 0 }, { y: 64, duration: 3.2, repeat: -1, yoyo: true, ease: 'power2.inOut' });
      const path = root.querySelector('[data-wave]');
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, { strokeDashoffset: 0, duration: 2.8, repeat: -1, yoyo: true, ease: 'power2.inOut' });
      }
    }, root);
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray('[data-protocol]');
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        const next = cards[index + 1];
        gsap.to(card, {
          scale: 0.9,
          filter: 'blur(20px)',
          opacity: 0.5,
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top 16px',
            scrub: true,
          },
        });
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 16px',
            endTrigger: next,
            end: 'top 16px',
            pin: true,
            pinSpacing: false,
          },
        });
      });
    });
    return () => {
      media.revert();
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section id="stay" ref={ref} aria-labelledby="stay-heading" className="bg-[#F2F0E9] px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto mb-10 max-w-6xl px-2">
        <Eyebrow>Your stay</Eyebrow>
        <h2 id="stay-heading" className="mt-4 font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
          Arrive. Unwind. Linger.
        </h2>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {steps.map((step, index) => {
          const Motif = motifs[index];
          const light = index > 0;
          return (
            <article
              key={step.index}
              data-protocol
              className={`flex min-h-[70vh] flex-col justify-between rounded-[2.5rem] p-8 md:p-14 lg:min-h-[calc(100dvh-2rem)] ${surfaces[index]}`}
            >
              <div className="flex items-start justify-between gap-6">
                <StepNo light={light}>{step.index}</StepNo>
                <Motif light={light} />
              </div>
              <div className="max-w-[36ch]">
                <h3 className="font-sans text-4xl font-extrabold tracking-tight md:text-6xl">{step.title}</h3>
                <p className="mt-4 text-base leading-relaxed md:text-lg">{step.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
