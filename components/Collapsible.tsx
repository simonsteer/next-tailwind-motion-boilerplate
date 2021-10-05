import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import classNames from 'classnames'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const MotionDisclosurePanel = motion(DisclosurePanel)
const MotionDisclosureButton = motion(DisclosureButton)

type CollapsibleProps = {
  title: React.ReactNode | ((isOpen: boolean) => React.ReactNode)
  open?: boolean
  defaultOpen?: boolean
  onChange?(): void
  children: React.ReactNode
  className?: string
} & MotionProps

export function Collapsible(props: CollapsibleProps) {
  const {
    open,
    onChange,
    defaultOpen,
    className,
    title,
    children,
    ...motionProps
  } = props
  const disclosureProps = {
    open,
    onChange,
    defaultOpen,
    title,
    children,
  }

  const CollapsibleComponent =
    open !== undefined && onChange !== undefined
      ? ControlledCollapsible
      : SelfContainedCollapsible

  return (
    <motion.div
      layout
      className={classNames('relative', className)}
      {...motionProps}
    >
      <CollapsibleComponent {...disclosureProps} />
    </motion.div>
  )
}

function ControlledCollapsible({
  open,
  onChange,
  title,
  children,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(open!)
  const [internalIsOpen, setInternalIsOpen] = useState(open!)

  useEffect(() => {
    if (open) setIsOpen(true)
    setInternalIsOpen(open!)
  }, [open])

  function handleExitComplete() {
    setIsOpen(false)
  }

  const props = {
    isOpen,
    internalIsOpen,
    handleChange: onChange,
    handleExitComplete,
    title,
  }
  return <RenderedDisclosure {...props}>{children}</RenderedDisclosure>
}

function SelfContainedCollapsible({
  title,
  children,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen)

  function handleChange() {
    const nextIsOpen = !isOpen
    if (nextIsOpen) setIsOpen(nextIsOpen)
    setInternalIsOpen(nextIsOpen)
  }

  function handleExitComplete() {
    setIsOpen(false)
  }

  const props = {
    isOpen,
    internalIsOpen,
    defaultOpen,
    handleChange,
    handleExitComplete,
    title,
  }
  return <RenderedDisclosure {...props}>{children}</RenderedDisclosure>
}

function RenderedDisclosure({
  isOpen,
  internalIsOpen,
  title,
  handleChange,
  handleExitComplete,
  children,
  defaultOpen,
}: {
  isOpen: boolean
  defaultOpen?: boolean
  internalIsOpen: boolean
  handleChange?(): void
  handleExitComplete(): void
  title: React.ReactNode | ((isOpen: boolean) => React.ReactNode)
  children: React.ReactNode
}) {
  return (
    <Disclosure open={isOpen} onChange={handleChange} defaultOpen={defaultOpen}>
      <MotionDisclosureButton layout="position">
        {typeof title === 'function' ? title(internalIsOpen) : title}
      </MotionDisclosureButton>
      <MotionDisclosurePanel>
        <AnimatePresence onExitComplete={handleExitComplete}>
          {internalIsOpen && (
            <motion.div
              className="overflow-hidden"
              layout="position"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, height: 0 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </MotionDisclosurePanel>
    </Disclosure>
  )
}
