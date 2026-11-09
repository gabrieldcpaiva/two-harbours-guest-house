import { useEffect, useRef, useState } from 'react';
import { BOOK, nav } from '../data/content.js';
import { Button } from './ui.jsx';

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const bar = solid
    ? 'border-[#2E4036]/15 bg-[#F2F0E9] text-[#2E4036]'
    : 'on-dark border-[#F2F0E9]/20 bg-[#1A1A1A] text-[#F2F0E9]';

  return (
    <header>
      <a className="skip-link on-dark" href="#main">
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`fixed left-1/2 top-3 z-[80] flex w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 items-center justify-between gap-3 rounded-full border px-3 py-2 transition-colors duration-300 md:top-5 md:w-auto md:px-4 ${bar}`}
      >
        <a href="#hero" className="whitespace-nowrap px-2 font-display text-base font-semibold tracking-tight">
          Two Harbours
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-display text-sm font-medium transition-transform duration-300 ease-magnetic hover:-translate-y-px focus-visible:-translate-y-px"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button href={BOOK} compact>Book Direct</Button>
          <button
            ref={menuButton}
            type="button"
            className="rounded-full px-3 py-2 font-display text-sm font-semibold md:hidden"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <ul
          id="nav-menu"
          className={`${open ? 'flex' : 'hidden'} on-light absolute left-0 right-0 top-[calc(100%+0.75rem)] flex-col gap-1 rounded-[2rem] bg-[#F2F0E9] p-3 text-[#1A1A1A] md:hidden`}
        >
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-full px-4 py-3 font-display font-medium transition-transform duration-300 ease-magnetic hover:-translate-y-px focus-visible:-translate-y-px"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
