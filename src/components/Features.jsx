import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { places, quotes } from '../data/content.js';
import { gsap } from '../gsap.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { Eyebrow } from './ui.jsx';

function Shuffler() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(places);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return (
      <ul className="space-y-3">
        {places.map((place) => (
          <li key={place.id} className="rounded-[1.5rem] border border-[#2E4036]/15 p-4">
            <p className="font-drama text-3xl font-medium italic">{place.title}</p>
            <p className="mt-2 text-sm leading-relaxed">{place.body}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <ul className="sr-only">
        {places.map((place) => (
          <li key={place.id}>
            {place.title}. {place.body}
          </li>
        ))}
      </ul>
      <div className="relative h-64" aria-hidden="true">
        {order.map((place, index) => (
          <article
            key={place.id}
            className="absolute inset-x-0 top-0 h-52 rounded-[1.5rem] border border-[#2E4036]/15 bg-[#F2F0E9] p-5 shadow-[0_12px_30px_rgba(26,26,26,0.06)]"
            style={{
              transform: `translateY(${index * 14}px) scale(${1 - index * 0.045})`,
              zIndex: 10 - index,
              transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {index === 0 ? (
              <>
                <p className="font-drama text-4xl font-medium italic leading-none">{place.title}</p>
                <p className="mt-3 text-sm leading-relaxed">{place.body}</p>
              </>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function GuestWords() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const quote = quotes[index];

  useEffect(() => {
    if (reduce) return undefined;
    if (count < quote.text.length) {
      const timer = setTimeout(() => setCount((value) => value + 1), 18);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setIndex((value) => (value + 1) % quotes.length);
      setCount(0);
    }, 2400);
    return () => clearTimeout(timer);
  }, [count, index, quote.text.length, reduce]);

  if (reduce) {
    return (
      <ul className="space-y-5">
        {quotes.map((item) => (
          <li key={item.name}>
            <p className="font-drama text-2xl font-medium italic leading-snug">“{item.text}”</p>
            <p className="mt-2 text-sm">
              {item.name} · {item.date}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <ul className="sr-only">
        {quotes.map((item) => (
          <li key={item.name}>
            “{item.text}” {item.name}, {item.date}. {item.title}
          </li>
        ))}
      </ul>
      <p aria-hidden="true" className="min-h-[14rem] font-drama text-2xl font-medium italic leading-snug">
        {quote.text.slice(0, count)}
        <span className="caret ml-1 inline-block h-6 w-px bg-[#2E4036] align-middle" />
      </p>
      <p aria-hidden="true" className="mt-4 text-sm text-[#2E4036]">
        {quote.name} · {quote.date}
      </p>
    </div>
  );
}

function WeekIllustration() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const root = ref.current;
    if (!root) return undefined;
    let ctx;
    let cancelled = false;
    const start = async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      if (cancelled) return;
      ctx = gsap.context(() => {
        const day = root.querySelector('[data-day="3"]');
        const save = root.querySelector('[data-save]');
        const cursor = root.querySelector('[data-cursor]');
        const point = (el) => ({
          x: el.offsetLeft + el.offsetWidth / 2 - 4,
          y: el.offsetTop + el.offsetHeight / 2 - 2,
        });
        const target = point(day);
        const saved = point(save);
        gsap.set(cursor, { x: 8, y: target.y + 36, opacity: 0 });
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
        timeline
          .to(cursor, { opacity: 1, duration: 0.25, ease: 'power2.out' })
          .to(cursor, { x: target.x, y: target.y, duration: 0.9, ease: 'power2.inOut' })
          .to(day, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: 'center' })
          .add(() => day.classList.add('is-active'))
          .to(cursor, { x: saved.x, y: saved.y, duration: 0.8, ease: 'power2.inOut' })
          .to(save, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: 'center' })
          .to(cursor, { opacity: 0, duration: 0.35 })
          .add(() => day.classList.remove('is-active'))
          .set(cursor, { x: 8, y: target.y + 36 });
      }, root);
    };
    start();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduce]);

  return (
    <div>
      <p className="text-sm leading-relaxed text-[#2E4036]">
        Illustration of an unhurried week. Not a booking calendar.
      </p>
      <div ref={ref} className="relative mt-4" inert="" aria-hidden="true">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div
              key={`${day}-${index}`}
              data-day={index}
              className={`day flex h-12 items-center justify-center rounded-2xl border border-[#2E4036]/20 text-sm ${
                reduce && index === 3 ? 'is-active' : 'text-[#1A1A1A]'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div
          data-save
          className="mt-4 inline-flex rounded-full border border-[#2E4036] px-4 py-2 text-sm text-[#1A1A1A]"
        >
          Save
        </div>
        <svg data-cursor className="pointer-events-none absolute left-0 top-0 h-6 w-6" viewBox="0 0 24 24">
          <path d="M4 2 L4 18 L8.5 13.5 L12 20 L14.2 19 L10.7 12.5 L17 12 Z" fill="#1A1A1A" />
        </svg>
      </div>
    </div>
  );
}

const cards = [
  {
    title: 'Three islands',
    body: 'Nestled in one of the world’s most unique, preserved paradises: Harris and Lewis.',
    slot: <Shuffler />,
  },
  {
    title: 'Guest words',
    body: 'A large Victorian house thoughtfully renovated for modern comfort while retaining its historic charm.',
    slot: <GuestWords />,
  },
  {
    title: 'The shape of a stay',
    body: 'Comfort, convenience, history and a touch of luxury: your perfect retreat.',
    slot: <WeekIllustration />,
  },
];

export function Features() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('[data-feature]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={ref} id="offer" aria-labelledby="offer-heading" className="on-dark bg-[#2E4036] px-5 py-20 text-[#F2F0E9] md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Eyebrow light>The offer</Eyebrow>
        <h2 id="offer-heading" className="mt-4 max-w-[16ch] font-sans text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">
          The reasons to cross the bridge.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              data-feature
              className="on-light flex flex-col rounded-[2rem] bg-[#F2F0E9] p-6 text-[#1A1A1A] shadow-[0_24px_50px_rgba(26,26,26,0.16)] md:p-8"
            >
              <h3 className="font-sans text-2xl font-bold tracking-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed">{card.body}</p>
              <div className="mt-6">{card.slot}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
