import type { CSSProperties, ReactNode } from 'react'
import { CONTACT_EMAIL, TAGLINE } from '../content'
import { Registration } from './Sheet'

const NOTES = {
  A: 'Measured by how often it gets used, not by how many features it lists.',
  B: 'Every project starts as a plan you can read before any code exists.',
} as const

/**
 * First screen. What should land first: the headline. Its two annotations
 * carry the studio's position, so the subhead can stay short and factual.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      <ConstructionDrawing />

      <div className="wrap relative">
        <div className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-8 text-mist" data-reveal>
          <span className="flex items-center gap-3">
            <Registration /> Sheet 00 — Index
          </span>
          <span>Independent software studio</span>
          <span className="hidden text-haze md:inline">{TAGLINE}</span>
        </div>

        <h1
          className="display relative mt-[clamp(4rem,13vh,9rem)] max-w-[15ch] text-[clamp(2.9rem,7.4vw,7.25rem)] text-paper"
          data-inview
        >
          <Line delay={80}>
            <Annotated id="A" place="above">Useful</Annotated> software,
          </Line>
          <Line delay={200}>built from the</Line>
          <Line delay={320}>
            <Annotated id="B" place="below">drawing board</Annotated> up.
          </Line>
        </h1>

        {/* Footnote form of the annotations for narrow screens */}
        <dl className="mt-8 grid gap-3 text-sm text-mist lg:hidden" data-reveal style={{ '--delay': '400ms' } as CSSProperties}>
          {Object.entries(NOTES).map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="label pt-0.5 text-signal-soft">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 pb-16 lg:mt-36 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[38ch] text-lg leading-relaxed text-haze lg:col-span-5" data-reveal style={{ '--delay': '450ms' } as CSSProperties}>
            RS Labs is an independent studio that designs and builds software: our own products, and SaaS platforms, web
            apps, Android apps and AI tools for people with a problem worth solving.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-6 lg:col-start-7 lg:justify-end" data-reveal style={{ '--delay': '550ms' } as CSSProperties}>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-signal px-6 py-4 font-medium text-white transition-colors hover:bg-[#2f69ea]"
            >
              See what we're building
              <Arrow className="transition-transform duration-200 group-hover:translate-y-0.5" down />
            </a>
            <a href="#contact" className="group inline-flex items-center gap-2 py-4 font-medium text-paper">
              <span className="border-b border-paper/30 pb-0.5 transition-colors group-hover:border-signal">Start a conversation</span>
              <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <TitleBlock />
      </div>
    </section>
  )
}

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block" data-reveal style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </span>
  )
}

