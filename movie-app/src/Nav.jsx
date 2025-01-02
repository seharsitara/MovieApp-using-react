import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "./assets/logo.jpg";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-red-900 z-50 shadow-lg">
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 text-white">
        {/* Logo */}
        <div className="w-20 md:w-32">
          <img src={logo} alt="Logo" className="object-cover rounded-full" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-lg font-medium">
          <li className="hover:text-gray-300 border-b-2 border-transparent hover:border-white transition duration-300">
            <Link to="/movies">Movies</Link>
          </li>
          <li className="hover:text-gray-300 border-b-2 border-transparent hover:border-white transition duration-300">
            <Link to="/loginform">Login</Link>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-red-800 text-white shadow-lg">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li
                className="w-full text-center py-2 hover:bg-red-700 transition duration-300"
                onClick={closeMenu}
              >
                <Link to="/movies">Movies</Link>
              </li>
              <li
                className="w-full text-center py-2 hover:bg-red-700 transition duration-300"
                onClick={closeMenu}
              >
                <Link to="/loginform">Login</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
