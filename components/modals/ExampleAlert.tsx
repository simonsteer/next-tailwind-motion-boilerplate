import { motion } from 'framer-motion'

export function ExampleAlert({ text }: { text: string }) {
  return (
    <motion.h1
      className="bg-red-200"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      {text}
    </motion.h1>
  )
}
