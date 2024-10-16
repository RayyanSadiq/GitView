
import { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import Repos from '../components/Repos'

const ExplorePage = () => {

  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [language, setLanguage] = useState('')
  

  const languages = ['javascript', 'typescript', 'c++', 'python', 'java']

  const exploreRepos = async (language) => {
    setLoading(true)
    setRepos([])
    try {

      const res = await fetch(`/api/explore/repos/${language}`)
      
      const data = await res.json()
      if (data.message) {
        throw new Error("you have reached gitview api rate limit")
      }
      setRepos(data.items)
      setLanguage(language)


    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4 items-center ">
        <h1 className="text-xl font-bold text-center"> Explore Popular Repositories</h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center ">
          {languages.map((lang) => (
            <img
              key={lang}
              src={` /assets/${lang}.svg`}
              alt="Javascript Logo"
              className="h-11 sm:h-20  cursor-pointer"
              onClick={() => exploreRepos(lang)}
            />
          ))}

        </div>
        {repos.length > 0 && (
          <h2 className='text-lg font-semibold text-center my-4'>
            <span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
              {language.toUpperCase()}{" "}
            </span>
            Repositories
          </h2>

        )}
        {!loading && repos.length > 0 && <Repos repos={repos} alwaysFullWidth />}
				{loading && <Spinner />}

      </div>

    </div>
  )
}

export default ExplorePage