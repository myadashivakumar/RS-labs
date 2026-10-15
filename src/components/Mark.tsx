type MarkProps = { className?: string; title?: string }

/** The RS Labs mark: a hexagon frame, three outer nodes and a core. */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g strokeWidth="6" strokeLinecap="round" fill="none">
        <g stroke="currentColor" opacity=".45">
          <line x1="0" y1="0" x2="0" y2="-40" />
          <line x1="0" y1="0" x2="35" y2="20" />
          <line x1="0" y1="0" x2="-35" y2="20" />
        </g>
        <path d="M0 -40 L35 -20 L35 20 L0 40 L-35 20 L-35 -20Z" stroke="var(--color-signal)" strokeLinejoin="round" />
      </g>
      <circle r="13" fill="var(--color-violet)" />
      <circle cy="-40" r="7.5" fill="var(--color-signal)" />
      <circle cx="35" cy="20" r="7.5" fill="var(--color-signal)" />
      <circle cx="-35" cy="20" r="7.5" fill="var(--color-signal)" />
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-7 w-7 shrink-0" />
      <span className="font-display text-[1.05rem] font-bold tracking-[0.12em]">
        RS <span className="text-signal-soft">LABS</span>
      </span>
    </span>
  )
}
