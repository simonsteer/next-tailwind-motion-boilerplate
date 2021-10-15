import { useEffect } from 'react'

export function useOnResizeWindow(callbackFn: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener('resize', callbackFn)
    return () => window.removeEventListener('resize', callbackFn)
  }, [callbackFn])
}
