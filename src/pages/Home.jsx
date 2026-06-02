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
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist =
        localStorage.getItem('watchlist')

    return savedWatchlist
        ? JSON.parse(savedWatchlist)
        : []
    })

  const toggleWatchlist = (movie) => {
    const alreadyAdded = watchlist.some(
      (item) => item.id === movie.id
    )

    if (alreadyAdded) {
      setWatchlist(
        watchlist.filter((item) => item.id !== movie.id)
      )
    } else {
      setWatchlist([...watchlist, movie])
    }
  }

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

  useEffect(() => {
  localStorage.setItem(
    'watchlist',
    JSON.stringify(watchlist)
  )
}, [watchlist])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030014] text-white px-6 py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

      <section className="relative z-10 max-w-6xl mx-auto text-center">
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

          <div className="mt-6 inline-flex items-center rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
            Watchlist: {watchlist.length} movies
          </div>
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

        {watchlist.length > 0 && (
  <section className="mt-10 text-left">
    <h2 className="text-2xl font-bold mb-6">
      My Watchlist
    </h2>

    <div className="flex gap-4 overflow-x-auto pb-4">
      {watchlist.map((movie) => (
        <div
          key={movie.id}
          className="min-w-[180px] bg-white/5 border border-white/10 rounded-xl p-3"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[250px] object-cover rounded-lg"
          />

          <p className="mt-3 font-semibold line-clamp-1">
            {movie.title}
          </p>


          <button
            onClick={() => toggleWatchlist(movie)}
            className="mt-3 w-full rounded-lg bg-red-500/20 py-2 text-sm text-red-300 hover:bg-red-500/30 transition"
            >
                Remove
        </button>

        </div>
      ))}
    </div>
  </section>
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
          <div className="mt-10 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
          </div>
        )}

        {errorMessage && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            {errorMessage}
          </div>
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
                    toggleWatchlist={toggleWatchlist}
                    isInWatchlist={watchlist.some(
                      (item) => item.id === movie.id
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <h3 className="text-xl font-semibold">
                  No Movies Found
                </h3>

                <p className="mt-3 text-gray-400">
                  Try searching with a different keyword.
                </p>
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  )
}

export default Home