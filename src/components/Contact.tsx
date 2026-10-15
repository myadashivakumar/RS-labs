import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { CONTACT_EMAIL, INTERESTS, type Interest } from '../content'
import { Arrow } from './Hero'
import { Sheet } from './Sheet'

/**
 * Sheet 05 is the hero's bookend: large type, then a single sentence the
 * visitor completes. No backend; it prepares an email in their own mail app,
 * and the address is always visible for anyone who'd rather just write.
 */
export function Contact() {
  const [topic, setTopic] = useState<Interest>(INTERESTS[0])
  const [detail, setDetail] = useState('')
  const [copied, setCopied] = useState(false)

  // Other sheets can pre-select a topic (e.g. "Ask about early access").
  useEffect(() => {
    const on = (e: Event) => setTopic((e as CustomEvent<Interest>).detail)
    window.addEventListener('rs:interest', on)
    return () => window.removeEventListener('rs:interest', on)
  }, [])

  function compose(e: FormEvent) {
    e.preventDefault()
    const subject = `Hello RS Labs: ${topic}`
    const body = `Hi RS Labs,\n\nI'd like help with ${topic}.\n\n${detail.trim() || 'In short: '}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable: the address is visible to select by hand */
    }
  }

  const field =
    'border-0 border-b-2 border-signal/70 bg-transparent px-0 text-paper focus:border-signal'

  return (
    <Sheet id="contact" no="05" title="Contact">
      <div className="wrap">
        <h2 id="contact-title" className="display max-w-[14ch] text-[clamp(2.9rem,7.4vw,7.25rem)]" data-reveal>
          Tell us what you're trying to build.
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <form onSubmit={compose} className="lg:col-span-8" data-reveal style={{ '--delay': '120ms' } as CSSProperties}>
            <p className="font-display text-[clamp(1.45rem,2.6vw,2.25rem)] font-medium leading-[1.6] tracking-[-0.02em] text-haze">
              Hi RS Labs, I'd like help with{' '}
              <label className="sr-only" htmlFor="contact-topic">Topic</label>
              {/* The select sizes itself to the chosen phrase via an invisible twin, so the sentence reads naturally. */}
              <span className="relative inline-block max-w-full">
                <span aria-hidden="true" className="invisible whitespace-nowrap border-b-2 border-transparent pr-7">{topic}</span>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as Interest)}
                  className={`${field} absolute inset-0 w-full cursor-pointer appearance-none pr-7`}
                >
                  {INTERESTS.map((i) => (
                    <option key={i} value={i} className="bg-ink-900 text-base">{i}</option>
                  ))}
                </select>
                <svg aria-hidden="true" viewBox="0 0 12 12" className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-signal-soft">
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <span className="whitespace-nowrap">. In short:</span>
            </p>
            <label className="sr-only" htmlFor="contact-detail">In short, what are you trying to build?</label>
            <textarea
              id="contact-detail"
              rows={2}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="the problem, who has it, and any timing"
              className={`${field} mt-2 w-full resize-none font-display text-[clamp(1.2rem,2vw,1.6rem)] leading-normal placeholder:text-mist/60`}
            />
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                className="group inline-flex items-center gap-6 bg-signal px-5 py-4 font-medium text-white transition-colors hover:bg-[#2f69ea]"
              >
                Write the email
                <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <p className="text-[0.85rem] text-mist">Opens your own mail app. Nothing is sent from this page.</p>
            </div>
          </form>

          <div className="self-end border-t border-ink-700 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" data-reveal style={{ '--delay': '200ms' } as CSSProperties}>
            <p className="label text-mist">Or write directly</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block text-[1.35rem] text-paper underline decoration-ink-700 underline-offset-[0.3em] hover:decoration-signal">
              {CONTACT_EMAIL}
            </a>
            <button type="button" onClick={copy} className="label mt-3 text-signal-soft hover:text-paper" aria-live="polite">
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>
        </div>
      </div>
    </Sheet>
  )
}
