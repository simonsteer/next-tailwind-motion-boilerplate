import classNames from 'classnames'
import { RadialMenu } from 'components/candy/RadialMenu'

const colors = [
  'bg-yellow-200',
  'bg-red-500',
  'bg-purple-200',
  'bg-blue-500',
  'bg-green-200',
  'bg-yellow-500',
  'bg-red-200',
  'bg-purple-500',
  'bg-blue-200',
  'bg-green-500',
]

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <RadialMenu
        radius={100}
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={(_, i) => <Item index={i} />}
        className="border border-black rounded-full shadow-lg"
      />
    </div>
  )
}

function Item({ index }: { index: number }) {
  const color = colors[index % colors.length]
  return (
    <p
      className={classNames(
        'w-12 h-12 text-black rounded-full flex items-center justify-center border border-black shadow-lg',
        color
      )}
    >
      {index}
    </p>
  )
}
