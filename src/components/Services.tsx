import type { CSSProperties } from 'react'
import { SERVICES } from '../content'

const ICONS: Record<(typeof SERVICES)[number]['icon'], string> = {
  layers: 'M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  browser: 'M3 5h18v14H3zM3 9h18M6.5 7h.01M9 7h.01',
  phone: 'M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm3 17h2',
  spark: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M18 6l-2.5 2.5m-7 7L6 18',
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-[var(--section-y)]">
      <div className="wrap">
        <p className="eyebrow" data-reveal>What we do</p>
        <h2 id="services-title" className="heading mt-3 max-w-[20ch]" data-reveal>
          Services for every stage of your product.
        </h2>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col rounded-xl border border-line bg-white p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/40"
              data-reveal
              style={{ '--delay': `${i * 80}ms` } as CSSProperties}
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-lavender text-brand">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d={ICONS[s.icon]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[0.98rem] text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
