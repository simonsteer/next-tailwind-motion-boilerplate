import { motion, MotionProps } from 'framer-motion'
import React, { ForwardedRef, forwardRef } from 'react'

export interface ParagraphTextProps
  extends Partial<Omit<JSX.IntrinsicElements['p'], keyof MotionProps>>,
    MotionProps {
  children?: React.ReactNode
}

export interface SpanTextProps
  extends Partial<Omit<JSX.IntrinsicElements['span'], keyof MotionProps>>,
    MotionProps {
  children?: React.ReactNode
}

export interface HeadingTextProps
  extends Partial<Omit<JSX.IntrinsicElements['h1'], keyof MotionProps>>,
    MotionProps {
  priority?: 1 | 2 | 3 | 4 | 5 | 6
  children?: React.ReactNode
}

export interface AnchorTextProps
  extends Partial<Omit<JSX.IntrinsicElements['a'], keyof MotionProps>>,
    MotionProps {
  children?: React.ReactNode
}

export const P = forwardRef(function (
  { children, ...props }: ParagraphTextProps,
  ref: ForwardedRef<HTMLParagraphElement>
) {
  return (
    <motion.p {...props} ref={ref}>
      {children}
    </motion.p>
  )
})

export const Span = forwardRef(function (
  { children, ...props }: SpanTextProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <motion.span {...props} ref={ref}>
      {children}
    </motion.span>
  )
})

export const H = forwardRef(function (
  { priority, children, ...props }: HeadingTextProps,
  ref: ForwardedRef<HTMLHeadingElement>
) {
  const el = `h${priority}` as `h${NonNullable<HeadingTextProps['priority']>}`
  const MotionElement = motion[el]

  return (
    <MotionElement {...props} ref={ref}>
      {children}
    </MotionElement>
  )
})

export const A = forwardRef(function (
  { children, ...props }: AnchorTextProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  console.log(children)
  return (
    <motion.a {...props} ref={ref}>
      {children}
    </motion.a>
  )
})
