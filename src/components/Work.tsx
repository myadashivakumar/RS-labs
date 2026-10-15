import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { requestInterest } from '../content'
import { Arrow } from './Hero'
import { ProductPreview, type Region } from './ProductPreview'
import { Sheet } from './Sheet'

const STEPS: { n: Region; title: string; body: string }[] = [
  {
    n: 1,
    title: 'Footage arrives.',
    body: "Drop in a day's shoot, however large. Files go up in parts, so a dropped connection costs seconds rather than the whole transfer, and everyone on the project can see the progress.",
  },
  {
    n: 2,
    title: 'It lands where it belongs.',
    body: 'Shoots are filed into projects and folders with the names you already use, instead of being scattered across drive links and inboxes.',
  },
  {
    n: 3,
    title: 'The editor gets exactly what they need.',
    body: 'Select the takes, decide whether they can be downloaded, and choose when the link stops working. Nothing else is exposed.',
  },
]

/**
 * Sheet 01 tells the product as a sequence rather than a feature list. On wide
 * screens each step scrolls past a pinned preview and stages its part of the
 * interface; on narrow screens the same steps are a three-part switcher.
 */
export function Work() {
  const [step, setStep] = useState<Region | null>(null)
  const steps = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step) as Region)
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    steps.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const active = STEPS.find((s) => s.n === step) ?? STEPS[0]

  return (
    <Sheet id="work" no="01" title="Work" tone="paper">
      <div className="wrap">
        <header className="max-w-[62rem]">
          <div className="flex flex-wrap items-center gap-3" data-reveal>
            <span className="label text-pencil">Case study 01, our own product</span>
            <span className="label inline-flex items-center gap-2 border border-violet/50 px-2 py-1 text-[0.66rem] text-[#5b3fe0]">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
              In development · not yet available
            </span>
          </div>
          <h2 id="work-title" className="display mt-6 text-[clamp(2.3rem,5.4vw,4.75rem)] leading-[0.98]" data-reveal style={{ '--delay': '80ms' } as CSSProperties}>
            Handing raw footage to an editor shouldn't take a weekend.
          </h2>
          <p className="mt-8 max-w-[52ch] text-[1.15rem] leading-relaxed text-pencil" data-reveal style={{ '--delay': '160ms' } as CSSProperties}>
            A single shoot can fill hundreds of gigabytes. Getting it to an editor still means expiring links, folders
            nobody can find and uploads that fail halfway. We're building a{' '}
            <strong className="font-semibold text-graphite">creator media platform</strong> for creators and the editors
            they work with, on the web.
          </p>
        </header>

        <div className="mt-16 grid gap-10 lg:mt-8 lg:grid-cols-12">
          {/* Wide screens: scrolling story */}
          <ol className="hidden lg:col-span-5 lg:block">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => { steps.current[i] = el }}
                data-step={s.n}
                className="flex min-h-[72vh] flex-col justify-center"
              >
                <button
                  type="button"
                  onClick={() => setStep(s.n)}
                  aria-pressed={step === s.n}
                  className={`text-left transition-opacity duration-500 ${step && step !== s.n ? 'opacity-35' : ''}`}
                >
                  <span className="label flex items-center gap-3 text-pencil">
                    <StepPin n={s.n} on={step === s.n} />
                    Step {s.n} of 3
                  </span>
                  <span className="mt-5 block font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em]">{s.title}</span>
                  <span className="mt-4 block max-w-[40ch] text-[1.05rem] leading-relaxed text-pencil">{s.body}</span>
                </button>
              </li>
            ))}
          </ol>

          {/* Narrow screens: the same steps as a switcher */}
          <div className="lg:hidden">
            <div role="group" aria-label="Product story" className="grid grid-cols-3 border border-paper-line">
              {STEPS.map((s) => (
                <button
                  key={s.n}
                  type="button"
                  aria-pressed={active.n === s.n}
                  onClick={() => setStep(s.n)}
                  className="label px-2 py-3 text-pencil aria-pressed:bg-graphite aria-pressed:text-paper [&+&]:border-l [&+&]:border-paper-line"
                >
                  Step {s.n}
                </button>
              ))}
            </div>
            <div aria-live="polite" className="mt-6 min-h-[9.5rem]">
              <p className="font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.02em]">{active.title}</p>
              <p className="mt-3 text-pencil">{active.body}</p>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <figure className="lg:sticky lg:top-[max(6rem,calc(50vh-17rem))]" data-reveal style={{ '--delay': '120ms' } as CSSProperties}>
              <ProductPreview step={step} />
              <figcaption className="label mt-4 flex justify-between gap-4 text-[0.66rem] text-pencil">
                <span>Fig. 2, interface study. It works: try it.</span>
                <span className="hidden sm:inline">Nothing leaves this page</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t border-paper-line pt-8 lg:mt-0">
          <p className="text-pencil">Making something with a lot of footage? We'd like to hear how you work today.</p>
          <button type="button" onClick={() => requestInterest('early access to the creator platform')} className="group inline-flex items-center gap-2 font-medium">
            <span className="border-b border-graphite/30 pb-0.5 transition-colors group-hover:border-signal">Ask about early access</span>
            <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </Sheet>
  )
}

function StepPin({ n, on }: { n: Region; on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-6 w-6 place-items-center rounded-full border text-[0.66rem] transition-colors duration-300 ${
        on ? 'border-signal bg-signal text-white' : 'border-pencil/50'
      }`}
    >
      {n}
    </span>
  )
}
