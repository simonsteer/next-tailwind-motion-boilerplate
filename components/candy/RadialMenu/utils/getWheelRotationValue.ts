import { MotionValue } from 'framer-motion'
import { getQuadrant } from './getQuadrant'

export function getWheelRotationValue(
  rotation: MotionValue<number>,
  element: HTMLUListElement,
  e: WheelEvent
) {
  const quadrant = getQuadrant(element, e.clientX, e.clientY)
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    switch (quadrant) {
      case 'top-left':
      case 'bottom-left':
        return rotation.get() - e.deltaY
      case 'top-right':
      case 'bottom-right':
        return rotation.get() + e.deltaY
    }
  } else {
    switch (quadrant) {
      case 'bottom-left':
      case 'bottom-right':
        return rotation.get() - e.deltaX
      case 'top-left':
      case 'top-right':
        return rotation.get() + e.deltaX
    }
  }
}
