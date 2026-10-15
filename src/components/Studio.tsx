import type { CSSProperties } from 'react'
import { CONTACT_EMAIL, TAGLINE } from '../content'
import { Sheet } from './Sheet'

/**
 * Sheet 04: one large statement, then a short paragraph and a spec block.
 * Only facts we can stand behind: no team photos, dates or client logos.
 */
export function Studio() {
  return (
    <Sheet id="studio" no="04" title="Studio" tone="paper">
      <div className="wrap">
        <h2 id="studio-title" className="display max-w-[20ch] text-[clamp(2.2rem,5.4vw,5rem)] leading-[0.98]" data-reveal>
          An independent technology studio. We build our own products, and help others build theirs.
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-[1.08rem] leading-relaxed lg:col-span-6" data-reveal style={{ '--delay': '100ms' } as CSSProperties}>
            <p>
              Independent means the roadmap is ours, and there are no layers between you and the people writing the
              code. You talk directly to whoever is building your software.
            </p>
            <p className="text-pencil">
              We keep the studio small on purpose: a few client projects at a time, and the rest of our hours on
              products of our own. Each one makes the other better.
            </p>
          </div>

          <dl className="self-start border-t-2 border-graphite text-[0.95rem] lg:col-span-5 lg:col-start-8" data-reveal style={{ '--delay': '180ms' } as CSSProperties}>
            {[
              ['Studio', 'RS Labs'],
              ['Type', 'Independent software studio'],
              ['Work', 'Own products · client projects'],
              ['Platforms', 'Web · Android · Cloud'],
              ['Motto', TAGLINE],
              ['Contact', CONTACT_EMAIL],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-paper-line py-3">
                <dt className="label pt-0.5 text-pencil">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Sheet>
  )
}
