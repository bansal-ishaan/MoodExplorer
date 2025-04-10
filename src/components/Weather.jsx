"use client"

import { useState } from "react"
import axios from "axios"
import { FaCloud, FaSun, FaCloudRain, FaSnowflake, FaSearch } from "react-icons/fa"
import { ClipLoader } from "react-spinners"

const Weather = () => {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_KEY = "d33c7f6f48c50f2cf739b39f2f1fdd85" // Your OpenWeatherMap API key

  const fetchWeather = async (city) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      setWeather({
        name: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      })
    } catch (error) {
      console.error("Error fetching weather:", error)
      setWeather(null)
      alert("City not found. Please try again.")
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (location.trim() === "") {
      alert("Please enter a location")
      return
    }
    fetchWeather(location)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Check the Weather</h1>
      <form onSubmit={handleSearch} className="flex items-center justify-center mb-6">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city..."
          className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#3B82F6" size={50} />
        </div>
      ) : weather ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {weather.name}, {weather.country}
          </h2>
          <div className="flex justify-center items-center mt-4">
            <img src={weather.icon} alt="Weather Icon" className="w-16 h-16" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{Math.round(weather.temp)}°C</p>
              <p className="text-lg capitalize">{weather.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Enter a city to check the weather.</p>
      )}
    </div>
  )
}

export default Weather