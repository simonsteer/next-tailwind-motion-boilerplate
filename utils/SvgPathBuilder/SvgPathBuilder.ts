import {
  SvgPathArcCommand,
  SvgPathBezierCommand,
  SvgPathBezierShortcutCommand,
  SvgPathBuilderParams,
  SvgPathCommand,
  SvgPathLineCommand,
  SvgPathMoveCommand,
} from './types'
import {
  isBezierShortcutCommand,
  parseSVGPathCommand,
  splitSVGPathCommandString,
  svgPathCommandsToString,
} from './utils'

export class SvgPathBuilder {
  d: SvgPathCommand[] = []
  bounds: [width: number, height: number]

  constructor({ source, bounds = [1, 1] } = {} as SvgPathBuilderParams) {
    this.bounds = bounds

    if (source) {
      const commands =
        typeof source === 'string'
          ? (splitSVGPathCommandString(source)
              .map(parseSVGPathCommand)
              .filter(Boolean) as SvgPathCommand[])
          : source

      commands.forEach(({ type, ...command }) => this[type](command as any))
    }
  }

  normalize = () => {
    this.d.forEach(d => {
      switch (d.type) {
        case 'move':
        case 'line':
          d.x /= this.bounds[0]
          d.y /= this.bounds[1]
          break
        case 'bezier':
          if (isBezierShortcutCommand(d)) {
            d.slope[0] /= this.bounds[0]
            d.slope[1] /= this.bounds[1]
          } else {
            d.slopeA[0] /= this.bounds[0]
            d.slopeA[1] /= this.bounds[1]
            d.slopeB[0] /= this.bounds[0]
            d.slopeB[1] /= this.bounds[1]
          }
          d.to[0] /= this.bounds[0]
          d.to[1] /= this.bounds[1]
          break
        case 'arc':
          d.radius[0] /= this.bounds[0]
          d.radius[1] /= this.bounds[1]
          d.x /= this.bounds[0]
          d.y /= this.bounds[1]
          break
        default:
          break
      }

      return d
    })
    return this
  }

  scale(x: number, y = x) {
    this.bounds[0] *= x
    this.bounds[1] *= y

    this.d.forEach(cmd => {
      switch (cmd.type) {
        case 'bezier':
          if (isBezierShortcutCommand(cmd)) {
            cmd.slope[0] *= x
            cmd.slope[1] *= y
          } else {
            cmd.slopeA[0] *= x
            cmd.slopeA[1] *= y
            cmd.slopeB[0] *= x
            cmd.slopeB[1] *= y
          }
          cmd.to[0] *= x
          cmd.to[1] *= y
          break
        case 'arc':
          cmd.radius[0] *= x
          cmd.radius[1] *= y
          cmd.x *= x
          cmd.y *= y
          break
        case 'move':
        case 'line':
          cmd.x *= x
          cmd.y *= y
          break
        default:
          break
      }
    })

    return this
  }

  shift(x: number, y: number) {
    this.d.forEach(cmd => {
      switch (cmd.type) {
        case 'bezier':
          if (!cmd.relative) {
            if (isBezierShortcutCommand(cmd)) {
              cmd.slope[0] += x
              cmd.slope[1] += y
            } else {
              cmd.slopeA[0] += x
              cmd.slopeA[1] += y
              cmd.slopeB[0] += x
              cmd.slopeB[1] += y
            }
            cmd.to[0] += x
            cmd.to[1] += y
          }
          break
        case 'arc':
          if (!cmd.relative) {
            cmd.radius[0] += x
            cmd.radius[1] += y
            cmd.x += x
            cmd.y += y
          }
          break
        case 'move':
        case 'line':
          if (!cmd.relative) {
            cmd.x += x
            cmd.y += y
          }
          break
        default:
          break
      }
    })

    return this
  }

  arc({
    rotate = 0,
    sweep = false,
    large = false,
    relative = false,
    radius,
    x,
    y,
  }: Omit<SvgPathArcCommand, 'type'>) {
    this.d.push({
      type: 'arc',
      radius,
      rotate,
      sweep,
      large,
      relative,
      x,
      y,
    })
    return this
  }

  line({ x, y, relative = false }: Omit<SvgPathLineCommand, 'type'>) {
    this.d.push({ type: 'line', x, y, relative })
    return this
  }

  move({ x, y, relative = false }: Omit<SvgPathMoveCommand, 'type'>) {
    this.d.push({ type: 'move', x, y, relative })
    return this
  }

  close() {
    this.d.push({ type: 'close' })
    return this
  }

  bezier(
    ...curves: (
      | Omit<SvgPathBezierCommand, 'type'>
      | Omit<SvgPathBezierShortcutCommand, 'type'>
    )[]
  ) {
    this.d.push(
      ...curves.map(curve => {
        if (isBezierShortcutCommand(curve)) {
          let { slope, to, ...rest } = curve
          return {
            slope,
            to,
            ...rest,
            type: 'bezier',
          } as SvgPathBezierShortcutCommand
        }

        let { slopeA, slopeB, to, ...rest } = curve
        return {
          slopeA,
          slopeB,
          to,
          ...rest,
          type: 'bezier',
        } as SvgPathBezierCommand
      })
    )

    return this
  }

  render() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', `${this}`)
    return path
  }

  toString() {
    return svgPathCommandsToString(...this.d)
  }
  valueOf = this.toString.bind(this);
  [Symbol.toPrimitive] = this.toString.bind(this)
}
