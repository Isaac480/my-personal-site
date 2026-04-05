import { useEffect, useState } from 'react'
import styles from './Typewriter.module.css'

export function Typewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 100,
  pauseTime = 2400,
  pauseBeforeNext = 500,
}: {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
  pauseBeforeNext?: number
}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    setText('')
    setIndex(0)
    setPhase('typing')
  }, [words])

  useEffect(() => {
    const current = words[index]

    if (phase === 'typing') {
      if (text.length < current.length) {
        const timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
        return () => clearTimeout(timeout)
      } else {
        setPhase('pausing')
      }
    }

    if (phase === 'pausing') {
      const timeout = setTimeout(() => setPhase('deleting'), pauseTime)
      return () => clearTimeout(timeout)
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIndex((index + 1) % words.length)
          setPhase('typing')
        }, pauseBeforeNext)
        return () => clearTimeout(timeout)
      }
    }
  }, [text, phase, index, words, typeSpeed, deleteSpeed, pauseTime, pauseBeforeNext])

  return (
    <span className={styles.text}>
      {text}
      <span className={styles.cursor}></span>
    </span>
  )
}
