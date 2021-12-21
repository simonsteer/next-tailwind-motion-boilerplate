import { memo, ReactNode, useEffect, useRef } from 'react'
import { motion, MotionValue, useMotionValue } from 'framer-motion'
import { getItemPosition } from './utils'
import { useMeasure } from 'react-use'

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

  const [ref, dimensions] = useMeasure<HTMLLIElement>()

  useEffect(() => {
    const position = getItemPosition({
      rotationAmount: rotation.get(),
      radius,
      dimensions,
      index,
      angle,
    })
    top.set(position.top)
    left.set(position.left)
  }, [dimensions.width, dimensions.height, radius])

  useEffect(
    () =>
      rotation.onChange(amount => {
        const position = getItemPosition({
          rotationAmount: amount,
          radius,
          dimensions,
          index,
          angle,
        })
        top.set(position.top)
        left.set(position.left)
      }),
    [dimensions.width, dimensions.height, radius]
  )

  return (
    <motion.li className="absolute" ref={ref} style={{ x: left, y: top }}>
      {children}
    </motion.li>
  )
})
