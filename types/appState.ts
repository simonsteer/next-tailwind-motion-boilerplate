import { Modal } from './modals'

export type AppState = {
  modal: null | Modal
  count: number
}

export type AppStatePatch =
  | ((state: AppState) => DeepPartial<AppState>)
  | DeepPartial<AppState>

export type AppStateContextType = {
  store: AppState
  update: (patch: AppStatePatch) => void
}
