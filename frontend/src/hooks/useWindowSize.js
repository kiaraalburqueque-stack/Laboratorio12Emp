import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'

function readSize() {
  return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * Current size of the browser window. It listens to `resize` and removes
 * the listener when the component unmounts. Dragging the window fires
 * dozens of events per second, so the value is debounced with useDebounce.
 *
 * @param {number} [delay=150] ms to wait after the last resize event
 * @returns {{ width: number, height: number }}
 */
export function useWindowSize(delay = 150) {
  const [size, setSize] = useState(readSize)

  useEffect(() => {
    const handleResize = () => setSize(readSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return useDebounce(size, delay)
}
