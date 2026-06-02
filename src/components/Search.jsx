function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
        <span className="text-xl">🔍</span>

        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
        />
      </div>
    </div>
  )
}

export default Search