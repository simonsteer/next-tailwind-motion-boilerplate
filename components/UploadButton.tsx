import { ChangeEvent, CSSProperties, useRef } from 'react'
import { motion } from 'framer-motion'

export function UploadButton({
  name,
  style,
  className,
  onChange,
  accept = ['image/*'],
  multiple = false,
  children = null,
}: {
  name: string
  className?: string
  style?: CSSProperties
  onChange(files: File[]): void
  accept?: string[]
  multiple?: boolean
  children?: React.ReactNode
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      if (files.length) onChange(files)
    }
  }

  return (
    <motion.label htmlFor={name} className={className} style={style}>
      <motion.input
        name={name}
        id={name}
        accept={accept.join(',')}
        type="file"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
        multiple={multiple}
      />
      {children}
    </motion.label>
  )
}
