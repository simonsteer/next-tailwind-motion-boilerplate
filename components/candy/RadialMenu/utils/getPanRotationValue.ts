import { MotionValue, PanInfo } from 'framer-motion'
import { getQuadrant } from './getQuadrant'

export function getPanRotationValue(
  rotation: MotionValue<number>,
  element: HTMLUListElement,
  pan: PanInfo
) {
  const quadrant = getQuadrant(element, pan.point.x, pan.point.y)
  if (Math.abs(pan.delta.y) > Math.abs(pan.delta.x)) {
    switch (quadrant) {
      case 'top-left':
      case 'bottom-left':
        return rotation.get() + pan.delta.y
      case 'top-right':
      case 'bottom-right':
        return rotation.get() - pan.delta.y
    }
  } else {
    switch (quadrant) {
      case 'bottom-left':
      case 'bottom-right':
        return rotation.get() + pan.delta.x
      case 'top-left':
      case 'top-right':
        return rotation.get() - pan.delta.x
    }
  }
}
