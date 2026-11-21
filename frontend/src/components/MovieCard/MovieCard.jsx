import Button from '../Button/Button'
import { useNotify } from '../../notifications/useNotify'
import './MovieCard.css'

// Card for a single movie. It receives the movie by props and does not
// know where the data comes from. To mark a favorite it does not change
// any state: it calls the function it received and App decides.
// It asks for a message with notify() without knowing how it is shown.
function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const { id, title, image, rating, score, genre, duration, showtimes } = movie
  const notify = useNotify()

  function handleFavoriteClick() {
    onToggleFavorite(id)
    if (isFavorite) {
      notify(`Quitaste «${title}» de favoritas`)
    } else {
      notify(`«${title}» se añadió a favoritas`, { type: 'success' })
    }
  }

  return (
    <article className="movie-card">
      <div className="movie-card__image-wrapper">
        <img className="movie-card__image" src={image} alt={`Póster de ${title}`} />
        <span className="movie-card__rating">{rating}</span>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__meta">
          {genre} · {duration} min
        </p>
        <p className="movie-card__score">⭐ {score.toFixed(1)} / 10</p>

        <ul className="movie-card__showtimes">
          {showtimes.map((time) => (
            <li key={time} className="movie-card__time">
              {time}
            </li>
          ))}
        </ul>

        <Button
          variant="ghost"
          size="sm"
          className="movie-card__favorite"
          aria-pressed={isFavorite}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥ En favoritas' : '♡ Añadir a favoritas'}
        </Button>
      </div>
    </article>
  )
}

export default MovieCard
