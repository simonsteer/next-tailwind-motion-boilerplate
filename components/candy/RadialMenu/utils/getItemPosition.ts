export function getItemPosition({
  rotationAmount,
  angle,
  index,
  radius,
  dimensions: { width, height },
}: {
  rotationAmount: number
  angle: number
  index: number
  radius: number
  dimensions: { width: number; height: number }
}) {
  let theta = (angle / 180) * index
  theta += rotationAmount / 180
  theta *= Math.PI

  const x = Math.round(radius * Math.cos(theta))
  const y = Math.round(radius * Math.sin(theta))

  const top = -height / 2 + (radius - y)
  const left = -width / 2 + (radius + x)

  return { top, left }
}
