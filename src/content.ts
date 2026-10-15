// Site-wide facts in one place, so copy stays consistent and easy to change.

export const CONTACT_EMAIL = 'hello@rs-labs.in'
export const TAGLINE = 'Build. Create. Innovate.'

export type SheetId = 'work' | 'capabilities' | 'method' | 'studio' | 'contact'

export const SHEETS: { id: SheetId; no: string; label: string }[] = [
  { id: 'work', no: '01', label: 'Work' },
  { id: 'capabilities', no: '02', label: 'Capabilities' },
  { id: 'method', no: '03', label: 'Method' },
  { id: 'studio', no: '04', label: 'Studio' },
  { id: 'contact', no: '05', label: 'Contact' },
]

export const INTERESTS = [
  'SaaS platform',
  'Web application',
  'Android app',
  'AI tool',
  'Creator platform early access',
] as const

export type Interest = (typeof INTERESTS)[number]

/** Lets any section pre-select an interest in the contact composer. */
export function requestInterest(interest: Interest) {
  window.dispatchEvent(new CustomEvent<Interest>('rs:interest', { detail: interest }))
  document.getElementById('contact')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
