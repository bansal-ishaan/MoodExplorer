"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { FaPlay, FaHeart, FaRegHeart, FaSearch } from "react-icons/fa"
import { debounce } from "lodash"

const Music = () => {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mood, setMood] = useState("none") // Default mood set to none
  const [favorites, setFavorites] = useState([])
  const [accessToken, setAccessToken] = useState("")
  const [searchQuery, setSearchQuery] = useState("") // For search engine

  // Debounced search function using lodash
  const debouncedFetchTracks = debounce((selectedMood) => {
    if (selectedMood !== "none") {
      fetchTracks(selectedMood)
    }
  }, 500)

  // Fetch Spotify access token
  const fetchAccessToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa("37df7316bcf7415ba1fdec78cc0c708c:a77642a2b7ee4f4d82576c002c8aee8a")}`, // Replace with your Spotify Client ID and Secret
        },
        body: "grant_type=client_credentials",
      })

      const data = await response.json()
      setAccessToken(data.access_token)
    } catch (error) {
      console.error("Error fetching access token:", error)
      toast.error("Failed to authenticate with Spotify")
    }
  }

  // Fetch tracks from Spotify API
  const fetchTracks = async (query) => {
    if (!accessToken) {
      toast.error("Spotify access token is missing")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const data = await response.json()
      const fetchedTracks = data.tracks.items.map((item) => ({
        id: item.id,
        name: item.name,
        artist: item.artists[0]?.name || "Unknown Artist",
        album: item.album.name,
        image: item.album.images[0]?.url || "/placeholder.svg",
        preview_url: item.preview_url,
        spotify_url: item.external_urls.spotify, // Add Spotify URL
      }))

      setTracks(fetchedTracks)
      setLoading(false)
      toast.success(`Found ${fetchedTracks.length} tracks for your search!`)
    } catch (error) {
      console.error("Error fetching tracks:", error)
      toast.error("Failed to fetch music recommendations")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccessToken()

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("musicFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const handleMoodChange = (e) => {
    const selectedMood = e.target.value
    setMood(selectedMood)
    debouncedFetchTracks(selectedMood)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query")
      return
    }
    fetchTracks(searchQuery)
  }

  const toggleFavorite = (trackId) => {
    let newFavorites
    if (favorites.includes(trackId)) {
      newFavorites = favorites.filter((id) => id !== trackId)
    } else {
      newFavorites = [...favorites, trackId]
    }
    setFavorites(newFavorites)
    localStorage.setItem("musicFavorites", JSON.stringify(newFavorites))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Music for Your Mood</h1>

      <div className="flex items-center justify-between mb-6">
        <div>
          <label htmlFor="mood" className="block mb-2 font-medium">
            Select your mood:
          </label>
          <select
            id="mood"
            value={mood}
            onChange={handleMoodChange}
            className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="none" disabled>
              -- Select Mood --
            </option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="energetic">Energetic</option>
            <option value="calm">Calm</option>
            <option value="focused">Focused</option>
          </select>
        </div>

        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a song or artist..."
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
          <ClipLoader color="#6366F1" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div key={track.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={track.image || "/placeholder.svg"} alt={track.album} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{track.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{track.artist}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{track.album}</p>
                <div className="flex justify-between mt-4">
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white p-2 rounded-full"
                  >
                    Play on Spotify
                  </a>
                  <button onClick={() => toggleFavorite(track.id)} className="p-2 rounded-full">
                    {favorites.includes(track.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Music