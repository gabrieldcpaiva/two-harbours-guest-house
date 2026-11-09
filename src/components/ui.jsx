import { ArrowUpRight } from 'lucide-react';
import manifest from '../data/images.json';

export function Photo({ id, alt, sizes = '100vw', className = '', priority = false }) {
  const image = manifest[id];
  const avif = image.widths.map((w) => `/images/${id}-${w}.avif ${w}w`).join(', ');
  const webp = image.widths.map((w) => `/images/${id}-${w}.webp ${w}w`).join(', ');
  const mid = image.widths[Math.min(2, image.widths.length - 1)];
  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={`/images/${id}-${mid}.webp`}
        alt={alt}
        width={image.width}
        height={image.height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        aria-hidden={alt === '' ? true : undefined}
      />
    </picture>
  );
}

export function Button({ href, children, className = '', compact = false }) {
  const classNames = `group inline-flex rounded-full transition-transform duration-300 ease-magnetic hover:scale-[1.03] focus-visible:scale-[1.03] ${className}`;
  const pad = compact ? 'px-4 py-2.5' : 'px-6 py-3';
  const inner = (
    <span className="relative inline-flex overflow-hidden rounded-full bg-[#CC5833] text-[#F2F0E9]">
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full bg-[#2E4036] transition-transform duration-300 ease-magnetic group-hover:translate-y-0 group-focus-visible:translate-y-0"
      />
      <span className={`relative inline-flex items-center gap-2 whitespace-nowrap font-display text-[1.25rem] font-bold leading-none ${pad}`}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
    </span>
  );
  return (
    <a href={href} className={classNames} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}

export function QuietButton({ children, type = 'button' }) {
  return (
    <button
      type={type}
      className="group inline-flex rounded-full transition-transform duration-300 ease-magnetic hover:scale-[1.03] focus-visible:scale-[1.03]"
    >
      <span className="relative inline-flex overflow-hidden rounded-full bg-[#2E4036] text-[#F2F0E9]">
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full bg-[#1A1A1A] transition-transform duration-300 ease-magnetic group-hover:translate-y-0 group-focus-visible:translate-y-0"
        />
        <span className="relative px-6 py-3 font-display text-base font-semibold">{children}</span>
      </span>
    </button>
  );
}

export function TextLink({ href, children, light = false, external = false, className = '' }) {
  const color = light ? 'text-[#F2F0E9]' : 'text-[#2E4036]';
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1 underline decoration-1 underline-offset-4 transition-transform duration-300 ease-magnetic hover:-translate-y-px focus-visible:-translate-y-px ${color} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external ? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /> : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

export function Eyebrow({ children, light = false }) {
  return (
    <p className={`font-display text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-[#F2F0E9]' : 'text-[#2E4036]'}`}>
      {children}
    </p>
  );
}

export function StepNo({ children, light = false }) {
  return (
    <span className={`font-mono text-xs tracking-[0.14em] ${light ? 'text-[#F2F0E9]' : 'text-[#2E4036]'}`}>
      {children}
    </span>
  );
}

export function OwnerNote({ children }) {
  return (
    <aside className="mt-8 rounded-[2rem] border border-[#2E4036]/30 bg-[#F2F0E9] px-5 py-4 text-[#1A1A1A]">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-[#2E4036]">Owner to confirm</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
