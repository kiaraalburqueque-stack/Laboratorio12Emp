// Adapter pattern: turns a movie as the API sends it (snake_case, nested
// genres, minutes as text...) into the model the components use.
// If the API changes, only this file changes; the components stay the same.

const PLACEHOLDER_POSTER = '/posters/placeholder.svg'

/**
 * @param {object} raw movie from the API
 * @returns {{ id: number, title: string, image: string, synopsis: string,
 *   rating: string, score: number, genre: string, duration: number,
 *   showtimes: string[], releaseDate: string | null }}
 */
export function adaptMovie(raw) {
  return {
    id: Number(raw.id),
    title: raw.original_title?.trim() || 'Sin título',
    image: raw.poster_path || PLACEHOLDER_POSTER,
    synopsis: raw.overview ?? '',
    rating: raw.certification || 'S/C',
    score: Number(raw.vote_average) || 0,
    genre: raw.genres?.[0]?.name ?? 'Sin género',
    duration: Number.parseInt(raw.runtime, 10) || 0,
    showtimes: Array.isArray(raw.show_times) ? [...raw.show_times].sort() : [],
    releaseDate: raw.release_date ?? null,
  }
}

export function adaptMovies(rawList) {
  return rawList.map(adaptMovie)
}
