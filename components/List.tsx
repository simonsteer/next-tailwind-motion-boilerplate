import {
  motion,
  MotionProps,
  AnimatePresence,
  AnimatePresenceProps,
  SharedLayoutProps,
  AnimateSharedLayout,
} from 'framer-motion'
import { ForwardedRef, forwardRef, Ref } from 'react'

export type ListProps<D extends any> = {
  data: D[]
  renderItem: (item: D, index: number) => React.ReactNode
  keyExtractor?: (item: D, index: number) => string
  animatePresence?: boolean | AnimatePresenceProps
  animateSharedLayout?: boolean | SharedLayoutProps
  /**
   * props to supply every `motion.li` rendered
   */
  itemProps?: MotionProps & { className?: string }
} & (MotionProps & { className?: string })

function ListNoRef<D extends any>(
  {
    data,
    renderItem,
    keyExtractor = (_, index) => `list-item-${index}`,
    animatePresence,
    animateSharedLayout,
    itemProps,
    ...motionProps
  }: ListProps<D>,
  ref: ForwardedRef<HTMLUListElement>
) {
  const items = data.map((item, index) => (
    <motion.li key={keyExtractor(item, index)} {...itemProps}>
      {renderItem(item, index)}
    </motion.li>
  ))

  let children: React.ReactNode = items
  if (animatePresence) {
    if (typeof animatePresence === 'boolean') {
      children = <AnimatePresence>{items}</AnimatePresence>
    } else {
      children = <AnimatePresence {...animatePresence}>{items}</AnimatePresence>
    }
  }

  if (animateSharedLayout) {
    if (typeof animateSharedLayout === 'boolean') {
      children = <AnimateSharedLayout>{children}</AnimateSharedLayout>
    } else {
      children = (
        <AnimateSharedLayout {...animateSharedLayout}>
          {children}
        </AnimateSharedLayout>
      )
    }
  }

  return (
    <motion.ul ref={ref} {...motionProps}>
      {children}
    </motion.ul>
  )
}

// type assertion here to account for generic proptypes supplied to ListNoRef
export const List = forwardRef(ListNoRef) as unknown as <D extends any>(
  props: ListProps<D> & { ref?: Ref<HTMLUListElement> }
) => JSX.Element
