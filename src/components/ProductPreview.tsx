import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../content'
import { Mark } from './Mark'

export type Region = 1 | 2 | 3

type FileRow = { id: string; name: string; gb: number; progress: number }

const INITIAL: FileRow[] = [
  { id: 'a', name: 'A001_C012_cam-a.mov', gb: 48.6, progress: 100 },
  { id: 'b', name: 'Interview_full_take3.mxf', gb: 112.4, progress: 41 },
  { id: 'c', name: 'Broll_market_4K.mov', gb: 21.9, progress: 100 },
  { id: 'd', name: 'Lav_mix_day2.wav', gb: 1.2, progress: 100 },
]
const QUEUE: Omit<FileRow, 'progress'>[] = [
  { id: 'e', name: 'A002_C004_cam-b.mov', gb: 36.8 },
  { id: 'f', name: 'Drone_coastline_01.mp4', gb: 9.3 },
  { id: 'g', name: 'Interview_pickups.mxf', gb: 27.5 },
]
const PROJECTS = ['Spring campaign', 'Studio interviews', 'B-roll library']
const EXPIRY = ['24 hours', '7 days', '30 days'] as const

type Props = { step: Region | null }

/**
 * A working mock of the creator media platform, built from real components:
 * uploads progress, rows can be selected, and the share panel produces a link.
 * Nothing leaves the page.
 */
