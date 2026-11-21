import { useEffect, useState } from 'react'

/**
 * Returns `value` only after it has stopped changing for `delay` ms.
 * Each new value cancels the pending timer, so a burst of changes
 * (keys, resize events...) produces a single update at the end.
 *
 * Generic: it works with any value (text, numbers, objects).
 * Used by MovieSearch (search text) and by useWindowSize (window width).
 *
 * @template T
 * @param {T} value
 * @param {number} [delay=400]
 * @returns {T}
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
