"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { FaUtensils, FaClock, FaUsers } from "react-icons/fa"

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [cuisine, setCuisine] = useState("none") // Default cuisine set to none

  const API_KEY = "6eb74e2d22d54e7b829d44b73d8f50b2" // Your Spoonacular API key

  useEffect(() => {
    if (cuisine === "none") return // Do not fetch recipes if no cuisine is selected

    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${API_KEY}&number=12`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch recipes")
        }
        const data = await response.json()
        const fetchedRecipes = data.results.map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image || "/placeholder.svg",
          readyInMinutes: recipe.readyInMinutes || "N/A",
          servings: recipe.servings || "N/A",
          summary: recipe.summary || "No description available.",
          sourceUrl: recipe.sourceUrl || "#",
        }))
        setRecipes(fetchedRecipes)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching recipes:", error)
        toast.error("Failed to fetch recipes")
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [cuisine])

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Delicious Recipes</h1>

      <div className="mb-6">
        <label htmlFor="cuisine" className="block mb-2 font-medium">
          Choose a cuisine:
        </label>
        <select
          id="cuisine"
          value={cuisine}
          onChange={handleCuisineChange}
          className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="none" disabled>
            -- Select Cuisine --
          </option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
          <option value="chinese">Chinese</option>
          <option value="american">American</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <ClipLoader color="#F59E0B" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{recipe.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center mr-4">
                    <FaClock className="mr-1" />
                    {recipe.readyInMinutes} min
                  </span>
                  <span className="flex items-center">
                    <FaUsers className="mr-1" />
                    {recipe.servings} servings
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-3">{recipe.summary}</p>
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-yellow-600 dark:text-yellow-400"
                >
                  <FaUtensils className="mr-1" /> View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Recipes