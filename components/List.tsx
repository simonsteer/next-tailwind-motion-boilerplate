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
  itemProps?:
    | (MotionProps & { className?: string })
    | ((item: D, index: number) => MotionProps & { className?: string })
} & (MotionProps & { className?: string })

function ListComponent<D extends any>(
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
  let children: React.ReactNode = data.map((item, index) => {
    const props =
      typeof itemProps === 'function' ? itemProps(item, index) : itemProps

    return (
      <motion.li key={keyExtractor(item, index)} {...props}>
        {renderItem(item, index)}
      </motion.li>
    )
  })

  if (animatePresence) {
    if (typeof animatePresence === 'boolean') {
      children = <AnimatePresence>{children}</AnimatePresence>
    } else {
      children = (
        <AnimatePresence {...animatePresence}>{children}</AnimatePresence>
      )
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

// type assertion here to account for generic proptypes supplied to ListComponent
export const List = forwardRef(ListComponent) as <D extends any>(
  props: ListProps<D> & { ref?: Ref<HTMLUListElement> }
) => JSX.Element
