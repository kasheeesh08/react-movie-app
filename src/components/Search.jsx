function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">
        <span className="text-2xl">🔍</span>

        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-lg"
        />
      </div>
    </div>
  )
}

export default Search