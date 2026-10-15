import type { CSSProperties } from 'react'
import { Sheet } from './Sheet'

/**
 * Sheet 04 changes voice on purpose: the statement is set in the text face,
 * large and light, like a printed note rather than a headline. Only facts we
 * can stand behind: no team photos, dates, numbers or client logos.
 */
export function Studio() {
  return (
    <Sheet id="studio" no="04" title="Studio" tone="paper">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <h2 id="studio-title" className="sr-only">About RS Labs</h2>
        <p
          className="font-sans text-[clamp(1.75rem,3.5vw,3.15rem)] font-normal leading-[1.18] tracking-[-0.022em] lg:col-span-10"
          data-reveal
        >
          RS Labs is an independent technology studio. We build products of our own, and we help other people build
          theirs. <span className="text-pencil">Each makes the other better.</span>
        </p>

        <div className="grid gap-8 text-[1.05rem] leading-relaxed sm:grid-cols-2 lg:col-span-8 lg:col-start-5" data-reveal style={{ '--delay': '120ms' } as CSSProperties}>
          <p>
            <span className="label mb-2 block text-pencil">Independent</span>
            The roadmap is ours, and there are no layers between you and the people writing the code. You talk directly
            to whoever is building your software.
          </p>
          <p>
            <span className="label mb-2 block text-pencil">Small on purpose</span>
            We take on a few client projects at a time and spend the rest of our hours on our own products, so we live
            with the same trade-offs we recommend.
          </p>
        </div>
      </div>
    </Sheet>
  )
}
