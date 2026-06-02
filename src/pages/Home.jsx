import { useEffect, useState } from 'react'
import Search from '../components/Search'
import { API_BASE_URL, API_OPTIONS } from '../api'
import MovieCard from '../components/MovieCard'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)

        const endpoint = searchTerm
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

        const response = await fetch(
          endpoint,
          API_OPTIONS
        )

        const data = await response.json()

        setMovies(data.results || [])
      } catch (error) {
        setErrorMessage('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [searchTerm])

  return (
    <main className="min-h-screen bg-[#030014] text-white px-6 py-10">
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold leading-tight">
          Find Movies You’ll Enjoy Without the Hassle
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Search movies, explore trending titles, and discover what to watch next.
        </p>

        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {searchTerm && (
          <p className="mt-4 text-gray-300">
            Searching for: {searchTerm}
          </p>
        )}

        {loading && (
          <p className="mt-6">
            Loading movies...
          </p>
        )}

        {errorMessage && (
          <p className="mt-6 text-red-500">
            {errorMessage}
          </p>
        )}

        {!loading && !errorMessage && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-6">
              Popular Movies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

export default Home