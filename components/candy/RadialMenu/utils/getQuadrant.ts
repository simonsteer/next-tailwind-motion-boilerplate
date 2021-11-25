import { Quadrant } from '../types'

export function getQuadrant(
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
