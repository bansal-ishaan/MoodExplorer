"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const MoodCard = ({ mood, icon, description, color, path }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${color} p-6 rounded-lg shadow-lg cursor-pointer`}
      onClick={() => navigate(path)}
    >
      <div className="flex flex-col items-center text-white">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{mood}</h3>
        <p className="text-center">{description}</p>
      </div>
    </motion.div>
  )
}

export default MoodCard
