import React from 'react'
import Editor from './components/Editor'
import Userdashboard from './pages/Userdashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'


const App = () => {

  return (
    <>


  <Routes>
    <Route path='/home' element={<Home/>}/>
    <Route path="/editor" element={<Editor />} />
    <Route path="/userdashboard" element={<Userdashboard />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
  </Routes>



    </>
  )
}

export default App
