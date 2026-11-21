import { api } from './client'

// The three operations of the lab. Components call these functions and never write a URL.

/** GET /movies/ → array of movies */
export async function listMovies() {
  const { data } = await api.get('/movies/')
  return data
}

/** POST /movies/ with the body → the created movie (with its id) */
export async function createMovie(movie) {
  const { data } = await api.post('/movies/', movie)
  return data
}

/** DELETE /movies/:id/ → nothing (204) */
export async function deleteMovie(id) {
  await api.delete(`/movies/${id}/`)
}
