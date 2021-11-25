import { memo, ReactNode, useEffect, useRef } from 'react'
import { motion, MotionValue, useMotionValue } from 'framer-motion'
import { getItemPosition } from './utils'

export const RadialMenuItem = memo(function ({
  index,
  angle,
  radius,
  children,
  rotation,
}: {
  children: ReactNode
  index: number
  angle: number
  radius: number
  rotation: MotionValue<number>
}) {
  console.log('rendering item ' + index)
  const left = useMotionValue(0)
  const top = useMotionValue(0)

  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const position = getItemPosition({
      rotationAmount: rotation.get(),
      radius,
      ref,
      index,
      angle,
    })
    top.set(position.top)
    left.set(position.left)
  }, [ref.current, radius])

  useEffect(() =>
    rotation.onChange(amount => {
      const position = getItemPosition({
        rotationAmount: amount,
        radius,
        ref,
        index,
        angle,
      })
      top.set(position.top)
      left.set(position.left)
    })
  )

  return (
    <motion.li className="absolute" ref={ref} style={{ x: left, y: top }}>
      {children}
    </motion.li>
  )
})
