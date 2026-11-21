import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { describeApiError } from '../../api/client'
import { createMovie } from '../../api/movies'
import { useNotify } from '../../notifications/useNotify'
import './MovieFormPage.css'

const EMPTY_FORM = { title: '', genre: '', duration: '', rating: 'APT', score: '', synopsis: '' }

const RATINGS = [
  { value: 'APT', label: 'APT · apta para todos' },
  { value: '14', label: '14 · mayores de 14' },
  { value: 'PG-13', label: 'PG-13' },
  { value: '18', label: '18 · mayores de 18' },
]

// Form to add a movie. Every input is controlled by the `form` state; on submit
// it POSTs the body to the API and, when it works, goes back to the list.
function MovieFormPage() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const notify = useNotify()

  // One handler for every input: the input's `name` says which field changes.
  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault() // the browser must not send the form and reload the page
    setSubmitting(true)
    setError(null)
    try {
      // The score is optional: when it is empty it is not sent and the API uses its default (0).
      const { score, ...rest } = form
      const body = score === '' ? rest : form
      const created = await createMovie(body)
      notify(`«${created.title}» se agregó a la cartelera`, { type: 'success' })
      navigate('/peliculas')
    } catch (err) {
      setError(describeApiError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="movie-form-page container section" aria-labelledby="form-title">
      <span className="eyebrow">POST /api/movies/</span>
      <h1 id="form-title" className="section-title mb-4">Nueva película</h1>

      {/* noValidate: the API is the one that validates, so its messages reach the screen. */}
      <form className="movie-form surface" onSubmit={handleSubmit} noValidate>
        {error && (
          <p className="movie-form__error" role="alert">
            {error}
          </p>
        )}

        <div className="movie-form__field movie-form__field--wide">
          <label htmlFor="title">Título</label>
          <input id="title" name="title" type="text" value={form.title} onChange={handleChange} />
        </div>

        <div className="movie-form__field">
          <label htmlFor="genre">Género</label>
          <input id="genre" name="genre" type="text" value={form.genre} onChange={handleChange} />
        </div>

        <div className="movie-form__field">
          <label htmlFor="duration">Duración (min)</label>
          <input id="duration" name="duration" type="number" inputMode="numeric" value={form.duration} onChange={handleChange} />
        </div>

        <div className="movie-form__field">
          <label htmlFor="rating">Clasificación</label>
          <select id="rating" name="rating" value={form.rating} onChange={handleChange}>
            {RATINGS.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>

        <div className="movie-form__field">
          <label htmlFor="score">Valoración (0 a 10)</label>
          <input id="score" name="score" type="number" step="0.1" value={form.score} onChange={handleChange} />
        </div>

        <div className="movie-form__field movie-form__field--wide">
          <label htmlFor="synopsis">Sinopsis</label>
          <textarea id="synopsis" name="synopsis" rows={3} value={form.synopsis} onChange={handleChange} />
        </div>

        <div className="movie-form__actions movie-form__field--wide">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Guardando…' : 'Guardar película'}
          </Button>
          <Link to="/peliculas" className="button button--ghost button--md">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}

export default MovieFormPage
