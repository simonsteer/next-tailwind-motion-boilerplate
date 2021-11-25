export type Axis = 'x' | 'y'
export type HorizontalQuadrant = 'left' | 'right'
export type VerticalQuadrant = 'top' | 'bottom'
export type Quadrant = `${VerticalQuadrant}-${HorizontalQuadrant}`
export type Point = { [A in Axis]: number }
