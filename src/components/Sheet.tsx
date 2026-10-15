import type { ReactNode } from 'react'

type Tone = 'ink' | 'paper' | 'deep'

const TONES: Record<Tone, string> = {
  ink: 'bg-ink-950 text-paper',
  deep: 'bg-ink-900 text-paper',
  paper: 'bg-paper text-graphite',
}

type SheetProps = {
  id: string
  no: string
  title: string
  tone?: Tone
  children: ReactNode
  className?: string
}

/**
 * Every section is a numbered drawing sheet: a title strip with registration
 * marks, then free-form content. The strip is the one constant; layouts inside
 * deliberately differ from sheet to sheet.
 */
export function Sheet({ id, no, title, tone = 'ink', children, className = '' }: SheetProps) {
  const line = tone === 'paper' ? 'bg-paper-line' : 'bg-ink-700'
  const meta = tone === 'paper' ? 'text-pencil' : 'text-mist'
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative ${TONES[tone]} ${className}`}>
      <div className="wrap pt-6" data-inview>
        <div className={`label flex items-center justify-between gap-4 ${meta}`}>
          <span className="flex items-center gap-3">
            <Registration />
            <span>
              Sheet {no} <span aria-hidden="true">—</span> {title}
            </span>
          </span>
          <span className="hidden sm:inline">RS Labs / rs-labs.in</span>
        </div>
        <div className={`rule mt-4 h-px ${line}`} />
      </div>
      <div className="pb-[var(--section-y)] pt-[calc(var(--section-y)*0.55)]">{children}</div>
    </section>
  )
}

/** A small drafting registration mark. */
export function Registration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-3 w-3 shrink-0 ${className}`} aria-hidden="true">
      <circle cx="6" cy="6" r="3.2" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
