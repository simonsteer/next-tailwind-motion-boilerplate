import { useEffect } from 'react'
import { MotionProps, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function useFadeInWhenVisible() {
  const animate = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      animate.start('visible')
    }
  }, [inView])

  const motionProps: MotionProps = {
    animate,
    initial: 'hidden',
    transition: { duration: 0.5 },
    variants: {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    },
  }

  return { ref, ...motionProps } as const
}
