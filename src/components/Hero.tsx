import type { CSSProperties } from 'react'

/** Opening screen: one clear statement, a short line on what we do, two actions. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[4.5rem]">
      {/* Soft brand-coloured light behind the headline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-24 h-[28rem] w-[46rem] rotate-[-12deg] rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -right-32 top-48 h-[24rem] w-[40rem] rotate-[10deg] rounded-full bg-violet/15 blur-3xl" />
      </div>

      <div className="wrap relative pb-[var(--section-y)] pt-[clamp(4rem,12vh,8rem)]">
        <p className="eyebrow" data-reveal>Software company</p>
        <h1
          className="mt-5 max-w-[18ch] text-[clamp(2.6rem,6.2vw,5.25rem)] font-[420] leading-[1.04] tracking-[-0.035em]"
          data-reveal
          style={{ '--delay': '80ms' } as CSSProperties}
        >
          We build{' '}
          <span className="relative inline-block whitespace-nowrap">
            software
            <Swoosh />
          </span>{' '}
          that helps businesses grow.
        </h1>
        <p className="mt-7 max-w-[46ch] text-[1.2rem] leading-relaxed text-muted" data-reveal style={{ '--delay': '160ms' } as CSSProperties}>
          RS Labs designs and builds SaaS platforms, web and mobile apps, and AI solutions, for our clients and as our
          own products.
        </p>
        <div className="mt-10 flex flex-wrap gap-3" data-reveal style={{ '--delay': '240ms' } as CSSProperties}>
          <a href="#contact" className="rounded-md bg-ink px-6 py-3.5 font-medium text-white transition-colors hover:bg-ink-soft">
            Talk to us
          </a>
          <a
            href="#services"
            className="rounded-md border border-line bg-white px-6 py-3.5 font-medium text-ink transition-colors hover:border-ink"
          >
            Our services
          </a>
        </div>
      </div>
    </section>
  )
}

/** Hand-drawn style underline in the brand gradient. */
function Swoosh() {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full">
      <defs>
        <linearGradient id="swoosh" x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-brand)" />
          <stop offset="1" stopColor="var(--color-violet)" />
        </linearGradient>
      </defs>
      <path d="M4 14 C 80 4, 200 2, 296 10" fill="none" stroke="url(#swoosh)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
