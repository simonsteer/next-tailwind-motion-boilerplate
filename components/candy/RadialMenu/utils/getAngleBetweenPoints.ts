import { Point } from '../types'

export const getAngleBetweenPoints = (anchor: Point, point: Point) =>
  (Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180) / Math.PI + 180
