import { CONTACT_EMAIL, PRODUCTS, SERVICES } from '../content'
import { Wordmark } from './Mark'

export function Footer() {
  const col = 'text-sm font-semibold text-ink'
  const link = 'text-muted transition-colors hover:text-brand'
  return (
    <footer className="border-t border-line bg-white text-[0.95rem]">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-[30ch] text-muted">An independent software company building products and solutions.</p>
        </div>
        <div>
          <p className={col}>Services</p>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.title}><a href="#services" className={link}>{s.title}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className={col}>Products</p>
          <ul className="mt-4 space-y-2.5">
            {PRODUCTS.map((p) => (
              <li key={p.name}><a href="#products" className={link}>{p.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className={col}>Company</p>
          <ul className="mt-4 space-y-2.5">
            <li><a href="#about" className={link}>About us</a></li>
            <li><a href="#contact" className={link}>Contact</a></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className={link}>{CONTACT_EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-wrap justify-between gap-3 py-6 text-sm text-muted">
          <span>© {new Date().getFullYear()} RS Labs. All rights reserved.</span>
          <a href="/privacy.html" className={link}>Privacy policy</a>
        </div>
      </div>
    </footer>
  )
}
