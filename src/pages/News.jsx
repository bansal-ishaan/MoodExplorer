"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { FaNewspaper, FaExternalLinkAlt, FaClock } from "react-icons/fa"
import { format, parseISO } from "date-fns"

const News = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("technology") // Default category

  const API_KEY = "85b7d42e7ea849f58b72eb449f2910fd" // Your API key

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch news articles")
        }
        const data = await response.json()
        setArticles(data.articles)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching news:", error)
        toast.error("Failed to fetch news articles")
        setLoading(false)
      }
    }

    fetchNews()
  }, [category])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy • h:mm a")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      <div className="mb-6">
        <label htmlFor="category" className="block mb-2 font-medium">
          Choose a category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <ClipLoader color="#EF4444" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={article.urlToImage || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                    {article.source.name}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <FaClock className="mr-1" />
                    {formatDate(article.publishedAt)}
                  </div>
                </div>
                <h3 className="font-bold text-lg">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-red-600 dark:text-red-400"
                >
                  <FaNewspaper className="mr-1" /> Read Full Article
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

export default News