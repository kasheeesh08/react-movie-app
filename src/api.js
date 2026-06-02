const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${
      import.meta.env.VITE_TMDB_ACCESS_TOKEN
    }`,
  },
}

export { API_BASE_URL, API_OPTIONS }