import { useMemo } from 'react'
import { Modal } from 'types'
import { useAppStateContext } from './useAppState'

export function useModal() {
  const { update } = useAppStateContext()
  function open(modal: Modal) {
    update({ modal })
  }
  function close() {
    update({ modal: null })
  }

  return useMemo(() => ({ open, close }), [update])
}
