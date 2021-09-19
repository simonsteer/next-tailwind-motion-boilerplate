import { useEffect, useState } from 'react'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { Modal, ModalAlignment } from 'types'
import { useSelectAppState, useUpdateAppState } from 'hooks'
import * as MODALS from './modals'

function ModalComponent({ modal }: { modal: Modal }) {
  const Component = MODALS[modal.name] as any
  return <Component {...modal.props} />
}

export function ModalRouter() {
  const storeModal = useSelectAppState(store => store.modal)
  const update = useUpdateAppState()

  const [modal, setModal] = useState(storeModal)
  const [position, setPosition] = useState<[ModalAlignment, ModalAlignment]>()
  const [key, setKey] = useState(0)

  const updatePosition = () =>
    setPosition(storeModal?.position || ['center', 'center'])
  const clearPosition = () => setPosition(undefined)

  useEffect(() => {
    if (storeModal === null) return

    if (!position) updatePosition()

    setKey(key + 1)
    setModal(storeModal)
  }, [storeModal])

  function handleExitComplete() {
    if (storeModal === null) {
      setModal(null)
      clearPosition()
    } else {
      updatePosition()
    }
  }

  console.log('rendering')

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
          {!!storeModal && <ModalComponent key={key} modal={modal!} />}
        </AnimatePresence>
      </DialogContent>
    </DialogOverlay>
  )
}
