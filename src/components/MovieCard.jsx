function MovieCard({ movie }) {
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
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-[420px] object-cover rounded-xl"
      />

      <div className="mt-4">
        <h3 className="font-bold text-lg line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-300">
          <p>⭐ {rating}</p>
          <p>{year}</p>
        </div>

        <p className="mt-3 text-sm text-gray-400 line-clamp-3">
          {movie.overview || 'No overview available.'}
        </p>
      </div>
    </div>
  )
}

export default MovieCard