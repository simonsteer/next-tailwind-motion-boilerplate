import { MotionValue, PanInfo } from 'framer-motion'
import { getQuadrant } from './getQuadrant'

export function getNextRotationFromPanMomentum({
  pan,
  element,
  currentRotation,
}: {
  pan: PanInfo
  element: HTMLUListElement
  currentRotation: MotionValue<number>
}) {
  const currentValue = currentRotation.get()
  const panAxis =
    Math.abs(pan.velocity.x) < Math.abs(pan.velocity.y) ? 'y' : 'x'

  const panAmount = pan.velocity[panAxis]
  if (Math.abs(panAmount) < 100) return currentValue

  const quadrant = getQuadrant(element, pan.point.x, pan.point.y)

  let rotationDelta: number
  switch (quadrant) {
    case 'top-left':
      rotationDelta = panAxis === 'y' ? panAmount : -panAmount
      break
    case 'top-right':
      rotationDelta = -panAmount
      break
    case 'bottom-left':
      rotationDelta = panAmount
      break
    case 'bottom-right':
      rotationDelta = panAxis === 'y' ? -panAmount : panAmount
      break
  }
  return currentValue + rotationDelta
}
