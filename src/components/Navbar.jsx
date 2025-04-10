"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"


const Navbar = () => {


  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaHome className="text-purple-600 text-2xl" />
            <span className="text-xl font-bold">Mood Explorer</span>
          </Link>
         
        </div>
      </div>
    </nav>
  )
}

export default Navbar
