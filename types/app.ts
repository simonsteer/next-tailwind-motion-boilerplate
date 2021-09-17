import { MODALS } from 'components'

export type Modal = ValueInObject<
  {
    [Name in keyof typeof MODALS]: {
      name: Name
      props: Parameters<typeof MODALS[Name]>[0]
      label: string
      id: string
    }
  }
>

export type AppState = {
  modal: null | Modal
}

export type AppStatePatch =
  | ((state: AppState) => DeepPartial<AppState>)
  | DeepPartial<AppState>

export type AppStateContextType = {
  store: AppState
  update: (patch: AppStatePatch) => void
}
