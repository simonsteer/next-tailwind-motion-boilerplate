import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import u from 'updeep'
import { AppState, AppStateContextType, AppStatePatch } from 'types'

const DEFAULT_APP_STATE: AppState = {
  modal: null,
}

const AppStateContext = createContext<AppStateContextType>({
  store: DEFAULT_APP_STATE,
  update(patch) {
    console.log('Empty update fn', patch)
  },
})

export const AppStateProvider = ({
  children = null,
  initialValue = DEFAULT_APP_STATE,
}: {
  children?: React.ReactNode
  initialValue?: Partial<AppState>
}) => {
  const [store, _update] = useState({ ...DEFAULT_APP_STATE, ...initialValue })
  const update = useCallback((patch: AppStatePatch) => {
    const changes = typeof patch === 'function' ? patch(store) : patch
    _update(u(changes, store))
  }, [])

  return (
    <AppStateContext.Provider value={{ store, update }}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppStateContext() {
  const { store, update } = useContext(AppStateContext)
  return useMemo(() => ({ store, update }), [store, update])
}
