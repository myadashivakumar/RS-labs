// Site-wide facts in one place, so copy stays consistent and easy to change.

export const CONTACT_EMAIL = 'hello@rs-labs.in'
export const TAGLINE = 'Build. Create. Innovate.'

/**
 * Formspree form that delivers contact-form messages to our inbox
 * (e.g. 'https://formspree.io/f/abcdwxyz'). Empty = fall back to opening
 * the visitor's email app.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvkzjgwp'

export const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#products', label: 'Products' },
  { href: '#about', label: 'About' },
]

export const SERVICES = [
  {
    title: 'SaaS platforms',
    body: 'Subscription products with accounts, roles and admin tools, built to grow with your customers.',
    icon: 'layers',
  },
  {
    title: 'Web applications',
    body: 'Portals, dashboards and internal tools that replace spreadsheets and manual work.',
    icon: 'browser',
  },
  {
    title: 'Mobile apps',
    body: 'Native Android apps that are fast, reliable and work well on any network.',
    icon: 'phone',
  },
  {
    title: 'AI solutions',
    body: 'Practical AI for documents, search and assistants, built into the tools your team already uses.',
    icon: 'spark',
  },
] as const

/**
 * Products stay hidden (blurred "Coming soon" cards, no names on the page)
 * until the apps are released. Flip to true at launch.
 */
export const PRODUCTS_LIVE = false

export const PRODUCTS = [
  {
    name: 'Kosha',
    status: 'Early access',
    body: 'Secure photo and video backup for businesses. Invite-only access, organised folders and low-cost archive storage, on Android and the web.',
  },
  {
    name: 'Creator media platform',
    status: 'In development',
    body: 'Upload, organise and securely share large video files with editors, without expiring links or failed transfers.',
  },
]

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
