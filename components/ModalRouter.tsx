import { useEffect, useState } from 'react'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { Modal, ModalAlignment } from 'types'
import { useAppStateContext } from 'hooks'
import * as MODALS from './modals'

function ModalComponent({ modal }: { modal: Modal }) {
  const Component = MODALS[modal.name] as any
  return <Component {...modal.props} />
}

export function ModalRouter() {
  const { store, update } = useAppStateContext()
  const [modal, setModal] = useState(store.modal)
  const [position, setPosition] = useState<[ModalAlignment, ModalAlignment]>()
  const [key, setKey] = useState(0)

  const updatePosition = () =>
    setPosition(store.modal?.position || ['center', 'center'])
  const clearPosition = () => setPosition(undefined)

  useEffect(() => {
    if (store.modal === null) return

    if (!position) updatePosition()

    setKey(key + 1)
    setModal(store.modal)
  }, [store.modal])

  function handleExitComplete() {
    if (store.modal === null) {
      setModal(null)
      clearPosition()
    } else {
      updatePosition()
    }
  }

  return (
    <DialogOverlay
      className={classNames(
        'fixed inset-0 z-40 pointer-events-none flex',
        position && `justify-${position[0]} items-${position[1]}`
      )}
      isOpen={!!modal}
      onDismiss={() => update({ modal: null })}
    >
      <DialogContent
        aria-label={modal?.label || 'modal'}
        className="pointer-events-auto overflow-visible"
      >
        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
          {!!store.modal && <ModalComponent key={key} modal={modal!} />}
        </AnimatePresence>
      </DialogContent>
    </DialogOverlay>
  )
}
