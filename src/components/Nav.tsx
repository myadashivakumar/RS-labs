import { useEffect, useState } from 'react'
import { NAV } from '../content'
import { Wordmark } from './Mark'

/** Simple sticky header: logo, three links and a "Contact us" button. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled || open ? 'shadow-[0_1px_0_var(--color-line)]' : ''
      }`}
    >
      <a href="#main" className="sr-only z-50 rounded bg-brand px-3 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-3 focus:top-3">
        Skip to content
      </a>
      <nav aria-label="Primary" className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" aria-label="RS Labs, back to top" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8 text-[0.95rem] text-ink-soft">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="relative py-2 transition-colors hover:text-brand">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="rounded-md bg-ink px-5 py-2.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink-soft">
            Contact us
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white md:hidden">
        <ul className="wrap py-3">
          {[...NAV, { href: '#contact', label: 'Contact us' }].map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} className="block py-3 text-lg text-ink">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
