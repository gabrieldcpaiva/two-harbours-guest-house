import { BOOK, gallery } from '../data/content.js';
import { Button, Eyebrow, Photo } from './ui.jsx';

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-[#F2F0E9]">
      <div className="px-5 py-20 md:px-10 md:py-28">
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
      </div>
      <div>
        {gallery.map((photo) => (
          <figure key={photo.id} className="relative h-[78vh] min-h-[28rem] w-full md:h-[100dvh]">
            <Photo
              id={photo.id}
              alt={photo.alt}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-6 left-5 right-5 max-w-xl rounded-[2rem] bg-[#1A1A1A] px-5 py-3 text-sm leading-relaxed text-[#F2F0E9] md:bottom-10 md:left-10">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="px-5 py-16 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
          <p className="max-w-[40ch] text-base leading-relaxed">Choose your dates and book directly with the house.</p>
          <Button href={BOOK}>Book Direct</Button>
        </div>
      </div>
    </section>
  );
}
