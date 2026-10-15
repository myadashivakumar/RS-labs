import type { CSSProperties } from 'react'
import { Sheet } from './Sheet'

const STAGES = [
  {
    name: 'Understand',
    body: "We start with the job your users are trying to get done, and write it down. If software isn't the answer, we'll tell you.",
  },
  {
    name: 'Draw it up',
    body: 'Screens, data and scope on paper first. You approve a plan you can actually read before anything is built.',
  },
  {
    name: 'Build in slices',
    body: 'Working software every week or two, in front of real users early, instead of one big reveal at the end.',
  },
  {
    name: 'Look after it',
    body: 'Launch is a milestone, not the finish. We watch what gets used and keep refining what matters.',
  },
]

const PRINCIPLES = [
  ['Plain over clever.', 'Code and interfaces the next person can understand without us in the room.'],
  ['Fast where it matters.', 'We set performance budgets for the screens people use most, and keep to them.'],
  ['Accessible by default.', 'Keyboard use, contrast and screen readers are part of done, not a later phase.'],
  ['Our own products keep us honest.', 'We run software we built ourselves, so we live with the same trade-offs we recommend.'],
]

/**
 * Sheet 03 draws the process as a dimensioned line (a sequence, not a grid),
 * then states principles as plain sentences.
 */
export function Method() {
  return (
    <Sheet id="method" no="03" title="Method" tone="deep">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="method-title" className="display text-[clamp(2.2rem,4.6vw,4rem)] lg:col-span-6" data-reveal>
            How an idea becomes software.
          </h2>
          <p className="max-w-[44ch] text-haze lg:col-span-5 lg:col-start-8" data-reveal style={{ '--delay': '100ms' } as CSSProperties}>
            Four stages, each ending in something you can see and use. The same process runs our own products and the
            work we do with clients.
          </p>
        </div>

        {/* Dimension line */}
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6" data-inview>
          <svg aria-hidden="true" className="absolute left-0 top-[0.45rem] hidden h-3 w-full text-mist md:block" preserveAspectRatio="none" viewBox="0 0 100 4">
            <path className="draw" pathLength={1} d="M0 2H100" stroke="currentColor" strokeOpacity=".5" vectorEffect="non-scaling-stroke" fill="none" />
          </svg>
          <span aria-hidden="true" className="absolute bottom-0 left-[0.45rem] top-2 w-px bg-ink-700 md:hidden" />
          {STAGES.map((s, i) => (
            <li key={s.name} className="relative pl-8 md:pl-0" data-reveal style={{ '--delay': `${200 + i * 140}ms` } as CSSProperties}>
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 block h-[0.95rem] w-[0.95rem] rotate-45 border bg-ink-900 md:static ${
                  i === STAGES.length - 1 ? 'border-violet' : 'border-signal'
                }`}
              />
              <p className="label mt-0 text-mist md:mt-6">Stage {i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-3 max-w-[30ch] text-[0.97rem] text-haze">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 border-t border-ink-700 pt-10">
          <h3 className="label text-mist" data-reveal>Principles</h3>
          <dl className="mt-8 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {PRINCIPLES.map(([t, d], i) => (
              <div key={t} data-reveal style={{ '--delay': `${i * 80}ms` } as CSSProperties}>
                <dt className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-[-0.025em]">{t}</dt>
                <dd className="mt-2 max-w-[44ch] text-haze">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Sheet>
  )
}
