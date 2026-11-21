import { rawPremieres } from '../data/premieres'
import { adaptMovies } from '../utils/adaptMovie'

const NETWORK_DELAY_MS = 1500

// Simulated request: there is no server yet (the real fetch arrives in week 12).
// It waits like a network call would and then resolves with the adapted data,
// or rejects with an error when `fail` is true.
export function fetchPremieres({ fail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error('El servidor de estrenos no respondió (error 503). Inténtalo de nuevo en unos segundos.'))
      } else {
        resolve(adaptMovies(rawPremieres))
      }
    }, NETWORK_DELAY_MS)
  })
}
