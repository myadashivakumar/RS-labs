import type { CSSProperties } from 'react'
import { PRODUCTS, PRODUCTS_LIVE } from '../content'
import { Mark } from './Mark'

export function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="py-[var(--section-y)]">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow" data-reveal>Our products</p>
            <h2 id="products-title" className="heading mt-3 max-w-[18ch]" data-reveal>
              Software we build and run ourselves.
            </h2>
          </div>
          <p className="max-w-[38ch] text-muted" data-reveal>
            Building our own products keeps our engineering sharp, and it's the same care we bring to client work.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">{PRODUCTS_LIVE ? <LiveCards /> : <ComingSoonCards />}</ul>
      </div>
    </section>
  )
}

function LiveCards() {
  return PRODUCTS.map((p, i) => (
    <li key={p.name} className="relative overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-10" data-reveal style={{ '--delay': `${i * 100}ms` } as CSSProperties}>
      <Glow i={i} />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <Mark className="h-9 w-9 text-white" />
          <span className="rounded-full border border-white/25 px-3 py-1 text-[0.78rem] font-medium text-white/85">{p.status}</span>
        </div>
        <h3 className="mt-14 text-[1.9rem] font-medium tracking-[-0.02em]">{p.name}</h3>
        <p className="mt-3 max-w-[44ch] text-white/75">{p.body}</p>
        <a href="#contact" className="mt-8 inline-flex items-center gap-2 font-medium text-white hover:underline hover:underline-offset-4">
          Ask about {p.name} <span aria-hidden="true">→</span>
        </a>
      </div>
    </li>
  ))
}

/**
 * Pre-launch: the card layout is visible but its content is placeholder bars
 * under a blur, so no product name or detail is on the page (or in its source).
 */
function ComingSoonCards() {
  return [0, 1].map((i) => (
    <li key={i} className="relative overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-10" data-reveal style={{ '--delay': `${i * 100}ms` } as CSSProperties}>
      <Glow i={i} />
      <div aria-hidden="true" className="relative select-none blur-[6px]">
        <div className="flex items-center justify-between gap-4">
          <Mark className="h-9 w-9 text-white" />
          <span className="h-7 w-28 rounded-full border border-white/25" />
        </div>
        <span className="mt-14 block h-8 w-48 rounded bg-white/70" />
        <span className="mt-5 block h-3 w-full max-w-[26rem] rounded bg-white/35" />
        <span className="mt-3 block h-3 w-4/5 max-w-[22rem] rounded bg-white/35" />
        <span className="mt-3 block h-3 w-3/5 max-w-[16rem] rounded bg-white/35" />
        <span className="mt-10 block h-4 w-32 rounded bg-white/55" />
      </div>
      <div className="absolute inset-0 grid place-items-center bg-ink/45 text-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-ink/60 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-brand' : 'bg-violet'}`} aria-hidden="true" />
            Coming soon
          </span>
          <p className="mt-3 text-sm text-white/80">Launching with the app release</p>
        </div>
      </div>
    </li>
  ))
}

function Glow({ i }: { i: number }) {
  return <div aria-hidden="true" className={`absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${i === 0 ? 'bg-brand/40' : 'bg-violet/40'}`} />
}
