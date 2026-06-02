function MovieCard({
  movie,
  toggleWatchlist,
  isInWatchlist,
  onMovieClick,
}) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750/1e293b/ffffff?text=No+Poster'

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  const year = movie.release_date
    ? movie.release_date.split('-')[0]
    : 'N/A'

  return (
    <div
      onClick={() => onMovieClick(movie)}
      className="group cursor-pointer bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-[420px] object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleWatchlist(movie)
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-2 text-sm text-white backdrop-blur-md hover:bg-purple-600 transition"
        >
          {isInWatchlist ? '✓' : '+'}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-yellow-400">
            ⭐ {rating}
          </span>

          <span className="text-gray-400">
            {year}
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-400 line-clamp-3">
          {movie.overview || 'No overview available.'}
        </p>
      </div>
    </div>
  )
}

export default MovieCard