import { motion } from 'framer-motion'
import Link from 'next/link'
import { useFadeInWhenVisible } from 'hooks'

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto py-20">
      <Link href="/about">
        <motion.h1
          {...useFadeInWhenVisible()}
          className="text-4xl text-center mb-20 cursor-pointer"
        >
          Hello World
        </motion.h1>
      </Link>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
      <motion.p {...useFadeInWhenVisible()} className="mb-20">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe facilis
        quaerat ipsa enim rem hic magni blanditiis aspernatur dolores facere
        eaque doloremque similique minus laborum quo, dolor recusandae deleniti
        voluptatum! Enim eos dolorem distinctio ea facilis non alias sunt
        consectetur vero obcaecati nisi explicabo excepturi, hic, culpa nobis
        ducimus quod?
      </motion.p>
    </div>
  )
}
