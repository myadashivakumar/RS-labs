import { useState, type CSSProperties } from 'react'
import { requestInterest } from '../content'
import { Arrow } from './Hero'
import { ProductPreview, type Region } from './ProductPreview'
import { Sheet } from './Sheet'

const POINTS: { n: Region; title: string; body: string }[] = [
  {
    n: 1,
    title: 'Uploads built for very large files',
    body: 'Footage goes up in parts, so a dropped connection costs a few seconds, not the whole transfer. Progress stays visible to everyone on the project.',
  },
  {
    n: 2,
    title: 'A library organised by project',
    body: 'Shoots live in projects and folders with the names you already use, instead of scattered across drive links and inboxes.',
  },
  {
    n: 3,
    title: 'Sharing you stay in control of',
    body: 'Send an editor a link to exactly the files they need. You decide whether they can download, and when the link stops working.',
  },
]

/**
 * Sheet 01 reads like an editorial case study on warm paper: the problem in
 * prose, then a numbered legend tied to pins on a working preview.
 * Hovering either side highlights the other.
 */
export function Work() {
  const [focus, setFocus] = useState<Region | null>(null)

  return (
    <Sheet id="work" no="01" title="Work" tone="paper">
      <div className="wrap">
        <header className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3" data-reveal>
              <span className="label text-pencil">Case study 01 — our product</span>
              <span className="label inline-flex items-center gap-2 border border-violet/50 px-2 py-1 text-[0.66rem] text-[#5b3fe0]">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
                In development · not yet available
              </span>
            </div>
            <h2 id="work-title" className="display mt-6 text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.98]" data-reveal style={{ '--delay': '80ms' } as CSSProperties}>
              Handing raw footage to an editor shouldn't take a weekend.
            </h2>
          </div>
          <dl className="grid content-end gap-x-6 gap-y-4 text-[0.92rem] sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1" data-reveal style={{ '--delay': '160ms' } as CSSProperties}>
            {[
              ['Product', 'Creator media platform'],
              ['For', 'Creators and the editors they work with'],
              ['Platform', 'Web, built for files in the hundreds of gigabytes'],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-paper-line pt-2">
                <dt className="label text-pencil">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-4" data-reveal>
            <h3 className="label text-pencil">The problem</h3>
            <p className="mt-3 font-display text-[1.35rem] font-medium leading-snug tracking-[-0.01em]">
              A single shoot can fill hundreds of gigabytes. Getting it to an editor still means expiring links, folders
              nobody can find, and uploads that fail halfway.
            </p>

            <h3 className="label mt-12 text-pencil">What we're building</h3>
            <ol className="mt-3">
              {POINTS.map((p) => (
                <li
                  key={p.n}
                  onMouseEnter={() => setFocus(p.n)}
                  onMouseLeave={() => setFocus(null)}
                  className={`grid grid-cols-[1.75rem_1fr] gap-3 border-t border-paper-line py-4 transition-colors ${
                    focus === p.n ? 'text-graphite' : 'text-graphite/85'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`label grid h-5 w-5 place-items-center rounded-full border text-[0.6rem] transition-colors ${
                      focus === p.n ? 'border-signal bg-signal text-white' : 'border-pencil/50 text-pencil'
                    }`}
                  >
                    {p.n}
                  </span>
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-[0.94rem] leading-relaxed text-pencil">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => requestInterest('Creator platform early access')}
              className="group mt-8 inline-flex items-center gap-2 font-medium"
            >
              <span className="border-b border-graphite/30 pb-0.5 transition-colors group-hover:border-signal">Ask about early access</span>
              <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="min-w-0 lg:col-span-8 lg:pt-8" data-reveal style={{ '--delay': '120ms' } as CSSProperties}>
            <div className="lg:sticky lg:top-24">
            <ProductPreview focus={focus} onFocus={setFocus} />
            <p className="label mt-4 text-[0.66rem] text-pencil">
              Fig. 2 — Interface study. Select files, then create a share link. Nothing leaves this page.
            </p>
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  )
}
