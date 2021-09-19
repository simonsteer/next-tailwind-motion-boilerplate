import { useUpdateAppState } from 'hooks'
import { useMemo } from 'react'
import { Modal } from 'types'

export function useModal() {
  const update = useUpdateAppState()

  return useMemo(
    () => ({
      open(modal: Modal) {
        update({ modal })
      },
      close() {
        update({ modal: null })
      },
    }),
    [update]
  )
}
