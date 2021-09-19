import Link from 'next/link'
import { useFadeInWhenVisible, useModal } from 'hooks'
import { motion } from 'framer-motion'

export default function Home() {
  const modal = useModal()

  const openNotification = () =>
    modal.open({
      name: 'Notification',
      label: 'A notification',
      props: { text: "Here's an example of a notification modal" },
      position: ['start', 'end'],
    })

  const openConfirmation = () =>
    modal.open({
      name: 'Confirmation',
      label: 'A confirmation modal',
      props: { prompt: 'Do you accept?' },
      position: ['center', 'center'],
    })

  return (
    <div className="max-w-screen-md py-20 px-10">
      <motion.section {...useFadeInWhenVisible()}>
        <h1 className="text-4xl">Welcome to my Next.js boilerplate 🙂</h1>
        <p className="max-w-xl mt-4">
          Common patterns I use when building a{' '}
          <a href="https://nextjs.org/" className="underline" target="_blank">
            Next.js
          </a>{' '}
          application, bundled into a template to save myself some time
          bootstrapping applications and websites.
        </p>
      </motion.section>
      <motion.section {...useFadeInWhenVisible()}>
        <h2 className="text-2xl mt-12 mb-4">What's included:</h2>
        <ul className="list-disc pl-4 leading-8">
          <li>
            <a
              href="https://tailwindcss.com"
              target="blank"
              className="underline"
            >
              tailwind-css
            </a>{' '}
            installed by default, with{' '}
            <a
              href="https://tailwindcss.com/docs/plugins#aspect-ratio"
              target="blank"
              className="underline"
            >
              aspect-ratio plugin
            </a>{' '}
            included
          </li>
          <li>
            <a
              className="underline"
              href="https://www.framer.com/motion/"
              target="_blank"
            >
              framer-motion
            </a>{' '}
            installed by default
          </li>
          <li>
            simple tranitions between routes via framer's{' '}
            <a
              href="https://www.framer.com/docs/animate-presence/"
              className="underline"
              target="_blank"
            >
              AnimatedPresence
            </a>
          </li>
          <li>
            App-wide state via{' '}
            <a
              className="underline"
              href="https://reactjs.org/docs/context.html"
              target="_blank"
            >
              Context API
            </a>
          </li>
          <li>
            Accessible and animatable alerts via @reach/dialog component
            <br />(
            <button className="underline" onClick={openConfirmation}>
              example 1
            </button>
            ,{' '}
            <button className="underline" onClick={openNotification}>
              example 2
            </button>
            )
          </li>
        </ul>
      </motion.section>
    </div>
  )
}
