import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  animate,
  AnimatePresence,
  AnimationPlaybackControls,
  motion,
  MotionStyle,
  MotionValue,
  PanInfo,
  useMotionValue,
} from 'framer-motion'
import classNames from 'classnames'
import { RadialMenuItem } from './RadialMenuItem'
import {
  getNextRotationFromPanMomentum,
  getPanRotationValue,
  getWheelRotationValue,
} from './utils'

export function RadialMenu<T extends any>({
  data,
  renderItem,
  radius,
  className,
  startDelta = 0,
  rotation,
  onRotationChange,
}: {
  data: T[]
  renderItem: (item: T, index: number) => ReactNode
  radius: number
  className?: string
  startDelta?: number
  /**
   * Control the menu rotation with a provided MotionValue
   * */
  rotation?: MotionValue<number>
  onRotationChange?: (value: number) => void
}) {
  const prevAnim = useRef<AnimationPlaybackControls>()
  /**
   * internal motion value, used if external motion value is not provided
   */
  const _rotation = useMotionValue(startDelta)
  /**
   * actual motion value, based on wether an external one is provided or to fall back to the internal one
   */
  const actualRotation = rotation || _rotation

  /**
   *  if an external motion value is provided we should assume it's being manipulated outside the component and NOT modify it
   * */
  const shouldRotate = !rotation

  const setRotationAmount = useCallback((value: number) => {
    prevAnim.current?.stop()
    actualRotation.set(value % 360)
  }, [])

  useEffect(() => {
    return actualRotation.onChange(val => {
      onRotationChange?.(val)
    })
  }, [onRotationChange])

  const ref = useRef<HTMLUListElement>(null)
  useEffect(() => {
    if (!shouldRotate) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (!ref.current || !shouldRotate) return
      if (e.target !== ref.current && !ref.current.contains(e.target as Node)) {
        return
      }

      const nextRotationAmount = getWheelRotationValue(
        actualRotation,
        ref.current,
        e
      )
      setRotationAmount(nextRotationAmount)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [shouldRotate])

  const handlePanStart = useCallback(() => prevAnim.current?.stop(), [])
  const handlePan = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent, pan: PanInfo) => {
      e.preventDefault()
      if (!shouldRotate || !ref.current) return

      const nextRotationAmount = getPanRotationValue(
        actualRotation,
        ref.current,
        pan
      )
      setRotationAmount(nextRotationAmount)
    },
    []
  )
  const handlePanEnd = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent, pan: PanInfo) => {
      e.preventDefault()
      if (!shouldRotate || !ref.current) {
        return
      }

      prevAnim.current?.stop()
      prevAnim.current = animate(
        actualRotation,
        getNextRotationFromPanMomentum({
          currentRotation: actualRotation,
          element: ref.current,
          pan,
        }),
        {
          duration: 1,
          ease: 'easeOut',
          onStop() {
            actualRotation.set(actualRotation.get() % 360)
          },
        }
      )
    },
    []
  )

  const angle = useMemo(() => 360 / data.length, [data.length])
  const style: MotionStyle = useMemo(
    () => ({
      width: radius * 2,
      height: radius * 2,
      touchAction: 'none',
      userSelect: 'none',
    }),
    [radius]
  )

  return (
    <motion.ul
      ref={ref}
      className={classNames(className, 'relative')}
      style={style}
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
    >
      <AnimatePresence>
        {data.map((item, index) => {
          return (
            <RadialMenuItem
              key={`${index}-${radius}-${data.length}`}
              index={index}
              angle={angle}
              radius={radius}
              rotation={actualRotation}
            >
              {renderItem(item, index)}
            </RadialMenuItem>
          )
        })}
      </AnimatePresence>
    </motion.ul>
  )
}
