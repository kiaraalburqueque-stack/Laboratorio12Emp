import { useRef } from 'react'
import Button from '../Button/Button'
import './PremiereCarousel.css'

const dateFormat = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long' })

// Horizontal carousel. It shows `visible` cards at a time and moves one
// page with the arrows. It only draws what it receives: no data loading here.
function PremiereCarousel({ premieres, visible }) {
  const trackRef = useRef(null)

  function scrollPage(direction) {
    const track = trackRef.current
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="carousel" style={{ '--visible': visible }}>
      <Button variant="ghost" size="sm" className="carousel__arrow" aria-label="Estrenos anteriores" onClick={() => scrollPage(-1)}>
        ‹
      </Button>

      <ul className="carousel__track" ref={trackRef}>
        {premieres.map((movie) => (
          <li key={movie.id} className="carousel__item">
            <article className="premiere">
              <img className="premiere__poster" src={movie.image} alt={`Póster de ${movie.title}`} />
              <h3 className="premiere__title">{movie.title}</h3>
              <p className="premiere__meta text-muted text-small">
                {movie.genre} · {movie.releaseDate ? `Estreno: ${dateFormat.format(new Date(`${movie.releaseDate}T12:00:00`))}` : 'Fecha por confirmar'}
              </p>
            </article>
          </li>
        ))}
      </ul>

      <Button variant="ghost" size="sm" className="carousel__arrow" aria-label="Estrenos siguientes" onClick={() => scrollPage(1)}>
        ›
      </Button>
    </div>
  )
}

export default PremiereCarousel
