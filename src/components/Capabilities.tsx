import { useState, type CSSProperties, type ReactNode } from 'react'
import { Sheet } from './Sheet'

type Capability = {
  no: string
  name: string
  what: string
  fit: string
  stack: string
  glyph: ReactNode
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.25 }

const CAPABILITIES: Capability[] = [
  {
    no: '2.1',
    name: 'SaaS platforms',
    what: 'Subscription products with accounts, roles, plans and the admin tools a small team needs to run them day to day.',
    fit: 'You have a workflow customers would pay to have handled for them.',
    stack: 'TypeScript · React · Python · AWS Lambda, DynamoDB, S3',
    glyph: (
      <g {...stroke}>
        <rect x="6" y="22" width="28" height="8" />
        <rect x="9" y="14" width="22" height="8" />
        <rect x="12" y="6" width="16" height="8" />
      </g>
    ),
  },
  {
    no: '2.2',
    name: 'Web applications',
    what: 'Internal tools, portals and customer-facing apps that replace the spreadsheet-and-email process everyone quietly works around.',
    fit: 'An important process lives in spreadsheets and inboxes.',
    stack: 'React · TypeScript · Vite · Tailwind · REST APIs',
    glyph: (
      <g {...stroke}>
        <rect x="5" y="7" width="30" height="24" />
        <path d="M5 13h30M9 10h1M12 10h1" />
        <path d="M10 19h12M10 24h18" strokeOpacity=".6" />
      </g>
    ),
  },
  {
    no: '2.3',
    name: 'Android applications',
    what: 'Native apps that stay usable offline, sync when the network allows, and feel at home on the phone they run on.',
    fit: 'Your users are on phones, in the field, or on unreliable connections.',
    stack: 'Kotlin · Jetpack Compose · Room · WorkManager',
    glyph: (
      <g {...stroke}>
        <rect x="12" y="4" width="16" height="32" rx="2.5" />
        <path d="M18 31h4" />
        <path d="M15 11h10M15 15h7" strokeOpacity=".6" />
      </g>
    ),
  },
  {
    no: '2.4',
    name: 'AI tools',
    what: 'Applied AI where it removes real work: reading and sorting documents, search over your own data, assistants inside the tools you already use. When a simple rule would do the job better, we say so.',
    fit: 'Repetitive reading, sorting or drafting is slowing people down.',
    stack: 'LLM APIs · retrieval over your data · evaluation before launch',
    glyph: (
      <g {...stroke}>
        <path d="M9 5h16l6 6v24H9z" />
        <path d="M25 5v6h6" />
        <path d="M13 17h14M13 21h14M13 25h9" strokeOpacity=".6" />
        <path d="M5 19h30" stroke="var(--color-signal)" />
      </g>
    ),
  },
]

/**
 * Sheet 02 is an index, not a grid of cards: four rows you can open one at a
 * time. The name is what you scan; detail appears only on request.
 */
export function Capabilities() {
  const [open, setOpen] = useState<string>(CAPABILITIES[0].no)

  return (
    <Sheet id="capabilities" no="02" title="Capabilities">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="capabilities-title" className="display text-[clamp(2.2rem,4.6vw,4rem)]" data-reveal>
              What we build for others.
            </h2>
            <p className="mt-6 max-w-[34ch] text-haze" data-reveal style={{ '--delay': '100ms' } as CSSProperties}>
              The same studio, the same care we put into our own products. Pick the row closest to your problem.
            </p>
          </div>
        </div>

        <ul className="border-b border-ink-700 lg:col-span-8">
          {CAPABILITIES.map((c, i) => {
            const isOpen = open === c.no
            const panel = `cap-${c.no.replace('.', '-')}`
            return (
              <li key={c.no} className="border-t border-ink-700" data-reveal style={{ '--delay': `${i * 70}ms` } as CSSProperties}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? '' : c.no)}
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[4rem_1fr_auto_auto] sm:py-7"
                  >
                    <span className={`label transition-colors ${isOpen ? 'text-signal' : 'text-mist group-hover:text-signal-soft'}`}>{c.no}</span>
                    <span
                      className={`font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] transition-[color,transform] duration-300 ${
                        isOpen ? 'text-paper' : 'text-haze group-hover:translate-x-1 group-hover:text-paper'
                      }`}
                    >
                      {c.name}
                    </span>
                    <svg viewBox="0 0 40 40" aria-hidden="true" className={`hidden h-10 w-10 transition-colors sm:block ${isOpen ? 'text-signal-soft' : 'text-mist'}`}>
                      {c.glyph}
                    </svg>
                    <span aria-hidden="true" className="relative h-3 w-3">
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                      <span className={`absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-300 ${isOpen ? 'scale-y-0' : ''}`} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  aria-label={c.name}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-draw)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  inert={!isOpen}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-8 sm:grid-cols-[4rem_1fr] sm:gap-4">
                      <div className="hidden sm:block" />
                      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:gap-10">
                        <p className="text-haze">{c.what}</p>
                        <dl className="space-y-4 text-[0.92rem]">
                          <div>
                            <dt className="label text-mist">Good fit when</dt>
                            <dd className="mt-1 text-haze">{c.fit}</dd>
                          </div>
                          <div>
                            <dt className="label text-mist">Typical stack</dt>
                            <dd className="mt-1 font-mono text-[0.8rem] leading-relaxed text-signal-soft">{c.stack}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Sheet>
  )
}
