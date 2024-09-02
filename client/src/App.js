import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Register from './component/Auth/Register'
import Login from './component/Auth/Login'
import Home from './component/Pages/Home'



function App() {

  // const isLoggedIn = localStorage.getItem('loggedIn')
  // const role = localStorage.getItem('Role')



  return (
    <>
      <Toaster position='bottom-right' toastOptions={{ duration: 2500 }} />

      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>


    </>
  )
}

export default App
