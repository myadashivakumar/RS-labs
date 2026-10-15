import type { CSSProperties } from 'react'
import { Sheet } from './Sheet'

const SCHEDULE = [
  {
    no: '02.1',
    name: 'SaaS platforms',
    scope: 'Subscription products with accounts, roles, plans and the admin tools a small team needs to run them.',
    fit: 'A workflow customers would pay to have handled.',
    stack: 'TypeScript, React, Python, AWS',
  },
  {
    no: '02.2',
    name: 'Web applications',
    scope: 'Internal tools, portals and customer-facing apps that replace the spreadsheet-and-email process.',
    fit: 'An important process lives in spreadsheets and inboxes.',
    stack: 'React, TypeScript, Vite, REST',
  },
  {
    no: '02.3',
    name: 'Android apps',
    scope: 'Native apps that stay usable offline and sync when the network allows.',
    fit: 'Users on phones, in the field, on patchy connections.',
    stack: 'Kotlin, Jetpack Compose, Room',
  },
  {
    no: '02.4',
    name: 'AI tools',
    scope: "Reading and sorting documents, search over your own data, assistants inside existing tools. If a plain rule would do better, we'll say so.",
    fit: 'Repetitive reading, sorting or drafting.',
    stack: 'LLM APIs, retrieval, evaluations',
  },
]

/**
 * Sheet 02 is a drawing schedule, the table on a drawing set's cover sheet.
 * Everything is visible at once; nothing hides behind accordions or icons.
 */
export function Capabilities() {
  return (
    <Sheet id="capabilities" no="02" title="Capabilities">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="capabilities-title" className="section-title lg:col-span-7" data-reveal>
            What we build for others.
          </h2>
          <p className="max-w-[42ch] text-haze lg:col-span-4 lg:col-start-9" data-reveal style={{ '--delay': '100ms' } as CSSProperties}>
            The same studio and the same standards as our own products. Find the row closest to your problem.
          </p>
        </div>

        <table className="mt-14 w-full border-collapse text-left max-md:block" data-reveal style={{ '--delay': '150ms' } as CSSProperties}>
          <caption className="sr-only">Schedule of capabilities</caption>
          <thead className="label text-mist max-md:hidden">
            <tr className="border-b border-ink-700">
              <th scope="col" className="w-[6rem] py-3 font-normal">No.</th>
              <th scope="col" className="py-3 pr-8 font-normal">Discipline</th>
              <th scope="col" className="py-3 pr-8 font-normal">Scope</th>
              <th scope="col" className="hidden py-3 pr-8 font-normal xl:table-cell">Good fit when</th>
              <th scope="col" className="w-[13rem] py-3 font-normal">Typical stack</th>
            </tr>
          </thead>
          <tbody className="max-md:block">
            {SCHEDULE.map((r) => (
              <tr
                key={r.no}
                className="group border-b border-ink-700 align-top transition-colors hover:bg-ink-900 max-md:grid max-md:grid-cols-[3.5rem_1fr] max-md:gap-x-3 max-md:py-6"
              >
                <td className="label py-7 text-mist transition-colors group-hover:text-signal max-md:row-span-4 max-md:py-1">{r.no}</td>
                <th scope="row" className="py-6 pr-8 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold leading-[1.05] tracking-[-0.03em] max-md:py-0 md:w-[30%]">
                  {r.name}
                </th>
                <td className="py-7 pr-8 text-haze max-md:pt-3 max-md:pb-0">{r.scope}</td>
                <td className="hidden py-7 pr-8 text-[0.95rem] text-mist xl:table-cell">{r.fit}</td>
                <td className="py-7 font-mono text-[0.78rem] leading-relaxed text-signal-soft max-md:pt-3 max-md:pb-0">{r.stack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sheet>
  )
}
