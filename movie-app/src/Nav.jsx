import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import  logo from './assets/logo.jpg'


const Nav=()=>{
    const [isOpen,setIsOpen]=useState(false)

const btnHandler=()=>{
  setIsOpen(!isOpen);
}


  return(
    <div className='md:w-full w-full absolute top-0 left-0  bg-white'>
    <nav className="flex items-center justify-between text-black md:px-6 px-4 " >
     
       <div className='w-40'>
      <img src={logo} />
    </div>
    
      <ul className="hidden md:flex md:items-center md:justify-between md:gap-4 font-semibold text-xl  xl:text-2xl md:cursor-pointer lg:gap-8">
        <li className="font-bold p-3  hover:text-red-900 hover:border-b-4 rounded-sm border-b-red-900 "><a href='#'>Vidly</a></li>
        <li className="p-3  hover:text-red-900 hover:border-b-4 rounded-sm border-b-red-900 "><a href='#'>Movies </a></li>
        <li className="p-3  hover:text-red-900 hover:border-b-4 rounded-sm border-b-red-900 "><a href='#'>Customer</a></li>
        <li className="p-3  hover:text-red-900 hover:border-b-4 rounded-sm border-b-red-900 "><a href='#'>Rental</a></li>
      </ul>
  
      <button className='block md:hidden  cursor-pointer' onClick={btnHandler}  >
      <FontAwesomeIcon icon={faBars}  size='2x' />
      </button>
     
     {isOpen &&  (
      <div className='md:hidden  absolute top-16 left-0 right-0 w-full bg-red-900 flex flex-col items-center font-semibold text-medium text-white cursor-pointer'> 
      
         <li className='w-full p-4 text-center font-bold list-none hover:bg-red-950'> <a
         href='#'>Vidly</a></li>
         <li className='w-full p-4 text-center list-none  hover:bg-red-950'> <a href='#'>Movies</a></li>
         <li className='w-full p-4 text-center list-none  hover:bg-red-950'> <a href='#'>Customer</a></li>
         <li className='w-full p-4 text-center list-none  hover:bg-red-950'> <a href='#'>Rental</a></li>
      
      </div>

    ) }
    </nav>
    </div>
  );

}
export default Nav;