import { FaMusic, FaFilm, FaBook, FaNewspaper, FaCode, FaUtensils, FaCloudSun } from "react-icons/fa"
import MoodCard from "../components/MoodCard"
import Weather from "../components/Weather"

const Home = () => {
  
  const moods = [
    // {
    //   mood: "Weather",
    //   icon: <FaCloudSun />,
    //   description: "Check the current weather in your location",
    //   color: "bg-blue-500",
    //   path: "/weather", // Link to the Weather component
    // },
    {
      mood: "Happy/Sad",
      icon: <FaMusic />,
      description: "Find music that matches your mood",
      color: "bg-purple-600",
      path: "/music",
    },
    {
      mood: "Chillax",
      icon: <FaFilm />,
      description: "Discover movies to help you relax",
      color: "bg-blue-600",
      path: "/movies",
    },
    {
      mood: "Knowledge",
      icon: <FaBook />,
      description: "Expand your mind with books",
      color: "bg-green-600",
      path: "/books",
    },
    {
      mood: "Informed",
      icon: <FaNewspaper />,
      description: "Stay updated with the latest news",
      color: "bg-red-600",
      path: "/news",
    },
    {
      mood: "Productive",
      icon: <FaCode />,
      description: "Explore coding challenges and projects",
      color: "bg-gray-700",
      path: "/coding",
    },
    {
      mood: "Hungry",
      icon: <FaUtensils />,
      description: "Find delicious recipes to cook",
      color: "bg-yellow-600",
      path: "/recipes",
    },
  ]

  return (
    
    <div>
       <Weather />
      {/* Mood Cards */}
      <h1 className="text-3xl font-bold text-center mb-8">How are you feeling today?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moods.map((mood, index) => (
          <MoodCard key={index} {...mood} />
        ))}
      </div>
    </div>
  )
}

export default Home