# Next x Tailwind x Framer Boilerplate
Common patterns I use when building Next.js applications, bundled into a template to save myself some time when bootstrapping applications and websites ⚙️

## App-wide state
By default, [the application](pages/_app.tsx) is wrapped with a Context Provider, defined at [hooks/useAppState.tsx](hooks/useAppState.tsx). The default store data that is currently loaded exists solely to handle modals. If you wish to add to the data, update the `AppState` type in [types/app.ts](types/app.ts), then update the `DEFAULT_APP_STATE` constant at the top of [hooks/useAppState.tsx](hooks/useAppState.tsx). To access the data, you can use the `useAppStateContext` hook, which returns an object with two properties; one called `store`, representing the data itself, and another called `update`, which you can use to patch the store. The `update` function is similar to `setState`, except that it accepts deep partial updates to the store instead of needing to be called with an exact copy of the data structure.

## Example of extending app-wide data
First we update the typings and the default state:
```tsx
// types/app.ts
export type AppState = {
  modal: null | Modal
  count: number
}

// hooks/useAppState.ts
const DEFAULT_APP_STATE: AppState = {
  modal: null,
  count: 0,
}
```

Then we can use our new slice of state however we like using the [useAppStateContext](hooks/useAppState.tsx) hook:
```tsx
import { useAppStateContext } from 'hooks'

function useCounter() {
  const { store, update } = useAppStateContext()
  return [
    store.count,
    {
      increment: () => update({ count: store.count + 1 }),
      decrement: () => update({ count: store.count - 1 }),
    },
  ]
}

export function Counter() {
  const [count, { increment, decrement }] = useCounter()

  return (
    <div className="flex gap-x-2">
      <p>{count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```
![counter example](public/counter-example.gif)

## Modals

The only app-wide store data that exists by default is to support a simple alert system built on top of [@reach/dialog](https://reach.tech/dialog/). There are two example alerts already baked in to follow along, but a rough overview of how to create and add/use alerts goes as follows:

1. Create a new component for your alert to use
2. Export the component from `components/modals.tsx` *as a named export*
3. Import and use the `useModal` hook as desired

```tsx

export function Notification({ text }: { text: string }) {
  const { close } = useModal()

  return (
    <motion.div
      className={classNames(
        'bg-white rounded-sm border border-blue-200 py-5 px-7 m-10',
        'relative flex flex-col justify-between items-start',
        'filter drop-shadow'
      )}
      initial={{ opacity: 0, x: -300, y: 0 }}
      exit={{ opacity: 0, x: -300, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
    >
      <p>{text}</p>
      <button
        className="transition-colors absolute -top-2 -right-2 rounded-full bg-blue-200 text-white w-7 h-7 hover:bg-blue-600"
        onClick={close}
      >
        X
      </button>
    </motion.div>
  )
}
```

```ts
import { useModal } from 'hooks'

const modal = useModal()

const openNotification = () =>
  modal.open({
    name: 'Notification',
    label: 'A notification',
    props: { text: "Here's an example of a notification modal" },
    position: ['start', 'end'],
  })
```
If you look at [types/app.ts](types/app.ts), the `Modal` type is based off of the named exports imported from `components/modals.tsx`. Whatever functional component you wish to use as an alert should be exported from this file so the typings for the methods returned by `useModal` will update automatically.