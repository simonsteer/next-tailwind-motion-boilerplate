import { useEffect, useMemo, useRef, useState } from 'react'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import classNames from 'classnames'
import { Modal, ModalAlignment } from 'types'
import { useSelectAppState, useUpdateAppState } from 'hooks'
import * as MODALS from './modals'

function ModalComponent({ modal }: { modal: Modal }) {
  const Component = MODALS[modal.name] as any
  return (
    <div onClick={e => e.stopPropagation()}>
      <Component {...modal.props} />
    </div>
  )
}

export function ModalRouter() {
  const storeModal = useSelectAppState(store => store.modal)
  const update = useUpdateAppState()

  const [modal, setModal] = useState(storeModal)
  const [position, setPosition] = useState<[ModalAlignment, ModalAlignment]>()
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (storeModal) {
      if (!position) updatePosition()
      setKey(key + 1)
      setModal(storeModal)
    }
  }, [storeModal])

  const ref = useRef<HTMLDivElement>(null)
  useClickAway(ref, () => {
    if (!!storeModal?.dismissable) dismiss()
  })

  function handleExitComplete() {
    if (storeModal === null) {
      setModal(null)
      clearPosition()
    } else {
      updatePosition()
    }
  }
  function updatePosition() {
    setPosition(storeModal?.position || ['center', 'center'])
  }
  function clearPosition() {
    setPosition(undefined)
  }
  function dismiss() {
    update({ modal: null })
  }

  const positionClassName = position
    ? `justify-${position[0]} items-${position[1]}`
    : ''

  return useMemo(
    () => (
      <DialogOverlay
        className={classNames(
          'fixed inset-0 z-40 pointer-events-none flex',
          positionClassName
        )}
        isOpen={!!modal}
        onDismiss={dismiss}
      >
        <DialogContent
          onClick={() => {
            if (!!storeModal?.dismissable) dismiss()
          }}
          aria-label={modal?.label || 'modal'}
          className="pointer-events-auto overflow-visible"
        >
          <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
            {!!storeModal?.overlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black"
                style={{ zIndex: -1 }}
              />
            )}
            {!!storeModal && <ModalComponent key={key} modal={modal!} />}
          </AnimatePresence>
        </DialogContent>
      </DialogOverlay>
    ),
    [modal, storeModal, positionClassName]
  )
}
