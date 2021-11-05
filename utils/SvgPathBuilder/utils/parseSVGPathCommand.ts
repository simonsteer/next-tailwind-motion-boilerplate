import { SvgPathCommand } from '../types'

/**
 * Converts an individual path command string into a `PathCommand`, or `null` if not possible
 */
export function parseSVGPathCommand(command: string): SvgPathCommand | null {
  const cmd = command.slice(0, 1)
  const args = command
    .slice(1)
    .replace(/,/g, '')
    .split(' ')
    .map(f => parseFloat(f))

  switch (cmd) {
    case 'L':
    case 'l':
      if (args.length !== 2) return null

      return { type: 'line', x: args[0], y: args[1], relative: cmd === 'l' }
    case 'M':
    case 'm':
      if (args.length !== 2) return null

      return { type: 'move', x: args[0], y: args[1], relative: cmd === 'm' }
    case 'S':
    case 's':
      if (args.length !== 4) return null

      return {
        type: 'bezier',
        slope: [args[0], args[1]],
        to: [args[2], args[3]],
        relative: cmd === 's',
      }
    case 'C':
    case 'c':
      if (args.length !== 6) return null

      return {
        type: 'bezier',
        slopeA: [args[0], args[1]],
        slopeB: [args[2], args[3]],
        to: [args[4], args[5]],
        relative: cmd === 'c',
      }
    case 'A':
    case 'a':
      if (args.length !== 7) return null

      return {
        type: 'arc',
        radius: [args[0], args[1]],
        rotate: args[2],
        large: args[3] === 1,
        sweep: args[4] === 1,
        x: args[5],
        y: args[6],
        relative: cmd === 'a',
      }
    case 'Z':
    case 'z':
      return { type: 'close' }
    default:
      return null
  }
}
