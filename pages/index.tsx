import Link from 'next/link'
import { useFadeInWhenVisible } from 'hooks'
import { A, P } from 'components'

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto py-20">
      <Link href="/about">
        <A
          {...useFadeInWhenVisible()}
          className="text-4xl text-center mb-20 cursor-pointer"
        >
          Hello World
        </A>
      </Link>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus
      </P>
    </div>
  )
}
