import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useModal } from 'hooks'

export function Notification({
  text,
  color = 'gray-500',
}: {
  text: string
  color?: string
}) {
  const { close } = useModal()

  return (
    <motion.div
      className={classNames(
        `bg-white rounded-sm border border-${color} text-${color} py-5 px-7 m-10`,
        'relative flex flex-col justify-between items-start',
        'filter drop-shadow-lg'
      )}
      initial={{ opacity: 0, x: -300, y: 0 }}
      exit={{ opacity: 0, x: -300, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
    >
      <p>{text}</p>
      <button
        className={`transition-colors absolute -top-2 -right-2 rounded-full bg-${color} border border-${color} text-white w-7 h-7 hover:bg-white hover:text-${color}`}
        onClick={close}
      >
        X
      </button>
    </motion.div>
  )
}

export function Confirmation({
  prompt,
  onConfirm,
}: {
  prompt: string
  onConfirm(result: boolean): void
}) {
  const { close } = useModal()

  return (
    <motion.div
      className={classNames(
        'bg-white rounded-sm border border-gray-500 p-5 m-10',
        'relative flex flex-col justify-between items-start max-w-sm',
        'filter drop-shadow-lg'
      )}
      initial={{ opacity: 0, scale: 1, y: 100 }}
      exit={{ opacity: 0, scale: 0.8, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
    >
      <p className="text-center px-10 mb-6">{prompt}</p>
      <div className="w-full flex">
        <button
          className="flex-1 rounded-sm py-1 px-3 hover:bg-white bg-blue-500 border border-blue-500 text-white hover:text-blue-500"
          onClick={() => {
            onConfirm(true)
            close()
          }}
        >
          yes
        </button>
        <button
          className="ml-4 flex-1 rounded-sm py-1 px-3 hover:bg-white bg-red-500 border border-red-500 text-white hover:text-red-500"
          onClick={() => {
            onConfirm(false)
            close()
          }}
        >
          no
        </button>
      </div>
    </motion.div>
  )
}
