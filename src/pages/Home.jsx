import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from '../components/Search'
import { API_BASE_URL, API_OPTIONS } from '../api'
import MovieCard from '../components/MovieCard'
import {
  updateSearchCount,
  getTrendingMovies,
} from '../appwrite'

function Home() {
  const [movies, setMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm)
    },
    500,
    [searchTerm]
  )

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)

        const endpoint = debouncedSearchTerm
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
              debouncedSearchTerm
            )}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

        const response = await fetch(
          endpoint,
          API_OPTIONS
        )

        const data = await response.json()

        setMovies(data.results || [])

        if (
          debouncedSearchTerm &&
          data.results.length > 0
        ) {
          await updateSearchCount(
            debouncedSearchTerm,
            data.results[0]
          )
        }
      } catch (error) {
        setErrorMessage('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [debouncedSearchTerm])

  useEffect(() => {
    const loadTrendingMovies = async () => {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)
    }

    loadTrendingMovies()
  }, [])

  return (
    <main className="min-h-screen bg-[#030014] text-white px-6 py-10">
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold leading-tight">
          Find Movies You’ll Enjoy Without the Hassle
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Search movies, explore trending titles,
          and discover what to watch next.
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

        {trendingMovies.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-6">
              Trending Searches
            </h2>

            <div className="flex gap-5 overflow-x-auto pb-4">
              {trendingMovies.map((movie, index) => (
                <div
                  key={movie.$id}
                  className="min-w-[180px] bg-slate-900 rounded-xl p-3"
                >
                  <p className="text-4xl font-bold text-purple-400">
                    #{index + 1}
                  </p>

                  <img
                    src={movie.posterUrl}
                    alt={movie.searchTerm}
                    className="w-full h-[240px] object-cover rounded-lg mt-3"
                  />

                  <p className="mt-3 font-semibold">
                    {movie.searchTerm}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Searches: {movie.count}
                  </p>
                </div>
              ))}
            </div>
          </section>
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
              {debouncedSearchTerm
                ? `Search Results for "${debouncedSearchTerm}"`
                : 'Popular Movies'}
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