"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { FaInfoCircle, FaStar, FaSearch } from "react-icons/fa"

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState("none") // Default genre set to none
  const [searchQuery, setSearchQuery] = useState("") // For search engine

  const API_KEY = "f3e60536" // Your OMDB API key

  const fetchMovies = async (query) => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query || genre}&type=movie`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }
      const data = await response.json()
      if (data.Response === "False") {
        toast.error(data.Error)
        setMovies([])
      } else {
        const fetchedMovies = data.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg",
          year: movie.Year,
          type: movie.Type,
        }))
        setMovies(fetchedMovies)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching movies:", error)
      toast.error("Failed to fetch movie recommendations")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (genre === "none" && searchQuery.trim() === "") return // Do not fetch movies if no genre or search query
    fetchMovies(searchQuery || genre)
  }, [genre, searchQuery])

  const handleGenreChange = (e) => {
    setGenre(e.target.value)
    setSearchQuery("") // Clear search query when genre changes
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query")
      return
    }
    setGenre("none") // Clear genre when searching
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Movies to Watch</h1>

      <div className="flex items-center justify-between mb-6">
        <div>
          <label htmlFor="genre" className="block mb-2 font-medium">
            Choose a genre:
          </label>
          <select
            id="genre"
            value={genre}
            onChange={handleGenreChange}
            className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="none" disabled>
              -- Select Genre --
            </option>
            <option value="comedy">Comedy</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="fantasy">Fantasy</option>
            <option value="family">Family</option>
          </select>
        </div>

        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <ClipLoader color="#3B82F6" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <div className="flex items-center mt-1 mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{movie.year}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm capitalize">{movie.type}</p>
                <button className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
                  <FaInfoCircle className="mr-1" /> More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Movies