import { OwnerNote, Eyebrow, Photo } from './ui.jsx';

export function Breakfast() {
  return (
    <section id="breakfast" aria-labelledby="breakfast-heading" className="bg-[#F2F0E9] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <figure className="overflow-hidden rounded-[2rem]">
          <Photo
            id="dining"
            alt="The breakfast room laid with wooden tables, place settings and a painted Hebridean landscape on the walls."
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </figure>
        <div>
          <Eyebrow>From the farmhouse kitchen</Eyebrow>
          <h2 id="breakfast-heading" className="mt-4 font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
            Breakfast is not an afterthought.
          </h2>
          <div className="mt-6 max-w-[46ch] space-y-4 text-base leading-relaxed">
            <p>An indulgent breakfast is included, freshly prepared from locally sourced produce.</p>
            <p>Traditional Scottish favourites sit beside daily specials such as Scalpay Eggs Benedict. Homemade bread appears alongside.</p>
          </div>
          <OwnerNote>
            <p>What time is breakfast served, and until when?</p>
          </OwnerNote>
        </div>
      </div>
    </section>
  );
}
