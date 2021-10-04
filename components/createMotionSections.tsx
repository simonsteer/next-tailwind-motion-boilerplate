import { MotionValue, useMotionValue } from 'framer-motion'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type MotionSectionsProps<Data extends any> = {
  /**
   * List of data to iterate over when rendering the component
   */
  data: Data[]
  /**
   * Callback function to render a given section. Should return an intrinsic JSX Element, or a functional component that has been augmented with `forwardRef`,
   * since we need to obtain a component ref for each section to determine its position relative to the viewport.
   */
  renderSection: (data: Data, index: number) => React.ReactElement
  /**
   * What to render at the top of the rendered sections. Gets rendered inside the context provider that exposes `motionValue` and `currentSection` through the `useSectionValues` hook.
   * Useful for sticky/fixed position items that need to be aware of the `motionValue` or `currentSection`.
   */
  header?: React.ReactNode
  /**
   * What to render at the bottom of the rendered sections. Gets rendered inside the context provider that exposes `motionValue` and `currentSection` through the `useSectionValues` hook.
   * Useful for sticky/fixed position items that need to be aware of the `motionValue` or `currentSection`.
   */
  footer?: React.ReactNode
  /**
   * Use to override how many pixels of a section must be in view to be considered fully in view. Only accepts positive numbers.
   * eg. if you pass `sectionScrollThreshold={100}`, a section is considered fully in view once it is 100 pixels inside the viewport.
   */
  sectionScrollThreshold?: number
}

/**
 * Factory function for creating a Higher-Order Component that tracks its childrens' scroll
 * positions relative to the viewport via motion values. Useful where animation timing is linked to
 * a user's scroll position throughout several sections of markdown. Returns the HoC, as well
 * as a hook to access the associated motion value, as well as the current section.
 *
 * Example usage:
 * ```tsx
 * const { useSectionValues, MotionSections } = createMotionSections()
 *
 * const SECTIONS = [data1, data2, data3, ...etc]
 *
 * function MyFancyWebsiteWithScrollAnimations() {
 *   return (
 *     <MotionSections
 *       data={SECTIONS}
 *       renderSection={(data, index) => <Section data={data} index={index} />}
 *     />
 *   )
 * }
 *
 * // Use forwardRef if rendering a function component, since we need the DOM element's ref for this work properly
 * const Section = forwardRef<HTMLDivElement, CustomSectionProps>(
 *   ({ data, index }, ref) => {
 *     const { motionValue } = useSectionValues()
 *
 *     // fade in as section scrolls into view
 *     const opacity = useTransform(motionValue, [index - 1, index], [0, 1])
 *
 *     return (
 *       <motion.section ref={ref} className="p-20" style={{ opacity }}>
 *         <h2>{data.title}</h2>
 *         <p>{data.body}</p>
 *       </motion.section>
 *     )
 *   }
 * )
 * ```
 */
export function createMotionSections() {
  const SectionValuesContext = createContext<{
    motionValue: MotionValue<number>
    currentSection: number
  }>({ motionValue: new MotionValue(0), currentSection: 0 })

  function useSectionValues() {
    return useContext(SectionValuesContext)
  }

  function MotionSections<Data extends any>({
    data,
    renderSection,
    header,
    footer,
    sectionScrollThreshold = 0,
  }: MotionSectionsProps<Data>) {
    const motionValue = useMotionValue(0)
    const [currentSection, setCurrentSection] = useState(0)

    const refs = useRef<(HTMLElement | null)[]>([])
    const setSection = useCallback((el: HTMLElement | null, index: number) => {
      refs.current[index] = el
    }, [])

    useEffect(() => {
      function setMotionValue() {
        if (!refs.current.length) return

        const result = getMotionValue(refs.current, sectionScrollThreshold)
        if (result) {
          motionValue.set(result.value)
          if (currentSection !== result.section) {
            setCurrentSection(result.section)
          }
        }
      }
      setMotionValue()

      window.addEventListener('resize', setMotionValue)
      window.addEventListener('scroll', setMotionValue)
      return () => {
        window.removeEventListener('scroll', setMotionValue)
        window.removeEventListener('resize', setMotionValue)
      }
    }, [currentSection, sectionScrollThreshold])

    return (
      <SectionValuesContext.Provider value={{ currentSection, motionValue }}>
        {header}
        {data.map((sectionData, index) =>
          React.cloneElement(renderSection(sectionData, index), {
            ref: (el: HTMLElement | null) => setSection(el, index),
            key: `section-${index}`,
          })
        )}
        {footer}
      </SectionValuesContext.Provider>
    )
  }

  return { MotionSections, useSectionValues }
}

function getMotionValue(
  items: (HTMLElement | null)[],
  sectionScrollThreshold = 0
) {
  const result = items.map((ref, index) => {
    if (!ref) return null
    const el = ref.getBoundingClientRect()
    let amountInView: number | null = null

    const isElementLargerThanViewport = el.height >= window.innerHeight
    if (isElementLargerThanViewport) {
      const isElementCoveringViewport =
        el.top <= 0 && el.bottom >= window.innerHeight
      if (isElementCoveringViewport) {
        amountInView = 1
      }

      const isElementBelowViewport = el.top >= 0 && el.top < window.innerHeight
      if (amountInView === null && isElementBelowViewport) {
        if (sectionScrollThreshold > 0) {
          amountInView = Math.min(
            (window.innerHeight - el.top) / sectionScrollThreshold,
            1
          )
        } else {
          amountInView = (window.innerHeight - el.top) / window.innerHeight
        }
      }

      const isElementAboveViewport = el.top < 0 && el.bottom >= 0
      if (amountInView === null && isElementAboveViewport) {
        if (sectionScrollThreshold > 0) {
          amountInView = Math.min(el.bottom / sectionScrollThreshold, 1)
        } else {
          amountInView = el.bottom / window.innerHeight
        }
        if (index === items.length - 1) {
          amountInView = 1 + (1 - amountInView)
        }
      }
    } else {
      const isElementInsideViewport =
        el.top >= 0 && el.bottom <= window.innerHeight
      if (isElementInsideViewport) {
        amountInView = 1
      }

      const isElementBelowViewport =
        el.top <= window.innerHeight && el.bottom >= window.innerHeight
      if (amountInView === null && isElementBelowViewport) {
        if (sectionScrollThreshold > 0) {
          amountInView = Math.min(
            (window.innerHeight - el.top) / sectionScrollThreshold,
            1
          )
        } else {
          amountInView = (window.innerHeight - el.top) / el.height
        }
      }

      const isElementAboveViewport = el.top < 0
      if (amountInView === null && isElementAboveViewport) {
        if (sectionScrollThreshold > 0) {
          amountInView = Math.min(el.bottom / sectionScrollThreshold, 1)
        } else {
          amountInView = el.bottom / el.height
        }
      }
    }

    if (amountInView !== null && amountInView >= 0) {
      return index - 1 + amountInView
    }

    return null
  })

  const nums = result.filter(n => n !== null) as number[]
  if (!nums.length) {
    if (items[0]) {
      const rect = items[0].getBoundingClientRect()
      return rect.bottom > window.innerHeight
        ? { value: -1, section: 0 }
        : { value: items.length, section: items.length - 1 }
    }
  }

  const value = Math.max(...nums)
  const section = Math.round(value)

  return { value, section }
}
