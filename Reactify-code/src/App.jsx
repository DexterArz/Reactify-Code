import React from 'react'
import Editor from './components/Editor'
import Userdashboard from './pages/Userdashboard'
import Signup from './pages/signup'
import Signin from './pages/Signin'
import { Route, Routes } from 'react-router-dom'


const App = () => {

  return (
    <>
  {/* <Editor></Editor> 
 <Userdashboard></Userdashboard>
  <Signup>  </Signup>
  <Signin></Signin> */}

  <Routes>
    <Route path="/editor" element={<Editor />} />
    <Route path="/userdashboard" element={<Userdashboard />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
  </Routes>


    </>
  )
}

export default App
