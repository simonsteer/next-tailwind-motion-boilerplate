/**
 * clamp a number between min and max values
 */
export function minMax(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min)
}
