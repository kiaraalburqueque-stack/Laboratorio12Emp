import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDebounce } from './hooks/useDebounce'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import MovieList from './components/MovieList/MovieList'
import Footer from './components/Footer/Footer'
import Button from './components/Button/Button'
import MovieSearch from './components/MovieSearch/MovieSearch'
import PremieresSection from './components/PremieresSection/PremieresSection'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import { movies, featuredMovie } from './data/movies'
import { cinema } from './data/cinema'

const FAVORITES_KEY = 'cine-tecsup:favorites'

// App owns the data that several components share.
function App() {
  // Ids of the favorite movies. It lives here because the Header (counter)
  // and every MovieCard (heart button) need the same list. It is saved in
  // localStorage so it survives a reload.
  const [favorites, setFavorites] = useLocalStorage(FAVORITES_KEY, [])

  // Text of the search box. It lives in App, the closest common ancestor of
  // the three components that use it: MovieSearch (writes it), the clear
  // button in the banner (empties it) and MovieList (filters with it).
  const [searchText, setSearchText] = useState('')
  // MovieList filters with the debounced text, not on every key.
  const query = useDebounce(searchText, 400)

  // Adds the movie if it is not in the list, removes it if it is.
  // It builds a new array instead of changing the old one.
  function toggleFavorite(movieId) {
    setFavorites((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    )
  }

  // Derived from the list: the Header only needs the number, never the list.
  const favoritesCount = favorites.length

  return (
    <>
      <Header cinemaName={cinema.name} favoritesCount={favoritesCount} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero movie={featuredMovie}>
                  <MovieSearch value={searchText} onChange={setSearchText} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    disabled={searchText === ''}
                    onClick={() => setSearchText('')}
                  >
                    ✕ Limpiar filtro
                  </Button>
                </Hero>
                <MovieList
                  title="En cartelera"
                  movies={movies}
                  query={query}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
                <PremieresSection />
              </>
            }
          />
          {/* Pages that talk to the Django API (week 12). */}
          <Route path="/peliculas" element={<MoviesPage />} />
        </Routes>
      </main>
      <Footer cinemaName={cinema.name} contact={cinema.contact} />
    </>
  )
}

export default App