/** A headline word with a drafting callout attached (desktop) or a footnote marker (mobile). */
function Annotated({ id, place, children }: { id: keyof typeof NOTES; place: 'above' | 'below'; children: ReactNode }) {
  const above = place === 'above'
  return (
    <span className="group relative inline-block">
      <span className="underline decoration-signal/70 decoration-[0.05em] underline-offset-[0.1em] [text-decoration-skip-ink:none] transition-[text-decoration-color] group-hover:decoration-signal">
        {children}
      </span>
      <sup aria-hidden="true" className="label ml-1 align-super text-[0.18em] text-signal-soft lg:hidden">{id}</sup>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[55%] hidden w-[17rem] lg:block ${above ? 'bottom-full mb-5' : 'top-full mt-6'}`}
      >
        <span
          className={`absolute left-0 w-px bg-signal/60 ${above ? 'top-full h-5' : 'bottom-full h-6'}`}
        />
        <span
          className="block border-l border-signal/60 pl-3 font-sans text-[0.8rem] font-normal leading-snug tracking-normal text-mist transition-colors group-hover:text-haze"
          data-reveal
          style={{ '--delay': above ? '900ms' : '1100ms' } as CSSProperties}
        >
          <span className="label mb-1 block text-signal-soft">Note {id}</span>
          {NOTES[id]}
        </span>
      </span>
    </span>
  )
}

/** The mark, drawn as a construction drawing: guides, radius and angle callouts. */
function ConstructionDrawing() {
  const d = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties
  return (
    <svg
      aria-hidden="true"
      viewBox="-80 -80 160 160"
      className="pointer-events-none absolute top-[10rem] hidden w-[34rem] text-mist lg:block lg:-right-[7rem] xl:right-[1%] xl:top-[8rem] xl:w-[40rem]"
      data-inview
    >
      <g fill="none" strokeWidth=".35" vectorEffect="non-scaling-stroke">
        <circle className="draw" pathLength={1} r="46" stroke="currentColor" strokeOpacity=".35" strokeDasharray="1" style={d(200)} />
        <circle r="46" stroke="currentColor" strokeOpacity=".22" strokeDasharray="1.2 1.6" />
        <path d="M-70 0H70M0 -70V70" stroke="currentColor" strokeOpacity=".18" />
        <path className="draw" pathLength={1} d="M0 -40 L35 -20 L35 20 L0 40 L-35 20 L-35 -20Z" stroke="var(--color-signal)" strokeWidth=".9" style={d(350)} />
        <g stroke="currentColor" strokeOpacity=".5" strokeWidth=".5">
          <path className="draw" pathLength={1} d="M0 0V-40" style={d(900)} />
          <path className="draw" pathLength={1} d="M0 0L35 20" style={d(1000)} />
          <path className="draw" pathLength={1} d="M0 0L-35 20" style={d(1100)} />
        </g>
        {/* radius dimension */}
        <path className="draw" pathLength={1} d="M58 -40V40M55 -40H61M55 40H61" stroke="currentColor" strokeOpacity=".45" style={d(1200)} />
        {/* angle arc */}
        <path className="draw" pathLength={1} d="M0 -12 A12 12 0 0 1 10.4 6" stroke="var(--color-violet)" strokeOpacity=".8" style={d(1300)} />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="3.4" fill="currentColor" letterSpacing=".3">
        <text x="66" y="2" transform="rotate(90 66 2)" textAnchor="middle" opacity=".7">80.00</text>
        <text x="13" y="-6" fill="var(--color-violet)" opacity=".9">120°</text>
        <text x="-72" y="-62" opacity=".6">FIG. 1 — RS MARK</text>
        <text x="-72" y="-57" opacity=".4">SCALE 1:1</text>
      </g>
      <circle r="5" fill="var(--color-violet)" opacity=".9" />
      {[[0, -40], [35, 20], [-35, 20]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.6" fill="var(--color-signal)" />
      ))}
    </svg>
  )
}

/** Drawing title block: the four facts a visitor needs, in the place a drawing keeps them. */
function TitleBlock() {
  const cells = [
    {
      k: 'Now building',
      v: (
        <a href="#work" className="group inline-flex items-center gap-2 hover:text-paper">
          <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
          Creator media platform
          <span className="label text-violet">In development</span>
        </a>
      ),
    },
    { k: 'We make', v: 'SaaS · Web · Android · AI tools' },
    { k: 'How', v: 'Plan first. Ship in working slices.' },
    {
      k: 'Write to',
      v: (
        <a href={`mailto:${CONTACT_EMAIL}`} className="border-b border-transparent hover:border-signal hover:text-paper">
          {CONTACT_EMAIL}
        </a>
      ),
    },
  ]
  return (
    <dl className="grid grid-cols-1 border-t border-ink-700 sm:grid-cols-2 lg:grid-cols-4" data-reveal style={{ '--delay': '650ms' } as CSSProperties}>
      {cells.map((c, i) => (
        <div
          key={c.k}
          className={`py-5 sm:pr-6 ${i > 0 ? 'border-t border-ink-700 sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l sm:pl-6' : ''} ${i === 2 ? 'sm:border-t lg:border-t-0 lg:border-l lg:pl-6' : ''} ${i === 3 ? 'sm:border-t lg:border-t-0' : ''} border-ink-700`}
        >
          <dt className="label text-mist">{c.k}</dt>
          <dd className="mt-1.5 text-[0.95rem] text-haze">{c.v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Arrow({ className = '', down = false }: { className?: string; down?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} aria-hidden="true">
      <path
        d={down ? 'M8 2v12M3 9l5 5 5-5' : 'M2 8h12M9 3l5 5-5 5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}
