"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { FaBook, FaExternalLinkAlt, FaSearch } from "react-icons/fa"

const Books = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("none") // Default category set to none
  const [searchQuery, setSearchQuery] = useState("") // For search engine

  const API_KEY = "AIzaSyAC43836xnVswAGV1WvR6XmVDEURBUzdOc" // Your Google Books API key

  useEffect(() => {
    if (category === "none" && searchQuery.trim() === "") return // Do not fetch books if no category or search query

    const fetchBooks = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery || `subject:${category}`}&key=${API_KEY}&maxResults=12`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch books")
        }
        const data = await response.json()
        const fetchedBooks = data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown Author"],
          description: item.volumeInfo.description || "No description available.",
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg",
          infoLink: item.volumeInfo.infoLink,
        }))
        setBooks(fetchedBooks)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching books:", error)
        toast.error("Failed to fetch book recommendations")
        setLoading(false)
      }
    }

    fetchBooks()
  }, [category, searchQuery])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setSearchQuery("") // Clear search query when category changes
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query")
      return
    }
    setCategory("none") // Clear category when searching
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Books to Expand Your Knowledge</h1>

      <div className="flex items-center justify-between mb-6">
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">
            Choose a category:
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="none" disabled>
              -- Select Type of Books --
            </option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="philosophy">Philosophy</option>
            <option value="technology">Technology</option>
            <option value="psychology">Psychology</option>
          </select>
        </div>

        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a book..."
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
          <ClipLoader color="#10B981" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex">
              <img src={book.thumbnail} alt={book.title} className="w-32 h-48 object-cover" />
              <div className="p-4 flex-1">
                <h3 className="font-bold text-lg">{book.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{book.authors.join(", ")}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-3">{book.description}</p>
                <a
                  href={book.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-green-600 dark:text-green-400"
                >
                  <FaBook className="mr-1" /> View Details
                  <FaExternalLinkAlt className="ml-1 text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Books