export function ProductPreview({ step }: Props) {
  const [files, setFiles] = useState<FileRow[]>(INITIAL)
  const [project, setProject] = useState(PROJECTS[0])
  const [selected, setSelected] = useState<Set<string>>(new Set(['a', 'c']))
  const [download, setDownload] = useState(false)
  const [expiry, setExpiry] = useState<(typeof EXPIRY)[number]>('7 days')
  const [link, setLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  // Only animate uploads while the preview is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    if (root.current) io.observe(root.current)
    return () => io.disconnect()
  }, [])

  const uploading = files.some((f) => f.progress < 100)
  useEffect(() => {
    if (!visible || !uploading || prefersReducedMotion()) return
    const t = window.setInterval(() => {
      setFiles((fs) => fs.map((f) => (f.progress < 100 ? { ...f, progress: Math.min(100, f.progress + 120 / f.gb) } : f)))
    }, 120)
    return () => window.clearInterval(t)
  }, [visible, uploading])

  const total = files.reduce((s, f) => s + f.gb, 0)
  const next = QUEUE.find((q) => !files.some((f) => f.id === q.id))

  function addFile() {
    if (!next) return
    // With reduced motion the upload is shown part-way and holds still.
    setFiles((fs) => [...fs, { ...next, progress: prefersReducedMotion() ? 64 : 0 }])
  }
  function toggle(id: string) {
    setLink(null)
    setSelected((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }
  function createLink() {
    const code = Math.random().toString(36).slice(2, 6) + '-' + Math.random().toString(36).slice(2, 6)
    setLink(`share/${code}`)
    setCopied(false)
  }
  async function copy() {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  // The case study's story drives the preview: each step stages its part of the UI.
  useEffect(() => {
    if (step === 1 && !uploading) addFile()
    if (step === 3 && !link && selected.size > 0) createLink()
  }, [step])

  const ring = (r: Region) =>
    `relative transition-[box-shadow,opacity] duration-500 ${
      step === r ? 'shadow-[inset_0_0_0_1px_var(--color-signal)]' : step ? 'opacity-55' : ''
    }`

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-[3px] border border-graphite/80 bg-ink-900 text-paper shadow-[0_40px_80px_-40px_rgba(20,22,29,.55)]"
      aria-label="Interactive preview of the creator media platform"
      role="group"
    >
      {/* Window strip */}
      <div className="flex items-center justify-between gap-4 border-b border-ink-700 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5 text-[0.8rem] text-mist">
          <Mark className="h-4 w-4 shrink-0" />
          <span className="truncate">
            Projects <span aria-hidden="true">/</span> <span className="text-haze">{project}</span> <span aria-hidden="true">/</span> Raw footage
          </span>
        </div>
        <span className="label shrink-0 text-[0.62rem] text-violet">Preview · not live</span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[10.5rem_1fr] 2xl:grid-cols-[10.5rem_1fr_15.5rem]">
        {/* 2 — Projects */}
        <nav aria-label="Projects (preview)" className={`border-b border-ink-700 p-3 md:border-b-0 md:border-r ${ring(2)}`}>
          <Pin n={2} />
          <p className="label px-2 pb-2 pt-1 text-[0.62rem] text-mist">Projects</p>
          <ul className="flex gap-1 overflow-x-auto pr-6 text-[0.84rem] md:block md:space-y-0.5 md:pr-0">
            {PROJECTS.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => setProject(p)}
                  aria-pressed={project === p}
                  className="w-full whitespace-nowrap rounded-[2px] px-2 py-1.5 text-left text-haze transition-colors hover:bg-ink-800 aria-pressed:bg-ink-800 aria-pressed:text-paper"
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 1 — Uploads + library */}
        <div className={`min-w-0 p-4 ${ring(1)}`}>
          <Pin n={1} />
          <div className="flex items-end justify-between gap-3 pr-7">
            <div>
              <p className="font-display text-lg font-semibold leading-tight">Raw footage</p>
              <p className="label mt-1 text-[0.62rem] text-mist">
                {files.length} files · {total.toFixed(1)} GB
              </p>
            </div>
            <button
              type="button"
              onClick={addFile}
              disabled={!next}
              className="label rounded-[2px] border border-ink-700 px-2.5 py-1.5 text-[0.64rem] text-haze transition-colors hover:border-signal hover:text-paper disabled:opacity-40"
            >
              + Add files
            </button>
          </div>

          <table className="mt-4 w-full table-fixed text-left text-[0.82rem]">
            <caption className="sr-only">Files in this folder. Select files to share.</caption>
            <thead>
              <tr className="label text-[0.6rem] text-mist">
                <th scope="col" className="w-8 pb-2 font-normal"><span className="sr-only">Select</span></th>
                <th scope="col" className="pb-2 font-normal">Name</th>
                <th scope="col" className="hidden w-20 pb-2 text-right font-normal sm:table-cell">Size</th>
                <th scope="col" className="w-24 pb-2 pl-3 font-normal sm:w-28">Status</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => {
                const done = f.progress >= 100
                const on = selected.has(f.id)
                return (
                  <tr key={f.id} className={`border-t border-ink-700 transition-colors ${on ? 'bg-signal/[.07]' : ''}`}>
                    <td className="py-2.5">
                      <input
                        type="checkbox"
                        checked={on}
                        disabled={!done}
                        onChange={() => toggle(f.id)}
                        aria-label={`Select ${f.name}`}
                        className="h-3.5 w-3.5 accent-[var(--color-signal)] disabled:opacity-30"
                      />
                    </td>
                    <td className="truncate py-2.5 pr-2 text-haze" title={f.name}>{f.name}</td>
                    <td className="hidden py-2.5 text-right tabular-nums text-mist sm:table-cell">{f.gb.toFixed(1)} GB</td>
                    <td className="py-2.5 pl-3">
                      {done ? (
                        <span className="label text-[0.6rem] text-mist">Ready</span>
                      ) : (
                        <span className="block" role="progressbar" aria-valuenow={Math.round(f.progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Uploading ${f.name}`}>
                          <span className="label block text-[0.6rem] text-signal-soft">{Math.floor(f.progress)}%</span>
                          <span className="mt-1 block h-[3px] bg-ink-700">
                            <span className="block h-full bg-signal transition-[width] duration-150" style={{ width: `${f.progress}%` }} />
                          </span>
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* 3 — Share */}
        <div className={`border-t border-ink-700 p-4 md:col-span-2 2xl:col-span-1 2xl:border-l 2xl:border-t-0 ${ring(3)}`}>
          <Pin n={3} />
          <p className="font-display text-base font-semibold">Share with an editor</p>
          <p className="label mt-1 text-[0.62rem] text-mist">
            {selected.size} {selected.size === 1 ? 'file' : 'files'} selected
          </p>

          <fieldset className="mt-4">
            <legend className="label text-[0.6rem] text-mist">Access</legend>
            <Segmented
              options={['View only', 'View + download']}
              value={download ? 'View + download' : 'View only'}
              onChange={(v) => { setDownload(v === 'View + download'); setLink(null) }}
            />
          </fieldset>
          <fieldset className="mt-3">
            <legend className="label text-[0.6rem] text-mist">Link expires</legend>
            <Segmented options={EXPIRY} value={expiry} onChange={(v) => { setExpiry(v); setLink(null) }} />
          </fieldset>

          <button
            type="button"
            onClick={createLink}
            disabled={selected.size === 0}
            className="mt-4 w-full rounded-[2px] bg-signal py-2 text-[0.84rem] font-medium text-white transition-colors hover:bg-[#2f69ea] disabled:bg-ink-700 disabled:text-mist"
          >
            Create link
          </button>

          <div aria-live="polite" className="min-h-[3.75rem]">
            {link && (
              <div className="mt-3 border border-ink-700 p-2.5" style={{ animation: 'rs-rise .35s var(--ease-soft)' }}>
                <div className="flex items-center justify-between gap-2">
                  <code className="truncate font-mono text-[0.78rem] text-paper">{link}</code>
                  <button type="button" onClick={copy} className="label shrink-0 text-[0.6rem] text-signal-soft hover:text-paper">
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="mt-1 text-[0.72rem] text-mist">
                  {download ? 'Can download' : 'View only'} · expires in {expiry}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="mt-1.5 grid auto-cols-fr grid-flow-col border border-ink-700 text-[0.74rem]">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className="px-1.5 py-1.5 text-mist transition-colors hover:text-paper aria-pressed:bg-ink-700 aria-pressed:text-paper [&+&]:border-l [&+&]:border-ink-700"
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/** Numbered drafting pin linking a region of the UI to its note in the case study. */
function Pin({ n }: { n: Region }) {
  return (
    <span
      aria-hidden="true"
      className="label absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full border border-signal/70 text-[0.6rem] text-signal-soft"
    >
      {n}
    </span>
  )
}
