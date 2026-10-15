import { CONTACT_EMAIL, SHEETS, TAGLINE } from '../content'
import { Wordmark } from './Mark'

/** Restrained footer, laid out as the drawing set's title block. */
export function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950 text-[0.9rem] text-haze">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark />
          <p className="label mt-4 text-mist">{TAGLINE}</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3">
          <p className="label text-mist">Index</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
            {SHEETS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-paper">
                  <span className="label mr-2 text-[0.62rem] text-mist">{s.no}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-2">
          <p className="label text-mist">Contact</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 block hover:text-paper">{CONTACT_EMAIL}</a>
        </div>
        <div className="lg:col-span-2">
          <p className="label text-mist">Legal</p>
          <a href="/privacy.html" className="mt-3 block hover:text-paper">Privacy</a>
        </div>
      </div>
      <div className="wrap label flex flex-wrap justify-between gap-2 border-t border-ink-700 py-5 text-[0.64rem] text-mist">
        <span>© {new Date().getFullYear()} RS Labs</span>
        <span>rs-labs.in · Designed and built in-house</span>
      </div>
    </footer>
  )
}
