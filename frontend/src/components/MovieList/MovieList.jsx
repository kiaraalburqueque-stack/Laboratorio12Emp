import MovieCard from '../MovieCard/MovieCard'
import { useWindowSize } from '../../hooks/useWindowSize'
import { columnsForWidth } from '../../utils/columnsForWidth'
import './MovieList.css'

// Lowercase and without accents, so "codigo" finds "Código".
function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

// Grid that renders one MovieCard per movie using map.
// It filters the billboard by the search text it receives and shows an
// empty state when nothing matches. It does not own the favorites: it
// receives the list and the function from App and passes them down.
function MovieList({ title, movies, query = '', favorites, onToggleFavorite }) {
  const { width } = useWindowSize()
  const columns = columnsForWidth(width)
  const search = normalize(query)
  // Derived data: computed on each render from props, so it is not state.
  const visibleMovies = search
    ? movies.filter((movie) => normalize(`${movie.title} ${movie.genre}`).includes(search))
    : movies

  return (
    <section className="movie-list container" id="billboard">
      <div className="movie-list__header">
        <div>
          <span className="eyebrow">Hoy en salas</span>
          <h2 className="movie-list__title section-title">{title}</h2>
        </div>
        <p className="movie-list__count text-muted text-small" aria-live="polite">
          {visibleMovies.length} de {movies.length} películas · {columns} por fila
        </p>
      </div>

      {visibleMovies.length === 0 ? (
        <div className="movie-list__empty" role="status">
          <p className="movie-list__empty-icon" aria-hidden="true">🎞️</p>
          <h3>No encontramos películas para «{query.trim()}»</h3>
          <p className="text-muted">Prueba con otro título o con un género, por ejemplo «drama» o «terror».</p>
        </div>
      ) : (
        <div className="movie-list__grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default MovieList
