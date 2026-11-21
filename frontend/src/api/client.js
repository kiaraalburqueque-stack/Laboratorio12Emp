import axios from 'axios'

// The ONLY place that knows where the API lives. Change it with VITE_API_URL in a .env file.
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Turns an Axios error into a message a person can understand.
 *   - No response: the server is off, the address is wrong or CORS blocked it.
 *   - With response: the status the API answered.
 */
export function describeApiError(error) {
  if (error.response) {
    const { status } = error.response
    if (status === 404) return 'El recurso no existe en la API (404).'
    if (status >= 500) return `La API tuvo un problema interno (${status}).`
    return `La API rechazó la petición (${status}).`
  }
  if (error.code === 'ECONNABORTED') return 'La API tardó demasiado en responder.'
  return `No se pudo conectar con la API en ${API_URL}. ¿Está encendido el servidor de Django y autorizado este origen en CORS?`
}
