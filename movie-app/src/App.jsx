import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Movies from './Movies'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nav from './Nav'
import Customer from './Customer'
import Rental from './Rental'
import { Route,Routes,Navigate } from 'react-router-dom';
import Notfound from './Notfound'
import Movieform from './Movieform'
import Loginform from './Loginform'
import { useLocation } from 'react-router-dom'



function App() {
  
    
  
  return (
    <>
      <Nav></Nav>
      <div>
      <Routes>
      <Route path="/moviestitle/:id" element={<Movieform/>}></Route>
      <Route path="/" element={<Movies/>}></Route>
      <Route path="/customer" element={<Customer/>}></Route>
     <Route path="/rental" element={<Rental/>}></Route>

     <Route path="/not-found" element={<Notfound/>}></Route>
    <Route path="/loginform" element={<Loginform/>}></Route>
     <Route path="*" element={<Navigate to="/not-found" />} />
     </Routes>
     </div>
    </>
  )
}

export default App;