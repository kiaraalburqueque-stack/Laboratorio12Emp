import { useCallback, useEffect, useState } from 'react'
import { fetchPremieres } from '../api/premieres'

/**
 * Loads the upcoming premieres and exposes the three states of a request:
 *   status: 'loading' | 'success' | 'error'
 *   data:   the premieres (only when status is 'success')
 *   error:  the Error (only when status is 'error')
 *   retry:  asks for the data again
 *
 * @param {{ fail?: boolean }} [options] fail: simulate a server error
 */
export function usePremieres({ fail = false } = {}) {
  const [state, setState] = useState({ status: 'loading', data: [], error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // If the component unmounts or a new request starts, ignore this answer.
    let ignore = false
    setState({ status: 'loading', data: [], error: null })

    fetchPremieres({ fail })
      .then((data) => {
        if (!ignore) setState({ status: 'success', data, error: null })
      })
      .catch((error) => {
        if (!ignore) setState({ status: 'error', data: [], error })
      })

    return () => {
      ignore = true
    }
  }, [fail, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { ...state, retry }
}
