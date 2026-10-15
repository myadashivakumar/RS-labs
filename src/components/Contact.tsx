import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { CONTACT_EMAIL, INTERESTS, type Interest } from '../content'
import { Arrow } from './Hero'
import { Sheet } from './Sheet'

/**
 * Sheet 05. No backend: the composer turns a few choices into a ready-to-send
 * email in the visitor's own mail app, and the address is always visible.
 */
export function Contact() {
  const [picked, setPicked] = useState<Set<Interest>>(new Set())
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  // Other sheets can pre-select a topic (e.g. "Ask about early access").
  useEffect(() => {
    const on = (e: Event) => {
      const interest = (e as CustomEvent<Interest>).detail
      setPicked((p) => new Set(p).add(interest))
    }
    window.addEventListener('rs:interest', on)
    return () => window.removeEventListener('rs:interest', on)
  }, [])

  function toggle(i: Interest) {
    setPicked((p) => {
      const n = new Set(p)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  }

  function compose(e: FormEvent) {
    e.preventDefault()
    const topics = [...picked]
    const subject = topics.length ? `Project enquiry: ${topics.join(', ')}` : 'Hello RS Labs'
    const body = [
      topics.length ? `Interested in: ${topics.join(', ')}` : '',
      '',
      message.trim() || 'A few lines about what I have in mind:',
    ].join('\n').trim()
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

  return (
    <Sheet id="contact" no="05" title="Contact">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="contact-title" className="display text-[clamp(2.6rem,6vw,5.5rem)]" data-reveal>
            Tell us what you're trying to build.
          </h2>
          <p className="mt-6 max-w-[40ch] text-haze" data-reveal style={{ '--delay': '100ms' } as CSSProperties}>
            A few lines is enough: the problem, who it's for, and any timing. We'll reply with questions or a next step.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2" data-reveal style={{ '--delay': '160ms' } as CSSProperties}>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em] underline decoration-ink-700 decoration-1 underline-offset-[0.25em] transition-colors hover:decoration-signal"
            >
              {CONTACT_EMAIL}
            </a>
            <button type="button" onClick={copy} className="label text-signal-soft hover:text-paper" aria-live="polite">
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>
        </div>

        <form onSubmit={compose} className="border-t border-ink-700 pt-8 lg:col-span-5 lg:col-start-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2" data-reveal style={{ '--delay': '200ms' } as CSSProperties}>
          <fieldset>
            <legend className="label text-mist">I'm interested in</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const on = picked.has(i)
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className={`rounded-[2px] border px-3 py-2 text-[0.88rem] transition-colors ${
                      on ? 'border-signal bg-signal text-white' : 'border-ink-700 text-haze hover:border-mist hover:text-paper'
                    }`}
                  >
                    {i}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label htmlFor="contact-message" className="label mt-8 block text-mist">
            A few lines about it <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's the problem, and who has it?"
            className="mt-3 w-full resize-y rounded-[2px] border border-ink-700 bg-transparent p-3 text-paper placeholder:text-mist/70 focus:border-signal focus:outline-none"
          />

          <button
            type="submit"
            className="group mt-6 inline-flex w-full items-center justify-between bg-signal px-5 py-4 font-medium text-white transition-colors hover:bg-[#2f69ea] sm:w-auto sm:gap-6"
          >
            Open in your email app
            <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-[0.82rem] text-mist">Nothing is sent from this page; it prepares an email in your own mail app.</p>
        </form>
      </div>
    </Sheet>
  )
}
