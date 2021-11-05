import { SvgPathBezierCommand, SvgPathBezierShortcutCommand } from '../types'

export function isBezierShortcutCommand(
  curve:
    | Omit<SvgPathBezierCommand, 'type'>
    | Omit<SvgPathBezierShortcutCommand, 'type'>
): curve is Omit<SvgPathBezierShortcutCommand, 'type'> {
  return !('slopeA' in curve) && !('slopeB' in curve)
}
