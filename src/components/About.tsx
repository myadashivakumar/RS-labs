import type { CSSProperties } from 'react'

const VALUES = [
  ['Quality engineering', 'Clean, tested code that is easy to maintain and extend.'],
  ['Direct communication', 'You work with the people building your software, with no layers in between.'],
  ['Long-term support', 'We stay after launch to improve, fix and scale what we built.'],
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-lavender py-[var(--section-y)]">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>About us</p>
          <h2 id="about-title" className="heading mt-3" data-reveal>
            An independent software company.
          </h2>
          <p className="mt-6 max-w-[48ch] text-[1.1rem] text-muted" data-reveal>
            RS Labs builds its own products and partners with businesses to design, build and run theirs. We keep things
            simple: understand the problem, plan it clearly, and ship working software step by step.
          </p>
        </div>
        <ul className="grid gap-4 self-center">
          {VALUES.map(([t, d], i) => (
            <li key={t} className="rounded-xl bg-white p-6" data-reveal style={{ '--delay': `${i * 80}ms` } as CSSProperties}>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
