import Link from 'next/link'

export default function _404() {
  return (
    <Link href="/">
      <a className="text-4xl w-screen h-screen flex items-center justify-center cursor-pointer">
        404
      </a>
    </Link>
  )
}
