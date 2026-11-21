import { useEffect, useState } from 'react'

// Reads the saved value once, when the component first renders.
// If there is nothing saved, or it cannot be read, it uses initialValue.
function readStoredValue(key, initialValue) {
  try {
    const saved = window.localStorage.getItem(key)
    return saved === null ? initialValue : JSON.parse(saved)
  } catch {
    return initialValue
  }
}

// Works like useState, but keeps the value in the browser's localStorage
// so it survives a page reload.
export function useLocalStorage(key, initialValue) {
  // Lazy initializer: the function runs only on the first render.
  const [value, setValue] = useState(() => readStoredValue(key, initialValue))

  // Saves the value every time it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be full or blocked (private mode): the app keeps working
      // with the value in memory.
    }
  }, [key, value])

  return [value, setValue]
}
