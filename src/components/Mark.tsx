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
        <g stroke="currentColor" opacity=".35">
          <line x1="0" y1="0" x2="0" y2="-40" />
          <line x1="0" y1="0" x2="35" y2="20" />
          <line x1="0" y1="0" x2="-35" y2="20" />
        </g>
        <path d="M0 -40 L35 -20 L35 20 L0 40 L-35 20 L-35 -20Z" stroke="var(--color-brand)" strokeLinejoin="round" />
      </g>
      <circle r="13" fill="var(--color-violet)" />
      <circle cy="-40" r="7.5" fill="var(--color-brand)" />
      <circle cx="35" cy="20" r="7.5" fill="var(--color-brand)" />
      <circle cx="-35" cy="20" r="7.5" fill="var(--color-brand)" />
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-8 w-8 shrink-0" />
      <span className="leading-none">
        <span className="block text-[1.1rem] font-bold tracking-[0.1em]">
          RS <span className="text-brand">LABS</span>
        </span>
        <span className="mt-1 block text-[0.6rem] font-medium uppercase tracking-[0.16em] opacity-60">Build · Create · Innovate</span>
      </span>
    </span>
  )
}
