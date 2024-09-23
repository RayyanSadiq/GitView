import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'

import HomePage from './pages/HomePage'
import Loginpage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ExplorePage from './pages/ExplorePage'
import LikesPage from './pages/LikesPage'


function App() {
  return (
    <div className="flex text-white"> 
      <Sidebar/> 
   
      <div className='max-w-5xl my-5 text-white transition-all mx-auto duration-300 flex-1'>
        <Routes>
          <Route path='/'  element={<HomePage />} /> 
          <Route path='/login'  element={<Loginpage />} /> 
          <Route path='/signup'  element={<SignupPage />} /> 
          <Route path='/explore'  element={<ExplorePage />} /> 
          <Route path='/likes'  element={<LikesPage />} /> 
        </Routes>
      </div>
    </div>
    
  )
}

export default App
