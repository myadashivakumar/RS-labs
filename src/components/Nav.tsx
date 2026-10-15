import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SHEETS, TAGLINE } from '../content'
import { useActiveSection } from '../hooks/useReveal'
import { Wordmark } from './Mark'

const IDS = SHEETS.map((s) => s.id)
const INDEX = SHEETS.filter((s) => s.id !== 'contact')

/**
 * The nav is the drawing set's index: sheet numbers, with one shared marker
 * that slides to whichever sheet you are reading.
 */
export function Nav() {
  const active = useActiveSection(IDS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [marker, setMarker] = useState<{ x: number; w: number } | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Slide the marker under the active index entry.
  useLayoutEffect(() => {
    const place = () => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
      setMarker(el ? { x: el.offsetLeft, w: el.offsetWidth } : null)
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-b border-ink-700 bg-ink-950/95' : 'border-b border-transparent'
      }`}
    >
      <a href="#main" className="label sr-only z-50 bg-signal px-3 py-2 text-white focus:not-sr-only focus:absolute focus:left-3 focus:top-3">
        Skip to content
      </a>
      <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0 text-paper" aria-label="RS Labs, back to top" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul ref={listRef} className="relative flex items-center gap-7">
            {INDEX.map((s) => (
              <li key={s.id} data-id={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'location' : undefined}
                  className="group flex items-baseline gap-1.5 py-2 text-[0.92rem] text-haze transition-colors hover:text-paper aria-[current]:text-paper"
                >
                  <span className="label text-[0.66rem] text-mist transition-colors group-hover:text-signal-soft group-aria-[current]:text-signal">
                    {s.no}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-0.5 left-0 h-px bg-signal transition-[transform,width,opacity] duration-500 ease-[var(--ease-draw)]"
              style={{
                width: marker?.w ?? 0,
                transform: `translateX(${marker?.x ?? 0}px)`,
                opacity: marker ? 1 : 0,
              }}
            />
          </ul>
          <a
            href="#contact"
            className="label border border-signal/60 px-3.5 py-2 text-paper transition-colors hover:border-signal hover:bg-signal"
          >
            05 Contact
          </a>
        </div>

        <button
          type="button"
          className="label flex items-center gap-2 py-2 text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-index"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Index'}
          <span aria-hidden="true" className="relative block h-2.5 w-5">
            <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? 'top-1 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? 'top-1 -rotate-45' : 'top-2.5'}`} />
          </span>
        </button>
      </nav>

      <MobileIndex open={open} onClose={() => setOpen(false)} active={active} />
    </header>
  )
}

function MobileIndex({ open, onClose, active }: { open: boolean; onClose: () => void; active: string | null }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector('a')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-index"
      ref={panel}
      hidden={!open}
      className="h-[calc(100dvh-4rem)] overflow-y-auto bg-ink-950 md:hidden"
    >
      <ul className="wrap flex flex-col pt-6">
        {SHEETS.map((s, i) => (
          <li key={s.id} className="border-b border-ink-700" style={{ animation: `rs-rise .5s var(--ease-soft) ${i * 50}ms both` }}>
            <a
              href={`#${s.id}`}
              onClick={onClose}
              aria-current={active === s.id ? 'location' : undefined}
              className="flex items-baseline gap-4 py-5 font-display text-4xl font-semibold tracking-tight aria-[current]:text-signal-soft"
            >
              <span className="label text-mist">{s.no}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="wrap label mt-10 text-mist">{TAGLINE}</p>
    </div>
  )
}
