import { ChangeEvent, CSSProperties, forwardRef } from 'react'
import { motion } from 'framer-motion'

type UploadButtonProps = {
  name: string
  className?: string
  style?: CSSProperties
  onChange(files: File[]): void
  accept?: string[]
  multiple?: boolean
  children?: React.ReactNode
}

export const UploadButton = forwardRef<HTMLInputElement, UploadButtonProps>(
  function UploadButton(
    {
      name,
      style,
      className,
      onChange,
      accept = ['image/*'],
      multiple = false,
      children = null,
    }: UploadButtonProps,
    ref
  ) {
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      if (e.target.files) {
        const files = Array.from(e.target.files)
        if (files.length) onChange(files)
      }
    }

    return (
      <motion.label htmlFor={name} className={className} style={style}>
        <motion.input
          ref={ref}
          name={name}
          id={name}
          accept={accept.join(',')}
          type="file"
          className="hidden"
          onChange={handleChange}
          multiple={multiple}
        />
        {children}
      </motion.label>
    )
  }
)
