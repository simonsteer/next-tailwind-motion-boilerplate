import classNames from 'classnames'
import { motion, MotionStyle } from 'framer-motion'
import { cloneElement, useMemo, useRef } from 'react'
import { SvgPathBuilder } from 'utils'
import { v4 as uuid } from 'uuid'

export function Clip({
  className,
  style,
  children,
  src,
}: {
  children?: React.ReactNode
  className?: string
  style?: MotionStyle
  src: JSX.Element
}) {
  const clipId = useRef(uuid()).current
  const ref = useRef<SVGSVGElement>(null)

  const clip = useMemo(() => {
    const { children, width = '0', height = '0' } = src.props

    return cloneElement(src, {
      ref,
      width: 0,
      height: 0,
      viewBox: undefined,
      fill: undefined,
      children: (
        <clipPath id={clipId} clipPathUnits="objectBoundingBox">
          <path
            d={new SvgPathBuilder({
              bounds: [parseInt(width) || 1, parseInt(height) || 1],
              source: children?.props?.d || '',
            })
              .normalize()
              .toString()}
          />
        </clipPath>
      ),
    })
  }, [src])

  return (
    <motion.div
      className={classNames('overflow-hidden', className)}
      style={{ clipPath: `url(#${clipId})`, ...style }}
    >
      {children}
      {clip}
    </motion.div>
  )
}
