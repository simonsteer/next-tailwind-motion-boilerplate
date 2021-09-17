import { useEffect, useState } from 'react'
import { Modal } from 'types'
import { AnimatePresence } from 'framer-motion'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useAppStateContext } from 'hooks'
import * as ModalComponents from './modals'

export const MODALS = ModalComponents

function ModalComponent({ modal }: { modal: Modal }) {
  const Component = MODALS[modal.name] as any
  return <Component {...modal.props} />
}

export function ModalRouter() {
  const { store, update } = useAppStateContext()
  const [modal, setModal] = useState(store.modal)

  useEffect(() => {
    if (store.modal === null) {
      return
    }

    setModal(store.modal)
  }, [store.modal])

  function handleExitComplete() {
    if (store.modal === null) setModal(null)
  }

  return (
    <DialogOverlay
      className="fixed inset-0 z-40 pointer-events-none"
      isOpen={!!modal}
      onDismiss={() => update({ modal: null })}
    >
      <DialogContent
        aria-label={modal?.label}
        className="fixed inset-0 pointer-events-none"
      >
        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
          {!!store.modal && (
            <ModalComponent key={store.modal.id} modal={modal || store.modal} />
          )}
        </AnimatePresence>
      </DialogContent>
    </DialogOverlay>
  )
}
