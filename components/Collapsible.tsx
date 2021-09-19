import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import { AnimatePresence, MotionProps } from 'framer-motion'
import { useEffect, useState } from 'react'

type CollapsibleProps = {
  title: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onChange?(): void
  children: React.ReactNode
} & MotionProps

export function Collapsible({
  title,
  children,
  ...restProps
}: CollapsibleProps) {
  const { open, onChange, defaultOpen, ...motionProps } = restProps as any
  if (open !== undefined && onChange !== undefined) {
    return (
      <ControlledCollapsible
        open={open}
        onChange={onChange}
        title={title}
        {...motionProps}
      >
        {children}
      </ControlledCollapsible>
    )
  }

  return (
    <SelfContainedCollapsible title={title} {...motionProps}>
      {children}
    </SelfContainedCollapsible>
  )
}

function ControlledCollapsible({
  open,
  onChange,
  title,
  children,
  ...motionProps
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(open)
  const [internalIsOpen, setInternalIsOpen] = useState(open)

  useEffect(() => {
    if (open) setIsOpen(true)
    setInternalIsOpen(open)
  }, [open])

  function handleExitComplete() {
    setIsOpen(false)
  }

  return (
    <Disclosure {...motionProps} open={isOpen} onChange={onChange}>
      <DisclosureButton>{title}</DisclosureButton>
      <DisclosurePanel>
        <AnimatePresence onExitComplete={handleExitComplete}>
          {internalIsOpen && children}
        </AnimatePresence>
      </DisclosurePanel>
    </Disclosure>
  )
}

function SelfContainedCollapsible({
  title,
  children,
  defaultOpen = false,
  ...motionProps
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

  return (
    <Disclosure {...motionProps} open={isOpen} onChange={handleChange}>
      <DisclosureButton>{title}</DisclosureButton>
      <DisclosurePanel>
        <AnimatePresence onExitComplete={handleExitComplete}>
          {internalIsOpen && children}
        </AnimatePresence>
      </DisclosurePanel>
    </Disclosure>
  )
}
