import { useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function useInViewProgress<R extends HTMLElement>() {
  const ref = useRef<R>(null)
  const progress = useMotionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()

      const max = window.innerHeight
      const min = rect.height

      const elementY = Math.max(Math.min(rect.top, max), -min)
      const value = (elementY + min) / (max + min)
      progress.set(value)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return [ref, progress] as const
}
