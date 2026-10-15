import type { CSSProperties, ReactNode } from 'react'
import { Sheet } from './Sheet'

const NOTES = [
  "If software isn't the answer, we'll tell you before we start.",
  'You approve a plan you can read before anything is built.',
  'Working software every week or two, in front of real users early.',
  'Launch is a milestone. We keep refining what gets used.',
]

const STANDARDS = ['Plain over clever', 'Fast where it matters', 'Accessible by default', 'We use what we build']

/**
 * Sheet 03 is written, not diagrammed: one paragraph carries the process, and
 * the details sit in the margin, the way notes sit beside a drawing.
 * Replaces the four-column "how it works" steps and a 2×2 principles grid.
 */
export function Method() {
  return (
    <Sheet id="method" no="03" title="Method" tone="deep">
      <div className="wrap grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <h2 id="method-title" className="section-title lg:col-span-12" data-reveal>
          How an idea becomes software.
        </h2>

        <p
          className="font-display text-[clamp(1.55rem,2.75vw,2.5rem)] font-medium leading-[1.28] tracking-[-0.02em] text-haze lg:col-span-8"
          data-reveal
          style={{ '--delay': '100ms' } as CSSProperties}
        >
          Every project, ours or yours, moves the same way. We start by <Stage n={1}>understanding the job</Stage> your
          users are trying to get done. Then we <Stage n={2}>draw it up</Stage>: screens, data and scope on paper. We{' '}
          <Stage n={3}>build in slices</Stage>, so real people use it early. And after launch, we{' '}
          <Stage n={4}>look after it</Stage>.
        </p>

        <ol className="space-y-6 border-ink-700 text-[0.95rem] text-mist lg:col-span-4 lg:border-l lg:pl-8" data-reveal style={{ '--delay': '200ms' } as CSSProperties}>
          {NOTES.map((note, i) => (
            <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-2">
              <span className="label pt-1 text-signal-soft">{i + 1}</span>
              <span>{note}</span>
            </li>
          ))}
        </ol>

        <div className="border-t border-ink-700 pt-6 lg:col-span-12" data-reveal>
          <h3 className="sr-only">Standards</h3>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[1.05rem] text-paper">
            {STANDARDS.map((s, i) => (
              <li key={s} className="flex items-center gap-8">
                {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-ink-700 max-sm:hidden" />}
                {s}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sheet>
  )
}

/** A stage name inside the paragraph, keyed to its margin note. */
function Stage({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="text-paper">
      <span className="underline decoration-signal/60 decoration-[0.06em] underline-offset-[0.18em]">{children}</span>
      <sup className="ml-0.5 font-mono text-[0.42em] font-normal text-signal-soft">{n}</sup>
    </span>
  )
}
