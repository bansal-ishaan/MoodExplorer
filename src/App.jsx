import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ThemeProvider } from "./contexts/ThemeContext.jsx"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Music from "./pages/Music.jsx"
import Movies from "./pages/Movies"
import Books from "./pages/Books"
import News from "./pages/News"
import Coding from "./pages/Coding"
import Recipes from "./pages/Recipes"


function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
           
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/music" element={<Music />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/books" element={<Books />} />
              <Route path="/news" element={<News />} />
              <Route path="/coding" element={<Coding />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </div>
          <ToastContainer position="bottom-right" theme="colored" />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
