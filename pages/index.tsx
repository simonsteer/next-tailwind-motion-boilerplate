import classNames from 'classnames'
import { RadialMenu } from 'components/candy/RadialMenu'

const colors = ['bg-yellow-300', 'bg-red-500', 'bg-blue-500']

export default function Home() {
  const data = [1, 2, 3]
  const separation = 360 / data.length

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <RadialMenu
        radius={100}
        data={data}
        renderItem={(_, i) => <Item index={i} />}
        className="rounded-full"
        onRotationChange={rotation => {
          if (rotation % separation === 0) {
            navigator.vibrate(20)
          }
        }}
      />
    </div>
  )
}

function Item({ index }: { index: number }) {
  const color = colors[index % colors.length]
  return (
    <p
      className={classNames(
        'w-40 h-40 text-black rounded-full flex items-center justify-center filter blur-xl',
        color
      )}
    >
      {index}
    </p>
  )
}
