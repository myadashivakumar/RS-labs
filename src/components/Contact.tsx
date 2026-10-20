import { useState, type FormEvent } from 'react'
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from '../content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Dark contact band. Messages go to our inbox through Formspree; without an
 * endpoint configured, the form falls back to opening the visitor's email app.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    data.set('_subject', `RS Labs enquiry from ${name}${company ? ` (${company})` : ''}`)

    if (!FORMSPREE_ENDPOINT) {
      const body = `${data.get('message')}\n\n${name}${company ? `\n${company}` : ''}\n${data.get('email')}`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(String(data.get('_subject')))}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const field =
    'mt-2 w-full border-0 border-b border-white/25 bg-transparent px-0 py-2.5 text-white placeholder:text-white/40 focus:border-brand focus:ring-0'

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink py-[var(--section-y)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-full w-[40rem] bg-gradient-to-br from-brand/35 via-violet/25 to-transparent blur-3xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow !text-[#9db8ff]" data-reveal>Contact us</p>
          <h2 id="contact-title" className="heading mt-3" data-reveal>
            Let's build something together.
          </h2>
          <p className="mt-6 max-w-[42ch] text-white/70" data-reveal>
            Tell us about your idea or project, and we'll get back to you with questions or a next step.
          </p>
          <p className="mt-10 text-sm text-white/55" data-reveal>Or email us at</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block text-xl underline decoration-white/30 underline-offset-4 hover:decoration-white" data-reveal>
            {CONTACT_EMAIL}
          </a>
        </div>

        {status === 'sent' ? (
          <div role="status" className="self-center rounded-xl border border-white/15 bg-white/5 p-8">
            <p className="text-2xl font-medium">Thanks, your message is on its way.</p>
            <p className="mt-2 text-white/70">We'll reply to the email address you gave us.</p>
            <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm text-[#9db8ff] underline underline-offset-4 hover:text-white">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={send} className="grid gap-6 sm:grid-cols-2" data-reveal>
            <label className="block text-sm text-white/70">
              Your name
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="block text-sm text-white/70">
              Email
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="block text-sm text-white/70 sm:col-span-2">
              Company <span className="text-white/40">(optional)</span>
              <input name="company" autoComplete="organization" className={field} />
            </label>
            <label className="block text-sm text-white/70 sm:col-span-2">
              How can we help?
              <textarea name="message" required rows={4} placeholder="A few lines about your project" className={`${field} resize-y`} />
            </label>
            {/* Spam trap: hidden from people, filled in by bots, rejected by Formspree */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-md bg-white px-6 py-3.5 font-medium text-ink transition-colors hover:bg-lavender disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p role="status" className={`text-sm ${status === 'error' ? 'text-[#ffb4b4]' : 'text-white/50'}`}>
                {status === 'error'
                  ? `Couldn't send right now. Please try again, or email ${CONTACT_EMAIL}.`
                  : FORMSPREE_ENDPOINT
                    ? "We'll reply by email."
                    : 'Opens your email app with the message ready to send.'}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
