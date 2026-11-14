import { useLayoutEffect, useRef } from 'react'

const STAGGER = 80
const MAX_STEPS = 3
const COUNT_DURATION = 1200

export function usePageMotion() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = root.current
    if (!element) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targets = Array.from(element.querySelectorAll<HTMLElement>('[data-reveal]'))
    const counters = new Map<HTMLElement, string>()
    const frames = new Set<number>()

    element.querySelectorAll<HTMLElement>('[data-count]').forEach((target) => {
      counters.set(target, target.textContent ?? '')
    })

    const revealAll = () => {
      targets.forEach((target) => target.classList.add('revealed'))
      counters.forEach((original, target) => {
        target.textContent = original
      })
    }

    if (reduced.matches || typeof IntersectionObserver === 'undefined') {
      revealAll()
      return
    }

    counters.forEach((_, target) => {
      target.textContent = '0'
    })

    const countUp = (target: HTMLElement) => {
      const original = counters.get(target)
      if (!original) return

      const final = Number(original)
      if (!Number.isFinite(final)) {
        target.textContent = original
        return
      }

      const start = performance.now()
      const tick = (time: number) => {
        const fraction = Math.min(1, (time - start) / COUNT_DURATION)
        target.textContent = String(Math.round(final * (1 - Math.pow(1 - fraction, 3))))
        if (fraction < 1) {
          const id = requestAnimationFrame(tick)
          frames.add(id)
        } else {
          target.textContent = original
        }
      }

      const id = requestAnimationFrame(tick)
      frames.add(id)
    }

    const reveal = (target: HTMLElement) => {
      if (target.classList.contains('revealed')) return

      const siblings = Array.from(target.parentElement?.children ?? [])
      const step = Math.min(MAX_STEPS, Math.max(0, siblings.indexOf(target)))
      target.style.transitionDelay = `${step * STAGGER}ms`
      target.classList.add('revealed')
      target.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          const target = entry.target as HTMLElement
          const index = targets.indexOf(target)
          targets.slice(0, index).forEach((earlier) => {
            earlier.style.transitionDelay = '0ms'
            reveal(earlier)
          })
          reveal(target)
          observer.unobserve(target)
        }
      },
      { threshold: 0.18 },
    )

    targets.forEach((target) => observer.observe(target))

    const progress = element.querySelector<HTMLElement>('.scroll-progress')
    let scrollFrame = 0

    const update = () => {
      scrollFrame = 0

      targets.forEach((target) => {
        if (target.classList.contains('revealed')) return
        if (target.getBoundingClientRect().top > window.innerHeight * 0.82) return
        observer.unobserve(target)
        reveal(target)
      })

      if (!progress) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }

    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(update)
    }

    const onPreferenceChange = () => {
      if (!reduced.matches) return
      observer.disconnect()
      frames.forEach(cancelAnimationFrame)
      revealAll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    reduced.addEventListener('change', onPreferenceChange)
    update()

    return () => {
      observer.disconnect()
      frames.forEach(cancelAnimationFrame)
      cancelAnimationFrame(scrollFrame)
      counters.forEach((original, target) => {
        target.textContent = original
      })
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      reduced.removeEventListener('change', onPreferenceChange)
    }
  }, [])

  return root
}
