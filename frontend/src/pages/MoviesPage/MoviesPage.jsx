import { useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import Skeleton from '../../components/Skeleton/Skeleton'
import { describeApiError } from '../../api/client'
import { listMovies } from '../../api/movies'
import './MoviesPage.css'

const SKELETON_ROWS = 5

// Movie management page. It asks the Django API for the movies when it mounts
// and draws one of the three states of the request: loading, data or error.
function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Changing this number repeats the effect: it is how "Reintentar" asks again.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // An answer that arrives after leaving the page (or after a newer request) is ignored.
    let cancelled = false
    setLoading(true)
    setError(null)

    listMovies()
      .then((data) => {
        if (!cancelled) setMovies(data)
      })
      .catch((err) => {
        if (!cancelled) setError(describeApiError(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  const reload = useCallback(() => setAttempt((n) => n + 1), [])

  return (
    <section className="movies-page container section" aria-labelledby="movies-title" aria-busy={loading}>
      <div className="cluster mb-4">
        <div>
          <span className="eyebrow">API de Django · /api/movies/</span>
          <h1 id="movies-title" className="section-title">Gestión de películas</h1>
        </div>
      </div>

      {loading && (
        <div className="movies-table__wrapper surface">
          <p className="visually-hidden" role="status">Cargando películas…</p>
          <table className="movies-table">
            <tbody>
              {Array.from({ length: SKELETON_ROWS }, (_, row) => (
                <tr key={row}>
                  <td><Skeleton variant="text" width="70%" /></td>
                  <td><Skeleton variant="text" width="60%" /></td>
                  <td><Skeleton variant="text" width="40%" /></td>
                  <td><Skeleton variant="text" width="40%" /></td>
                  <td><Skeleton variant="text" width="30%" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && error && (
        <div className="movies-page__error surface" role="alert">
          <p className="movies-page__error-title">No pudimos cargar las películas</p>
          <p className="text-muted text-small">{error}</p>
          <Button variant="secondary" size="sm" className="mt-2" onClick={reload}>
            Reintentar
          </Button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="movies-page__empty surface">Todavía no hay películas registradas.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movies-table__wrapper surface">
          <table className="movies-table">
            <caption className="visually-hidden">Películas registradas en la API</caption>
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Género</th>
                <th scope="col">Duración</th>
                <th scope="col">Clasificación</th>
                <th scope="col">Valoración</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="movies-table__title">{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.duration} min</td>
                  <td>{movie.rating}</td>
                  <td>⭐ {movie.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default MoviesPage
