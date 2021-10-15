import { useEffect } from 'react'

export function useOnScroll(callbackFn: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener('scroll', callbackFn)
    return () => window.removeEventListener('scroll', callbackFn)
  }, [callbackFn])
}
