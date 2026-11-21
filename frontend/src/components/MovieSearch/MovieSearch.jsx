import './MovieSearch.css'

// Search input controlled by its parent: it shows `value` and reports every
// key with `onChange`. It keeps no state, so whoever owns the text (App) can
// also clear it from elsewhere (the banner button) and both stay in sync.
function MovieSearch({ value, onChange, placeholder = 'Busca por título o género' }) {
  return (
    <form className="movie-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="movie-search-input">Buscar en la cartelera</label>
      <input
        id="movie-search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </form>
  )
}

export default MovieSearch
