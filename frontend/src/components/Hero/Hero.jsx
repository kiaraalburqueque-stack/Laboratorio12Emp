import Button from '../Button/Button'
import './Hero.css'

// Banner for the featured movie. It only knows the movie it receives by props.
// Whatever App places between <Hero> and </Hero> (the search box) arrives as
// children and is drawn under the calls to action.
function Hero({ movie, children }) {
  return (
    <section className="hero" id="featured">
      <div
        className="hero__backdrop"
        style={{ backgroundImage: `url(${movie.image})` }}
        aria-hidden="true"
      />
      <div className="hero__content container">
        <img className="hero__poster" src={movie.image} alt={movie.title} />
        <div className="hero__info">
          <span className="hero__badge">Película destacada</span>
          <h1 className="hero__title">{movie.title}</h1>
          <p className="hero__meta">
            {movie.genre} · {movie.duration} min · {movie.rating} · ⭐ {movie.score}
          </p>
          <p className="hero__synopsis">{movie.synopsis}</p>

          <div className="hero__actions row">
            <Button href="#billboard">Ver horarios</Button>
            <Button href="#contact" variant="secondary">
              Reservar por teléfono
            </Button>
          </div>

          {children && <div className="hero__search">{children}</div>}
        </div>
      </div>
    </section>
  )
}

export default Hero
