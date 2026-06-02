import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      TABLE_ID,
      [
        Query.equal('searchTerm', searchTerm)
      ]
    )

    if (result.documents.length > 0) {
      const document = result.documents[0]

      await database.updateDocument(
        DATABASE_ID,
        TABLE_ID,
        document.$id,
        {
          count: document.count + 1
        }
      )
    } else {
      await database.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movieId: movie.id,
          posterUrl: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : ''
        }
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      TABLE_ID,
      [
        Query.orderDesc('count'),
        Query.limit(5)
      ]
    )

    return result.documents
  } catch (error) {
    console.log(error)
    return []
  }
}