import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useModal } from 'hooks'
import { useTimeoutFn } from 'react-use'

export function Notification({
  text,
  color = 'gray-500',
}: {
  text: string
  color?: string
}) {
  const modal = useModal()
  useTimeoutFn(modal.close, 3000)

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
        onClick={modal.close}
      >
        X
      </button>
    </motion.div>
  )
}
