import { useEffect } from 'react'
import { prefersReducedMotion } from '../content'

/** Adds `.is-in` to each `[data-reveal]` element the first time it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
