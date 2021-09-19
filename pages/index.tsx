import { AnimateSharedLayout, motion } from 'framer-motion'
import { useFadeInWhenVisible, useModal } from 'hooks'
import { Collapsible } from 'components'

function CustomLink({ children, href }: { children: string; href: string }) {
  return (
    <a
      className="underline hover:bg-black hover:text-white hover:no-underline"
      href={href}
      target="_blank"
    >
      {children}
    </a>
  )
}

function CustomButton({
  children,
  onClick,
  div = false,
}: {
  children: string
  onClick?(): void
  div?: boolean
}) {
  return div ? (
    <div className="px-5 py-1 bg-white border border-black rounded-full flex justify-center items-center hover:text-white hover:bg-black">
      {children}
    </div>
  ) : (
    <button
      className="px-5 py-1 bg-white border border-black rounded-full flex justify-center items-center hover:text-white hover:bg-black"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function Home() {
  const modal = useModal()

  const openNotification = () =>
    modal.open({
      name: 'Notification',
      label: 'A notification',
      props: {
        text: "Here's an example of a notification-style modal 👀",
        color: 'black',
      },
      position: ['start', 'end'],
    })

  const openConfirmation = () =>
    modal.open({
      name: 'Confirmation',
      label: 'A confirmation modal',
      props: {
        prompt:
          "Here's an example of a modal with a callback. Do you accept? 🤔",
        onConfirm: console.log,
      },
      position: ['center', 'center'],
    })

  return (
    <div className="max-w-screen-md py-20 px-10">
      <motion.section {...useFadeInWhenVisible()}>
        <h1 className="text-4xl">Welcome to my Next.js boilerplate 🙂</h1>
        <p className="max-w-xl mt-4">
          Common patterns I use when building{' '}
          <CustomLink href="https://nextjs.org/">Next.js</CustomLink>{' '}
          applications, bundled into a template to save myself some time
          bootstrapping applications and websites.
        </p>
      </motion.section>
      <motion.section {...useFadeInWhenVisible()}>
        <h2 className="text-2xl mt-12 mb-4">What's included:</h2>
        <ul className="list-disc pl-4 leading-8">
          <li>
            <CustomLink href="https://tailwindcss.com">tailwind-css</CustomLink>{' '}
            installed by default, with{' '}
            <CustomLink href="https://tailwindcss.com/docs/plugins#aspect-ratio">
              aspect-ratio plugin
            </CustomLink>{' '}
            included
          </li>
          <li>
            <CustomLink href="https://www.framer.com/motion/">
              framer-motion
            </CustomLink>{' '}
            installed by default
          </li>
          <li>
            simple tranitions between routes via{' '}
            <CustomLink href="https://www.framer.com/docs/animate-presence/">
              AnimatePresence
            </CustomLink>
          </li>
          <li>
            App-wide state via{' '}
            <CustomLink href="https://reactjs.org/docs/context.html">
              Context API
            </CustomLink>
          </li>
          <li>
            Accessible and animatable modals via @reach/dialog
            <div className="flex flex-row gap-3 flex-wrap my-2">
              <CustomButton onClick={openConfirmation}>
                show example modal 1
              </CustomButton>
              <CustomButton onClick={openNotification}>
                show example modal 2
              </CustomButton>
            </div>
          </li>
          <AnimateSharedLayout>
            <motion.li>
              Animated accessible collapsing content via{' '}
              <CustomLink href="https://reach.tech/disclosure/">
                @reach/disclosure
              </CustomLink>
              <Collapsible
                layout
                className="my-2"
                title={isOpen => (
                  <CustomButton div>
                    {isOpen ? 'collapse' : 'expand'}
                  </CustomButton>
                )}
              >
                <p>some hidden content!</p>
              </Collapsible>
            </motion.li>
            <motion.li layout="position">another item</motion.li>
            <motion.li layout="position">another item</motion.li>
            <motion.li layout="position">another item</motion.li>
            <motion.li layout="position">another item</motion.li>
            <motion.li layout="position">another item</motion.li>
          </AnimateSharedLayout>
        </ul>
      </motion.section>
    </div>
  )
}
