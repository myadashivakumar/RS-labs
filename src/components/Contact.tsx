import { useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from '../content'

/**
 * Dark contact band. There's no backend: the form prepares an email in the
 * visitor's own mail app, and the address is shown for anyone who'd rather write.
 */
export function Contact() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  function send(e: FormEvent) {
    e.preventDefault()
    const subject = `Enquiry from ${name.trim() || 'the website'}${company.trim() ? ` (${company.trim()})` : ''}`
    const body = `${message.trim()}\n\n${name.trim()}${company.trim() ? `\n${company.trim()}` : ''}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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

        <form onSubmit={send} className="grid gap-6 sm:grid-cols-2" data-reveal>
          <label className="block text-sm text-white/70">
            Your name
            <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
          </label>
          <label className="block text-sm text-white/70">
            Company <span className="text-white/40">(optional)</span>
            <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" className={field} />
          </label>
          <label className="block text-sm text-white/70 sm:col-span-2">
            How can we help?
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A few lines about your project"
              className={`${field} resize-y`}
            />
          </label>
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <button type="submit" className="rounded-md bg-white px-6 py-3.5 font-medium text-ink transition-colors hover:bg-lavender">
              Send message
            </button>
            <p className="text-sm text-white/50">Opens your email app with the message ready to send.</p>
          </div>
        </form>
      </div>
    </section>
  )
}
