import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'

import HomePage from './pages/HomePage'
import Loginpage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ExplorePage from './pages/ExplorePage'
import LikesPage from './pages/LikesPage'
import { useAuthContext } from './context/AuthContext'


function App() {
  const {authUser, loading } = useAuthContext()

  if (loading) return <div className='flex justify-center items-center h-screen text-white'>Loading...</div>

  return (
    <div className="flex text-white"> 
      <Sidebar/> 
   
      <div className='max-w-5xl my-5 text-white transition-all mx-auto duration-300 flex-1'>
        <Routes>
          <Route path='/'  element={<HomePage />} /> 
          <Route path='/login'  element={ !authUser ? <Loginpage /> : <Navigate to={"/"} />} /> 
          <Route path='/signup'  element={ !authUser ? <SignupPage /> : <Navigate to={"/"} />} /> 
          <Route path='/explore'  element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />} /> 
          <Route path='/likes'  element={authUser ? <LikesPage /> : <Navigate to={"/login"} />} /> 
        </Routes>
        <Toaster/>
      </div>
    </div>
    
  )
}

export default App
