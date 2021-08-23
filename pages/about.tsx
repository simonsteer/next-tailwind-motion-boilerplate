import Link from 'next/link'

export default function About() {
  return (
    <Link href="/">
      <a className="text-4xl w-screen h-screen flex items-center justify-center cursor-pointer">
        Back
      </a>
    </Link>
  )
}
