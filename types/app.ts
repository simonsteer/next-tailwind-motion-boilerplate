import * as MODALS from 'components/modals'

export type ModalAlignment = 'center' | 'start' | 'end'

export type Modal = ValueInObject<
  {
    [Name in keyof typeof MODALS]: {
      name: Name
      props: Parameters<typeof MODALS[Name]>[0]
      /**
       * `aria-label` value that gets passed to the content container of the modal.
       */
      label: string
      /**
       * values for positioning along the [x-axis, y-axis] of the screen. For example, `['start', 'start']` would result in the alert appearing in the top-left corner.
       */
      position?: [ModalAlignment, ModalAlignment]
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
