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

        <div className="pt-10">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-400">
                Movie Discovery Platform
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Discover Movies That Match Your Mood
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-gray-400 text-base sm:text-lg">
                Search your favourite movies, explore trending searches,
                and find your next watch in seconds.
            </p>
        </div>

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
            <section className="mt-14 text-left">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                        Trending Searches
                    </h2>

                    <p className="text-sm text-gray-400">
                        Based on what users search
                    </p>
                </div>

                <div className="flex gap-5 overflow-x-auto pb-4">
                    {trendingMovies.map((movie, index) => (
                        <div
                            key={movie.$id}
                            className="min-w-[210px] bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-4xl font-black text-purple-400">
                                    #{index + 1}
                                </span>

                                <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                                    {movie.count} searches
                                </span>
                            </div>

                            <img
                                src={movie.posterUrl}
                                alt={movie.searchTerm}
                                className="w-full h-[260px] object-cover rounded-xl"
                            />

                            <p className="mt-4 font-semibold capitalize line-clamp-1">
                                {movie.searchTerm}
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

            {movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">
                    No movies found.
                </p>
            )}
          </section>
        )}
      </section>
    </main>
  )
}

export default Home