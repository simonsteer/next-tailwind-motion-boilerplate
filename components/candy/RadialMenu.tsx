import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  animate,
  AnimatePresence,
  AnimationPlaybackControls,
  motion,
  MotionValue,
  PanInfo,
  useMotionValue,
} from 'framer-motion'
import classNames from 'classnames'

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
  rotation?: MotionValue<number>
  onRotationChange?: (value: number) => void
}) {
  const prevAnim = useRef<AnimationPlaybackControls>()
  const _rotation = useMotionValue(startDelta)
  const actualRotation = rotation || _rotation

  const setRotationAmount = useCallback((value: number) => {
    prevAnim.current?.stop()
    actualRotation.set(value % 360)
    onRotationChange?.(value % 360)
  }, [])

  const ref = useRef<HTMLUListElement>(null)
  useEffect(() => {
    // if an external motion value is provided we should assume it's being manipulated outside the component and NOT modify it on wheel
    if (!!rotation) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (!ref.current) return
      if (e.target !== ref.current && !ref.current.contains(e.target as Node)) {
        return
      }

      const quadrant = getQuadrant(ref.current, e.clientX, e.clientY)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        switch (quadrant) {
          case 'top-left':
          case 'bottom-left':
            setRotationAmount(actualRotation.get() - e.deltaY)
            break
          case 'top-right':
          case 'bottom-right':
            setRotationAmount(actualRotation.get() + e.deltaY)
            break
        }
      } else {
        switch (quadrant) {
          case 'bottom-left':
          case 'bottom-right':
            setRotationAmount(actualRotation.get() - e.deltaX)
            break
          case 'top-left':
          case 'top-right':
            setRotationAmount(actualRotation.get() + e.deltaX)
            break
        }
      }
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [rotation])

  const handlePan = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent, pan: PanInfo) => {
      e.preventDefault()
      // if an external motion value is provided we should assume it's being manipulated outside the component and NOT modify it on pan
      if (!!rotation || !ref.current) return

      const quadrant = getQuadrant(ref.current, pan.point.x, pan.point.y)
      if (Math.abs(pan.delta.y) > Math.abs(pan.delta.x)) {
        switch (quadrant) {
          case 'top-left':
          case 'bottom-left':
            setRotationAmount(actualRotation.get() + pan.delta.y)
            break
          case 'top-right':
          case 'bottom-right':
            setRotationAmount(actualRotation.get() - pan.delta.y)
            break
        }
      } else {
        switch (quadrant) {
          case 'bottom-left':
          case 'bottom-right':
            setRotationAmount(actualRotation.get() + pan.delta.x)
            break
          case 'top-left':
          case 'top-right':
            setRotationAmount(actualRotation.get() - pan.delta.x)
            break
        }
      }
    },
    []
  )

  const handlePanEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    pan: PanInfo
  ) => {
    e.preventDefault()
    // if an external motion value is provided we should assume it's being manipulated outside the component and NOT modify it on pan
    if (!!rotation) return
    if (!ref.current || (pan.velocity.y === 0 && pan.velocity.x === 0)) return

    const panAxis =
      Math.abs(pan.velocity.x) < Math.abs(pan.velocity.y) ? 'y' : 'x'

    const panAmount = pan.velocity[panAxis]
    if (Math.abs(panAmount) < 100) return

    const quadrant = getQuadrant(ref.current, pan.point.x, pan.point.y)

    let toVal: number
    switch (quadrant) {
      case 'top-left':
        toVal =
          actualRotation.get() + (panAxis === 'y' ? panAmount : -panAmount)
        break
      case 'top-right':
        toVal = actualRotation.get() - panAmount
        break
      case 'bottom-left':
        toVal = actualRotation.get() + panAmount
        break
      case 'bottom-right':
        toVal =
          actualRotation.get() + (panAxis === 'y' ? -panAmount : panAmount)
        break
    }
    prevAnim.current?.stop()
    prevAnim.current = animate(actualRotation, toVal * 0.5, {
      duration: 1,
      ease: 'easeOut',
    })
  }

  const angle = useMemo(() => 360 / data.length, [data.length])

  return (
    <motion.ul
      ref={ref}
      className={classNames(className, 'relative')}
      style={{
        width: radius * 2,
        height: radius * 2,
        touchAction: 'none',
        userSelect: 'none',
      }}
      onPanStart={() => prevAnim.current?.stop()}
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

function RadialMenuItem({
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
  const left = useMotionValue(0)
  const top = useMotionValue(0)

  const ref = useRef<HTMLLIElement>(null)
  const getPosition = useCallback(function (rotationAmount: number) {
    const width = ref.current?.clientWidth || 0
    const height = ref.current?.clientHeight || 0

    let theta = (angle / 180) * index
    theta += rotationAmount / 180
    theta *= Math.PI

    const x = Math.round(radius * Math.cos(theta))
    const y = Math.round(radius * Math.sin(theta))

    const top = -height / 2 + (radius - y)
    const left = -width / 2 + (radius + x)

    return { top, left }
  }, [])

  useEffect(() => {
    const position = getPosition(rotation.get())
    top.set(position.top)
    left.set(position.left)
  }, [ref.current, radius])

  useEffect(() =>
    rotation.onChange(amount => {
      const position = getPosition(amount)
      top.set(position.top)
      left.set(position.left)
    })
  )

  return (
    <motion.li className="absolute" ref={ref} style={{ x: left, y: top }}>
      {children}
    </motion.li>
  )
}

type AxisX = 'left' | 'right'
type AxisY = 'top' | 'bottom'
type Quadrant = `${AxisY}-${AxisX}`

function getQuadrant(
  el: HTMLUListElement,
  clientX: number,
  clientY: number
): Quadrant {
  const rect = el.getBoundingClientRect()
  let x: 'left' | 'right'
  let y: 'top' | 'bottom'

  if (clientX < rect.left + rect.width / 2) {
    x = 'left'
  } else {
    x = 'right'
  }
  if (clientY < rect.top + rect.height / 2) {
    y = 'top'
  } else {
    y = 'bottom'
  }

  return `${y}-${x}`
}
