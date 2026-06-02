function MovieCard({ movie }) {
  return (
    <div className="bg-slate-900 rounded-xl p-4">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full rounded-lg"
      />

      <h3 className="mt-3 font-bold">
        {movie.title}
      </h3>

      <p className="text-yellow-400">
        ⭐ {movie.vote_average.toFixed(1)}
      </p>

      <p className="text-gray-400">
        {movie.release_date}
      </p>
    </div>
  )
}

export default MovieCard