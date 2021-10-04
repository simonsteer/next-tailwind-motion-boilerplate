import { useSelectAppState, useUpdateAppState } from 'hooks'
import { useMemo } from 'react'

export function useCount() {
  const count = useSelectAppState(state => state.count)
  const update = useUpdateAppState()

  return useMemo(
    () =>
      [
        count,
        {
          increment(n = 1) {
            update({ count: count + n })
          },
          decrement(n = 1) {
            update({ count: count - n })
          },
        },
      ] as const,
    [update]
  )
}
