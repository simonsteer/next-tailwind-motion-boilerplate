import {
  SvgPathCommand,
  SvgPathArcCommand,
  SvgPathBezierCommand,
  SvgPathBezierShortcutCommand,
  SvgPathLineCommand,
  SvgPathMoveCommand,
} from '../types'
import { isBezierShortcutCommand } from './isBezierShortcutCommand'

export function svgPathCommandsToString(...commands: SvgPathCommand[]) {
  return commands.reduce(
    (acc, pathCommand) => acc + svgPathCommandToString(pathCommand),
    ''
  )
}

function svgPathCommandToString(cmd: SvgPathCommand) {
  switch (cmd.type) {
    case 'bezier':
      return isBezierShortcutCommand(cmd)
        ? bezierShortcutToString(cmd)
        : bezierToString(cmd)
    case 'line':
      return lineToString(cmd)
    case 'move':
      return moveToString(cmd)
    case 'arc':
      return arcToString(cmd)
    case 'close':
      return 'z'
    default:
      return ''
  }
}

function arcToString({
  relative,
  sweep,
  large,
  radius,
  rotate,
  x,
  y,
}: SvgPathArcCommand) {
  const command = relative ? 'a' : 'A'
  const radii = radius.join(' ')
  const flags = [large ? 1 : 0, sweep ? 1 : 0].join(' ')

  return [command, radii, rotate, flags, x, y].join(' ')
}

function bezierToString(curve: SvgPathBezierCommand) {
  const command = curve.relative ? 'c' : 'C'
  const slopeA = curve.slopeA.join(' ')
  const slopeB = curve.slopeB.join(' ')
  const to = curve.to.join(' ')

  return [[command, slopeA].join(' '), slopeB, to].join(' ')
}

function bezierShortcutToString(curve: SvgPathBezierShortcutCommand) {
  const command = curve.relative ? 's' : 'S'
  const slope = curve.slope.join(' ')
  const to = curve.to.join(' ')

  return [[command, slope].join(' '), to].join(' ')
}

function lineToString(line: SvgPathLineCommand) {
  return `${line.relative ? 'l' : 'L'} ${line.x} ${line.y}`
}

function moveToString(move: SvgPathMoveCommand) {
  return `${move.relative ? 'm' : 'M'} ${move.x} ${move.y}`
}
