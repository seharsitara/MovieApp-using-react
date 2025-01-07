import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Movies from './Movies'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nav from './Nav'
import Customer from './Customer'
import Rental from './Rental'
import { Route,Routes,Navigate}  from 'react-router-dom';
import Notfound from './Notfound'
import Movieform from './Movieform'
import Loginform from './Loginform'
import { useLocation } from 'react-router-dom'
import Register from './Register'
import Movieloginform from './Movieloginform'



function App() {
  
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Update localStorage when login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
        <div>
      
       <Nav>
        </Nav>
        
      <Routes>
      <Route path="/moviestitle/:id" element={<Movieform/>}></Route>
      <Route path="/registrationform" element={<Register/>}></Route>
      <Route path="/moviesform" element={<Movieloginform />} />
      <Route path="/movies/:id" element={<Movieloginform />} />
     <Route path="/loginform" element={<Loginform setIsLoggedIn={setIsLoggedIn}/>}></Route>
     {/*<Route
          path="/movies"
          element={isLoggedIn ? <Movies /> : <Navigate to="/loginform" />}
        />*/}
       
      <Route path="/movies" element={<Movies setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="/customer" element={<Customer/>}></Route>
     <Route path="/rental" element={<Rental/>}></Route>
     <Route path="/not-found" element={<Notfound/>}></Route>
      <Route path="*" element={<Navigate to="/not-found" />} />
  
     </Routes>
     
     </div>
    </>
  )
}

export default App;