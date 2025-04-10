"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { FaGithub } from "react-icons/fa"

const Coding = () => {
  const [repositories, setRepositories] = useState([])
  const [codeforcesProfile, setCodeforcesProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [githubUsername, setGithubUsername] = useState("")
  const [codeforcesHandle, setCodeforcesHandle] = useState("")
  const [tab, setTab] = useState("github") // 'github' or 'codeforces'

  // Fetch GitHub repositories
  const fetchGitHubRepos = async () => {
    if (!githubUsername) {
      toast.error("Please enter a GitHub username")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`)
      if (!response.ok) {
        throw new Error("Failed to fetch repositories")
      }
      const data = await response.json()
      setRepositories(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error)
      toast.error("Failed to fetch GitHub repositories")
      setLoading(false)
    }
  }

  // Fetch Codeforces profile
  const fetchCodeforcesProfile = async () => {
    if (!codeforcesHandle) {
      toast.error("Please enter a Codeforces handle")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`)
      if (!response.ok) {
        throw new Error("Failed to fetch Codeforces profile")
      }
      const data = await response.json()
      setCodeforcesProfile(data.result[0])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching Codeforces profile:", error)
      toast.error("Failed to fetch Codeforces profile")
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Coding Resources</h1>

      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${tab === "github" ? "border-b-2 border-gray-700 dark:border-gray-300" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setTab("github")}
        >
          <FaGithub className="inline mr-2" /> GitHub Profile
        </button>
        <button
          className={`py-2 px-4 font-medium ${tab === "codeforces" ? "border-b-2 border-gray-700 dark:border-gray-300" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setTab("codeforces")}
        >
          Codeforces Profile
        </button>
      </div>

      {tab === "github" && (
        <div className="mb-6">
          <label htmlFor="github-username" className="block mb-2 font-medium">
            Enter GitHub Username:
          </label>
          <div className="flex">
            <input
              id="github-username"
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="e.g., octocat"
              className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={fetchGitHubRepos}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Fetch Repos
            </button>
          </div>
        </div>
      )}

      {tab === "codeforces" && (
        <div className="mb-6">
          <label htmlFor="codeforces-handle" className="block mb-2 font-medium">
            Enter Codeforces Handle:
          </label>
          <div className="flex">
            <input
              id="codeforces-handle"
              type="text"
              value={codeforcesHandle}
              onChange={(e) => setCodeforcesHandle(e.target.value)}
              placeholder="e.g., tourist"
              className="w-full md:w-64 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={fetchCodeforcesProfile}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Fetch Profile
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-12">
          <ClipLoader color="#6B7280" size={50} />
        </div>
      ) : (
        <>
          {tab === "github" && (
            <div className="grid grid-cols-1 gap-4">
              {repositories.map((repo) => (
                <div key={repo.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h3 className="font-bold text-lg">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center"
                    >
                      <FaGithub className="mr-2" />
                      {repo.name}
                    </a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{repo.description}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "codeforces" && codeforcesProfile && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg">{codeforcesProfile.handle}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Rating: {codeforcesProfile.rating} (Max: {codeforcesProfile.maxRating})
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Rank: {codeforcesProfile.rank} (Max Rank: {codeforcesProfile.maxRank})
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Contribution: {codeforcesProfile.contribution}
              </p>
              <a
                href={`https://codeforces.com/profile/${codeforcesProfile.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-4 block"
              >
                View Profile on Codeforces
              </a>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Coding