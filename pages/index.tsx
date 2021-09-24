import { motion } from 'framer-motion'
import { useFadeInWhenVisible, useModal } from 'hooks'
import { Collapsible, List } from 'components'

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

type Datum = {
  Link: { type: 'link'; data: { href: string; text: string } }
  Text: { type: 'text'; data: string }
  Module: { type: 'module'; data: 'modals' | 'collapsible' }
}

const DATA: ValueInObject<Datum>[][] = [
  [
    {
      type: 'link',
      data: { href: 'https://tailwindcss.com', text: 'tailwind-css' },
    },
    { type: 'text', data: ' installed by default, with ' },
    {
      type: 'link',
      data: {
        href: 'https://tailwindcss.com/docs/plugins#aspect-ratio',
        text: 'aspect-ratio plugin',
      },
    },
    { type: 'text', data: ' included' },
  ],
  [
    {
      type: 'link',
      data: { href: 'https://www.framer.com/motion/', text: 'framer-motion' },
    },
    { type: 'text', data: ' installed by default' },
  ],
  [
    {
      type: 'link',
      data: {
        href: 'https://github.com/streamich/react-use',
        text: 'react-use',
      },
    },
    { type: 'text', data: ' installed by default' },
  ],
  [
    { type: 'text', data: 'simple tranitions between routes via ' },
    {
      type: 'link',
      data: {
        href: 'https://www.framer.com/docs/animate-presence/',
        text: 'AnimatePresence',
      },
    },
  ],
  [
    { type: 'text', data: 'app-wide state via ' },
    {
      type: 'link',
      data: {
        href: 'https://reactjs.org/docs/context.html',
        text: 'Context API',
      },
    },
  ],
  [
    {
      type: 'text',
      data: 'Accessible and animatable collapsing content via ',
    },
    {
      type: 'link',
      data: {
        href: 'https://reach.tech/disclosure/',
        text: '@reach/disclosure',
      },
    },
    {
      type: 'module',
      data: 'collapsible',
    },
  ],
  [
    {
      type: 'text',
      data: 'Accessible and animatable modals via ',
    },
    {
      type: 'link',
      data: {
        href: 'https://reach.tech/dialog/',
        text: '@reach/dialog',
      },
    },
    {
      type: 'module',
      data: 'modals',
    },
  ],
]

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

  const modals = (
    <div className="flex flex-row gap-3 flex-wrap my-2">
      <CustomButton onClick={openConfirmation}>
        show example modal 1
      </CustomButton>
      <CustomButton onClick={openNotification}>
        show example modal 2
      </CustomButton>
    </div>
  )

  const collapsible = (
    <Collapsible
      className="my-2"
      title={isOpen => (
        <CustomButton div>{isOpen ? 'collapse' : 'expand'}</CustomButton>
      )}
    >
      some hidden content!
    </Collapsible>
  )

  const modules = { collapsible, modals }

  return (
    <div className="max-w-screen-md mx-auto py-20 px-10 relative overflow-x-hidden">
      <motion.section {...useFadeInWhenVisible()}>
        <h1 className="text-4xl">Welcome to my Next.js boilerplate 🙂</h1>
        <p className="max-w-xl mt-4">
          Common patterns I use when building{' '}
          <CustomLink href="https://nextjs.org/">Next.js</CustomLink>{' '}
          applications, bundled into a template to save myself some time
        </p>
      </motion.section>
      <motion.section {...useFadeInWhenVisible()}>
        <h2 className="text-2xl mt-12 mb-4">What's included:</h2>
        <List
          animateSharedLayout
          className="list-disc pl-4 leading-8"
          data={DATA}
          itemProps={{ layout: 'position' }}
          renderItem={datum =>
            datum.map((data, dataIndex) => {
              switch (data.type) {
                case 'link':
                  return (
                    <CustomLink key={dataIndex} href={data.data.href}>
                      {data.data.text}
                    </CustomLink>
                  )
                case 'module':
                  return <div key={dataIndex}>{modules[data.data]}</div>
                case 'text':
                  return <span key={dataIndex}>{data.data}</span>
              }
            })
          }
        />
      </motion.section>
    </div>
  )
}
