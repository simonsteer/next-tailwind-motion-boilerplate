import {
  PointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  animate,
  AnimatePresence,
  AnimationPlaybackControls,
  motion,
  MotionStyle,
  MotionValue,
  PanHandlers,
  useMotionValue,
} from 'framer-motion'
import classNames from 'classnames'
import { RadialMenuItem } from './RadialMenuItem'
import { getWheelRotationValue, getAngleBetweenPoints } from './utils'

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

  useEffect(() => {
    return actualRotation.onChange(val => {
      onRotationChange?.(val % 360)
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
      prevAnim.current?.stop()
      actualRotation.set(nextRotationAmount % 360)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [shouldRotate])

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

  const handlePointerDown = useCallback((e: PointerEvent<HTMLUListElement>) => {
    e.preventDefault()
    prevAnim.current?.stop()
  }, [])

  const prevAngle = useRef<number>(0)
  const handlePanStart: NonNullable<PanHandlers['onPanStart']> = useCallback(
    (e, pan) => {
      e.preventDefault()
      if (!ref.current || !shouldRotate) return

      const rect = ref.current.getBoundingClientRect()
      const anchor = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
      prevAnim.current?.stop()
      prevAngle.current = getAngleBetweenPoints(anchor, pan.point)
    },
    [shouldRotate]
  )

  const handlePan: NonNullable<PanHandlers['onPan']> = useCallback(
    (e, pan) => {
      e.preventDefault()
      if (!ref.current || !shouldRotate) return

      const rect = ref.current.getBoundingClientRect()
      const anchor = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }

      const nextAngle = getAngleBetweenPoints(anchor, pan.point)
      let angleDelta = nextAngle - prevAngle.current
      // if there is suddenly a very large angle delta, we can assume the
      // rotation went down from 0 to 360, or up from 360 to 0. In this case,
      // we need to offset by getting the difference between a full 360°
      // rotation, and the actual amount that was moved
      if (Math.abs(angleDelta) > 270) {
        if (angleDelta < 0) {
          const diff = (360 + angleDelta) / 2
          angleDelta += 360 - diff
        } else {
          const diff = (360 - angleDelta) / 2
          angleDelta -= 360 - diff
        }
      }

      prevAngle.current = nextAngle
      actualRotation.set(actualRotation.get() - angleDelta)
    },
    [shouldRotate]
  )

  const handlePanEnd: NonNullable<PanHandlers['onPanEnd']> = useCallback(
    (e, pan) => {
      e.preventDefault()
      if (!shouldRotate) return

      const velocity = Math.max(
        Math.abs(pan.velocity.x),
        Math.abs(pan.velocity.y)
      )

      const currentRotation = actualRotation.get()
      const previousRotation = actualRotation.getPrevious()

      const nextRotation =
        currentRotation > previousRotation
          ? currentRotation + velocity
          : currentRotation - velocity

      prevAnim.current?.stop()
      prevAnim.current = animate(actualRotation, nextRotation, {
        duration: 1,
        ease: 'easeOut',
        onStop() {
          actualRotation.set(actualRotation.get() % 360)
        },
        onComplete() {
          actualRotation.set(actualRotation.get() % 360)
        },
      })
    },
    [shouldRotate]
  )

  return (
    <motion.ul
      ref={ref}
      className={classNames(className, 'relative')}
      style={style}
      onPointerDown={handlePointerDown}
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
