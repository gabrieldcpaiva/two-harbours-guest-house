import { useRef, useState } from 'react';
import { BOOK, gallery } from '../data/content.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { Button, Eyebrow, Photo } from './ui.jsx';

const frames = [
  'md:col-span-8 md:row-span-2 md:min-h-[34rem]',
  'md:col-span-4 md:min-h-[16rem]',
  'md:col-span-4 md:min-h-[16rem]',
  'md:col-span-7 md:min-h-[22rem]',
  'md:col-span-5 md:min-h-[22rem]',
  'md:col-span-12 md:min-h-[20rem]',
];

function Caption({ children }) {
  return (
    <figcaption className="absolute bottom-3 left-3 max-w-[16rem] rounded-full bg-[#1A1A1A] px-3 py-1 text-xs leading-snug text-[#F2F0E9]">
      {children}
    </figcaption>
  );
}

export function Gallery() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const start = useRef(null);
  const count = gallery.length;
  const go = (next) => setIndex(((next % count) + count) % count);

  const onPointerDown = (event) => {
    start.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event) => {
    if (!start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
    start.current = null;
  };

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-[#F2F0E9] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8">
        <div>
          <Eyebrow>Photographs</Eyebrow>
          <h2 id="gallery-heading" className="mt-4 font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
            The house, the coast, the rooms.
          </h2>
          <p className="mt-5 max-w-[42ch] text-base leading-relaxed">
            The house between two harbours, and the three en-suite rooms.
          </p>
        </div>
        <Button href={BOOK}>Book Direct</Button>
      </div>

      <div className="mx-auto mt-12 hidden max-w-6xl grid-cols-12 gap-4 md:grid">
        {gallery.map((photo, i) => (
          <figure key={photo.id} className={`relative overflow-hidden rounded-[2rem] ${frames[i]}`}>
            <Photo
              id={photo.id}
              alt={photo.alt}
              sizes={i === 0 || i === 5 ? '(min-width: 768px) 70vw, 130vh' : '(min-width: 768px) 40vw, 130vh'}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <Caption>{photo.caption}</Caption>
          </figure>
        ))}
      </div>

      <div
        className="mt-10 md:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Photographs"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            go(index - 1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            go(index + 1);
          }
        }}
      >
        <div className="overflow-hidden rounded-[2rem] touch-pan-y" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: reduce ? 'none' : 'transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {gallery.map((photo, i) => (
              <figure key={photo.id} className="relative h-[72vh] w-full shrink-0" aria-hidden={i !== index ? true : undefined}>
                <Photo
                  id={photo.id}
                  alt={photo.alt}
                  sizes="130vh"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <Caption>{photo.caption}</Caption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            className="rounded-full border border-[#2E4036] px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition-transform duration-300 ease-magnetic hover:-translate-y-px focus-visible:-translate-y-px"
            onClick={() => go(index - 1)}
          >
            Previous
          </button>
          <p className="text-sm text-[#1A1A1A]" aria-live="polite">
            {index + 1} / {count}
          </p>
          <button
            type="button"
            className="rounded-full border border-[#2E4036] px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition-transform duration-300 ease-magnetic hover:-translate-y-px focus-visible:-translate-y-px"
            onClick={() => go(index + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
