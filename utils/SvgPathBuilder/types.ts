export type SvgPathArcCommand = {
  type: 'arc'
  radius: [x: number, y: number]
  x: number
  y: number
  rotate: number
  sweep?: boolean
  large?: boolean
  relative?: boolean
}

export type SvgPathBezierCommand = {
  type: 'bezier'
  slopeA: [x: number, y: number]
  slopeB: [x: number, y: number]
  to: [x: number, y: number]
  relative?: boolean
}

export type SvgPathBezierShortcutCommand = {
  type: 'bezier'
  slope: [x: number, y: number]
  to: [x: number, y: number]
  relative?: boolean
}

export type SvgPathLineCommand = {
  type: 'line'
  x: number
  y: number
  relative?: boolean
}

export type SvgPathCloseCommand = {
  type: 'close'
}

export type SvgPathMoveCommand = {
  type: 'move'
  x: number
  y: number
  relative?: boolean
}

export type SvgPathCommand =
  | SvgPathMoveCommand
  | SvgPathLineCommand
  | SvgPathCloseCommand
  | SvgPathBezierCommand
  | SvgPathBezierShortcutCommand
  | SvgPathArcCommand

export type SvgPathBuilderParams = {
  source?: string | SvgPathCommand[]
  bounds?: [width: number, height: number]
}
